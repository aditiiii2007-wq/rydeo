import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Shield, GraduationCap, Phone, Mail, MapPin, Camera, CheckCircle, Clock, Star, Zap, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';
import MovingBackground from '../components/MovingBackground';

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [collegeName, setCollegeName] = useState(profile?.collegeName || '');

  const handleVerify = async () => {
    if (!profile) return;
    setIsVerifying(true);
    setTimeout(async () => {
      await updateDoc(doc(db, 'users', profile.uid), {
        isStudentVerified: true,
        studentBadge: 'Verified Student',
        collegeName: collegeName
      });
      await refreshProfile();
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Profile Header Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-surface">
           <div className="absolute inset-0 opacity-20 pune-map-grid" />
           <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 flex items-end justify-between max-w-7xl mx-auto left-1/2 -translate-x-1/2">
          <div className="flex items-end gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative group h-40 w-40 rounded-[2.5rem] bg-slate-900 border-4 border-bg shadow-2xl overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-5xl font-black italic text-primary">
                {profile?.displayName?.[0] || 'U'}
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer">
                 <Camera className="text-white mb-2" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">Update Photo</span>
              </div>
            </motion.div>
            
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">{profile?.displayName}</h1>
                <div className="px-2 py-1 bg-secondary/10 border border-secondary/20 rounded text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Verified</div>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={10} className="text-primary" /> Pune, MH • Joined Oct 2023
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <button className="p-4 glass rounded-2xl border border-white/5 hover:border-primary/50 transition-all text-slate-400 hover:text-white">
              <Bell size={20} />
            </button>
            <button className="p-4 glass rounded-2xl border border-white/5 hover:border-primary/50 transition-all text-slate-400 hover:text-white">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Account Security</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 flex items-center gap-2"><Mail size={16}/> Email</span>
                    <span className="text-sm font-bold text-white italic">{profile?.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 flex items-center gap-2"><Phone size={16}/> Phone</span>
                    <span className="text-sm font-bold text-white italic">{profile?.phone || 'Not Linked'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
               <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Ryder Rating</p>
                <Star size={20} fill="#00C2A8" color="#00C2A8" className="animate-pulse" />
               </div>
               <p className="text-5xl font-black italic mb-2 text-white">4.95</p>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Top 1% Pune Commuters</p>
            </div>
          </div>

          {/* Student Status - High Density */}
          <section className={cn(
             "glass p-10 rounded-[3rem] border transition-all neon-glow relative overflow-hidden",
             profile?.isStudentVerified ? "border-amber-500/30" : "border-white/5"
          )}>
            {profile?.isStudentVerified && (
              <div className="absolute top-0 right-0 p-6">
                <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/50">
                  <CheckCircle size={24} />
                </div>
              </div>
            )}
            
            <div className="max-w-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500">
                  <GraduationCap size={32} />
                </div>
                <div>
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Student Pass</h2>
                   <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Flat 40% Off All Routes</p>
                </div>
              </div>

              {!profile?.isStudentVerified ? (
                <div className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="ENTER UNIVERSITY NAME"
                      className="w-full bg-surface border border-white/5 rounded-2xl py-5 px-6 text-white font-black uppercase tracking-widest focus:border-amber-500 transition-all outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 glass rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-500 hover:border-amber-500 transition-all flex flex-col items-center gap-2">
                      <Camera size={16} /> Upload ID Front
                    </button>
                    <button className="py-4 glass rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-500 hover:border-amber-500 transition-all flex flex-col items-center gap-2">
                       <Camera size={16} /> Upload ID Back
                    </button>
                  </div>
                  <button 
                    onClick={handleVerify}
                    disabled={isVerifying || !collegeName}
                    className="w-full py-6 bg-amber-500 rounded-2xl font-black italic text-xl uppercase tracking-tighter text-white hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50"
                  >
                    {isVerifying ? 'Verifying Credentials...' : 'Activate Student Pass'}
                  </button>
                </div>
              ) : (
                <div className="p-8 bg-amber-500/5 rounded-[2rem] border border-amber-500/20">
                   <p className="text-xl font-black italic text-amber-500 mb-2 uppercase tracking-tight">Active Scholarship Pass</p>
                   <p className="text-slate-400 text-sm font-medium">Verified for <span className="text-white font-black">{profile.collegeName}</span>. Enjoy exclusive benefits in university shuttle zones.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Stats Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="glass p-10 rounded-[3rem] border border-white/5 text-center flex flex-col gap-10">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Carbon Impact</p>
                <p className="text-6xl font-black italic text-white tracking-tighter">34.2 <span className="text-xl">kg</span></p>
                <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
              </div>
              <div>
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-4">Total Savings</p>
                <p className="text-6xl font-black italic text-white tracking-tighter">₹2,450</p>
                <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
              </div>
              <div className="pt-4">
                 <p className="text-xs font-black italic uppercase text-slate-500 tracking-widest">Efficiency Level: Elite</p>
              </div>
           </div>

           <div className="glass p-8 rounded-[3rem] border border-white/5 space-y-6">
              <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2"><Shield size={12}/> Security Logs</h3>
              <div className="space-y-4">
                 {[
                   { t: "Kothrud", time: "2h ago", act: "Login" },
                   { t: "FC Road", time: "5h ago", act: "Ride Completed" }
                 ].map((log, i) => (
                   <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div>
                        <p className="text-xs font-black uppercase italic tracking-tight">{log.t}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase">{log.act}</p>
                      </div>
                      <span className="text-[10px] font-black text-slate-600">{log.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
