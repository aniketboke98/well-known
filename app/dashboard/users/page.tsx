"use client";
import React, { useEffect, useState } from 'react';
import { UserPlus, Search, MoreVertical, Shield, Ban, CheckCircle, Wallet, Edit2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter(); // Initialize router
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); // For edit
  const [currentUserRole, setCurrentUserRole] = useState<string>('');
  
  // Form States
  const [formData, setFormData] = useState({ username: '', password: '', role: 'reseller', saldo: 0 });
  
  const fetchUsers = async () => {
    try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (data.users) setUsers(data.users);
    } catch (error) {
        console.error("Failed to fetch users", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    // Role Protection & Role Fetching
    fetch('/api/user/me').then(res => res.json()).then(data => {
        if (!data.user || (data.user.role !== 'owner' && data.user.role !== 'admin')) {
             router.push('/dashboard');
        } else {
             setCurrentUserRole(data.user.role); // Store role
             
             // If Admin, ensure default form role is reseller
             if(data.user.role === 'admin') {
                 setFormData(prev => ({ ...prev, role: 'reseller' }));
             }
             
             fetchUsers();
        }
    }).catch(() => router.push('/login'));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setIsAddModalOpen(false);
            setFormData({ username: '', password: '', role: 'reseller', saldo: 0 });
            // Re-enforce reseller default if admin
            if (currentUserRole === 'admin') {
                 setFormData(prev => ({ ...prev, role: 'reseller' }));
            }
            fetchUsers();
            alert('User created successfully');
        } else {
            const data = await res.json();
            alert(data.error);
        }
    } catch (error) {
        alert('Error creating user');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch(`/api/users/${currentUser._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setIsEditModalOpen(false);
            setFormData({ username: '', password: '', role: 'reseller', saldo: 0 });
            if (currentUserRole === 'admin') {
                 setFormData(prev => ({ ...prev, role: 'reseller' }));
            }
            fetchUsers();
            alert('User updated successfully');
        } else {
            const data = await res.json();
            alert(data.error);
        }
    } catch (error) {
        alert('Error updating user');
    }
  };

  const handleDelete = async (userId: string) => {
      if(!confirm("Are you sure you want to delete this user?")) return;
      try {
          const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
          if(res.ok) fetchUsers();
          else alert('Failed to delete user');
      } catch (e) {
          alert('Error deleting user');
      }
  };
  
  const openEdit = (user: any) => {
      setCurrentUser(user);
      setFormData({ 
          username: user.username, 
          password: '', // Don't show existing hash 
          role: user.role, 
          saldo: user.saldo 
      });
      setIsEditModalOpen(true);
  };

  const filteredUsers = users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="text-gray-500 text-center mt-20">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-gray-400">Manage your resellers and admins.</p>
        </div>
        <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 transition-all"
        >
            <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/20 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400 text-sm border-b border-gray-700">
                <th className="px-6 py-4 font-medium">Username</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Balance</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{user.username}</div>
                    <div className="text-xs text-gray-500">Uplink: {user.uplink || 'System'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize
                      ${user.role === 'owner' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                        user.role === 'admin' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                       <Shield className="w-3 h-3" /> {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-mono">
                    ${user.saldo.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {user.status ? (
                        <span className="flex items-center gap-1.5 text-green-400 text-sm"><CheckCircle className="w-3 h-3" /> Active</span>
                    ) : (
                        <span className="flex items-center gap-1.5 text-red-400 text-sm"><Ban className="w-3 h-3" /> Banned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(user)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-blue-400 transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="p-2 bg-gray-800 hover:bg-red-900/30 rounded-lg text-red-500 transition-colors" title="Delete">
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              )) : (
                  <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No users found.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">{isEditModalOpen ? 'Edit User' : 'Add New User'}</h2>
                    <button onClick={() => {setIsAddModalOpen(false); setIsEditModalOpen(false);}} className="text-gray-400 hover:text-white"><Shield className="w-5 h-5 rotate-45" /></button>
                </div>
                
                <form onSubmit={isEditModalOpen ? handleUpdate : handleCreate} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Username</label>
                        <input 
                            type="text" 
                            required
                            disabled={isEditModalOpen}
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password {isEditModalOpen && <span className="text-xs text-gray-500">(Leave blank to keep current)</span>}</label>
                        <input 
                            type="password" 
                            required={!isEditModalOpen}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Role</label>
                            {currentUserRole === 'owner' ? (
                                <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                                >
                                    <option value="reseller">Reseller</option>
                                    <option value="admin">Admin</option>
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    value="Reseller" 
                                    disabled 
                                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-gray-400 outline-none cursor-not-allowed"
                                />
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Balance</label>
                            {currentUserRole === 'admin' ? (
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={formData.saldo}
                                        disabled
                                        className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-gray-500 outline-none cursor-not-allowed"
                                    />
                                    <p className="text-[10px] text-red-400 mt-1 absolute -bottom-4 left-0">Admins cannot edit balance directly.</p>
                                </div>
                            ) : (
                                <input 
                                    type="number" 
                                    value={formData.saldo}
                                    onChange={(e) => setFormData({...formData, saldo: Number(e.target.value)})}
                                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                                />
                            )}
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mt-4">
                        {isEditModalOpen ? 'Update User' : 'Create User'}
                    </button>
                    <button type="button" onClick={() => {setIsAddModalOpen(false); setIsEditModalOpen(false);}} className="w-full py-2 text-gray-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}
