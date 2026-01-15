'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center card-bg backdrop-blur-sm rounded-lg px-6 py-4 gap-6">
      <TimeUnit value={formatNumber(timeLeft.days)} label="Days" />
      <Divider />
      <TimeUnit value={formatNumber(timeLeft.hours)} label="Hours" />
      <Divider />
      <TimeUnit value={formatNumber(timeLeft.minutes)} label="Minutes" />
      <Divider />
      <TimeUnit value={formatNumber(timeLeft.seconds)} label="Seconds" />
    </div>
  );
}

// added flipcard effect to the countdown

function FlipCard({ digit, label }: { digit: string; label: string }) {
  return (
    <div className="relative w-10 h-12 perspective-500">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={digit}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-theme bg-black/20 rounded-md backface-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {digit}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  const digits = value.split('');
  
  return (
    <div className="text-center">
      <div className="flex gap-1">
        {digits.map((digit, index) => (
          <FlipCard key={`${label}-${index}`} digit={digit} label={label} />
        ))}
      </div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-12 border-theme" style={{ backgroundColor: 'var(--border)' }} />;
}
