import { createContext } from 'react'
import type { SessionUser } from './authSession'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthContextValue {
  isAuthenticated: boolean
  user: SessionUser | null
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
