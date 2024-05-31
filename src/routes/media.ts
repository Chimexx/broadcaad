import { Router } from 'express';
import { uploadMedia, fetchMedia } from '../controllers/mediaController';

const router = Router();

router.post('/upload', uploadMedia);
router.get('/fetch/:mediaId', fetchMedia);

export default router;
