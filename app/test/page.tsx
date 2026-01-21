"use client";

import { useState } from 'react';

export default function TestPage() {
  const [mode, setMode] = useState<'key' | 'user'>('key');
  const [formData, setFormData] = useState({
    game: 'PUBG',
    user_key: '',
    serial: 'TEST-HWID-123',
    admin_username: '',
    username: '',
    password: ''
  });
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const data = new FormData();
      
      // Only append fields relevant to the current mode
      if (mode === 'key') {
        data.append('game', formData.game);
        data.append('user_key', formData.user_key);
        data.append('serial', formData.serial);
        if (formData.admin_username) data.append('admin_username', formData.admin_username);
      } else {
        data.append('username', formData.username);
        data.append('password', formData.password);
        data.append('serial', formData.serial); // Login also uses serial for HWID lock
        if (formData.admin_username) data.append('admin_username', formData.admin_username);
      }

      const res = await fetch('/api/connect', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setResponse({ error: 'Request Failed', details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">API Connection Tester</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          
          <div className="flex space-x-4 mb-6 border-b border-gray-700">
            <button
              onClick={() => { setMode('key'); setResponse(null); }}
              className={`py-2 px-4 font-medium transition-colors border-b-2 ${mode === 'key' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Key Validation
            </button>
            <button
              onClick={() => { setMode('user'); setResponse(null); }}
              className={`py-2 px-4 font-medium transition-colors border-b-2 ${mode === 'user' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              User Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'key' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-400">Game Name</label>
                    <input
                      type="text"
                      name="game"
                      value={formData.game}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-purple-500 outline-none"
                      placeholder="e.g. PUBG"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-400">Admin Username</label>
                    <input
                      type="text"
                      name="admin_username"
                      value={formData.admin_username}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-purple-500 outline-none"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-400">License Key</label>
                  <input
                    type="text"
                    name="user_key"
                    value={formData.user_key}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-purple-500 outline-none"
                    placeholder="Enter License Key"
                  />
                </div>
              </>
            )}

            {mode === 'user' && (
               <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm focus:border-purple-500 outline-none"
                  placeholder="Username"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm focus:border-purple-500 outline-none"
                  placeholder="Password"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-400">Device Serial (HWID)</label>
              <input
                type="text"
                name="serial"
                value={formData.serial}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-purple-500 outline-none"
                placeholder="Mock HWID"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Testing...' : (mode === 'key' ? 'Validate Key' : 'Login User')}
            </button>
          </form>
        </div>

        {response && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-hidden">
            <h2 className="text-xl font-bold mb-4 text-gray-300">API Response</h2>
            <pre className="bg-black p-4 rounded text-green-400 text-sm overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
            
            {response.status === false && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded">
                <strong>Error:</strong> {response.reason || response.error || 'Unknown Error'}
              </div>
            )}
             {response.status === true && (
              <div className="mt-4 p-4 bg-green-900/50 border border-green-700 text-green-200 rounded">
                <strong>Success!</strong> Token: {response.data?.token?.substring(0, 10)}...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
