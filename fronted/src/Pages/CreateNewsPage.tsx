import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsForm from '../components/NewsForm'
import { createNews } from '../services/newsService'
import type { NewsPayload } from '../types/news'

function CreateNewsPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(payload: NewsPayload) {
    setIsSubmitting(true)
    setFormError(null)

    try {
      await createNews(payload)
      navigate('/', { state: { message: 'Noticia creada correctamente.' } })
    } catch {
      setFormError('No se pudo guardar la noticia. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Crear</p>
        <h1>Nueva noticia</h1>
        <p>Publica un nuevo contenido y mantenlo disponible en la portada administrativa.</p>
      </div>

      <NewsForm
        submitLabel="Publicar noticia"
        isSubmitting={isSubmitting}
        formError={formError}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default CreateNewsPage
