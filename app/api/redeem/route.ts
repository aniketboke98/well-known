import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Referral from '@/models/Referral';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function POST(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 });
        }

        // Find the referral code
        // We verify it's not used by checking 'used_by' or 'status' (if defined in model).
        // Based on previous view, Referral model has `used_by?: string`.
        const referral = await Referral.findOne({ code: code });

        if (!referral) {
            return NextResponse.json({ error: 'Invalid code' }, { status: 404 });
        }

        if (referral.used_by) {
            return NextResponse.json({ error: 'Code already redeemed' }, { status: 400 });
        }

        // Fetch Creator (Admin/Owner)
        const creator = await User.findOne({ username: referral.created_by });
        if (!creator) {
            return NextResponse.json({ error: 'Code issuer not found' }, { status: 404 });
        }

        // Check & Deduct from Creator if Admin
        if (creator.role === 'admin') {
            if (creator.saldo < referral.set_saldo) {
                 return NextResponse.json({ error: 'Code issuer has insufficient funds. Contact Admin.' }, { status: 400 });
            }
            creator.saldo -= referral.set_saldo;
            await creator.save();
        }

        // Add balance to Redeemer (User)
        const user = await User.findById(userData.userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Prevent self-redeem? (Optional, but usually allowed for testing)
        // if (user.username === referral.created_by) ...

        user.saldo += referral.set_saldo;
        await user.save();

        // Mark referral as used
        referral.used_by = userData.username;
        await referral.save();

        return NextResponse.json({ 
            message: 'Code redeemed successfully', 
            amount: referral.set_saldo,
            newBalance: user.saldo 
        });

    } catch (error) {
        console.error("Redeem Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
