import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Config from '@/models/Config';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function GET(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData || (userData.role !== 'owner' && userData.role !== 'admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let config = await Config.findOne();
        if (!config) {
            config = await Config.create({});
        }
        return NextResponse.json({ config });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    const userData = getDataFromToken(req);

    if (!userData || (userData.role !== 'owner' && userData.role !== 'admin')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        let config = await Config.findOne();
        
        if (!config) {
            config = new Config(body);
        } else {
            // Update fields
            if (body.prices) config.prices = { ...config.prices, ...body.prices };
            if (body.features) config.features = { ...config.features, ...body.features };
            if (body.online !== undefined) config.online = body.online;
            if (body.maintenanceMessage !== undefined) config.maintenanceMessage = body.maintenanceMessage;
        }

        await config.save();
        return NextResponse.json({ message: 'Configuration updated', config });

    } catch (error) {
        console.error("Config Update Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
