import mongoose, { Schema, Document } from 'mongoose';

export interface IReferral extends Document {
  code: string;
  set_saldo: number;
  used_by?: string; // Username who used it
  created_by: string; // Username who created it
  createdAt: Date;
  updatedAt: Date;
}

const ReferralSchema = new Schema<IReferral>({
  code: { type: String, required: true, unique: true },
  set_saldo: { type: Number, default: 0 },
  used_by: { type: String },
  created_by: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema);
