import { Router } from 'express';
import { getFiltered, getPaginated, getById, create, update, remove } from './news.controller';
import { upload } from '../shared/upload';

const router = Router();

// GET /news          → returns all news
// GET /news?title=xx → search by title
// GET /news?author=xx → filter by author
// GET /news?title=xx&author=xx → combined filter
router.get('/', getFiltered);

// GET /news/paginated?page=1&limit=5 → paginated results
router.get('/paginated', getPaginated);

// Get a single news item by ID
router.get('/:id', getById);

// Create a news item (supports image upload)
router.post('/', upload.single('image'), create);

// Update a news item (supports image upload)
router.patch('/:id', upload.single('image'), update);

// Delete a news item
router.delete('/:id', remove);

export default router;
