import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import NewsForm from '../components/NewsForm'
import { getNewsById, updateNews } from '../services/newsService'
import type { News, NewsPayload } from '../types/news'

function EditNewsPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState<News | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadNews() {
      setIsLoading(true)
      setLoadError(null)

      try {
        const result = await getNewsById(id)
        if (!isMounted) {
          return
        }

        setNews(result)
      } catch {
        if (isMounted) {
          setLoadError('No se pudo cargar la noticia.')
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
  }, [id])

  async function handleSubmit(payload: NewsPayload) {
    setIsSubmitting(true)
    setFormError(null)

    try {
      await updateNews(id, payload)
      navigate('/', { state: { message: 'Noticia actualizada correctamente.' } })
    } catch {
      setFormError('No se pudo actualizar la noticia.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <section className="panel">Cargando noticia...</section>
  }

  if (loadError) {
    return <section className="panel error-banner">{loadError}</section>
  }

  if (!news) {
    return (
      <EmptyState
        title="No encontramos esa noticia"
        description="La noticia que intentas editar no existe o fue eliminada."
        ctaLabel="Volver al listado"
        ctaTo="/"
      />
    )
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Editar</p>
        <h1>Actualizar noticia</h1>
        <p>Modifica el contenido y guarda los cambios para mantener la portada al dia.</p>
      </div>

      <NewsForm
        initialValues={{
          title: news.title,
          content: news.content ?? '',
          author: news.author,
          imageUrl: news.imageUrl ?? '',
        }}
        submitLabel="Guardar cambios"
        isSubmitting={isSubmitting}
        formError={formError}
        onSubmit={handleSubmit}
      />

      <Link className="nav-link standalone-link" to="/">
        Volver al listado
      </Link>
    </section>
  )
}

export default EditNewsPage