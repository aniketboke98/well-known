import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Referral from '@/models/Referral';
import { getDataFromToken } from '@/lib/getDataFromToken';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let referrals;
        // Hierarchy Logic
        if (userData.role === 'owner') {
            // Owner sees ALL referrals
            referrals = await Referral.find({}).sort({ createdAt: -1 });
        } else if (userData.role === 'admin') {
            // Admin sees referrals they created
            referrals = await Referral.find({ created_by: userData.username }).sort({ createdAt: -1 });
        } else {
            // Resellers don't see this list usually, but if they redeemed one, maybe?
            // "admin can see his all referal code and after the owner can see all"
            // Implies Resellers don't see a list of generated codes.
            return NextResponse.json({ referrals: [] }); 
        }

        return NextResponse.json({ referrals });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData || (userData.role !== 'owner' && userData.role !== 'admin')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { code, set_saldo } = await req.json();

        // Validation
        if (!set_saldo || set_saldo <= 0) {
            return NextResponse.json({ error: 'Valid balance amount is required' }, { status: 400 });
        }
        
        // Fetch fresh user data to check balance
        const User = await import('@/models/User').then(mod => mod.default);
        const currentUser = await User.findById(userData.userId);

        if (!currentUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Admin Balance Deduction Logic
        // CHANGED: Deduction now happens at REDEMPTION users request.
        // We just check if they are valid, but don't deduct yet.
        
        /* 
        if (userData.role === 'admin') {
            if (currentUser.saldo < set_saldo) {
                return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
            }
            currentUser.saldo -= set_saldo;
            await currentUser.save();
        }
        */

        let finalCode = code;
        if (!finalCode) {
            finalCode = 'REF-' + crypto.randomBytes(4).toString('hex').toUpperCase();
        }

        const existing = await Referral.findOne({ code: finalCode });
        if (existing) {
            // Refund if code exists? Uncommon collision with random bytes, but checking first is good.
            // If we deducted, we should rollback. But we check collision after deduction here.
            // Better to check collision *before* deduction, but randomBytes is safe enough usually.
            // Let's check collision before deduction to be safe.
            // Collision check
            // if (userData.role === 'admin') {
                // Rollback removed
                // currentUser.saldo += set_saldo; 
                // await currentUser.save();
            // }
            return NextResponse.json({ error: 'Code already exists' }, { status: 400 });
        }

        const newReferral = await Referral.create({
            code: finalCode,
            set_saldo: Number(set_saldo),
            created_by: userData.username
        });

        return NextResponse.json({ message: 'Referral generated', referral: newReferral, newBalance: currentUser.saldo });

    } catch (error) {
        console.error("Referral Gen Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
