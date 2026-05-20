import { useAuth } from '../context/AuthContext';
import { Search, Bell, AlertTriangle } from 'lucide-react';

export default function Header() {
  const { profile } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-6 z-10 glass border-b-0 sticky top-0">
      <div className="flex items-center space-x-4 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700 w-96 group focus-within:border-primary transition-all">
        <Search size={16} className="text-slate-500 group-focus-within:text-primary" />
        <input 
          type="text" 
          placeholder="Search Hinjewadi, Viman Nagar, Swargate..." 
          className="bg-transparent border-none text-slate-400 text-sm w-full focus:ring-0 placeholder:text-slate-600"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Balance:</span>
          <span className="text-sm font-bold text-secondary">₹{profile?.walletBalance?.toFixed(2) || '0.00'}</span>
        </div>
        
        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-surface"></span>
        </button>

        <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center space-x-2 animate-pulse transition-all shadow-lg shadow-rose-500/20 active:scale-95">
          <AlertTriangle size={14} />
          <span>SOS</span>
        </button>
      </div>
    </header>
  );
}
