import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { NewsPayload } from '../types/news'

interface NewsFormProps {
  initialValues?: NewsPayload
  submitLabel: string
  isSubmitting?: boolean
  formError?: string | null
  successMessage?: string | null
  onSubmit: (payload: NewsPayload) => Promise<void>
}

interface FormErrors {
  title?: string
  content?: string
  author?: string
}

const defaultValues: NewsPayload = {
  title: '',
  content: '',
  author: '',
  imageUrl: '',
}

function NewsForm({
  initialValues,
  submitLabel,
  isSubmitting = false,
  formError,
  successMessage,
  onSubmit,
}: NewsFormProps) {
  const [values, setValues] = useState<NewsPayload>(initialValues ?? defaultValues)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function validate(nextValues: NewsPayload) {
    const nextErrors: FormErrors = {}

    if (!nextValues.title.trim()) {
      nextErrors.title = 'El titulo es obligatorio.'
    }

    if (!nextValues.content.trim()) {
      nextErrors.content = 'El contenido es obligatorio.'
    }

    if (!nextValues.author.trim()) {
      nextErrors.author = 'El autor es obligatorio.'
    }

    return nextErrors
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    await onSubmit({
      title: values.title,
      content: values.content,
      author: values.author,
      imageUrl: values.imageUrl?.trim() ? values.imageUrl : undefined,
    })
  }

  return (
    <form className="news-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span>Titulo</span>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Escribe el titular principal"
          />
          {errors.title ? <small className="field-error">{errors.title}</small> : null}
        </label>

        <label className="field">
          <span>Autor</span>
          <input
            name="author"
            value={values.author}
            onChange={handleChange}
            placeholder="Nombre del responsable"
          />
          {errors.author ? <small className="field-error">{errors.author}</small> : null}
        </label>
      </div>

      <label className="field">
        <span>URL de imagen</span>
        <input
          name="imageUrl"
          value={values.imageUrl ?? ''}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>

      <label className="field">
        <span>Contenido</span>
        <textarea
          name="content"
          value={values.content}
          onChange={handleChange}
          rows={8}
          placeholder="Redacta el contenido de la noticia"
        />
        {errors.content ? <small className="field-error">{errors.content}</small> : null}
      </label>

      {formError ? <p className="form-message error">{formError}</p> : null}
      {successMessage ? <p className="form-message success">{successMessage}</p> : null}

      <div className="form-actions">
        <button type="submit" className="button-link active" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default NewsForm
