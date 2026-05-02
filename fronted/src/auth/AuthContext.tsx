import {
  useState,
  type PropsWithChildren,
} from 'react'
import { AuthContext, type LoginPayload } from './authContext'
import {
  clearSession,
  createMockSession,
  persistSession,
  readStoredSession,
  type SessionUser,
} from './authSession'

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(() => readStoredSession())

  async function login({ email, password }: LoginPayload) {
    if (!email.trim() || !password.trim()) {
      throw new Error('Debes completar correo y contraseña.')
    }

    const sessionUser = createMockSession(email.trim())
    persistSession(sessionUser)
    setUser(sessionUser)
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: user !== null,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
