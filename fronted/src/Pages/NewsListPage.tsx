import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import NewsCard from '../components/NewsCard'
import { deleteNews, getNewsList } from '../services/newsService'
import type { News } from '../types/news'

interface NavigationState {
  message?: string
}

function NewsListPage() {
  const location = useLocation()
  const [newsList, setNewsList] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(
    (location.state as NavigationState | null)?.message ?? null,
  )

  useEffect(() => {
    let isMounted = true

    async function loadNews() {
      setIsLoading(true)
      setError(null)

      try {
        const news = await getNewsList()
        if (isMounted) {
          setNewsList(news)
        }
      } catch {
        if (isMounted) {
          setError('No se pudo cargar la lista de noticias.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadNews()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const nextFeedback = (location.state as NavigationState | null)?.message ?? null
    if (nextFeedback) {
      setFeedback(nextFeedback)
    }
  }, [location.state])

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Esta accion eliminara la noticia. Deseas continuar?')
    if (!confirmed) {
      return
    }

    try {
      await deleteNews(id)
      const nextNewsList = await getNewsList()
      setNewsList(nextNewsList)
      setFeedback('Noticia eliminada correctamente.')
    } catch {
      setError('No se pudo eliminar la noticia.')
    }
  }

  return (
    <section className="page-stack">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Gestion editorial</p>
          <h1>Panel de noticias</h1>
          <p>
            Administra titulares, actualiza contenidos y manten visible la portada desde una
            sola interfaz.
          </p>
        </div>
      </div>

      {feedback ? <p className="form-message success">{feedback}</p> : null}
      {error ? <p className="form-message error">{error}</p> : null}

      {isLoading ? <section className="panel">Cargando noticias...</section> : null}

      {!isLoading && newsList.length === 0 ? (
        <EmptyState
          title="Todavia no hay noticias publicadas"
          description="Crea la primera noticia para comenzar a poblar la portada."
          ctaLabel="Crear noticia"
          ctaTo="/news/new"
        />
      ) : null}

      {!isLoading && newsList.length > 0 ? (
        <section className="news-grid">
          {newsList.map((news) => (
            <NewsCard key={news.id} news={news} onDelete={handleDelete} />
          ))}
        </section>
      ) : null}
    </section>
  )
}

export default NewsListPage