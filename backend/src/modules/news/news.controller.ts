import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews, } from './news.service';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const news = await getAllNews();
  res.json(news);
}

