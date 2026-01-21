require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

const ReferralSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  set_saldo: { type: Number, default: 0 },
  used_by: { type: String },
  created_by: { type: String, required: true },
}, { timestamps: true });

const Referral = mongoose.models.Referral || mongoose.model('Referral', ReferralSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  saldo: { type: Number, default: 0 },
  role: { type: String, enum: ['owner', 'admin', 'reseller'], default: 'reseller' },
  status: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in .env.local');
    }
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Owner User
    const ownerName = 'SIDU';
    const owner = await User.findOne({ username: ownerName });
    if (owner) {
        console.log(`Owner ${ownerName} already exists.`);
        if (owner.role !== 'owner') {
             owner.role = 'owner';
             await owner.save();
             console.log(`Updated ${ownerName} role to owner.`);
        }
    } else {
        const hashedPassword = await bcrypt.hash('owner123', 10);
        await User.create({
            username: ownerName,
            password: hashedPassword,
            role: 'owner',
            saldo: 999999
        });
        console.log(`Owner ${ownerName} created with password 'owner123'.`);
    }

    // Existing Referral Logic
    const existing = await Referral.findOne({ code: 'ADMIN' });
    if (existing) {
      console.log('Referral code ADMIN already exists.');
    } else {
      await Referral.create({
        code: 'ADMIN',
        set_saldo: 999999,
        created_by: 'system'
      });
      console.log('Referral code ADMIN created with 999k balance.');
    }

  } catch (e) {
    console.error('Seed Error:', e);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
