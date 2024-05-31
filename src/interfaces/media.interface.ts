import { Schema } from "mongoose";

export interface IMedia {
  userId: Schema.Types.ObjectId;
  url: string;
  format: string;
  publicId: string;
  playbackUrl: string;
  duration: number;
  fileSize: number;
}
