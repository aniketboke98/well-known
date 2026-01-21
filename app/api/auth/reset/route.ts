import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Reset Logic
    let resetTime = parseInt(user.loginResetTime || "0");
    
    if (resetTime > 0) {
        resetTime--;
        user.loginResetTime = resetTime.toString();
        user.loginDevices = ''; // Clear device lock
        user.webSessionDevice = ''; // Clear web session lock
        await user.save();
        
        return NextResponse.json({ 
            message: 'Reset successful', 
            remainingResets: resetTime 
        });
    } else {
        return NextResponse.json({ error: 'Reset limit reached' }, { status: 403 });
    }

  } catch (error) {
    console.error('Reset API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
