"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Key, LogOut, Settings, Menu, X, Users, Gift, DollarSign } from 'lucide-react';
import clsx from 'clsx';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
      fetch('/api/user/me')
        .then(res => res.json())
        .then(data => {
            if (data.user && data.user.role) {
                setRole(data.user.role);
            }
        })
        .catch(err => console.error("Layout auth check failed", err));
  }, []);

  async function handleLogout() {
     await fetch('/api/auth/logout', { method: 'POST' });
     router.push('/login');
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Keys', href: '/dashboard/keys', icon: Key },
    // Only show Users and Referrals for Owner/Admin
    ...(role === 'owner' || role === 'admin' ? [
        { name: 'Users', href: '/dashboard/users', icon: Users },
        { name: 'Referrals', href: '/dashboard/referrals', icon: Gift },
    ] : []),
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
    // Show Redeem for everyone, or specifically resellers? User implied Resellers use it.
    // It's useful for everyone to test.
    { name: 'Redeem Balance', href: '/dashboard/redeem', icon: DollarSign },
    ...(role === 'owner' || role === 'admin' ? [
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px]"></div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50 flex items-center justify-between px-4">
          <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">WELCOME</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400 hover:text-white">
              {isSidebarOpen ? <X /> : <Menu />}
          </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
      )}

      {/* Sidebar */}
      <aside className={clsx(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900/90 backdrop-blur-xl lg:bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 hidden lg:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            WELCOME
          </h1>
        </div>
        
        <div className="p-6 lg:hidden mt-16">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Menu</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                pathname === item.href 
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/10 text-blue-400 border border-blue-500/10 shadow-lg shadow-blue-500/5" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={clsx("w-5 h-5", pathname === item.href ? "text-blue-400" : "text-gray-500 group-hover:text-white")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg w-full transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-300" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto z-10">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
