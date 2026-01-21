import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Referral from '@/models/Referral';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, password, referral } = await req.json();

    if (!username || !password || !referral) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    // Check referral
    const ref = await Referral.findOne({ code: referral });
    if (!ref) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 });
    }

    if (ref.used_by) {
      return NextResponse.json({ error: 'Referral code already used' }, { status: 400 });
    }

    // Create User
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      saldo: ref.set_saldo || 0,
      uplink: ref.created_by,
      loginDevices: '', // Initial empty
      loginResetTime: '3'
    });

    // Update Referral
    ref.used_by = username;
    await ref.save();

    return NextResponse.json({ message: 'Registration successful', userId: newUser._id });

  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
