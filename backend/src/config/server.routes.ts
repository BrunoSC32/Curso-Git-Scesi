import { Request, Response, Router } from 'express';
import newsRoutes from '../modules/news/news.routes';
import authRoutes from '../modules/auth/auth.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// News routes
router.use('/news', newsRoutes);

router.use(/.*/,(req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default router;
