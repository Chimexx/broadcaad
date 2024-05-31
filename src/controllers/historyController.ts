
import { Request, Response } from 'express';
// import History from '../models/History';

interface AuthRequest extends Request {
  user?: any;
}

export const saveHistory = async (req: AuthRequest, res: Response) => {
  const { mediaId, currentTime } = req.body;
  try {
    // let history = await History.findOne({ userId: req.user.id, mediaId });
    // if (history) {
    //   history.currentTime = currentTime;
    // } else {
    //   history = new History({ userId: req.user.id, mediaId, currentTime });
    // }
    // await history.save();
    res.json(history);
  } catch (err) {
    console.error((err as any).message);
    res.status(500).send('Server error');
  }
};

export const getHistory = async (req: AuthRequest, res: Response) => {
  const { mediaId } = req.params;
  try {
    // const history = await History.findOne({ userId: req.user.id, mediaId });
    res.json(history);
  } catch (err) {
    console.error((err as any).message);
    res.status(500).send('Server error');
  }
};
