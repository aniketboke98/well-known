import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/getDataFromToken';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const userData = getDataFromToken(req);
    const { id } = await params;

    if (!userData || (userData.role !== 'owner' && userData.role !== 'admin')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { password, saldo, role, status } = await req.json();
        
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Access Control: Admin can only modify users they created
        if (userData.role === 'admin' && targetUser.uplink !== userData.username) {
             return NextResponse.json({ error: 'Forbidden: You can only manage your own users' }, { status: 403 });
        }

        // Apply Updates
        if (password) {
            targetUser.password = await bcrypt.hash(password, 10);
        }
        
        // Balance Update Restriction
        if (saldo !== undefined) {
             if (userData.role === 'admin') {
                 // Ignore or Error? Let's return error to be strict, or just ignore. 
                 // User requested "unable to edit", returning error makes it clear API is protected.
                 return NextResponse.json({ error: 'Admins cannot edit user balance directly' }, { status: 403 });
             }
             targetUser.saldo = saldo;
        }

        if (status !== undefined) targetUser.status = status;
        
        // Role Update Restriction
        if (role) {
            if (userData.role === 'admin' && (role === 'owner' || role === 'admin')) {
                return NextResponse.json({ error: 'Admins cannot promote to Admin/Owner' }, { status: 403 });
            }
            targetUser.role = role;
        }

        await targetUser.save();

        return NextResponse.json({ message: 'User updated successfully', user: targetUser });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const userData = getDataFromToken(req);
    const { id } = await params;

    if (!userData || (userData.role !== 'owner' && userData.role !== 'admin')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const targetUser = await User.findById(id);
        if (!targetUser) {
             return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (userData.role === 'admin' && targetUser.uplink !== userData.username) {
             return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: 'User deleted successfully' });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
