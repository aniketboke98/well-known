require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  saldo: { type: Number, default: 0 },
  role: { type: String, enum: ['owner', 'admin', 'reseller'], default: 'reseller' },
  status: { type: Boolean, default: true },
}, { timestamps: true });

// Force new model to ensure we read what's on disk
const User = mongoose.model('User_Check', UserSchema, 'users');

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const owner = await User.findOne({ username: 'SIDU' });
    console.log('SIDU User:', owner);

    if (owner && owner.role === 'owner') {
        console.log('SUCCESS: SIDU has role owner.');
    } else {
        console.log('FAILURE: SIDU does not have role owner.');
    }

  } catch (e) {
    console.error('Check Error:', e);
  } finally {
    await mongoose.connection.close();
  }
}

check();
