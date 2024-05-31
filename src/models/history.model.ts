import { IHistory } from '../interfaces/history.interface';
import mongoose, { Schema } from 'mongoose';

const HistorySchema = new mongoose.Schema<IHistory>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mediaId: { type: String, required: true },
  currentTime: { type: Number, default: 0 },
});

export const HistoryModel = mongoose.model<IHistory>('History', HistorySchema);
