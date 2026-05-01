import { seedNews } from '../data/seedNews'
import type { News, NewsPayload } from '../types/news'

const STORAGE_KEY = 'news-admin-spa'

function cloneNewsList(newsList: News[]) {
  return newsList.map((item) => ({ ...item }))
}

function getStoredNews(): News[] {
  if (typeof window === 'undefined') {
    return cloneNewsList(seedNews)
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNews))
    return cloneNewsList(seedNews)
  }

  try {
    const parsed = JSON.parse(raw) as News[]
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid news payload')
    }
    return parsed
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNews))
    return cloneNewsList(seedNews)
  }
}

function saveStoredNews(newsList: News[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList))
}

function sortByDate(newsList: News[]) {
  return [...newsList].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

function buildNewsRecord(payload: NewsPayload): News {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: payload.title.trim(),
    content: payload.content.trim(),
    author: payload.author.trim(),
    imageUrl: payload.imageUrl?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  }
}

export async function getNewsList(): Promise<News[]> {
  return sortByDate(getStoredNews())
}

export async function getNewsById(id: string): Promise<News | null> {
  const newsList = getStoredNews()
  return newsList.find((item) => item.id === id) ?? null
}

export async function createNews(payload: NewsPayload): Promise<News> {
  const newsList = getStoredNews()
  const nextNews = buildNewsRecord(payload)
  const updated = sortByDate([nextNews, ...newsList])
  saveStoredNews(updated)
  return nextNews
}

export async function updateNews(id: string, payload: NewsPayload): Promise<News> {
  const newsList = getStoredNews()
  const existing = newsList.find((item) => item.id === id)

  if (!existing) {
    throw new Error('La noticia no existe.')
  }

  const updatedNews: News = {
    ...existing,
    title: payload.title.trim(),
    content: payload.content.trim(),
    author: payload.author.trim(),
    imageUrl: payload.imageUrl?.trim() || undefined,
    updatedAt: new Date().toISOString(),
  }

  const updatedList = sortByDate(
    newsList.map((item) => (item.id === id ? updatedNews : item)),
  )

  saveStoredNews(updatedList)
  return updatedNews
}

export async function deleteNews(id: string): Promise<void> {
  const newsList = getStoredNews()
  const filtered = newsList.filter((item) => item.id !== id)
  saveStoredNews(filtered)
}