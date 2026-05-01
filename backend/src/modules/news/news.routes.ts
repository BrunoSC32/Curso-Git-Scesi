import { Router } from 'express';
import { getAll, getById, create, update, remove } from './news.controller';
import { upload } from '../shared/upload';

const router = Router();

//  Obtener todas las noticias
router.get('/', getAll);

// Obtener una noticia por ID
router.get('/:id', getById);

// Crear una nueva noticia
router.post('/', upload.single('image'), create);

//  Actualizar una noticia
router.patch('/:id', upload.single('image'), update);

//  Eliminar una noticia
router.delete('/:id', remove);

export default router;
