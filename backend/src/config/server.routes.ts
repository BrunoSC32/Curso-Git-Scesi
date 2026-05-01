import { Request, Response, Router } from 'express';
import newsRoutes from '../modules/news/news.routes';

const router = Router();

// Rutas de noticias
router.use('/news', newsRoutes);

router.use(/.*/,(req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default router;
