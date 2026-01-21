import Link from 'next/link';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Advanced License Management <br /> for Modern Resellers
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            WELCOME provides a secure, fast, and reliable platform for managing your software licenses. 
            Built for speed, designed for security.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/login"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/register"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full font-semibold transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
          <Shield className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
          <p className="text-gray-400">
            Enterprise-grade security with HWID locking and encrypted sessions to protect your account.
          </p>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
          <Zap className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Instant Generation</h3>
          <p className="text-gray-400">
            Generate license keys instantly. No delays, no waiting. Your customers get access immediately.
          </p>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
          <Lock className="w-12 h-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Device Management</h3>
          <p className="text-gray-400">
            Advanced device locking and management. Reset HWIDs with ease and control user access.
          </p>
        </div>
      </div>
    </div>
  );
}
