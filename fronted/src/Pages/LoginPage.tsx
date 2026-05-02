import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

interface LoginLocationState {
  from?: string
}

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as LoginLocationState | null)?.from || '/'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (submitError) {
      setError(getApiErrorMessage(submitError, 'No se pudo iniciar la sesion.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="login-shell">
      <div className="panel login-panel">
        <div className="section-heading">
          <p className="eyebrow">Acceso administrador</p>
          <h1>Inicia sesion</h1>
          <p>
            Esta pantalla es una maqueta local. Guarda una sesion temporal en el navegador
            y no consume autenticacion real del backend.
          </p>
        </div>

        <form className="news-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Correo</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@portal.com"
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span>Contrasena</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              autoComplete="current-password"
            />
          </label>

          {error ? <p className="form-message error">{error}</p> : null}

          <div className="form-actions">
            <button type="submit" className="button-link active" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Entrar al panel'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
