import { motion } from 'motion/react';
import { Wallet, Plus, CreditCard, ChevronRight, TrendingUp, TrendingDown, Gift, PhoneCall, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function WalletPage() {
  const { profile } = useAuth();

  const transactions = [
    { type: 'debit', title: 'Ride to Hinjewadi', date: 'Today, 2:30 PM', amount: '₹145', icon: TrendingDown, color: 'text-rose-400' },
    { type: 'credit', title: 'Referral Bonus', date: 'Yesterday', amount: '₹50', icon: TrendingUp, color: 'text-emerald-400' },
    { type: 'debit', title: 'Ride to Aundh', date: '2 May, 10:15 AM', amount: '₹85', icon: TrendingDown, color: 'text-rose-400' },
    { type: 'credit', title: 'Added Money', date: '1 May, 9:00 PM', amount: '₹500', icon: TrendingUp, color: 'text-emerald-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex items-end justify-between mb-12">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="h-1 py-4 w-10 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Financial Hub</span>
           </div>
           <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">Your <span className="text-secondary">Rydeo Credits</span></h1>
        </div>
        <div className="text-right">
           <p className="text-sm font-black italic uppercase text-slate-500">Transaction Score</p>
           <p className="text-4xl font-black italic text-white leading-none">940</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Balance Section */}
        <div className="lg:col-span-8 space-y-8">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="glass p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden neon-glow bg-gradient-to-br from-primary/10 to-transparent"
           >
              <div className="absolute top-0 right-0 p-12 opacity-10">
                 <Wallet size={120} className="italic text-white" />
              </div>

              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="text-secondary" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Vault Secure • PCI-DSS Certified</span>
                 </div>

                 <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Available Balance</p>
                 <h2 className="text-[100px] font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-12">
                   ₹{profile?.walletBalance?.toFixed(0) || 0}
                 </h2>

                 <div className="flex flex-wrap gap-4">
                    <button className="py-6 px-12 bg-primary rounded-[2rem] font-black text-xl italic uppercase tracking-tighter text-white neon-glow transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                       <Plus size={24} /> Top Up
                    </button>
                    <button className="py-6 px-12 glass border border-white/10 rounded-[2rem] font-black text-xl italic uppercase tracking-tighter text-white transition-all hover:bg-white/5 active:scale-95 flex items-center gap-3">
                       <ArrowRight size={24} /> Withdrawal
                    </button>
                 </div>
              </div>
           </motion.div>

           {/* Transactions - High Density */}
           <div className="glass p-10 rounded-[3rem] border border-white/5">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                   Activity <ChevronRight className="text-primary" />
                 </h3>
                 <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Export Logs</button>
              </div>

              <div className="space-y-2">
                 {transactions.map((tx, idx) => (
                   <div key={idx} className="flex items-center justify-between p-6 rounded-3xl hover:bg-white/5 transition-all group cursor-default">
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 glass rounded-2xl border border-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                           <tx.icon size={24} className={tx.color} />
                        </div>
                        <div>
                           <p className="text-lg font-black uppercase italic tracking-tight text-white">{tx.title}</p>
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className={cn("text-2xl font-black italic", tx.type === 'credit' ? 'text-secondary' : 'text-white')}>
                            {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                         </p>
                         <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Successful</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass p-10 rounded-[3rem] border border-amber-500/20 relative overflow-hidden bg-gradient-to-br from-amber-500/5 to-transparent">
              <Gift className="absolute -top-6 -right-6 h-32 w-32 text-amber-500/10 -rotate-12" />
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">Member Perks</p>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">Invite & <br/>Earn ₹50</h3>
              <p className="text-xs text-slate-500 font-medium italic mb-8 leading-relaxed">Expand the Pune Rydeo network. Credits instantly added upon their first successful commute.</p>
              
              <div className="flex flex-col gap-2">
                 <div className="bg-surface p-4 rounded-2xl border border-white/5 text-center font-black italic tracking-widest text-primary">PN26-BETA-SAFE</div>
                 <button className="py-4 bg-white text-bg rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Copy Link</button>
              </div>
           </div>

           <div className="glass p-10 rounded-[3rem] border border-white/5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Quick Limits</p>
              <div className="space-y-6">
                 <div>
                   <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                      <span className="text-slate-400">Daily Commute</span>
                      <span className="text-white">₹850 / ₹2,000</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[42%]" />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                      <span className="text-slate-400">Monthly Shared</span>
                      <span className="text-white">₹4,200 / ₹15,000</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[28%]" />
                   </div>
                 </div>
              </div>
              <button className="w-full mt-10 py-5 glass border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all">Update Restrictions</button>
           </div>
        </div>
      </div>
    </div>
  );
}
