import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { News, NewsStats, NewsStatus, PaginatedResult } from './news.types';

const DATA_DIR = path.join(process.cwd(), 'data');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');

export async function initializeNewsFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(NEWS_FILE);
  } catch {
    await fs.writeFile(NEWS_FILE, JSON.stringify([], null, 2));
  }
}

export async function getAllNews(): Promise<News[]> {
  try {
    const data = await fs.readFile(NEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getNewsById(id: string): Promise<News | null> {
  const news = await getAllNews();
  return news.find((n) => n.id === id) || null;
}

// Search news by title (case-insensitive partial match)
export async function searchNewsByTitle(title: string): Promise<News[]> {
  const news = await getAllNews();
  return news.filter((n) =>
    n.title.toLowerCase().includes(title.toLowerCase()),
  );
}

// Filter news by author (case-insensitive partial match)
export async function filterNewsByAuthor(author: string): Promise<News[]> {
  const news = await getAllNews();
  return news.filter((n) =>
    n.author.toLowerCase().includes(author.toLowerCase()),
  );
}

// Combined filter: supports title and/or author query params simultaneously
export async function getFilteredNews(
  title?: string,
  author?: string,
): Promise<News[]> {
  let news = await getAllNews();

  if (title) {
    news = news.filter((n) =>
      n.title.toLowerCase().includes(title.toLowerCase()),
    );
  }

  if (author) {
    news = news.filter((n) =>
      n.author.toLowerCase().includes(author.toLowerCase()),
    );
  }

  return news;
}

// Filter news by status: draft or published
export async function filterNewsByStatus(status: NewsStatus): Promise<News[]> {
  const news = await getAllNews();
  return news.filter((n) => n.status === status);
}

// Paginate news: returns a page of results with metadata
export async function getPaginatedNews(
  page: number = 1,
  limit: number = 5,
): Promise<PaginatedResult<News>> {
  const all = await getAllNews();
  const total = all.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (safePage - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

// Returns summary statistics of all news
export async function getNewsStats(): Promise<NewsStats> {
  const news = await getAllNews();

  const total = news.length;
  const published = news.filter((n) => n.status === 'published').length;
  const draft = news.filter((n) => n.status === 'draft').length;

  const authorCount: Record<string, number> = {};
  for (const n of news) {
    authorCount[n.author] = (authorCount[n.author] || 0) + 1;
  }

  const latest = news.length
    ? news.reduce((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? a : b,
      )
    : null;

  return {
    total,
    published,
    draft,
    authorCount,
    latestNewsTitle: latest ? latest.title : null,
  };
}

export async function createNews(
  title: string,
  content: string | undefined,
  author: string,
  imageUrl?: string,
  status: NewsStatus = 'draft',
): Promise<News> {
  const news = await getAllNews();
  const newNews: News = {
    id: uuidv4(),
    title,
    content,
    author,
    status,
    ...(imageUrl && { imageUrl }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  news.push(newNews);
  await fs.writeFile(NEWS_FILE, JSON.stringify(news, null, 2));
  return newNews;
}

export async function updateNews(
  id: string,
  title: string,
  content: string | undefined,
  imageUrl?: string | null,
  status?: NewsStatus,
): Promise<News | null> {
  const news = await getAllNews();
  const index = news.findIndex((n) => n.id === id);

  if (index === -1) return null;

  const updated: News = {
    ...news[index],
    title,
    content,
    ...(status && { status }),
    updatedAt: new Date().toISOString(),
  };

  if (imageUrl === null) {
    delete updated.imageUrl;
  } else if (imageUrl !== undefined) {
    updated.imageUrl = imageUrl;
  }

  news[index] = updated;
  await fs.writeFile(NEWS_FILE, JSON.stringify(news, null, 2));
  return news[index];
}

export async function deleteNews(id: string): Promise<News | null> {
  const news = await getAllNews();
  const newsItem = news.find((n) => n.id === id);

  if (!newsItem) return null;

  const filteredNews = news.filter((n) => n.id !== id);
  await fs.writeFile(NEWS_FILE, JSON.stringify(filteredNews, null, 2));
  return newsItem;
}
