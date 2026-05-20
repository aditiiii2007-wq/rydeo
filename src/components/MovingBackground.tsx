import { motion } from 'motion/react';
import { Car, Bike, Truck, Bus } from 'lucide-react';
import { useEffect, useState } from 'react';

const vehicles = [
  { icon: Car, color: 'text-indigo-400', size: 32 },
  { icon: Bike, color: 'text-emerald-400', size: 24 },
  { icon: Bus, color: 'text-amber-400', size: 40 },
  { icon: Car, color: 'text-rose-400', size: 28 },
];

export default function MovingBackground() {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 15 }).map((_, i) => {
      const v = vehicles[Math.floor(Math.random() * vehicles.length)];
      return {
        id: i,
        icon: v.icon,
        color: v.color,
        size: v.size,
        top: Math.random() * 100,
        left: -10,
        duration: 20 + Math.random() * 30,
        delay: Math.random() * 10,
        opacity: 0.05 + Math.random() * 0.1,
      };
    });
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Moving Vehicles */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ x: '-10vw' }}
          animate={{ x: '110vw' }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'linear',
          }}
          className="absolute"
          style={{ top: `${el.top}%`, opacity: el.opacity }}
        >
          <el.icon size={el.size} className={el.color} />
        </motion.div>
      ))}

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64 text-slate-950"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
    </div>
  );
}
