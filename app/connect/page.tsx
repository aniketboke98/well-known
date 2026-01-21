"use client";
import React, { useEffect, useState } from 'react';
import { Server, Wifi, Shield, Code } from 'lucide-react';
import Link from 'next/link';

export default function ConnectPage() {
  const [status, setStatus] = useState<string>('Checking...');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetch('/api/connect')
      .then(res => res.json())
      .then(data => {
        if (data.status) {
            setStatus('Online');
            setIsOnline(true);
        } else {
            setStatus('Maintenance');
            setIsOnline(false);
        }
      })
      .catch(() => {
          setStatus('Offline');
          setIsOnline(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
            
            <div className="mx-auto w-24 h-24 bg-gray-900/80 backdrop-blur-md rounded-3xl border border-gray-800 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <Server className={`w-12 h-12 ${isOnline ? 'text-green-500' : 'text-red-500'}`} />
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    App Connection Server
                </h1>
                <p className="text-gray-400 text-lg">
                    Status: <span className={`font-mono font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>{status}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Code className="w-5 h-5 text-blue-500"/> Developer Info</h3>
                    <p className="text-sm text-gray-400 mb-2">Use this endpoint in your application:</p>
                    <code className="block bg-black/40 p-3 rounded-lg text-blue-300 font-mono text-sm mb-2 break-all">
                        {typeof window !== 'undefined' ? window.location.origin : ''}/api/connect
                    </code>
                    <p className="text-xs text-gray-500">Method: POST | Format: Form-Data</p>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-purple-500"/> Security</h3>
                    <p className="text-sm text-gray-400">
                        This server uses secure token-based authentication. Ensure your application includes the valid static words and correct parameter order.
                    </p>
                </div>
            </div>

            <div className="pt-8">
                <Link href="/login" className="text-gray-500 hover:text-white transition-colors">
                    Go to Dashboard
                </Link>
            </div>

        </div>
    </div>
  );
}
