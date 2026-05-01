import express,{ Request, Response, Router } from 'express';



const router = Router();


router.use(/.*/,(req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default router;
