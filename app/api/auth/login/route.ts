import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
// import { cookies } from 'next/headers'; // for session management if using cookies
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use';

function getDeviceFromUserAgent(userAgent: string) {
  // Legacy PHP Logic emulation:
  // $whatIWant = substr($user_agent, strpos($user_agent, "(") + 1);
  // $whatIWantx = substr($whatIWant, strpos($whatIWant, ")") + 1); ...
  // This seems to extract the OS/Platform info inside the first parenthesis.
  // We will simplify but try to capture the essence: Platform/OS.
  // Example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ... -> Macintosh; Intel Mac OS X 10_15_7
  
  const start = userAgent.indexOf('(');
  const end = userAgent.indexOf(')');
  if (start !== -1 && end !== -1 && end > start) {
      return userAgent.substring(start + 1, end).replace(/;/g, '-').replace(/\s/g, '');
  }
  return 'UnknownDevice';
}

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
    console.log("DEBUG LOGIN - User fetched:", JSON.stringify(user, null, 2));
    console.log("DEBUG LOGIN - User Role:", user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Device Lock Logic
    const userAgent = req.headers.get('user-agent') || '';
    const currentDevice = getDeviceFromUserAgent(userAgent);
    
    // Logic from Auth.php lines 113-140
    let savedDevice = user.webSessionDevice;
    
    // Check if we need to update device (First login or Reset)
    if (!savedDevice || savedDevice === 'RedZONERROR') {
        user.webSessionDevice = currentDevice;
        await user.save();
        savedDevice = currentDevice;
    }

    // Verify Device
    if (savedDevice !== currentDevice && savedDevice !== 'RedZONERROR') {
        return NextResponse.json({ error: 'Wrong device, please try again or reset HWID.' }, { status: 403 });
    }

    // Generate Token
    const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    const response = NextResponse.json({ message: 'Login successful', user: { username: user.username, role: user.role, saldo: user.saldo } });
    
    // Set HTTP-only cookie
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
