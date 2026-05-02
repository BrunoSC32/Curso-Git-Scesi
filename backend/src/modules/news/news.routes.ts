import { Router } from 'express';
import { getFiltered, getPaginated, getByStatus, getById, create, update, remove } from './news.controller';
import { upload } from '../shared/upload';

const router = Router();

// GET /news                        → all news (supports ?title=&author= filters)
// GET /news?title=xx               → search by title
// GET /news?author=xx              → filter by author
// GET /news?title=xx&author=xx     → combined filter
router.get('/', getFiltered);

// GET /news/paginated?page=1&limit=5 → paginated results
router.get('/paginated', getPaginated);

// GET /news/status/draft           → only draft news
// GET /news/status/published       → only published news
router.get('/status/:status', getByStatus);

// GET /news/:id                    → single news item
router.get('/:id', getById);

// POST /news                       → create (supports image upload)
router.post('/', upload.single('image'), create);

// PATCH /news/:id                  → update (supports image upload)
router.patch('/:id', upload.single('image'), update);

// DELETE /news/:id                 → delete
router.delete('/:id', remove);

export default router;
