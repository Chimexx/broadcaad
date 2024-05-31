
import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    if (!username && !password) {
      return res.status(400).json({ msg: 'Credentials missing' });
    }

    let user = await UserModel.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    res.json({ username: user.username, id: user._id });

  } catch (err) {
    console.error((err as any).message);
    res.status(500).send('Server error');
  }
};
