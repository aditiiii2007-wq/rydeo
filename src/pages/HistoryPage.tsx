import { motion } from 'motion/react';
import { History, MapPin, Calendar, CreditCard, ChevronRight, Fuel, Car, Navigation, Star, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Ride } from '../types';

export default function HistoryPage() {
  const { profile } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      if (!profile) return;
      try {
        const q = query(
          collection(db, 'rides'),
          where('passengerId', '==', profile.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedRides = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ride[];
        setRides(fetchedRides);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [profile]);

  const displayRides = rides.length > 0 ? rides : [
    {
      id: 'mock-1',
      pickup: { name: 'Akurdi Railway Station' },
      destination: { name: 'Hinjewadi Phase 2' },
       fare: 145,
      vehicle: 'shared-auto',
      createdAt: new Date().toISOString(),
      status: 'completed'
    },
    {
      id: 'mock-2',
      pickup: { name: 'Pune Station' },
      destination: { name: 'FC Road' },
      fare: 65,
      vehicle: 'bike',
      createdAt: new Date().toISOString(),
      status: 'completed'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="flex items-end justify-between mb-12">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="h-1 py-4 w-10 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Ride Logs</span>
           </div>
           <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">Tour <span className="text-secondary">History</span></h1>
        </div>
        <div className="text-right">
           <p className="text-sm font-black italic uppercase text-slate-500">Total Adventures</p>
           <p className="text-4xl font-black italic text-white">{displayRides.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {displayRides.map((ride, idx) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group glass p-6 rounded-[2rem] border border-white/5 hover:border-primary/50 transition-all hover:bg-surface relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex gap-6 items-center">
                <div className="h-16 w-16 glass rounded-2xl border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {ride.vehicle === 'bike' ? <Navigation size={24} /> : <Car size={24} />}
                </div>
                
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-500">{new Date(ride.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="text-[10px] font-black uppercase text-secondary">₹{ride.fare.toFixed(0)} • Completed</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{ride.pickup.name}</h3>
                      <ArrowRight size={16} className="text-slate-700" />
                      <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{ride.destination.name}</h3>
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-4 border-l border-white/5 pl-8 h-10">
                   <div className="flex -space-x-2">
                      {[1, 2].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-slate-700" />)}
                   </div>
                   <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none">Smart Matched <br/> with 2 others</span>
                </div>

                <button className="py-4 px-8 glass border border-white/5 rounded-2xl font-black italic uppercase text-xs tracking-widest hover:border-primary hover:text-primary transition-all">
                   View Receipt
                </button>
              </div>
            </div>
            
            {/* Background Texture Overlay */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none uppercase font-black text-6xl italic">
               {ride.vehicle}
            </div>
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center py-20 opacity-20">
           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">Synchronizing Logs</p>
        </div>
      )}
    </div>
  );
 }
