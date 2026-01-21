import mongoose, { Schema, Document } from 'mongoose';

export interface IHistory extends Document {
  key_id?: string;
  username: string; // user_do
  action: string; // info
  createdAt: Date;
}

const HistorySchema = new Schema<IHistory>({
  key_id: { type: Schema.Types.ObjectId, ref: 'Key' },
  username: { type: String, required: true },
  action: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.History || mongoose.model<IHistory>('History', HistorySchema);
