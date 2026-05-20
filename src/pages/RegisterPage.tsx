import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, User, Phone, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import MovingBackground from '../components/MovingBackground';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg relative overflow-hidden text-white">
      <MovingBackground />

      <div className="absolute top-10 left-10 z-20 hidden md:block">
         <div className="flex items-center gap-3">
            <div className="h-4 w-8 bg-secondary rounded-sm skew-x-[-20deg]" />
            <span className="text-2xl font-black italic tracking-tighter text-white">RYDEO</span>
         </div>
         <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.4em] mt-2 ml-1">Member Onboarding System</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass p-10 md:p-12 rounded-[4rem] border border-white/5 relative z-10 neon-glow"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
             <div className="h-16 w-16 glass rounded-2xl border border-white/10 flex items-center justify-center text-secondary">
                <User size={32} />
             </div>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none">Create Account</h2>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Join the Autonomous Commute Revolution</p>
        </div>

        {error && (
          <div className="mb-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black uppercase tracking-tight">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="LEGAL FULL NAME"
                className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-black uppercase tracking-tight focus:border-secondary transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ID"
                className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-black uppercase tracking-tight focus:border-secondary transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="CONTACT NO"
                className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-black uppercase tracking-tight focus:border-secondary transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="relative">
              <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SECURE PASSCODE"
                className="w-full bg-surface border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-black uppercase tracking-tight focus:border-secondary transition-all outline-none text-sm"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 py-6 bg-secondary rounded-2xl font-black italic text-xl uppercase tracking-tighter text-white neon-glow transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-secondary/20 mt-4"
          >
            {loading ? 'Initializing Profile...' : (
              <>Deploy Account <ArrowRight className="h-6 w-6" /></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
            Prior Member?{' '}
            <Link to="/login" className="text-secondary hover:text-white transition-colors underline decoration-secondary">Establish Link</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
