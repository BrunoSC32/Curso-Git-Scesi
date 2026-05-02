import { Link } from 'react-router-dom'
import type { News } from '../types/news'
import { formatDate } from '../utils/formatDate'

interface NewsCardProps {
  news: News
  onDelete: (id: string) => void
}

function NewsCard({ news, onDelete }: NewsCardProps) {
  return (
    <article className="news-card">
      {news.imageUrl ? (
        <img className="news-card-image" src={news.imageUrl} alt={news.title} />
      ) : (
        <div className="news-card-image placeholder" aria-hidden="true">
          Sin imagen
        </div>
      )}

      <div className="news-card-body">
        <div className="news-card-meta">
          <span>{news.author}</span>
          <span>{formatDate(news.updatedAt)}</span>
        </div>

        <div className="news-card-copy">
          <h2>{news.title}</h2>
          <p>{news.content ?? ''}</p>
        </div>

        <div className="news-card-actions">
          <Link className="nav-link" to={`/news/${news.id}/edit`}>
            Editar
          </Link>
          <button type="button" className="danger-button" onClick={() => onDelete(news.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
