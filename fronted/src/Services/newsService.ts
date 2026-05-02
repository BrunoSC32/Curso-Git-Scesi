import type { News, NewsPayload } from '../types/news'
import { httpRequest } from './http'

interface BackendNews {
  id: string
  title: string
  content?: string
  author: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
  status?: string
}

function normalizePayload(payload: NewsPayload) {
  return {
    title: payload.title.trim(),
    content: payload.content.trim(),
    author: payload.author.trim(),
    imageUrl: payload.imageUrl?.trim() ? payload.imageUrl.trim() : undefined,
  }
}

function mapNews(news: BackendNews): News {
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    author: news.author,
    imageUrl: news.imageUrl,
    createdAt: news.createdAt,
    updatedAt: news.updatedAt,
  }
}

export async function getNewsList(): Promise<News[]> {
  const newsList = await httpRequest<BackendNews[]>('/news')
  return newsList.map(mapNews)
}

export async function getNewsById(id: string): Promise<News | null> {
  try {
    const news = await httpRequest<BackendNews>(`/news/${id}`)
    return mapNews(news)
  } catch (error) {
    if (error instanceof Error && 'status' in error && error.status === 404) {
      return null
    }

    throw error
  }
}

export async function createNews(payload: NewsPayload): Promise<News> {
  const news = await httpRequest<BackendNews>('/news', {
    method: 'POST',
    body: normalizePayload(payload),
  })

  return mapNews(news)
}

export async function updateNews(id: string, payload: NewsPayload): Promise<News> {
  const news = await httpRequest<BackendNews>(`/news/${id}`, {
    method: 'PATCH',
    body: normalizePayload(payload),
  })

  return mapNews(news)
}

export async function deleteNews(id: string): Promise<void> {
  await httpRequest<{ message: string }>(`/news/${id}`, {
    method: 'DELETE',
  })
}
