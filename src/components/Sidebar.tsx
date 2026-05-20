import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Car, 
  History, 
  Wallet, 
  User as UserIcon, 
  Shield, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Car, label: 'Book Ride', path: '/book' },
    { icon: History, label: 'Activity', path: '/history' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: GraduationCap, label: 'Student Center', path: '/profile' },
    { icon: Shield, label: 'Safety Hub', path: '/safety' },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-slate-700 flex flex-col h-screen sticky top-0 z-20">
      <div className="p-6 flex items-center space-x-3 text-2xl font-black tracking-tighter italic">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white not-italic">R</div>
        <span className="text-white uppercase">Rydeo</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-xl transition-all",
                isActive 
                  ? "text-primary bg-slate-800/50" 
                  : "text-slate-400 hover:text-primary hover:bg-slate-800/30"
              )}
            >
              <item.icon size={20} className={isActive ? "text-primary" : "text-current"} />
              <span className={cn("font-semibold", !isActive && "font-normal")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mb-4">
        <div className="glass p-4 rounded-2xl border border-pink-500/30 bg-pink-500/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-pink-400">Female Safety</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">Women-only ride mode is active for late-night safety.</p>
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <Link to="/profile" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-secondary p-0.5 overflow-hidden">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-400 flex items-center justify-center text-slate-900 font-bold">
                {profile?.displayName?.[0] || 'U'}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate text-white">{profile?.displayName || 'User'}</p>
            {profile?.isStudentVerified ? (
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">STUDENT VERIFIED</p>
            ) : (
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">REGULAR MEMBER</p>
            )}
          </div>
        </Link>
        <button 
          onClick={handleLogout}
          className="mt-4 flex items-center space-x-2 text-slate-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors w-full"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
