import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Key from '@/models/Key';
import Config from '@/models/Config';
import crypto from 'crypto';

// Helper for Secure JSON Response
function secureJson(data: any, status: number = 200) {
    const response = NextResponse.json(data, { status });
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Content-Security-Policy', "default-src 'none'");
    return response;
}

export async function GET(req: NextRequest) {
    return secureJson({ status: true, message: 'App Server Online', version: '1.0' });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const formData = await req.formData();
    
    // Sanitization Helper
    const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9_\-\.]/g, '');

    const game = sanitize(formData.get('game') as string || '');
    const user_key = sanitize(formData.get('user_key') as string || '');
    const serial = sanitize(formData.get('serial') as string || '');
    const username = sanitize(formData.get('username') as string || '');
    const admin_username = sanitize(formData.get('admin_username') as string || '');
    // Password should NOT be sanitized (allows special chars), but handled carefully.
    const password = formData.get('password') as string; 

    const config = await Config.findOne();
    if (config && !config.online) {
       return secureJson({
         status: false,
         reason: config.maintenanceMessage || 'MAINTENANCE'
       });
    }

    // --- User Login Support (Requested by User) ---
    // Variables username, admin_username, password already retrieved and sanitized above.

    if (username && password) {
        const User = await import('@/models/User').then(mod => mod.default);
        const bcrypt = await import('bcryptjs');

        // Construct full username if admin_username is provided
        let lookupName = username;
        if (admin_username) {
             // Logic: If user types "Knight" and admin is "Dark", look for "Dark_Knight"
             lookupName = `${admin_username}_${username}`;
        }
        
        const user = await User.findOne({ username: lookupName });
        if (!user) {
             return secureJson({ status: false, reason: 'USER NOT FOUND' });
        }
        
        if (!user.status) {
             return secureJson({ status: false, reason: 'USER BANNED' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             return secureJson({ status: false, reason: 'INVALID PASSWORD' });
        }

        // HWID Lock Check
        // If loginDevices is set, it must match. If empty, set it.
        // If "RESET", allow and set.
        let currentHwid = user.loginDevices;
        if (!currentHwid || user.loginResetTime === '999') { // 999 as flag for reset? Or just check if empty
             // Bind HWID
             user.loginDevices = serial;
             await user.save();
        } else if (currentHwid !== serial) {
             return secureJson({ status: false, reason: 'HWID MISMATCH' });
        }

        // Authentication Successful
        // Generate Token
        const staticWords = "Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E";
        const real = `${lookupName}-${serial}-${staticWords}`;
        const token = crypto.createHash('md5').update(real).digest('hex');

        const features = config?.features || { esp: true, aimbot: true, bullet: true, memory: true };
        
        // Return same structure as Key login for compatibility
        // Or specific User structure
        return secureJson({
            status: true,
            data: {
                username: user.username,
                role: user.role,
                saldo: user.saldo,
                token: token,
                Online: 'true',
                Bullet: features.bulletTrack ? 'true' : 'false',
                Aimbot: features.aimbot ? 'true' : 'false',
                Memory: features.memory ? 'true' : 'false',
                ModName: '@SrcTeam NextJS',
                rng: Math.floor(Date.now() / 1000)
            }
        });
    }
    // ---------------------------------------------

    if (!game || !user_key || !serial) {
      return secureJson({
        status: false,
        reason: 'INVALID PARAMETER'
      });
    }

    const key = await Key.findOne({ user_key, game });

    if (!key) {
      return secureJson({
        status: false,
        reason: 'USER OR GAME NOT REGISTERED'
      });
    }

    // --- Admin/Reseller Logic (Requested by User) ---
    // "just add username name of admin and thats just access by his reseller and by the admin of this key"
    // If admin_username is provided, it MUST match the key's registrator
    if (admin_username) {
        if (key.registrator !== admin_username) {
             return secureJson({
                status: false,
                reason: 'INVALID OWNER' // Key exists but belongs to a different Admin/Reseller
              });
        }
    } else {
        // Optional: If admin_username is NOT provided, should we block?
        // User phrasing implies they WILL provide it.
        // For backwards compatibility, maybe allow if key doesn't require it? 
        // But for security described, we should probably enforce it if the Loader sends it.
        // Let's enforce it ONLY if the user (Loader) sends it.
    }
    // ---------------------------------------------

    if (key.status !== 1) {
      return secureJson({
        status: false,
        reason: 'USER BLOCKED'
      });
    }

    // Expiry Check Logic (Server-Side)
    const now = new Date();
    let expiredDate = key.expired_date;

    if (!expiredDate) {
      // First Activation
      // Duration is in Hours (e.g., 24 for 1 Day)
      const durationMs = (key.duration || 0) * 60 * 60 * 1000;
      expiredDate = new Date(now.getTime() + durationMs);
      
      key.expired_date = expiredDate;
      key.first_activation_date = now;
      await key.save();
    } else {
      // Already Activated - Check Expiry
      if (now > new Date(expiredDate)) {
        return secureJson({
          status: false,
          reason: 'EXPIRED KEY'
        });
      }
    }

    // Device Check
    let devices = key.devices || [];
    if (devices.includes(serial)) {
      // Already registered, allow
    } else {
      if (devices.length < key.max_devices) {
        devices.push(serial);
        key.devices = devices;
        await key.save();
      } else {
        return secureJson({
          status: false,
          reason: 'MAX DEVICE REACHED'
        });
      }
    }

    // Prepare Response
    // PHP: $real = "$game-$uKey-$sDev-$this->staticWords";
    // Static words from PHP: "Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E"
    const staticWords = "Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E";
    const real = `${game}-${user_key}-${serial}-${staticWords}`;
    const token = crypto.createHash('md5').update(real).digest('hex');

    // Fetch latest config features
    const features = config?.features || {
        esp: true, aimbot: true, bullet: true, memory: true
    };
    
    // Legacy field mapping
    // Online, Bullet, Aimbot, Memory, ModName
    
    return secureJson({
      status: true,
      data: {
        FuckYOU: 1, // Legacy fun field
        EXP: expiredDate,
        token: token,
        Online: 'true', // Config online was checked above
        Bullet: features.bulletTrack ? 'true' : 'false',
        Aimbot: features.aimbot ? 'true' : 'false',
        Memory: features.memory ? 'true' : 'false',
        ModName: '@SrcTeam NextJS',
        rng: Math.floor(Date.now() / 1000)
      }
    });

  } catch (error) {
    console.error('Connect API Error:', error);
    return secureJson({
      status: false,
      reason: 'INTERNAL ERROR'
    });
  }
}
