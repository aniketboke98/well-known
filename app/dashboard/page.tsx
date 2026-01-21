"use client";
import React, { useEffect, useState } from 'react';
import { Wallet, Key, Users, ShieldCheck, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  const getRoleBadge = (role: string) => {
    switch(role) {
        case 'owner': return 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-orange-500/20';
        case 'admin': return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/20';
        case 'reseller': return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20';
        default: return 'bg-gray-700 text-gray-300';
    }
  };

  const roleName = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Unknown';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-gray-900 to-gray-900 border border-purple-500/20 shadow-2xl p-8">
         <div className="absolute top-0 right-0 p-4 opacity-50">
            <Zap className="w-32 h-32 text-purple-500/20" />
         </div>
         <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                Welcome back, {user?.username}!
            </h1>
            <p className="text-gray-400 max-w-xl text-lg">
                Your command center is ready. Manage keys, track performance, and oversee your operations with real-time data.
            </p>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Balance Card */}
        <div className="group bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all duration-300 shadow-xl hover:shadow-green-500/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Balance</p>
              <h3 className="text-3xl font-bold text-white tracking-tight">${user?.saldo?.toLocaleString() || '0'}</h3>
              <div className="mt-2 flex items-center text-xs text-green-400 bg-green-500/10 w-fit px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" /> +2.5% this week
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        {/* Account Role Card */}
        <div className="group bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Account Level</p>
              <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-bold shadow-lg ${getRoleBadge(user?.role)}`}>
                <ShieldCheck className="w-4 h-4 mr-1" />
                {roleName}
              </div>
              <p className="mt-3 text-xs text-gray-500">Access to {roleName} privileges granted.</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        {/* Quick Action Card */}
        <Link href="/dashboard/keys" className="group block">
            <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex items-center justify-between h-full">
                    <div>
                        <p className="text-purple-400 font-medium mb-1">Quick Action</p>
                        <h3 className="text-xl font-bold text-white mb-2">Manage License Keys</h3>
                        <div className="flex items-center text-sm text-gray-400 group-hover:text-purple-300 transition-colors">
                            View Dashboard <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="p-4 bg-purple-600 rounded-full shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                        <Key className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
        </Link>
      </div>

    </div>
  );
}
