import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Key from '@/models/Key';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const userData = getDataFromToken(req);
    
    // Check Auth
    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { action, days } = body; // action: 'block', 'unblock', 'extend'
        const { id } = await params;

        // 1. Fetch Key (Restricted by Role)
        const key = await Key.findById(id);
        if (!key) {
             return NextResponse.json({ error: 'Key not found' }, { status: 404 });
        }

        // 2. Permission Check
        if (userData.role === 'reseller') {
            // Reseller can only manage their own keys
            if (key.registrator !== userData.username) {
                 return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
            }
        }
        // Admins/Owners can manage any key (or restricted hierarchy if needed, but standard is Admin manages all below)
        // For strict hierarchy: if (userData.role === 'admin' && key.registrator !== userData.username && /* check downline */) ...
        // For now, assuming Admin access is broad or they only see their keys anyway.

        // 3. Handle Actions
        if (action === 'block') {
            key.status = 0;
            await key.save();
            return NextResponse.json({ success: true, message: 'Key Blocked', key });
        }
        else if (action === 'unblock') {
            key.status = 1;
            await key.save();
            return NextResponse.json({ success: true, message: 'Key Unblocked', key });
        }
        else if (action === 'extend') {
            if (!days || isNaN(days) || days <= 0) {
                 return NextResponse.json({ error: 'Invalid days provided' }, { status: 400 });
            }

            // Calculation
            if (key.expired_date) {
                // Already Activated: Add days to expired_date
                const currentExpiry = new Date(key.expired_date);
                // If expired, should we add to NOW or to old expiry? 
                // Usually "Extend" implies adding to the end. But if it ended a month ago?
                // Standard logic: Add to existing expiry. If it was past, it becomes less past or future.
                // User requirement: "set keys in extent key by days"
                // Let's add to current expiry to be safe.
                
                // However, if key is EXPIRED, adding 1 day to a date from 2023 won't help. 
                // If key is expired, maybe reset to NOW + days? Or just add.
                // Let's just add for now.
                
                const extensionMs = days * 24 * 60 * 60 * 1000;
                key.expired_date = new Date(currentExpiry.getTime() + extensionMs);
            } else {
                // Not Activated: Add hours to duration
                key.duration = (key.duration || 0) + (days * 24);
            }
            
            await key.save();
            return NextResponse.json({ success: true, message: `Key Extended by ${days} days`, key });
        }
        else {
             return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
