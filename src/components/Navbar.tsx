import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Car, User, LogOut, Shield, Wallet, History, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Safety', path: '/safety', icon: Shield },
  ];

  const authLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Book Ride', path: '/book', icon: Car },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/30"
            >
              <Car className="text-white h-6 w-6" />
            </motion.div>
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 font-display">
              RYDEO
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-800 pl-8 ml-4">
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-900"
                    title={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
                <div className="flex items-center gap-3 ml-4 bg-slate-900/50 p-1 pr-3 rounded-full border border-slate-800">
                  <Link to="/profile" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-xs font-bold ring-2 ring-slate-800 ring-offset-2 ring-offset-slate-950">
                      {profile?.displayName?.[0] || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold leading-none">{profile?.displayName?.split(' ')[0]}</span>
                      <span className="text-[10px] text-zinc-400 font-mono tracking-wider">₹{profile?.walletBalance?.toFixed(0)}</span>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="p-1 hover:bg-red-500/20 rounded-full text-zinc-500 hover:text-red-400 transition-all">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium hover:text-indigo-400 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-full bg-indigo-600 text-sm font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  Join RYDEO
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-950 border-b border-indigo-500/20 p-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-slate-300 py-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <div className="border-t border-slate-800 pt-4 mt-2 grid grid-cols-2 gap-4">
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-2 text-slate-400 py-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
            {!user ? (
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/login"
                  className="w-full text-center py-3 rounded-xl border border-slate-800 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-3 rounded-xl bg-indigo-600 text-sm font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Join RYDEO
                </Link>
              </div>
            ) : (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left py-3 text-red-400 text-sm font-medium flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
