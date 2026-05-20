import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Users, GraduationCap, MapPin, Heart, Car, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovingBackground from '../components/MovingBackground';

export default function LandingPage() {
  const features = [
    { icon: Zap, title: "Smart Match", desc: "AI-route pairing", tag: "AI Ready" },
    { icon: GraduationCap, title: "Student Saver", desc: "40% off for verified users", tag: "Popular" },
    { icon: Heart, title: "Femme Safe", desc: "Women-only mode", tag: "Safety" },
    { icon: Shield, title: "SOS Center", desc: "Live dispatch support", tag: "Critical" },
  ];

  return (
    <div className="relative overflow-x-hidden bg-bg">
      <MovingBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6 pt-20">
        <div className="max-w-7xl mx-auto w-full z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-4 py-1 glass rounded-full border border-primary/20 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-bg bg-slate-700" />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              12,400+ Active Riders in Pune
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[12vw] md:text-[100px] font-black leading-[0.85] tracking-tighter italic uppercase text-white mb-6"
          >
            RYDEO <span className="text-primary italic">PUNE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl text-slate-400 text-sm md:text-base font-medium mb-12 uppercase tracking-wide leading-tight"
          >
            Hyper-local smart sharing. Save 60% with AI matching.
            Engineered for students, women & daily commuters in Pune city.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm sm:max-w-none"
          >
            <Link
              to="/register"
              className="py-6 px-12 bg-primary rounded-[2rem] font-black text-xl italic uppercase tracking-tighter text-white neon-glow transition-all hover:scale-105 active:scale-95"
            >
              Start Ryde Now
            </Link>
            <Link
              to="/safety"
              className="py-6 px-12 glass border border-white/5 rounded-[2rem] font-black text-xl italic uppercase tracking-tighter text-white transition-all hover:bg-white/5 active:scale-95"
            >
              Safeguard Mode
            </Link>
          </motion.div>
        </div>

        {/* Decorative Grid Elements */}
        <div className="absolute bottom-10 left-10 hidden xl:block">
          <div className="flex gap-10">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase">Average Fare</p>
              <p className="text-3xl font-black italic">₹45.00</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-secondary uppercase">Pickup Time</p>
              <p className="text-3xl font-black italic">3.2m</p>
            </div>
          </div>
        </div>
      </section>

      {/* High Density Marquee */}
      <div className="py-6 border-y border-white/5 bg-surface relative z-20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {['Baner', 'Hinjewadi', 'Kothrud', 'Wakad', 'FC Road', 'Swargate', 'Akurdi'].map((city) => (
            <div key={city} className="flex items-center gap-6">
              <span className="text-4xl font-black italic uppercase text-slate-700 hover:text-primary transition-colors cursor-default">{city}</span>
              <div className="w-3 h-3 bg-primary rounded-full" />
            </div>
          ))}
          {['Baner', 'Hinjewadi', 'Kothrud', 'Wakad', 'FC Road', 'Swargate', 'Akurdi'].map((city) => (
            <div key={`${city}-dup`} className="flex items-center gap-6">
              <span className="text-4xl font-black italic uppercase text-slate-700 hover:text-primary transition-colors cursor-default">{city}</span>
              <div className="w-3 h-3 bg-primary rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Features - High Density Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-[2.5rem] border border-white/5 group transition-all hover:bg-surface"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <f.icon size={28} />
                </div>
                <span className="text-[9px] font-black uppercase text-secondary tracking-widest px-2 py-1 bg-secondary/10 rounded">{f.tag}</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-tight">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">
              The <span className="text-secondary">Safety</span> <br /> Priority.
            </h2>
            <div className="space-y-4">
              {[
                "24/7 Police Integration",
                "Verified Driver Network",
                "Real-time Trip Monitoring",
                "Zero-Tolerance Safety Protocol"
              ].map(t => (
                <div key={t} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 bg-primary group-hover:w-8 transition-all duration-300" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="glass p-8 rounded-[3rem] border border-white/5 neon-glow">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FFB703" color="#FFB703" />)}
              </div>
              <p className="text-2xl font-black italic leading-tight mb-8">
                "Rydeo changed how I go to college. Sharing rides with fellow students is so much safer and cheaper!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-primary" />
                <div>
                  <p className="text-sm font-black uppercase tracking-widest">Anjali Sharma</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase">SPPU Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="h-4 w-8 bg-primary rounded-sm skew-x-[-20deg]" />
             <span className="text-2xl font-black italic italic tracking-tighter">RYDEO</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
             <Link to="#" className="hover:text-primary transition-colors">Safety</Link>
             <Link to="#" className="hover:text-primary transition-colors">Privacy</Link>
             <Link to="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">© 2026 PUNE CITY COMMUTE</p>
        </div>
      </footer>
    </div>
  );
}
