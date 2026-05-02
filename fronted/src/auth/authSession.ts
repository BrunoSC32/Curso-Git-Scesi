export interface SessionUser {
  email: string
  displayName: string
  role: 'admin'
}

const SESSION_STORAGE_KEY = 'news-admin-session'

function toDisplayName(email: string) {
  const localPart = email.split('@')[0] || 'admin'
  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

export function readStoredSession(): SessionUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

export function createMockSession(email: string): SessionUser {
  return {
    email,
    displayName: toDisplayName(email),
    role: 'admin',
  }
}

export function persistSession(user: SessionUser) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY)
}
