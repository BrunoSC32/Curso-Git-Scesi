import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Administrador</p>
          <NavLink to="/" className="brand">
            Portal de Noticias
          </NavLink>
        </div>

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
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}

export default AppShell
