"use client";
import React, { useEffect, useState } from 'react';
import { User, Shield, RefreshCw, Key, Calendar, Activity } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchUser = () => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
        const res = await fetch('/api/auth/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, password })
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error);
        
        setMessage(`Success! Remaining resets: ${data.remainingResets}`);
        setUser({ ...user, loginResetTime: data.remainingResets.toString(), loginDevices: '' });
        setPassword('');
    } catch (err: any) {
        setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-500">Loading profile data...</div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Profile Settings</h2>
        <p className="text-gray-400 mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Info */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800 p-6 flex flex-col items-center text-center shadow-xl">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px] mb-4 shadow-lg shadow-purple-500/20">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                         <User className="w-10 h-10 text-gray-200" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white">{user?.username}</h3>
                <span className="mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                    {user?.role || 'User'}
                </span>
                
                <div className="w-full mt-6 space-y-3">
                    <div className="flex justify-between items-center text-sm p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-500 flex items-center gap-2"><Activity className="w-4 h-4"/> Status</span>
                        <span className="text-green-400 font-medium">{user?.status ? 'Active' : 'Banned'}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4"/> Joined</span>
                        <span className="text-gray-300">{new Date(user?.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Security & Actions */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* HWID Reset Panel */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Shield className="w-40 h-40 text-purple-500" />
                </div>
                
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Key className="w-5 h-5 text-purple-500" /> Security Reset
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-lg">
                        Use this to reset your login device lock. This is required if you are logging in from a new computer or location.
                    </p>

                    <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Target Device Lock</span>
                            <span className="text-xs text-gray-500 font-mono bg-black/30 px-2 py-1 rounded">{user?.loginDevices || 'No lock active'}</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Remaining Resets</span>
                            <span className="text-white font-bold text-lg">{user?.loginResetTime}</span>
                        </div>
                    </div>

                    {message && (
                        <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                            <Shield className="w-4 h-4" /> {message}
                        </div>
                    )}
                    
                    {error && (
                        <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleReset} className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="password" 
                            placeholder="Enter your password to confirm" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={!password}
                            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                                password 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25' 
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <RefreshCw className={`w-4 h-4 ${password ? '' : ''}`} /> 
                            Reset Access
                        </button>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
