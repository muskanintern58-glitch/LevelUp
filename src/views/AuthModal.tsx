import React, { useState } from 'react';
import { loginUser, signupUser } from '../services/api';
import { UserProfile } from '../types';
import { soundEngine } from '../utils/audio';
import { X, LogIn, UserPlus, Sparkles, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  onResetData?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, onResetData }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP' | 'FORGOT'>('LOGIN');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('muskan@levelup.cozy');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setInfoMsg('');

    try {
      if (mode === 'LOGIN') {
        const res = await loginUser(email, password);
        soundEngine.playTaskComplete();
        onAuthSuccess(res.user);
        onClose();
      } else if (mode === 'SIGNUP') {
        const res = await signupUser(name || 'Cozy Student', email, password);
        soundEngine.playTaskComplete();
        onAuthSuccess(res.user);
        onClose();
      } else {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        setInfoMsg(data.message || 'Reset link sent! 🌸');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccount = () => {
    soundEngine.playPop();
    setEmail('muskan@levelup.cozy');
    setPassword('password123');
    setName('Muskan');
    setMode('LOGIN');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-6 border border-rose-100 dark:border-slate-700 shadow-2xl relative overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 flex items-center justify-center text-lg font-bold">
              🌸
            </div>
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
              {mode === 'LOGIN' ? 'Welcome Back' : mode === 'SIGNUP' ? 'Create Account' : 'Reset Password'}
            </h3>
          </div>
          <button
            onClick={() => { soundEngine.playPop(); onClose(); }}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-3 p-3 rounded-2xl bg-rose-50 text-rose-600 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="mb-3 p-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-semibold">
            {infoMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          {mode === 'SIGNUP' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Your Adventurer Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Muskan"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="muskan@levelup.cozy"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {mode !== 'FORGOT' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-extrabold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Processing...' : mode === 'LOGIN' ? 'Log In & Play 🌸' : mode === 'SIGNUP' ? 'Sign Up & LevelUp' : 'Send Reset Link'}</span>
          </button>

        </form>

        {/* Quick Demo & Reset Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-center space-y-2">
          <button
            type="button"
            onClick={handleDemoAccount}
            className="w-full py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 font-bold text-xs hover:bg-amber-100 transition-colors"
          >
            ⚡ Auto-Fill Demo Student Credentials
          </button>

          {onResetData && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all progress and start fresh from Level 1?')) {
                  soundEngine.playPop();
                  onResetData();
                  onClose();
                }
              }}
              className="w-full py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 font-black text-[11px] hover:bg-rose-100 transition-colors"
            >
              🔄 Start Fresh from Level 1 (Reset Data)
            </button>
          )}

          <div className="flex justify-center space-x-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 pt-1">
            {mode === 'LOGIN' ? (
              <>
                <button onClick={() => setMode('SIGNUP')} className="hover:text-rose-500">Create Account</button>
                <span>•</span>
                <button onClick={() => setMode('FORGOT')} className="hover:text-rose-500">Forgot Password?</button>
              </>
            ) : (
              <button onClick={() => setMode('LOGIN')} className="hover:text-rose-500">Back to Login</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
