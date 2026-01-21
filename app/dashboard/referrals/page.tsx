"use client";
import React, { useEffect, useState } from 'react';
import { Gift, Copy, Check, Plus, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReferralsPage() {
  const router = useRouter();
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saldo, setSaldo] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchReferrals = async () => {
    try {
        const res = await fetch('/api/referrals');
        const data = await res.json();
        if (data.referrals) setReferrals(data.referrals);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    // Role Protection
    fetch('/api/user/me').then(res => res.json()).then(data => {
        if (!data.user || (data.user.role !== 'owner' && data.user.role !== 'admin')) {
             router.push('/dashboard');
        } else {
             fetchReferrals();
        }
    }).catch(() => router.push('/login'));
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ set_saldo: saldo })
        });
        if (res.ok) {
            setIsModalOpen(false);
            setSaldo(0);
            fetchReferrals();
        } else {
            const data = await res.json();
            alert(data.error);
        }
    } catch (error) {
        alert('Error generating code');
    }
  };

  const copyToClipboard = (code: string, id: string) => {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <div className="text-gray-500 text-center mt-20">Loading referrals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white">Referral System</h1>
            <p className="text-gray-400">Generate and manage balance codes.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20 transition-all"
        >
            <Plus className="w-4 h-4" /> Generate Code
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {referrals.map((ref) => (
            <div key={ref._id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Gift className="w-16 h-16 text-purple-500" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                         <div>
                             <p className="text-sm text-gray-400">Balance Value</p>
                             <p className="text-2xl font-bold text-white flex items-center gap-1">
                                 <span className="text-green-400">$</span>{ref.set_saldo.toLocaleString()}
                             </p>
                         </div>
                         <div className={`px-2 py-1 rounded text-xs font-semibold ${ref.used_by ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                             {ref.used_by ? 'Redeemed' : 'Active'}
                         </div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 flex items-center justify-between border border-gray-700/50">
                        <code className="text-purple-300 font-mono tracking-wide">{ref.code}</code>
                        <button 
                            onClick={() => copyToClipboard(ref.code, ref._id)}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                        >
                            {copiedId === ref._id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <span>Created by: {ref.created_by}</span>
                        <span>{new Date(ref.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        ))}
        {referrals.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
                No referral codes found. Generate one to get started.
            </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Generate Code</h2>
                <form onSubmit={handleGenerate}>
                    <label className="block text-sm text-gray-400 mb-2">Balance Amount</label>
                    <div className="relative mb-6">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="number" 
                            required
                            min="1"
                            value={saldo}
                            onChange={(e) => setSaldo(Number(e.target.value))}
                            className="w-full bg-black/20 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-purple-500 outline-none"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                            Generate
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
