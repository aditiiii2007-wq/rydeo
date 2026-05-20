import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Shield, Phone, Radio, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SOSOverlayProps {
  active: boolean;
  onClose: () => void;
  location?: string;
}

export default function SOSOverlay({ active, onClose, location }: SOSOverlayProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          {/* Siren Animation Background */}
          <motion.div 
            animate={{ 
              backgroundColor: ["rgba(244,63,94,0.1)", "rgba(59,130,246,0.1)", "rgba(244,63,94,0.1)"],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white p-12 rounded-[4rem] border-4 border-rose-500 shadow-[0_0_80px_rgba(244,63,94,0.4)] text-center overflow-hidden"
          >
            {/* High Intensity Flashing Overlay */}
            <motion.div 
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="absolute inset-0 bg-rose-500 pointer-events-none"
            />

            {/* Spinning Siren Rings */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-40">
               <motion.div 
                 animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                 transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5, repeat: Infinity } }}
                 className="w-full h-full border-8 border-dashed border-rose-500 rounded-full"
               />
            </div>

            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-4 bg-slate-100 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-600 transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-10">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute inset-0 bg-rose-500 rounded-3xl blur-xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="h-24 w-24 bg-rose-600 rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10"
                >
                  <AlertTriangle size={48} className="animate-pulse" />
                </motion.div>
              </div>

              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 leading-none">CRITICAL SOS</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-lg shadow-rose-600/30">
                <Radio size={14} className="animate-pulse" /> Signal Transmitting
              </div>

              <div className="w-full space-y-6 mb-12">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-left">
                  <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">Current Coordinates</p>
                  <p className="text-lg font-black italic text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <MapPin size={18} className="text-secondary" /> {location || 'Detecting...'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Police Unit</p>
                    <p className="text-xs font-black text-rose-600 italic">Sector Priority</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">RYDEO Team</p>
                    <p className="text-xs font-black text-secondary italic">Monitoring Live</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button 
                  className="py-6 bg-rose-600 text-white rounded-2xl font-black italic text-xl uppercase tracking-tighter flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-rose-600/20"
                  onClick={() => window.location.href = 'tel:112'}
                >
                  <Phone size={24} /> Call 112
                </button>
                <button 
                  className="py-6 bg-slate-900 text-white rounded-2xl font-black italic text-xl uppercase tracking-tighter flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
                >
                  <Shield size={24} /> Safety Hub
                </button>
              </div>
              
              <p className="mt-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Secure Line Active • Node: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MapPin({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
