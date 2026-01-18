"use client";

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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <motion.div
      className="relative flex items-center bg-[#0a0a0f]/80 backdrop-blur-sm rounded px-6 py-5 gap-4 border border-blue-500/30 font-mono"
      animate={{
        borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.4)', 'rgba(59, 130, 246, 0.3)'],
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.1), inset 0 0 20px rgba(59, 130, 246, 0.05)',
          '0 0 30px rgba(139, 92, 246, 0.15), inset 0 0 30px rgba(139, 92, 246, 0.05)',
          '0 0 20px rgba(59, 130, 246, 0.1), inset 0 0 20px rgba(59, 130, 246, 0.05)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-500/50" />

      <TimeUnit value={formatNumber(timeLeft.days)} label="DAYS" color="blue" />
      <Divider />
      <TimeUnit value={formatNumber(timeLeft.hours)} label="HRS" color="purple" />
      <Divider />
      <TimeUnit value={formatNumber(timeLeft.minutes)} label="MIN" color="blue" />
      <Divider />
      <TimeUnit value={formatNumber(timeLeft.seconds)} label="SEC" color="purple" />
    </motion.div>
  );
}

function FlipCard({ digit, color }: { digit: string; color: 'blue' | 'purple' }) {
  const glowColor = color === 'blue'
    ? 'rgba(59, 130, 246, 0.8)'
    : 'rgba(139, 92, 246, 0.8)';

  return (
    <div className="relative w-9 h-12 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={digit}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' as const }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.span
            className={`text-3xl font-bold ${color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}
            animate={{
              textShadow: [
                `0 0 10px ${glowColor}`,
                `0 0 20px ${glowColor}`,
                `0 0 10px ${glowColor}`,
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {digit}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TimeUnit({ value, label, color }: { value: string; label: string; color: 'blue' | 'purple' }) {
  const digits = value.split('');

  return (
    <div className="text-center px-2">
      <div className="flex gap-0.5">
        {digits.map((digit, index) => (
          <FlipCard key={`${label}-${index}`} digit={digit} color={color} />
        ))}
      </div>
      <motion.div
        className={`text-[10px] mt-2 uppercase tracking-widest ${color === 'blue' ? 'text-blue-400/60' : 'text-purple-400/60'}`}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        [{label}]
      </motion.div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex flex-col items-center gap-2 px-1">
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-blue-500"
        animate={{
          opacity: [1, 0.3, 1],
          boxShadow: [
            '0 0 5px rgba(59, 130, 246, 0.5)',
            '0 0 10px rgba(59, 130, 246, 0.8)',
            '0 0 5px rgba(59, 130, 246, 0.5)',
          ],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-purple-500"
        animate={{
          opacity: [0.3, 1, 0.3],
          boxShadow: [
            '0 0 5px rgba(139, 92, 246, 0.5)',
            '0 0 10px rgba(139, 92, 246, 0.8)',
            '0 0 5px rgba(139, 92, 246, 0.5)',
          ],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}
