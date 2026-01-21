import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string; // bcrypt hash
  saldo: number;
  role: string; // 'owner' | 'admin' | 'reseller'
  uplink?: string;
  loginDevices?: string;
  loginResetTime?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  saldo: { type: Number, default: 0 },
  role: { type: String, enum: ['owner', 'admin', 'reseller'], default: 'reseller' },
  uplink: { type: String }, // Who created this user
  loginDevices: { type: String }, // For HWID lock on admin panel
  loginResetTime: { type: String, default: "3" }, // Reset chances
  status: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
