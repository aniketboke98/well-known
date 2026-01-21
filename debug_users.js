
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' }); // Try to load from .env.local

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  role: { type: String },
  uplink: { type: String }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function listUsers() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const users = await User.find({}, 'username role uplink');
    console.log('--- Users List ---');
    users.forEach(u => {
      console.log(`Username: ${u.username} | Role: ${u.role} | Uplink: ${u.uplink}`);
    });
    console.log('------------------');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

listUsers();
