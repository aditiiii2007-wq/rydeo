import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import MovingBackground from '../components/MovingBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg relative overflow-hidden">
      <MovingBackground />
      
      <div className="absolute top-10 left-10 z-20 hidden md:block">
         <div className="flex items-center gap-3">
            <div className="h-4 w-8 bg-primary rounded-sm skew-x-[-20deg]" />
            <span className="text-2xl font-black italic tracking-tighter text-white">RYDEO</span>
         </div>
         <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.4em] mt-2 ml-1">Pune Autonomous Network</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-10 rounded-[3.5rem] border border-white/5 relative z-10 neon-glow"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
             <div className="h-16 w-16 glass rounded-2xl border border-white/10 flex items-center justify-center text-primary">
                <Lock size={32} />
             </div>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none">Authentication</h2>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Secure Node Connectivity Required</p>
        </div>

        {error && (
          <div className="mb-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black uppercase tracking-tight">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ACCESS KEY (EMAIL)"
                className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-black uppercase tracking-tight focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Shield className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SECURE PASSCODE"
                className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-black uppercase tracking-tight focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-6 bg-primary rounded-2xl font-black italic text-xl uppercase tracking-tighter text-white neon-glow transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
          >
            {loading ? 'Sychronizing...' : (
              <>Establish Connection <ArrowRight className="h-6 w-6" /></>
            )}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase font-black tracking-widest text-slate-600">
            <span className="bg-[#0A0F1E] px-4 italic">Alternative Channels</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-4 py-5 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-all group"
          >
            <Chrome className="h-5 w-5 text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors underline-offset-4 underline decoration-secondary">Connect via Google</span>
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
            New Commuter?{' '}
            <Link to="/register" className="text-primary hover:text-white transition-colors underline decoration-primary">Create Profile</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
