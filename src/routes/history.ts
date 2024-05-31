import { Router } from 'express';
import { saveHistory, getHistory } from '../controllers/historyController';

const router = Router();

router.post('/save', saveHistory);
router.get('/:mediaId', getHistory);

export default router;
