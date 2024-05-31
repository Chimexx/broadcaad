import mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  _id: { type: String, required: false },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
