import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/getDataFromToken';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let users;
        // Hierarchy Logic
        if (userData.role === 'owner') {
            // Owner sees ALL users
            users = await User.find({}).select('-password').sort({ createdAt: -1 });
        } else if (userData.role === 'admin') {
            // Admin sees users they created (uplink)
            users = await User.find({ uplink: userData.username }).select('-password').sort({ createdAt: -1 });
        } else {
            // Reseller cannot list users
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json({ users });
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
        const { username, password, role, saldo } = await req.json();

        // Validation
        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        // Role Permission Check
        if (userData.role === 'admin' && role === 'owner') {
             return NextResponse.json({ error: 'Admins cannot create Owners' }, { status: 403 });
        }
        if (userData.role === 'admin' && role === 'admin') {
             return NextResponse.json({ error: 'Admins cannot create other Admins' }, { status: 403 });
             // Assuming Admin can only create Resellers. 
             // If Admin CAN create other Admins, remove this check. 
             // "admin can also manage his user his under" -> implies Resellers.
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Smart Prefixing Logic
        // "user must ontehration in his admin name and his reseller name"
        // If creator is Admin, prefix with "AdminName_"
        let finalUsername = username;
        if (userData.role === 'admin') {
            const prefix = `${userData.username}_`;
            if (!finalUsername.startsWith(prefix)) {
                finalUsername = `${prefix}${finalUsername}`;
            }
        }

        // Check again for prefixed username collision
        const collisionCheck = await User.findOne({ username: finalUsername });
        if (collisionCheck) {
            return NextResponse.json({ error: 'Username already exists (after prefixing)' }, { status: 400 });
        }

        const newUser = await User.create({
            username: finalUsername,
            password: hashedPassword,
            saldo: saldo || 0,
            role: role || 'reseller',
            uplink: userData.username, // Hierarchy tracking
            status: true
        });

        return NextResponse.json({ message: 'User created successfully', user: { username: newUser.username, role: newUser.role } });

    } catch (error) {
        console.error("Create User Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
