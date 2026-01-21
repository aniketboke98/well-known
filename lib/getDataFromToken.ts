import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use';

export function getDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || '';
        if (!token) return null;
        
        const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, username: string, role: string };
        return decodedToken;
    } catch (error) {
        return null;
    }
}
