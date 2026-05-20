import { motion } from 'motion/react';
import { LayoutDashboard, Users, Car, Shield, Activity, TrendingUp, CheckCircle, XCircle, Search, MoreVertical, Globe, Smartphone, Bell, Power } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminPage() {
  const stats = [
    { label: 'Active Fleet', value: '42', icon: Activity, color: 'text-primary' },
    { label: 'Screening', value: '12', icon: Shield, color: 'text-secondary' },
    { label: 'Net Rev', value: '₹24.5k', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Tickets', value: '03', icon: Bell, color: 'text-rose-400' },
  ];

  const pendingApprovals = [
    { name: 'Amit Sharma', city: 'Hinjewadi', vehicle: 'MH 12 XY 4567 (Sedan)', status: 'Pending', time: '12m ago' },
    { name: 'Priya Patel', city: 'Kothrud', vehicle: 'MH 14 AB 1122 (EV)', status: 'Pending', time: '45m ago' },
    { name: 'Suresh Raina', city: 'Baner', vehicle: 'MH 12 ZZ 9900 (Auto)', status: 'Pending', time: '1h ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="h-1 py-4 w-10 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Root</span>
           </div>
           <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">Command <span className="text-secondary">Nexus</span></h1>
        </div>
        
        <div className="flex gap-4">
           <div className="glass px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-6">
              <div className="flex flex-col items-center">
                 <span className="text-[8px] font-black uppercase text-slate-500 mb-1">Server Load</span>
                 <span className="text-sm font-black italic text-secondary">0.4ms</span>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div className="flex flex-col items-center">
                 <span className="text-[8px] font-black uppercase text-slate-500 mb-1">Active Nodes</span>
                 <span className="text-sm font-black italic text-white">124</span>
              </div>
           </div>
           <button className="p-6 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10">
              <Power size={20} />
           </button>
        </div>
      </div>

      {/* Stats Grid - High Density */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-8 rounded-[2.5rem] border border-white/5 relative group hover:bg-surface transition-all overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
               <div className={cn("p-4 rounded-2xl bg-opacity-10", stat.color.replace('text-', 'bg-'))}>
                  <stat.icon size={24} className={stat.color} />
               </div>
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-4xl font-black italic text-white tracking-tighter">{stat.value}</p>
            <div className="absolute -bottom-2 -right-2 text-[60px] font-black italic opacity-[0.02] uppercase pointer-events-none">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Live Verification Stream */}
         <div className="lg:col-span-8">
            <div className="glass p-10 rounded-[3rem] border border-white/5">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                    Verification <span className="h-2 w-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#00C2A8]" />
                  </h2>
                  <div className="relative w-full md:w-auto">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                     <input type="text" placeholder="FILTER FLEET..." className="w-full md:w-64 bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-primary transition-all outline-none" />
                  </div>
               </div>

               <div className="space-y-4">
                  {pendingApprovals.map((p, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all gap-6"
                    >
                       <div className="flex items-center gap-6">
                          <div className="h-16 w-16 glass rounded-2xl border border-white/10 flex items-center justify-center text-2xl font-black italic text-primary">{p.name[0]}</div>
                          <div>
                             <div className="flex items-center gap-3 mb-1">
                                <p className="text-lg font-black italic text-white uppercase tracking-tight">{p.name}</p>
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{p.time}</span>
                             </div>
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.city} • <span className="text-secondary">{p.vehicle}</span></p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <button className="flex items-center gap-2 px-6 py-4 bg-emerald-500/10 text-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                             <CheckCircle size={14} /> Verify
                          </button>
                          <button className="flex items-center gap-2 px-4 py-4 p-4 text-rose-500 hover:text-white transition-all">
                             <XCircle size={16} />
                          </button>
                          <button className="p-4 text-slate-600 hover:text-white transition-colors"><MoreVertical size={18}/></button>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sector Diagnostics */}
         <div className="lg:col-span-4 space-y-6">
            <div className="glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
               <Globe className="absolute -top-10 -right-10 h-48 w-48 text-primary/10 animate-spin-slow" />
               <h2 className="text-xl font-black italic mb-8 uppercase tracking-widest text-white relative z-10">Sector Load</h2>
               <div className="space-y-6 relative z-10">
                  {[
                    { label: 'BANER-HINJEWADI', val: 92, color: 'bg-primary' },
                    { label: 'KOTHRUD-PASHAN', val: 45, color: 'bg-secondary' },
                    { label: 'WAKAD CENTRAL', val: 78, color: 'bg-primary' }
                  ].map((sector, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                         <span className="text-slate-400">{sector.label}</span>
                         <span className={cn("italic", sector.val > 80 ? 'text-primary' : 'text-white')}>{sector.val}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${sector.val}%` }}
                            className={cn("h-full rounded-full shadow-[0_0_8px]", sector.color.replace('bg-', 'shadow-'))} 
                          />
                       </div>
                    </div>
                  ))}
                  <div className="pt-6">
                     <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 flex items-center gap-3">
                        <Smartphone size={16} className="text-secondary" />
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">Surge protocol active in Sector 01-Baner. Estimating +20% efficiency.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass p-8 rounded-[3rem] border border-white/5">
               <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 mb-8 animate-pulse"><Shield size={12}/> Critical Invariants</h3>
               <div className="space-y-3">
                  {[
                    { t: "SPEED ALERT", m: "Auto MH12-9988 exceeding 60km/h", loc: "Pashan" },
                    { t: "SOS TRIGGER", m: "User ID: 9402 Signal at JM Road", loc: "JM Rd" }
                  ].map((alert, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 group cursor-pointer hover:bg-rose-500/10 transition-all">
                       <div className="h-2 w-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                       <div>
                          <p className="text-[10px] font-black text-white italic mb-1 uppercase tracking-wider">{alert.t} • {alert.loc}</p>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight group-hover:text-slate-300 transition-colors">{alert.m}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
