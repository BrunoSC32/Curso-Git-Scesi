import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description: string
  ctaLabel?: string
  ctaTo?: string
}

function EmptyState({ title, description, ctaLabel, ctaTo }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <p className="eyebrow">Sin contenido</p>
      <h2>{title}</h2>
      <p>{description}</p>
      {ctaLabel && ctaTo ? (
        <Link className="button-link active" to={ctaTo}>
          {ctaLabel}
        </Link>
      ) : null}
    </section>
  )
}

export default EmptyState
