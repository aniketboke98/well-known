import mongoose, { Schema, Document } from 'mongoose';

export interface IKey extends Document {
  game: string;
  user_key: string; // The license key
  duration: number; // Hours
  max_devices: number;
  devices: string[]; // Array of serials
  status: number; // 1=Active, 0=Blocked
  registrator: string; // Creator username
  price: number;
  expired_date?: Date;
  first_activation_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const KeySchema = new Schema<IKey>({
  game: { type: String, required: true },
  user_key: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  max_devices: { type: Number, required: true },
  devices: { type: [String], default: [] },
  status: { type: Number, default: 1 },
  registrator: { type: String },
  price: { type: Number, default: 0 },
  expired_date: { type: Date },
  first_activation_date: { type: Date },
}, { timestamps: true });

export default mongoose.models.Key || mongoose.model<IKey>('Key', KeySchema);
