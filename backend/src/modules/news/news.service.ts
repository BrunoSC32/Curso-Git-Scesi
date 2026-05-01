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