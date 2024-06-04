
import { Request, Response } from 'express';
import { HistoryModel } from '../models/history.model';

/**
 * The `saveHistory` function  saves user history data for a specific media item with for a user
 */
export const saveMediaHistory = async (req: Request, res: Response) => {
  const { mediaId, timestamp, userId } = req.body;

  try {

    if (!mediaId || !timestamp || !userId) {
      return res.status(400).send('Please supply required data');
    }

    let history = await HistoryModel.findOne({ userId, mediaId });

    if (history) {
      history.timestamp = timestamp;
    } else {
      history = new HistoryModel({ userId, mediaId, timestamp });
    }

    await history.save();

    res.send({ status: 'success', message: "history saved", data: history });
  } catch (err) {
    console.error((err as any).message);
    res.status(500).send('Server error');
  }
};


/**
 * The function `getMediaHistory` retrieves the viewing history of a specific media item for a given
 * user.
 */
export const getMediaHistory = async (req: Request, res: Response) => {
  const { mediaId, userId } = req.params;

  try {

    if (!mediaId || !userId) {
      return res.status(400).send('Please supply required data');
    }

    let history = await HistoryModel.findOne({ userId, mediaId });

    if (!history) {
      return res.status(400).send('History not found');
    }

    res.status(200).json({ status: 'success', data: history });
  } catch (err) {
    console.error((err as any).message);
    res.status(500).send('Server error');
  }
};
