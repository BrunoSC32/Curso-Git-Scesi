import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppShell from './components/AppShell'
import CreateNewsPage from './pages/CreateNewsPage'
import EditNewsPage from './pages/EditNewsPage'
import NewsListPage from './pages/NewsListPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<NewsListPage />} />
        <Route path="/news/new" element={<CreateNewsPage />} />
        <Route path="/news/:id/edit" element={<EditNewsPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
