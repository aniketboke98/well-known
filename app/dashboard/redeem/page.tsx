"use client";
import React, { useState } from 'react';
import { Gift, ArrowRight, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);
  const router = useRouter();

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!code) return;

    setLoading(true);
    setResult(null);

    try {
        const res = await fetch('/api/redeem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        const data = await res.json();
        
        if (res.ok) {
            setResult({ success: true, message: `Successfully added $${data.amount} to your balance!` });
            setCode('');
            // Refresh page/sidebar balance after delay? Or just show success. 
            // Layout might not auto-refresh balance unless we trigger it, but that's fine for now.
        } else {
            setResult({ success: false, message: data.error || 'Failed to redeem code' });
        }
    } catch (error) {
        setResult({ success: false, message: 'An error occurred' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
                    <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">Redeem Balance</h1>
                    <p className="text-sm text-gray-400">Enter your referral code below</p>
                </div>
            </div>

            <form onSubmit={handleRedeem} className="space-y-4">
                <div className="relative">
                    <input 
                        type="text" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Code (e.g. REF-XXXX)"
                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-4 pl-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-mono tracking-wide"
                    />
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>

                <button 
                    type="submit" 
                    disabled={loading || !code}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {loading ? 'Redeeming...' : <>Redeem Code <ArrowRight className="w-4 h-4" /></>}
                </button>
            </form>

            {result && (
                <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${result.success ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {result.success ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <p className="text-sm font-medium">{result.message}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
