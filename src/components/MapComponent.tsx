import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { Location } from '../types';

interface MapComponentProps {
  pickup?: Location;
  destination?: Location;
  isLoading?: boolean;
}

export default function MapComponent({ pickup, destination, isLoading }: MapComponentProps) {
  const locations = [
    { name: 'Hinjewadi Ph-1', top: '15%', left: '25%' },
    { name: 'FC Road', top: '45%', left: '65%' },
    { name: 'Kothrud', top: '75%', left: '35%' },
    { name: 'Viman Nagar', top: '30%', left: '75%' },
    { name: 'Swargate', top: '60%', left: '50%' },
  ];

  // Map coordinates to percentage for visualization
  // Simplified for demo: just use the lat/lng as raw percentages or with slight adjustment
  const getY = (lat: number) => Math.min(Math.max((lat % 0.2) * 500, 10), 90);
  const getX = (lng: number) => Math.min(Math.max((lng % 0.2) * 500, 10), 90);

  return (
    <div className="w-full h-full pune-map-grid bg-bg relative overflow-hidden rounded-[2.5rem] border border-slate-800">
      {/* City Roads Map Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] w-full h-[1px] bg-white/5" />
        <div className="absolute top-[50%] w-full h-[1px] bg-white/5" />
        <div className="absolute top-[80%] w-full h-[1px] bg-white/5" />
        <div className="absolute left-[30%] h-full w-[1px] bg-white/5" />
        <div className="absolute left-[70%] h-full w-[1px] bg-white/5" />
      </div>

      {/* Location Labels */}
      {locations.map((loc) => (
        <div 
          key={loc.name} 
          className="absolute text-[10px] font-black text-slate-700 uppercase tracking-widest pointer-events-none"
          style={{ top: loc.top, left: loc.left }}
        >
          {loc.name}
        </div>
      ))}

      {/* Fake Traffic Vehicles */}
      <motion.div 
        animate={{ x: [0, 400], y: [0, 100] }} 
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[19.8%] left-[10%] w-2 h-1 bg-secondary shadow-[0_0_8px_#00C2A8] rounded-sm opacity-50" 
      />
      <motion.div 
        animate={{ y: [0, 300] }} 
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] left-[29.8%] w-1 h-2 bg-accent shadow-[0_0_8px_#FFB703] rounded-sm opacity-40" 
      />

      {/* Route Line (Simulated) */}
      {pickup && destination && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <motion.line
            x1={`${getX(pickup.lng)}%`}
            y1={`${getY(pickup.lat)}%`}
            x2={`${getX(destination.lng)}%`}
            y2={`${getY(destination.lat)}%`}
            stroke="url(#route-gradient)"
            strokeWidth="3"
            strokeDasharray="8 8"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor="#00C2A8" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Pickup Marker */}
      {pickup && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute z-20"
          style={{ top: `${getY(pickup.lat)}%`, left: `${getX(pickup.lng)}%` }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full mb-1">
             <div className="bg-white text-slate-900 px-2 py-0.5 rounded text-[8px] font-black uppercase mb-1 shadow-xl">
               {pickup.name}
             </div>
            <div className="bg-primary p-2 rounded-2xl shadow-xl neon-glow border border-white/20">
              <Navigation className="text-white h-4 w-4" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
          </div>
        </motion.div>
      )}

      {/* Destination Marker */}
      {destination && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute z-20"
          style={{ top: `${getY(destination.lat)}%`, left: `${getX(destination.lng)}%` }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full mb-1">
            <div className="bg-white text-slate-900 px-2 py-0.5 rounded text-[8px] font-black uppercase mb-1 shadow-xl">
               {destination.name}
             </div>
            <div className="bg-secondary p-2 rounded-2xl shadow-xl border border-white/20">
              <MapPin className="text-white h-4 w-4" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rotate-45" />
          </div>
        </motion.div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-bg/20 backdrop-blur-[2px] flex items-center justify-center z-30">
            <div className="relative">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="w-24 h-24 rounded-full border-t-2 border-primary"
               />
               <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                 Scanning
               </div>
            </div>
        </div>
      )}

      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-slate-700 select-none">
        lat: 18.5204 / lng: 73.8567
      </div>
    </div>
  );
}
