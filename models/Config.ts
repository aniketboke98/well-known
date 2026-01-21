import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
  online: boolean; // Server online status
  maintenanceUrl?: string;
  maintenanceMessage?: string;
  version: string;
  features: {
    esp: boolean;
    aimbot: boolean;
    bulletTrack: boolean;
    memory: boolean;
  };
  prices: {
    h5: number;
    d1: number;
    d7: number;
    d15: number;
    d30: number;
    d60: number;
    currency: string;
  }
}

const ConfigSchema = new Schema<IConfig>({
  online: { type: Boolean, default: true },
  maintenanceUrl: { type: String },
  maintenanceMessage: { type: String, default: "Maintenance Break" },
  version: { type: String, default: "1.0" },
  features: {
    esp: { type: Boolean, default: true },
    aimbot: { type: Boolean, default: true },
    bulletTrack: { type: Boolean, default: true },
    memory: { type: Boolean, default: true },
  },
  prices: {
    h5: { type: Number, default: 1 },
    d1: { type: Number, default: 2 },
    d7: { type: Number, default: 7 },
    d15: { type: Number, default: 12 },
    d30: { type: Number, default: 20 },
    d60: { type: Number, default: 35 },
    currency: { type: String, default: "$" },
  }
}, { timestamps: true });

// Singleton model usually, but we can query by ID or just use findOne
export default mongoose.models.Config || mongoose.model<IConfig>('Config', ConfigSchema);
