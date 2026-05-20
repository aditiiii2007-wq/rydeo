import { motion } from 'motion/react';
import { Car, Send, Wallet, History, Shield, GraduationCap, ChevronRight, Star, Clock, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Total Rides', value: profile?.rideCount || 0, icon: Car, color: 'text-primary' },
    { label: 'Wallet Balance', value: `₹${profile?.walletBalance?.toFixed(0) || 0}`, icon: Wallet, color: 'text-secondary' },
    { label: 'Rating', value: profile?.ratings?.toFixed(1) || '5.0', icon: Star, color: 'text-accent' },
  ];

  const quickActions = [
    { name: 'Book a Ride', desc: 'Fast city commute', path: '/book', icon: Car, color: 'bg-primary' },
    { name: 'Offer a Ride', desc: 'Share & Earn', path: '/admin', icon: Send, color: 'bg-secondary' },
    { name: 'Student Saver', desc: '40% Off Verified', path: '/profile', icon: GraduationCap, color: 'bg-accent' },
    { name: 'Activity', desc: 'Ride History', path: '/history', icon: History, color: 'bg-rose-500' },
  ];

  const cityHighlights = [
    { title: 'Surge Alert', desc: 'High demand in Hinjewadi Ph-1', type: 'warning' },
    { title: 'Smart Match', desc: '3 students matching your route', type: 'info' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-1">
            DASHBOARD // {profile?.displayName?.split(' ')[0]}
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide">SYSTEMS ONLINE • PUNE METRO AREA</p>
        </div>
        {!profile?.isStudentVerified && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 glass p-4 rounded-2xl border-l-4 border-l-accent"
          >
            <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-accent">Student Discount Available</p>
              <Link to="/profile" className="text-[10px] text-slate-400 font-bold hover:text-white transition-colors">VERIFY NOW →</Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div className="text-4xl font-black italic tracking-tighter text-white relative z-10">{stat.value}</div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-secondary font-bold relative z-10">
              <TrendingUp className="h-3 w-3" /> +12% VS LAST WEEK
            </div>
            <div className={cn("absolute -bottom-4 -right-4 h-24 w-24 opacity-5 group-hover:opacity-10 transition-opacity", stat.color)}>
              <stat.icon className="h-full w-full" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions & Highlights */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                to={action.path}
                className="group flex flex-col items-center text-center p-6 rounded-3xl glass hover:bg-slate-800/50 transition-all hover:neon-glow"
              >
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg transition-transform group-hover:scale-110", action.color)}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight mb-1">{action.name}</h3>
                <p className="text-slate-500 text-[10px] font-medium leading-tight">{action.desc}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cityHighlights.map((hl, i) => (
              <div key={i} className={cn(
                "p-4 rounded-2xl glass border-l-4",
                hl.type === 'warning' ? "border-l-accent" : "border-l-primary"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={14} className={hl.type === 'warning' ? "text-accent" : "text-primary"} />
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", hl.type === 'warning' ? "text-accent" : "text-primary")}>
                    {hl.title}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium italic">{hl.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-secondary/10 border border-slate-800 relative overflow-hidden group">
             <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">SAFETY COMMAND CENTER</h3>
                <p className="text-slate-400 text-xs font-medium mb-6 leading-relaxed">Level 4 Autonomous Safety monitoring active. Your trips are protected by 24/7 AI oversight and instant SOS dispatch.</p>
                <Link to="/safety" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-opacity-90 transition-all hover:neon-glow">
                  <Shield size={14} /> Open Safety Hub
                </Link>
             </div>
             <Shield className="absolute -bottom-6 -right-6 h-56 w-56 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>

        {/* Recent Activity Side */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">RECENT ACTIVITY</h2>
            <Link to="/history" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">View All</Link>
          </div>
          <div className="space-y-4 flex-1">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl glass hover:bg-slate-800/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[10px] font-medium text-slate-500">2 DAYS AGO</span>
                  </div>
                  <span className="text-xs font-black italic text-white">₹{i === 0 ? '142' : '68'}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-bold text-slate-300 truncate tracking-tight">HINJEWADI PH-1</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin className="h-3 w-3 text-secondary" />
                    <span className="text-[10px] font-bold truncate tracking-tight">KOTHRUD PMT STOP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
