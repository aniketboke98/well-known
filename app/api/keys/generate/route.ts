import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Key from '@/models/Key';
import History from '@/models/History';
import Config from '@/models/Config';
import { getDataFromToken } from '@/lib/getDataFromToken';
import crypto from 'crypto';

function randomString(length: number) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData || (userData.role !== 'owner' && userData.role !== 'admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { game, duration, max_devices, custom_price, custom_days } = await req.json();
        
        // Duration Logic: Use custom_days (converted to hours) if provided, else use duration from select
        let finalDuration = duration;
        if (custom_days && Number(custom_days) > 0) {
            finalDuration = Number(custom_days) * 24;
        }

        // Validation
        if (!game || !finalDuration || !max_devices) {
             return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const user = await User.findById(userData.userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Price Logic
        // If Admin/Owner provides a custom price, use it. 
        // Admin: This amount is DEDUCTED from their balance.
        let price = Number(custom_price) || 0;

        if (userData.role === 'admin') {
            if (price > 0 && user.saldo < price) {
                return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
            }
            if (price > 0) {
                user.saldo -= price;
                await user.save();
            }
        }

        // Generate Key
        const channel = user.username;
        const license = randomString(4).toUpperCase();
        
        let daysStr = '';
        if (finalDuration % 24 === 0) {
            daysStr = (finalDuration / 24) + 'D';
        } else {
            daysStr = finalDuration + 'H';
        }

        const user_key = `${channel}-${daysStr}-${license}`;

        const newKey = await Key.create({
            game,
            user_key,
            duration: finalDuration,
            max_devices,
            devices: [],
            status: 1,
            registrator: user.username,
            price: price
        });

        // History
        await History.create({
            key_id: newKey._id,
            username: user.username,
            action: `${game}|${license}|${finalDuration}H|${max_devices}D|${price}$`
        });

        return NextResponse.json({ 
            message: 'Key generated successfully', 
            key: newKey,
            newBalance: user.saldo
        });

    } catch (error) {
        console.error('Generate Key API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
