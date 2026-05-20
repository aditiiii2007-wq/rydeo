import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Navigation, Car, Users, Bike, Zap, ArrowRight, Shield, Heart, GraduationCap, Clock, Star, AlertCircle, Check, Loader2, MessageSquare, Phone, AlertTriangle } from 'lucide-react';
import { PUNE_LOCATIONS, VEHICLE_CONFIG } from '../constants';
import { Location, VehicleType } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import { cn } from '../lib/utils';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getSocket } from '../lib/socket';
import SOSOverlay from '../components/SOSOverlay';

export default function BookingPage() {
  const { profile } = useAuth();
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType>('bike');
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [step, setStep] = useState<'selection' | 'searching' | 'confirmed'>('selection');
  const [showPickupSearch, setShowPickupSearch] = useState(false);
  const [showDestSearch, setShowDestSearch] = useState(false);
  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [systemMatch, setSystemMatch] = useState<any>(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [bookingMode, setBookingMode] = useState<'request' | 'offer'>('request');
  const [seatsAvailable, setSeatsAvailable] = useState(1);

  useEffect(() => {
    if (!profile) return;
    const socket = getSocket();

    socket.on('match_found', (data) => {
      console.log('Match found event:', data);
      setMatchInfo(data);
      setStep('confirmed');
    });

    socket.on('system_matched', (data) => {
      console.log('System match event:', data);
      setSystemMatch(data);
      setStep('confirmed');
    });

    return () => {
      socket.off('match_found');
      socket.off('system_matched');
    };
  }, [profile]);

  const triggerSOS = () => {
    setIsSOSActive(true);
    const socket = getSocket();
    socket.emit('sos_trigger', {
      uid: profile?.uid,
      displayName: profile?.displayName,
      location: pickup?.name || 'Unknown Location',
      rideId: matchInfo?.matchId || 'system_ride'
    });
  };

  const estimatedFare = useMemo(() => {
    if (!pickup || !destination) return 0;
    const config = VEHICLE_CONFIG[vehicle];
    const dist = Math.sqrt(Math.pow(pickup.lat - destination.lat, 2) + Math.pow(pickup.lng - destination.lng, 2)) * 111; // rough km
    let fare = config.baseFare + dist * config.ratePerKm;
    
    if (isShared) fare *= 0.6; // 40% discount for sharing
    if (profile?.isStudentVerified) fare *= 0.7; // Additional 30% student discount
    
    return Math.max(fare, config.baseFare);
  }, [pickup, destination, vehicle, isShared, profile]);

  const handleBook = async () => {
    if (!pickup || !destination) return;
    setStep('searching');
    setMatchInfo(null);
    setSystemMatch(null);
    
    const socket = getSocket();
    socket.emit('find_match', {
      uid: profile?.uid,
      displayName: profile?.displayName,
      pickup: pickup.name,
      destination: destination.name,
      vehicle,
      isShared,
      isWomenOnly,
      type: bookingMode,
      seats: seatsAvailable
    });

    try {
      const rideData = {
        passengerId: profile?.uid,
        pickup,
        destination,
        vehicle,
        isWomenOnly,
        isShared,
        fare: estimatedFare,
        status: 'pending',
        type: bookingMode,
        createdAt: serverTimestamp(),
      };
      
      // Keep firestore for history
      await addDoc(collection(db, 'rides'), rideData);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'rides');
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col relative">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapComponent 
          pickup={pickup || undefined} 
          destination={destination || undefined} 
          isLoading={step === 'searching'} 
        />
      </div>

      {/* Mode Switcher Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <div className="glass p-1.5 rounded-2xl border border-white/5 flex gap-1 shadow-2xl">
          <button 
            onClick={() => setBookingMode('request')}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              bookingMode === 'request' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white"
            )}
          >
            Request Ryde
          </button>
          <button 
            onClick={() => setBookingMode('offer')}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              bookingMode === 'offer' ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "text-slate-500 hover:text-white"
            )}
          >
            Offer Seat
          </button>
        </div>
      </div>

      {/* High Density Overlays */}
      <div className="relative z-10 h-full flex flex-col pointer-events-none">
        {/* Top Alerts */}
        <div className="p-4 flex gap-4 pointer-events-auto">
          <div className="glass p-3 rounded-xl border-l-4 border-accent max-w-xs transition-transform hover:-translate-y-1">
            <p className="text-[10px] uppercase text-accent font-black mb-1">Surge Alert</p>
            <p className="text-[11px] text-slate-300 leading-tight">High demand near FC Road. Smart Matching enabled for faster pickup.</p>
          </div>
        </div>

        <div className="mt-auto p-6 space-y-4 pointer-events-auto">
          <AnimatePresence mode="wait">
            {step === 'selection' && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="flex flex-col lg:flex-row gap-6 items-end"
              >
                {/* Request Card */}
                <div className="w-full lg:w-96 glass p-6 rounded-[2.5rem] neon-glow">
                  <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-white">
                    {bookingMode === 'request' ? 'Request a Ryde' : 'Offer a Ryde'}
                  </h2>
                  
                  <div className="space-y-3 mb-6 relative">
                    <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-700/50" />
                    
                    <div className="relative">
                      <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700 group focus-within:border-primary transition-all">
                        <div className="w-3 h-3 rounded-full border-2 border-secondary flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[9px] text-slate-500 uppercase font-black">Pickup</p>
                          <button 
                            onClick={() => { setShowPickupSearch(!showPickupSearch); setShowDestSearch(false); }}
                            className="text-sm font-bold w-full text-left truncate text-white"
                          >
                            {pickup ? pickup.name : 'Select Point'}
                          </button>
                        </div>
                      </div>
                      {showPickupSearch && (
                        <div className="absolute top-full left-0 right-0 mt-1 glass rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto p-1 border-primary/20">
                          {PUNE_LOCATIONS.map(loc => (
                            <div 
                              key={loc.name} 
                              onClick={() => { setPickup(loc); setShowPickupSearch(false); }}
                              className="p-2 hover:bg-primary/20 rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
                            >
                              <Navigation className="h-3 w-3 text-primary" />
                              <span className="text-xs font-bold">{loc.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700 group focus-within:border-secondary transition-all">
                        <div className="w-3 h-3 bg-rose-500 rounded-sm flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[9px] text-slate-500 uppercase font-black">Destination</p>
                          <button 
                            onClick={() => { setShowDestSearch(!showDestSearch); setShowPickupSearch(false); }}
                            className="text-sm font-bold w-full text-left truncate text-white"
                          >
                            {destination ? destination.name : 'Enter Destination'}
                          </button>
                        </div>
                      </div>
                      {showDestSearch && (
                        <div className="absolute top-full left-0 right-0 mt-1 glass rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto p-1 border-secondary/20">
                          {PUNE_LOCATIONS.map(loc => (
                            <div 
                              key={loc.name} 
                              onClick={() => { setDestination(loc); setShowDestSearch(false); }}
                              className="p-2 hover:bg-secondary/20 rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
                            >
                              <MapPin className="h-3 w-3 text-secondary" />
                              <span className="text-xs font-bold">{loc.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {bookingMode === 'offer' && (
                    <div className="mb-6 space-y-2">
                       <p className="text-[9px] text-slate-500 uppercase font-black ml-1">Available Seats</p>
                       <div className="flex gap-2">
                          {[1, 2, 3, 4].map(num => (
                             <button
                               key={num}
                               onClick={() => setSeatsAvailable(num)}
                               className={cn(
                                 "flex-1 py-2 rounded-xl text-xs font-black italic transition-all",
                                 seatsAvailable === num ? "bg-secondary text-white" : "bg-slate-900 text-slate-500 border border-slate-700"
                               )}
                             >
                                {num}
                             </button>
                          ))}
                       </div>
                    </div>
                  )}

                  <button 
                    disabled={!pickup || !destination}
                    onClick={handleBook}
                    className="w-full bg-primary py-4 rounded-2xl font-black text-lg text-white hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-tighter italic"
                  >
                    {bookingMode === 'request' ? 'Confirm Route' : 'Publish Offer'}
                  </button>
                </div>

                {/* Vehicle Selection & Smart Matching */}
                <div className="flex-1 flex flex-col space-y-4 max-w-3xl w-full">
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.entries(VEHICLE_CONFIG).map(([key, config]) => {
                      const Icon = key === 'bike' ? Bike : (key === 'shared-auto' ? Users : Car);
                      const isSelected = vehicle === key;
                      const configColor = key === 'bike' ? 'border-primary' : (key === 'shared-auto' ? 'border-accent' : 'border-slate-700');
                      
                      return (
                        <button
                          key={key}
                          onClick={() => setVehicle(key as VehicleType)}
                          className={cn(
                            "flex-1 min-w-[140px] glass p-4 rounded-2xl border-b-4 flex flex-col items-center justify-center transition-all",
                            isSelected ? `${configColor} bg-slate-800/50` : "border-slate-800 opacity-60 hover:opacity-100"
                          )}
                        >
                          <Icon size={24} className={isSelected ? (key === 'bike' ? "text-primary" : "text-accent") : "text-slate-500"} />
                          <span className="text-xs font-black uppercase mt-2">{config.label}</span>
                          <span className="text-[10px] text-secondary font-bold mt-1">₹{isSelected && pickup && destination ? estimatedFare.toFixed(0) : config.baseFare}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-4 h-32">
                    <button 
                      onClick={() => setIsShared(!isShared)}
                      className={cn(
                        "flex-1 glass p-4 rounded-2xl flex flex-col justify-between border transition-all text-left",
                        isShared ? "border-primary bg-primary/5" : "border-white/5 opacity-60"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Public Pool</span>
                        <div className={cn("px-2 py-0.5 rounded font-black uppercase tracking-widest text-[9px]", isShared ? "bg-primary text-white" : "bg-slate-800 text-slate-500")}>
                          {isShared ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className={isShared ? "text-primary" : "text-slate-500"} />
                        <p className="text-[11px] text-slate-400 font-medium italic leading-tight">Match with others to save 40% on this trip.</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setIsWomenOnly(!isWomenOnly)}
                      className={cn(
                        "flex-1 glass p-4 rounded-2xl flex flex-col justify-between border transition-all text-left",
                        isWomenOnly ? "border-secondary bg-secondary/5" : "border-white/5 opacity-60"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">She-Shields</span>
                        <div className={cn("px-2 py-0.5 rounded font-black uppercase tracking-widest text-[9px]", isWomenOnly ? "bg-secondary text-white" : "bg-slate-800 text-slate-500")}>
                          {isWomenOnly ? 'Active' : 'Off'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart size={16} className={isWomenOnly ? "text-secondary" : "text-slate-500"} />
                        <p className="text-[11px] text-slate-400 font-medium italic leading-tight">Exclusive women-only units for safer travel.</p>
                      </div>
                    </button>

                    <div className="w-48 glass p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-primary flex items-center justify-center mb-2">
                        <GraduationCap size={20} className="text-primary" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-tight text-white">Student Hub</p>
                      <p className="text-[9px] text-slate-500 font-bold">-{profile?.isStudentVerified ? '30%' : '0%'} UNLOCKED</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'searching' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-md mx-auto glass p-12 rounded-[3.5rem] border border-primary/20 text-center relative overflow-hidden shadow-2xl shadow-primary/10 mb-12"
              >
                <div className="relative mb-12">
                   <motion.div 
                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 bg-primary/20 rounded-full"
                   />
                   <div className="relative h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                      <Loader2 className="text-primary animate-spin" size={40} />
                   </div>
                </div>
                
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">Establishing Match</h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Scanning Pune Autonomous Network...</p>
                
                <div className="space-y-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Checking Peer Availability</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Optimizing Route Clusters</p>
                   </div>
                </div>

                <button 
                  onClick={() => setStep('selection')}
                  className="mt-10 text-[10px] font-black text-rose-500 hover:text-rose-400 uppercase tracking-[0.2em] transition-colors"
                >
                  Cancel Connection
                </button>
              </motion.div>
            )}

            {step === 'confirmed' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto glass p-8 rounded-[2.5rem] border border-secondary/30 neon-glow w-full mb-12 shadow-2xl shadow-secondary/10"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-3xl bg-slate-800 border-2 border-secondary p-0.5 relative overflow-hidden group">
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center font-black italic text-xl text-white group-hover:bg-primary transition-all">
                        {matchInfo ? matchInfo.partner.displayName[0] : (systemMatch ? systemMatch.driverName[0] : 'RK')}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div>
                      <p className="text-xl font-black italic tracking-tighter uppercase text-white">
                        {matchInfo ? matchInfo.partner.displayName : (systemMatch ? systemMatch.driverName : 'Rahul Kumar')}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1">
                          <Star size={10} fill="currentColor" /> 4.9
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                           {matchInfo ? 'Peer Passenger' : (systemMatch ? systemMatch.vehicle : 'Suzuki • AB 1234')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Total</p>
                    <p className="text-3xl font-black italic text-secondary tracking-tighter">₹{estimatedFare.toFixed(0)}</p>
                  </div>
                </div>

                {matchInfo && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <Users className="text-primary" size={20} />
                       <div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">Community Match</p>
                          <p className="text-xs text-slate-300 font-bold">You've been paired with {matchInfo.partner.displayName}. Shared cost locked.</p>
                       </div>
                    </div>
                  </div>
                )}

                <div className="bg-surface/50 rounded-2xl p-5 mb-6 space-y-4 border border-white/5">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Status</p>
                        <p className="text-xs font-black italic text-white uppercase tracking-tight">Intercepting Path</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest leading-none mb-1">Arrival</p>
                        <p className="text-xs font-black italic text-white uppercase tracking-tight">{systemMatch?.eta || '4 MINS'}</p>
                     </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: "0%" }}
                       animate={{ width: "70%" }}
                       transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                       className="h-full bg-secondary rounded-full shadow-[0_0_8px_#00C2A8]"
                     />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="py-5 bg-surface border border-white/5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-400 hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={14} /> Message
                  </button>
                  <button 
                    onClick={triggerSOS}
                    className="py-5 bg-rose-600/10 border border-rose-500/20 rounded-2xl font-black uppercase tracking-widest text-[10px] text-rose-500 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <AlertTriangle size={14} /> SOS
                  </button>
                </div>

                <button 
                  onClick={() => { setStep('selection'); setMatchInfo(null); setSystemMatch(null); }}
                  className="w-full py-5 glass border border-rose-500/20 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5 group"
                >
                  <span className="group-hover:italic group-hover:tracking-widest transition-all">Abort Transmission</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SOSOverlay 
        active={isSOSActive} 
        onClose={() => setIsSOSActive(false)} 
        location={pickup?.name}
      />
    </div>
  );
}
