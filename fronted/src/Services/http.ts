import { API_BASE_URL } from '../config/env'

interface ApiErrorBody {
  error?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | Record<string, unknown> | null
}

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

async function parseJsonSafely(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    return null
  }

  try {
    return (await response.json()) as unknown
  } catch {
    return null
  }
}

function buildRequestBody(body: RequestOptions['body']) {
  if (body == null || body instanceof FormData || typeof body === 'string') {
    return body
  }

  return JSON.stringify(body)
}

function buildHeaders(body: RequestOptions['body'], headers?: HeadersInit) {
  const nextHeaders = new Headers(headers)

  if (
    body != null &&
    !(body instanceof FormData) &&
    typeof body !== 'string' &&
    !nextHeaders.has('Content-Type')
  ) {
    nextHeaders.set('Content-Type', 'application/json')
  }

  return nextHeaders
}

export async function httpRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...options,
    body: buildRequestBody(options.body),
    headers: buildHeaders(options.body, options.headers),
  })

  const payload = await parseJsonSafely(response)

  if (!response.ok) {
    const errorMessage =
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof (payload as ApiErrorBody).error === 'string'
        ? (payload as ApiErrorBody).error!
        : 'Ocurrio un error inesperado en la API.'

    throw new ApiError(errorMessage, response.status)
  }

  return payload as T
}
