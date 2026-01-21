import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Key from '@/models/Key';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function GET(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let keys;
        // Admin/Owner sees all, Reseller sees own
        // Hierarchy Logic for Keys
        if (userData.role === 'owner') {
            // Owner sees ALL keys
            keys = await Key.find({}).sort({ createdAt: -1 });
        } else if (userData.role === 'admin') {
            // Admin sees keys created by them OR by their downline
            // First, find all users created by this admin
            const downlineUsers = await import('@/models/User').then(mod => mod.default.find({ uplink: userData.username }).select('username'));
            const downlineUsernames = downlineUsers.map(u => u.username);
            // Include Admin's own username
            downlineUsernames.push(userData.username);
            
            keys = await Key.find({ registrator: { $in: downlineUsernames } }).sort({ createdAt: -1 });
        } else {
            // Reseller sees only their own keys
            keys = await Key.find({ registrator: userData.username }).sort({ createdAt: -1 });
        }

        return NextResponse.json({ keys });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
