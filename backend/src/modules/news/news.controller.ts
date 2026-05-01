import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews, } from './news.service';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const news = await getAllNews();
  res.json(news);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const news = await getNewsById(String(req.params.id));

  if (!news) {
    res.status(404).json({ error: 'Noticia no encontrada' });
    return;
  }

  res.json(news);
}

export async function create(req: Request, res: Response): Promise<void> {
 try{
  const { title, content, author, imageUrl } = req.body;

  if (!title || !author) {
    res.status(400).json({ error: 'El título y el autor son requeridos' });
    return;
  }
  
    const newNews = await createNews(title, content, author, imageUrl);
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la noticia' });
  }
}


