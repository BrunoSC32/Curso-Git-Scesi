import { Router } from 'express';
import { getFiltered, getPaginated, getByStatus, getStats, getById, create, update, remove } from './news.controller';
import { upload } from '../shared/upload';

const router = Router();

// GET /news                        → all news (supports ?title=&author= filters)
router.get('/', getFiltered);

// GET /news/stats                  → summary statistics
router.get('/stats', getStats);

// GET /news/paginated?page=1&limit=5
router.get('/paginated', getPaginated);

// GET /news/status/draft           → only draft news
// GET /news/status/published       → only published news
router.get('/status/:status', getByStatus);

// GET /news/:id
router.get('/:id', getById);

// POST /news
router.post('/', upload.single('image'), create);

// PATCH /news/:id
router.patch('/:id', upload.single('image'), update);

// DELETE /news/:id
router.delete('/:id', remove);

export default router;
