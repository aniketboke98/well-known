import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Key from '@/models/Key';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id: keyId } = await params;
        const key = await Key.findById(keyId);

        if (!key) {
            return NextResponse.json({ error: 'Key not found' }, { status: 404 });
        }

        // Access Control
        if ((userData.role !== 'owner' && userData.role !== 'admin') && key.registrator !== userData.username) {
             return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Logic from Keys.php: api_key_reset
        // Reset devices array
        key.devices = [];
        await key.save();

        return NextResponse.json({ message: 'Key HWID reset successfully', key });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
