"use client";
import React, { useEffect, useState } from 'react';
import { Save, Settings as SettingsIcon, Server, DollarSign, Shield, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<any>({
    online: true,
    maintenanceMessage: '',
    prices: { h5: 1, d1: 2, d7: 7, d15: 12, d30: 20, d60: 35, currency: '$' },
    features: { esp: true, aimbot: true, bulletTrack: true, memory: true }
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => {
          if (res.status === 401 || res.status === 403) {
              router.push('/dashboard');
              return null;
          }
          return res.json();
      })
      .then(data => {
          if (data && data.config) {
              setConfig(data.config);
          }
          setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
      setSaving(true);
      try {
          const res = await fetch('/api/settings', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(config)
          });
          if (res.ok) {
              alert('Settings saved successfully!');
          } else {
              alert('Failed to save settings');
          }
      } catch (error) {
          alert('Error saving settings');
      } finally {
          setSaving(false);
      }
  };

  const updatePrice = (key: string, value: number) => {
      setConfig({ ...config, prices: { ...config.prices, [key]: value } });
  };

  const updateFeature = (key: string, value: boolean) => {
      setConfig({ ...config, features: { ...config.features, [key]: value } });
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <SettingsIcon className="w-8 h-8 text-blue-500" /> System Settings
            </h1>
            <p className="text-gray-400">Configure global prices, features, and server status.</p>
        </div>
        <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
        >
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Prices Config */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" /> Default Key Prices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                      { key: 'h5', label: '5 Hours' },
                      { key: 'd1', label: '1 Day' },
                      { key: 'd7', label: '7 Days' },
                      { key: 'd15', label: '15 Days' },
                      { key: 'd30', label: '30 Days' },
                      { key: 'd60', label: '60 Days' },
                  ].map((item) => (
                      <div key={item.key}>
                          <label className="block text-sm text-gray-400 mb-1">{item.label}</label>
                          <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{config.prices.currency}</span>
                              <input 
                                type="number" 
                                value={config.prices[item.key]}
                                onChange={(e) => updatePrice(item.key, Number(e.target.value))}
                                className="w-full bg-black/20 border border-gray-700 rounded-lg pl-8 pr-4 py-2 text-white outline-none focus:border-green-500"
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Server Status & Features */}
          <div className="space-y-6">
              {/* Server Status */}
              <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Server className="w-5 h-5 text-indigo-500" /> Server Status
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700/50">
                      <div>
                          <p className="text-white font-medium">Server Online</p>
                          <p className="text-sm text-gray-500">Toggle maintenance mode</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={config.online} onChange={(e) => setConfig({...config, online: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                  </div>

                  {!config.online && (
                      <div>
                          <label className="block text-sm text-gray-400 mb-2">Maintenance Message</label>
                          <input 
                            type="text" 
                            value={config.maintenanceMessage}
                            onChange={(e) => setConfig({...config, maintenanceMessage: e.target.value})}
                            className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                            placeholder="We are currently down for maintenance..."
                          />
                      </div>
                  )}
              </div>

            {/* Features Toggle */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" /> Cheat Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(config.features).map((feature) => (
                        <div key={feature} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg border border-gray-700/50">
                            <span className="text-sm text-gray-300 capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={config.features[feature]} 
                                    onChange={(e) => updateFeature(feature, e.target.checked)} 
                                    className="sr-only peer" 
                                />
                                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

          </div>
      </div>
    </div>
  );
}
