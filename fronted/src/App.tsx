import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import AppShell from './components/AppShell'
import ProtectedRoute from './components/ProtectedRoute'
import CreateNewsPage from './pages/CreateNewsPage'
import EditNewsPage from './pages/EditNewsPage'
import LoginPage from './pages/LoginPage'
import NewsListPage from './pages/NewsListPage'

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Outlet />
      </AppShell>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<NewsListPage />} />
        <Route path="/news/new" element={<CreateNewsPage />} />
        <Route path="/news/:id/edit" element={<EditNewsPage />} />
      </Route>
    </Routes>
  )
}

export default App
