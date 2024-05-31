import mongoose, { Schema } from 'mongoose';
import { IMedia } from 'interfaces/media.interface';

const MediaSchema = new mongoose.Schema<IMedia>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  format: { type: String, required: true },
  publicId: { type: String, required: true },
  playbackUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  fileSize: { type: Number, required: true },
});

export const MediaModel = mongoose.model<IMedia>('Media', MediaSchema);
