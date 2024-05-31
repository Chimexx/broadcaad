import { Schema } from "mongoose";

export interface IHistory extends Document {
  userId: Schema.Types.ObjectId;
  mediaId: string;
  currentTime: number;
}