"use client";
import React, { useEffect, useState } from 'react';
import { Plus, RefreshCw, Search, Copy, Check, Clock, Shield, DollarSign } from 'lucide-react';

interface KeyData {
    _id: string;
    game: string;
    user_key: string;
    duration: number;
    max_devices: number;
    devices: string[];
    status: number;
    price?: number;
    expired_date?: string;
    createdAt: string;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<KeyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [genForm, setGenForm] = useState({ game: 'PUBG', duration: '5', max_devices: '1', custom_days: '', custom_price: '' });
  const [genLoading, setGenLoading] = useState(false);
  
  // Extend Modal State
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<string|null>(null);
  const [extendDays, setExtendDays] = useState('');
  const [extendLoading, setExtendLoading] = useState(false);
  
  // Notification (Restored)
  const [notification, setNotification] = useState<{msg: string, type: 'success'|'error'}|null>(null);

  // Settings State
  const [config, setConfig] = useState<any>(null);

  const fetchKeys = () => {
    fetch('/api/keys')
      .then(res => res.json())
      .then(data => {
          if(data.keys) setKeys(data.keys);
          setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchSettings = () => {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
            if(data.success && data.config) {
                setConfig(data.config);
            }
        })
        .catch(err => console.error("Failed to load settings", err));
  };

  useEffect(() => {
    fetchKeys();
    fetchSettings();
  }, []);

  // Update price when duration changes
  useEffect(() => {
      if (!config || !config.prices) return;
      
      const duration = genForm.duration;
      let price = 0;

      // Mapping duration to config price keys
      const priceMap: {[key: string]: number} = {
          '5': config.prices.h5,
          '24': config.prices.d1,
          '168': config.prices.d7,
          '360': config.prices.d15,
          '720': config.prices.d30,
          '1440': config.prices.d60
      };

      if (priceMap[duration] !== undefined) {
          price = priceMap[duration];
          setGenForm(prev => ({ ...prev, custom_price: price.toString() }));
      } else if (duration === 'custom') {
          // Keep existing or reset? 
          // If custom days is entered, we don't have a default price per day logic yet.
          // Or we could implement it if config has 'per day' price. 
          // For now, let user enter it.
      }

  }, [genForm.duration, config]);

  const showNotify = (msg: string, type: 'success'|'error') => {
      setNotification({ msg, type });
      setTimeout(() => setNotification(null), 3000);
  };

  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      showNotify('Copied to clipboard', 'success');
  };

  const handleGenerate = async (e: React.FormEvent) => {
      e.preventDefault();
      setGenLoading(true);
      try {
          const res = await fetch('/api/keys/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  game: genForm.game,
                  duration: parseInt(genForm.duration),
                  max_devices: parseInt(genForm.max_devices),
                  custom_days: genForm.custom_days,
                  custom_price: genForm.custom_price
              })
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error);
          
          showNotify('Key generated successfully!', 'success');
          setShowModal(false);
          fetchKeys(); // Refresh list
      } catch (err: any) {
          showNotify(err.message, 'error');
      } finally {
          setGenLoading(false);
      }
  };

  const handleReset = async (id: string) => {
      if(!confirm('Are you sure you want to reset the HWID for this key?')) return;
      
      try {
          const res = await fetch(`/api/keys/${id}/reset`, { method: 'POST' });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error);
          
          showNotify('HWID Reset successfully', 'success');
          fetchKeys();
      } catch (err: any) {
          showNotify(err.message, 'error');
      }
  };

  const handleManage = async (id: string, action: 'block' | 'unblock') => {
      // Optimistic Update
      const newStatus = action === 'block' ? 0 : 1;
      setKeys(keys.map(k => k._id === id ? { ...k, status: newStatus } : k));

      try {
          const res = await fetch(`/api/keys/${id}/manage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action })
          });
          const data = await res.json();
          if(!res.ok) {
              fetchKeys(); // Revert on error
              throw new Error(data.error);
          }
          showNotify(action === 'block' ? 'Key Blocked' : 'Key Unblocked', 'success');
      } catch (err: any) {
          showNotify(err.message, 'error');
      }
  };

  const openExtendModal = (id: string) => {
      setSelectedKeyId(id);
      setExtendDays('');
      setShowExtendModal(true);
  };

  const handleExtend = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedKeyId || !extendDays) return;
      
      setExtendLoading(true);
      try {
          const res = await fetch(`/api/keys/${selectedKeyId}/manage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'extend', days: parseInt(extendDays) })
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error);
          
          showNotify('Key Extended successfully!', 'success');
          setShowExtendModal(false);
          fetchKeys();
      } catch (err: any) {
          showNotify(err.message, 'error');
      } finally {
          setExtendLoading(false);
      }
  };

  const filteredKeys = keys.filter(k => 
     k.user_key.toLowerCase().includes(searchTerm.toLowerCase()) || 
     k.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">License Keys</h2>
        <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
        >
            <Plus className="w-4 h-4" /> Generate Key
        </button>
      </div>

      {notification && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
              {notification.msg}
          </div>
      )}

      {/* Search Bar */}
      <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search keys..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
                      <tr>
                          <th className="px-6 py-4 font-medium">Key</th>
                          <th className="px-6 py-4 font-medium">Game</th>
                          <th className="px-6 py-4 font-medium">Expiry / Duration</th>
                          <th className="px-6 py-4 font-medium">HWID</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 text-gray-300">
                      {loading ? (
                          <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading keys...</td></tr>
                      ) : filteredKeys.length === 0 ? (
                          <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No keys found.</td></tr>
                      ) : (
                          filteredKeys.map((key) => (
                              <tr key={key._id} className="hover:bg-gray-700/30 transition-colors">
                                  <td className="px-6 py-4 font-mono text-white flex items-center gap-2">
                                      {key.user_key}
                                      <button onClick={() => copyToClipboard(key.user_key)} className="text-gray-500 hover:text-blue-400">
                                          <Copy className="w-4 h-4" />
                                      </button>
                                  </td>
                                  <td className="px-6 py-4">{key.game}</td>
                                  <td className="px-6 py-4">
                                      {key.expired_date ? (
                                          <div className="flex flex-col">
                                              <span className="text-white text-sm">
                                                  {new Date(key.expired_date).toLocaleString()}
                                              </span>
                                              <span className="text-xs text-green-400">Activated</span>
                                          </div>
                                      ) : (
                                          <span className="text-gray-400 flex items-center gap-2">
                                              <Clock className="w-4 h-4" />
                                              {key.duration < 24 ? `${key.duration} Hours` : `${Math.floor(key.duration/24)} Days`}
                                          </span>
                                      )}
                                  </td>
                                  <td className="px-6 py-4 font-mono text-xs text-gray-400 max-w-[150px] truncate" title={key.devices.join(', ')}>
                                      {key.devices.length > 0 ? (
                                          <span className="text-blue-300">{key.devices[0]} {key.devices.length > 1 && `(+${key.devices.length - 1})`}</span>
                                      ) : (
                                          <span className="text-gray-600">No HWID</span>
                                      )}
                                  </td>
                                  <td className="px-6 py-4">
                                      {key.status === 1 ? (
                                          <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium border border-green-500/20">Active</span>
                                      ) : (
                                          <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-medium border border-red-500/20">Blocked</span>
                                      )}
                                  </td>
                                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                      {/* Block/Unblock */}
                                      {key.status === 1 ? (
                                          <button 
                                            onClick={() => handleManage(key._id, 'block')}
                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded text-xs font-medium transition-colors border border-red-500/20 hover:border-red-500/40"
                                          >
                                            Block
                                          </button>
                                      ) : (
                                          <button 
                                            onClick={() => handleManage(key._id, 'unblock')}
                                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-1.5 rounded text-xs font-medium transition-colors border border-green-500/20 hover:border-green-500/40"
                                          >
                                            Unblock
                                          </button>
                                      )}

                                      {/* Extend */}
                                      <button 
                                        onClick={() => openExtendModal(key._id)}
                                        className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded text-xs font-medium transition-colors border border-blue-500/20 hover:border-blue-500/40"
                                      >
                                        Extend
                                      </button>

                                      <button 
                                        onClick={() => handleReset(key._id)}
                                        className="text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-600 p-1.5 rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
                                        title="Reset HWID"
                                      >
                                          <RefreshCw className="w-4 h-4" />
                                      </button>
                                  </td>
                              </tr>
                          ))
                      )}
                  </tbody>
              </table>
          </div>
      </div>

      {/* Generate Key Modal */}
      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">Generate New Key</h3>
                      <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">&times;</button>
                  </div>
                  <form onSubmit={handleGenerate} className="p-6 space-y-4">
                      {/* Grid for compact layout */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Game</label>
                            <select 
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                value={genForm.game}
                                onChange={e => setGenForm({...genForm, game: e.target.value})}
                            >
                                <option value="PUBG">PUBG Mobile</option>
                                <option value="CODM">Call of Duty Mobile</option>
                                <option value="APEX">Apex Legends</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
                            <select 
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                value={genForm.duration}
                                onChange={e => setGenForm({...genForm, duration: e.target.value, custom_days: ''})}
                            >
                                <option value="5">5 Hours</option>
                                <option value="24">1 Day</option>
                                <option value="168">7 Days</option>
                                <option value="360">15 Days</option>
                                <option value="720">30 Days</option>
                                <option value="1440">60 Days</option>
                                <option value="custom">Custom Days</option>
                            </select>
                        </div>

                        {genForm.duration === 'custom' && (
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Days</label>
                                <input 
                                   type="number"
                                   min="1"
                                   className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                   value={genForm.custom_days}
                                   onChange={e => setGenForm({...genForm, custom_days: e.target.value})}
                                   placeholder="e.g 3"
                                />
                             </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Max Devices</label>
                            <input 
                               type="number"
                               min="1"
                               max="10"
                               className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                               value={genForm.max_devices}
                               onChange={e => setGenForm({...genForm, max_devices: e.target.value})}
                            />
                        </div>

                        <div className="col-span-2">
                             <label className="block text-sm font-medium text-gray-400 mb-1">Price (Balance Deduction)</label>
                             <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input 
                                   type="number"
                                   min="0"
                                   className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                   value={genForm.custom_price}
                                   onChange={e => setGenForm({...genForm, custom_price: e.target.value})}
                                   placeholder="0.00"
                                />
                             </div>
                             <p className="text-xs text-gray-500 mt-1">Amount to deduct from your balance.</p>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                          <button 
                            type="button" 
                            onClick={() => setShowModal(false)}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                            type="submit" 
                            disabled={genLoading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                          >
                              {genLoading ? 'Processing...' : 'Generate Key'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Extend Key Modal */}
      {showExtendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">Extend Key Duration</h3>
                      <button onClick={() => setShowExtendModal(false)} className="text-gray-400 hover:text-white">&times;</button>
                  </div>
                  <form onSubmit={handleExtend} className="p-6 space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Add Days</label>
                          <input 
                             type="number"
                             min="1"
                             className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                             value={extendDays}
                             onChange={e => setExtendDays(e.target.value)}
                             placeholder="e.g. 7"
                             required
                          />
                          <p className="text-xs text-gray-500 mt-2">
                              Adding days will extend the current expiry date (if activated) or increase the total duration (if inactive).
                          </p>
                      </div>

                      <div className="pt-4 flex gap-3">
                          <button 
                            type="button" 
                            onClick={() => setShowExtendModal(false)}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                            type="submit" 
                            disabled={extendLoading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                          >
                              {extendLoading ? 'Processing...' : 'Extend'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
}
