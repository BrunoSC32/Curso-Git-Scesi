import type { PropsWithChildren } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

function AppShell({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Administrador</p>
          <NavLink to="/" className="brand">
            Portal de Noticias
          </NavLink>
        </div>

        <div className="topbar-meta">
          <nav className="topbar-actions" aria-label="Navegacion principal">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Noticias
            </NavLink>
            <NavLink
              to="/news/new"
              className={({ isActive }) => (isActive ? 'button-link active' : 'button-link')}
            >
              Nueva noticia
            </NavLink>
          </nav>

          <div className="topbar-user">
            <div className="topbar-user-copy">
              <strong>{user?.displayName ?? 'Admin'}</strong>
              <span>{user?.email ?? 'sesion local'}</span>
            </div>
            <button type="button" className="nav-link" onClick={handleLogout}>
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}

export default AppShell
