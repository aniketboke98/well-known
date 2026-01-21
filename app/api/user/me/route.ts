import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function GET(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(userData.userId).select('-password');
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
}
