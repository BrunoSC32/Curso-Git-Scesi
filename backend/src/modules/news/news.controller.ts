import { Request, Response } from 'express';
import {
  createNews,
  deleteNews,
  filterNewsByStatus,
  getFilteredNews,
  getNewsById,
  getNewsStats,
  getPaginatedNews,
  updateNews,
} from './news.service';
import { NewsStatus } from './news.types';

// GET /news?title=xxx&author=yyy
export async function getFiltered(req: Request, res: Response): Promise<void> {
  const title = req.query.title as string | undefined;
  const author = req.query.author as string | undefined;

  const news = await getFilteredNews(title, author);
  res.json(news);
}

// GET /news/paginated?page=1&limit=5
export async function getPaginated(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 5;

  if (page < 1 || limit < 1) {
    res.status(400).json({ error: 'page y limit deben ser mayores a 0' });
    return;
  }

  const result = await getPaginatedNews(page, limit);
  res.json(result);
}

// GET /news/status/:status  (draft | published)
export async function getByStatus(req: Request, res: Response): Promise<void> {
  const { status } = req.params;

  if (status !== 'draft' && status !== 'published') {
    res.status(400).json({ error: 'Status invalido. Use "draft" o "published"' });
    return;
  }

  const news = await filterNewsByStatus(status as NewsStatus);
  res.json(news);
}

// GET /news/stats
export async function getStats(_req: Request, res: Response): Promise<void> {
  const stats = await getNewsStats();
  res.json(stats);
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
  try {
    const { title, content, author, imageUrl, status } = req.body;

    if (!title || !author) {
      res.status(400).json({ error: 'El titulo y el autor son requeridos' });
      return;
    }

    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : imageUrl;
    const newNews = await createNews(title, content, author, finalImageUrl, status);
    res.status(201).json(newNews);
  } catch {
    res.status(500).json({ error: 'Error al crear la noticia' });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { title, content, author, imageUrl, status } = req.body;

  if (!title || !author) {
    res.status(400).json({ error: 'El titulo y el autor son requeridos' });
    return;
  }

  try {
    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : imageUrl;
    const updatedNews = await updateNews(
      String(id),
      title,
      content,
      author,
      finalImageUrl,
      status,
    );

    if (!updatedNews) {
      res.status(404).json({ error: 'Noticia no encontrada' });
      return;
    }

    res.json(updatedNews);
  } catch {
    res.status(500).json({ error: 'Error al actualizar la noticia' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const deletedNews = await deleteNews(String(id));

    if (!deletedNews) {
      res.status(404).json({ error: 'Noticia no encontrada' });
      return;
    }

    res.json({ message: 'Noticia eliminada correctamente', deletedNews });
  } catch {
    res.status(500).json({ error: 'Error al eliminar la noticia' });
  }
}
