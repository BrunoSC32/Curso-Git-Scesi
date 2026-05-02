import { Request, Response } from 'express';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews, getFilteredNews } from './news.service';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const news = await getAllNews();
  res.json(news);
}

// GET /news?title=xxx&author=yyy
export async function getFiltered(req: Request, res: Response): Promise<void> {
  const title = req.query.title as string | undefined;
  const author = req.query.author as string | undefined;

  const news = await getFilteredNews(title, author);
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
  try {
    const { title, content, author, imageUrl } = req.body;

    if (!title || !author) {
      res.status(400).json({ error: 'El título y el autor son requeridos' });
      return;
    }

    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    const newNews = await createNews(title, content, author, finalImageUrl);
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la noticia' });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;

  if (!title) {
    res.status(400).json({ error: 'El título es requerido' });
    return;
  }

  try {
    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    const updatedNews = await updateNews(String(id), title, content, finalImageUrl);

    if (!updatedNews) {
      res.status(404).json({ error: 'Noticia no encontrada' });
      return;
    }

    res.json(updatedNews);
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la noticia' });
  }
}
