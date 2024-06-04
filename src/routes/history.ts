import { Router } from 'express';
import { getMediaHistory, saveMediaHistory } from '../controllers/historyController';

const router = Router();

router.post('/save', saveMediaHistory);
router.get('/get-history/:userId/:mediaId', getMediaHistory);

export default router;
