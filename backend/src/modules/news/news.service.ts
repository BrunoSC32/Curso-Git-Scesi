import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { News } from './news.types';

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

export async function createNews(
  title: string,
  content: string | undefined,
  author: string,
  imageUrl?: string,
): Promise<News> {
  const news = await getAllNews();
  const newNews: News = {
    id: uuidv4(),
    title,
    content,
    author,
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
): Promise<News | null> {
  const news = await getAllNews();
  const index = news.findIndex((n) => n.id === id);

  if (index === -1) return null;

  const updated: News = {
    ...news[index],
    title,
    content,
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
