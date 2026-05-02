const DEFAULT_API_URL = 'http://localhost:3000'

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '')
}

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_URL?.trim() || DEFAULT_API_URL,
)
