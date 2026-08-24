import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BrandCodeMap } from '../../lib/types';

const ADMIN_PANEL_PASSWORD = 'dxadmin2028!';

export const AdminPanel = ({
  isOpen,
  onClose,
  brandCodeMap,
  onSaveUsers,
  onResetToDefault
}: {
  isOpen: boolean;
  onClose: () => void;
  brandCodeMap: BrandCodeMap;
  onSaveUsers: (nextUsers: BrandCodeMap) => void;
  onResetToDefault: () => void;
}) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [brandInput, setBrandInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [panelError, setPanelError] = useState('');
  const [panelSuccess, setPanelSuccess] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAdminPassword('');
      setIsAdminUnlocked(false);
      setCodeInput('');
      setBrandInput('');
      setUrlInput('');
      setEditingCode(null);
      setPanelError('');
      setPanelSuccess('');
    }
  }, [isOpen]);

  const users = useMemo(
    () => Object.entries(brandCodeMap).sort((a, b) => a[0].localeCompare(b[0])),
    [brandCodeMap]
  );

  const showError = (message: string) => {
    setPanelSuccess('');
    setPanelError(message);
  };

  const showSuccess = (message: string) => {
    setPanelError('');
    setPanelSuccess(message);
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim() === ADMIN_PANEL_PASSWORD) {
      setIsAdminUnlocked(true);
      showSuccess('Admin unlocked');
      return;
    }
    showError('Invalid admin password');
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = codeInput.trim();
    const normalizedBrand = brandInput.trim();
    const normalizedUrl = urlInput.trim();

    if (!normalizedCode || !normalizedBrand) {
      showError('Code and brand name are required');
      return;
    }

    const nextUsers = { ...brandCodeMap };
    if (editingCode && editingCode !== normalizedCode) {
      delete nextUsers[editingCode];
    }

    const isDuplicate = (!editingCode || editingCode !== normalizedCode) && Boolean(nextUsers[normalizedCode]);
    if (isDuplicate) {
      showError('This code already exists');
      return;
    }

    nextUsers[normalizedCode] = { name: normalizedBrand, url: normalizedUrl };
    onSaveUsers(nextUsers);

    setCodeInput('');
    setBrandInput('');
    setUrlInput('');
    setEditingCode(null);
    showSuccess(editingCode ? 'User updated' : 'User created');
  };

  const handleEdit = (code: string, config: { name: string, url: string }) => {
    setCodeInput(code);
    setBrandInput(config.name);
    setUrlInput(config.url || '');
    setEditingCode(code);
    setPanelError('');
    setPanelSuccess('');
  };

  const handleDelete = (code: string) => {
    const nextUsers = { ...brandCodeMap };
    delete nextUsers[code];
    onSaveUsers(nextUsers);

    if (editingCode === code) {
      setCodeInput('');
      setBrandInput('');
      setUrlInput('');
      setEditingCode(null);
    }
    showSuccess('User deleted');
  };

  const handleResetDefaults = () => {
    onResetToDefault();
    setCodeInput('');
    setBrandInput('');
    setUrlInput('');
    setEditingCode(null);
    showSuccess('Reset to default JSON data');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Admin Panel</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-90">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {!isAdminUnlocked ? (
              <form onSubmit={handleUnlockAdmin} className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-blue-500 focus:outline-none shadow-inner"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white font-black rounded-xl uppercase tracking-widest text-xs"
                >
                  Unlock Admin
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                    {editingCode ? 'Update User' : 'Create User'}
                  </h4>
                  <form onSubmit={handleCreateOrUpdate} className="grid sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold focus:border-blue-500 focus:outline-none"
                      placeholder="Code"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold focus:border-blue-500 focus:outline-none"
                      placeholder="Brand Name"
                      value={brandInput}
                      onChange={(e) => setBrandInput(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold focus:border-blue-500 focus:outline-none col-span-1 sm:col-span-1"
                      placeholder="Google Review URL"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs"
                    >
                      {editingCode ? 'Update' : 'Create'}
                    </button>
                  </form>
                  {editingCode && (
                    <button
                      type="button"
                      onClick={() => {
                        setCodeInput('');
                        setBrandInput('');
                        setUrlInput('');
                        setEditingCode(null);
                        setPanelError('');
                        setPanelSuccess('');
                      }}
                      className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-700"
                    >
                      Cancel editing
                    </button>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Registered Users
                  </div>
                  <div className="divide-y divide-slate-100">
                    {users.length === 0 ? (
                      <div className="px-4 py-6 text-sm text-slate-400 font-bold">No users found.</div>
                    ) : (
                      users.map(([code, config]) => (
                        <div key={code} className="px-4 py-4 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-black text-slate-900 truncate">{config.name}</p>
                            <p className="text-xs font-bold text-slate-400 truncate">{code} - {config.url}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(code, config)}
                              className="px-3 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(code)}
                              className="px-3 py-2 bg-red-50 text-red-500 border border-red-100 rounded-lg text-[10px] font-black uppercase tracking-widest"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">JSON Preview</p>
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest"
                    >
                      Reset Defaults
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={JSON.stringify(brandCodeMap, null, 2)}
                    className="w-full min-h-[170px] px-4 py-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            {(panelError || panelSuccess) && (
              <p className={`mt-5 text-xs font-black uppercase tracking-widest ${panelError ? 'text-red-500' : 'text-green-600'}`}>
                {panelError || panelSuccess}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
