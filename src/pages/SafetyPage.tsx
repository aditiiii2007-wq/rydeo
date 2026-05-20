import { motion } from 'motion/react';
import { Shield, Phone, MapPin, Eye, Lock, Bell, Heart, CheckCircle, Smartphone, AlertTriangle, Radio, Activity, Zap } from 'lucide-react';
import { useState } from 'react';
import SOSOverlay from '../components/SOSOverlay';
import { getSocket } from '../lib/socket';
import { useAuth } from '../context/AuthContext';

export default function SafetyPage() {
  const { profile } = useAuth();
  const [isSOSActive, setIsSOSActive] = useState(false);

  const triggerSOS = () => {
    setIsSOSActive(true);
    const socket = getSocket();
    socket.emit('sos_trigger', {
      uid: profile?.uid,
      displayName: profile?.displayName,
      location: 'Safety Center (Manual Trigger)',
      from: 'safety_page'
    });
  };
  const safetyFeatures = [
    { 
      icon: Shield, 
      title: "24/7 Monitoring", 
      desc: "Our Pune command center tracks every ride in real-time. If a vehicle deviates from the route, we're on it.",
      tag: "CORE"
    },
    { 
      icon: Phone, 
      title: "SOS Emergency", 
      desc: "One-tap button to notify emergency contacts, local police, and RYDEO safety team with live location.",
      tag: "CRITICAL"
    },
    { 
      icon: Lock, 
      title: "Verified Drivers", 
      desc: "Comprehensive background checks, license verification, and ongoing behavior monitoring for every driver.",
      tag: "SECURITY"
    },
    { 
      icon: Eye, 
      title: "Share Trip", 
      desc: "Send a live tracking link to friends and family. They can watch your journey until you're safely home.",
      tag: "TRUST"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="h-1 py-4 w-10 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Security Protocol</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-0">Safety <br/><span className="text-secondary">Mission</span></h1>
        </div>
        <div className="max-w-md">
           <p className="text-sm font-black italic uppercase text-slate-500 mb-4">Zero-Tolerance Protocol</p>
           <p className="text-slate-400 font-medium leading-tight uppercase tracking-tightest">We've built the most advanced safety ecosystem for Pune riders. From late-night commutes to student rides, we've got you covered with real-time biometric tracking and police integration.</p>
        </div>
      </div>

      {/* Main Feature Grid - High Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
         {safetyFeatures.map((f, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.05 }}
             className="glass p-10 rounded-[3rem] border border-white/5 hover:border-primary/50 transition-all flex flex-col group relative overflow-hidden"
           >
              <div className="flex justify-between items-start mb-12">
                <div className="p-5 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <f.icon size={28} />
                </div>
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">{f.tag}</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-4 leading-none">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tight">{f.desc}</p>
              <div className="absolute -bottom-2 -right-2 text-[60px] font-black italic opacity-[0.02] uppercase pointer-events-none">{f.tag}</div>
           </motion.div>
         ))}
      </div>

      {/* Women Safety - Optimized layout */}
      <section className="glass rounded-[4rem] border border-white/5 mb-20 relative overflow-hidden bg-gradient-to-br from-secondary/5 to-transparent">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <Heart size={300} />
         </div>
         
         <div className="p-12 md:p-20 flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-secondary/20 glass text-secondary text-[10px] font-black uppercase mb-8 tracking-[0.2em]">
                  <Heart size={14} /> She-Shields Active
               </div>
               <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-8 leading-none">Women Only <br/>Shared Units.</h2>
               <p className="text-slate-500 text-lg mb-12 max-w-xl font-bold italic">A safe space for our female commuters. Opt for rides exclusively with verified women passengers and elite-rated trusted drivers.</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    "Biometric ID Verification",
                    "4.9+ Rated Elite Drivers",
                    "No-Stop Direct Routes",
                    "Live Police Connectivity"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-1.5 h-1.5 bg-secondary group-hover:w-6 transition-all" />
                       <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{text}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="flex-shrink-0 relative">
               <div className="w-80 h-80 lg:w-96 lg:h-96 glass rounded-[4rem] border border-white/10 flex items-center justify-center p-12 group neon-glow relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-secondary/20 rounded-full scale-110"
                  />
                  <div className="flex flex-col items-center gap-8 relative z-10">
                     <div className="h-24 w-24 bg-secondary rounded-full flex items-center justify-center text-bg shadow-2xl shadow-secondary/50">
                        <Shield size={48} />
                     </div>
                     <div className="text-center">
                        <p className="text-2xl font-black italic text-white uppercase tracking-tighter">Verified Unit</p>
                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">Code She-Shield</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Emergency Center */}
      <section className="glass p-12 md:p-24 rounded-[4rem] border border-rose-500/30 text-center relative overflow-hidden bg-gradient-to-t from-rose-500/10 to-transparent">
        <div className="flex flex-col items-center relative z-10">
           <div className="h-20 w-20 bg-rose-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-rose-500/50 mb-12 animate-pulse">
              <Radio size={40} />
           </div>
           
           <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-8 leading-none">Command Center <br/>Transmission</h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-bold uppercase tracking-tight">Our rapid response unit is active. Real-time fleet synchronization with local authorities is engaged.</p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-lg">
              <button 
                onClick={triggerSOS}
                className="flex-1 py-6 bg-rose-500 rounded-2xl font-black italic text-xl uppercase tracking-tighter text-white neon-glow transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
              >
                <AlertTriangle /> Critical SOS
              </button>
              <button className="flex-1 py-6 glass border border-white/10 rounded-2xl font-black italic text-xl uppercase tracking-tighter text-white transition-all hover:bg-white/5 active:scale-95 flex items-center justify-center gap-4">
                <Phone /> Dispatch Unit
              </button>
           </div>
        </div>
      </section>

      <SOSOverlay 
        active={isSOSActive} 
        onClose={() => setIsSOSActive(false)} 
        location="Safety Command Center"
      />
    </div>
  );
}
