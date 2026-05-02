import { ApiError } from '../services/http'

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError && error.message.trim()) {
    return error.message
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallbackMessage
}
