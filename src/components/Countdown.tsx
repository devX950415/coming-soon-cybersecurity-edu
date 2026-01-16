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
    <div className="flex items-center bg-[#1a1a24]/80 backdrop-blur-sm rounded-xl px-6 py-4 gap-4 border border-white/10">
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

// Slide animation - old number pushed up, new number rises from bottom

function FlipCard({ digit }: { digit: string }) {
  return (
    <div className="relative w-8 h-10 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={digit}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' as const }}
          className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-white"
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
    <div className="text-center px-2">
      <div className="flex gap-0.5">
        {digits.map((digit, index) => (
          <FlipCard key={`${label}-${index}`} digit={digit} />
        ))}
      </div>
      <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-10 bg-white/20" />;
}
