'use client';

import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Matrix rain characters
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function MatrixRain() {
  const [columns, setColumns] = useState<{ id: number; chars: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    setColumns(
      Array.from({ length: cols }, (_, i) => ({
        id: i,
        chars: Array.from({ length: 20 }, () =>
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ).join('\n'),
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  if (columns.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute text-green-500 text-xs font-mono"
          style={{ left: col.id * 20 }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            delay: col.delay,
            ease: 'linear',
          }}
        >
          {col.chars}
        </motion.div>
      ))}
    </div>
  );
}

// Cyber circuit lines
function CircuitLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
      <defs>
        <linearGradient id="circuitGradContact" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((y) => (
        <motion.line
          key={`h-${y}`}
          x1="0%"
          y1={`${y}%`}
          x2="100%"
          y2={`${y}%`}
          stroke="url(#circuitGradContact)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: y / 40 }}
        />
      ))}
      {[15, 35, 65, 85].map((x) => (
        <motion.line
          key={`v-${x}`}
          x1={`${x}%`}
          y1="0%"
          x2={`${x}%`}
          y2="100%"
          stroke="url(#circuitGradContact)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: x / 50 }}
        />
      ))}
      {[[15, 20], [35, 40], [65, 60], [85, 80], [35, 80], [65, 20]].map(([x, y], i) => (
        <motion.circle
          key={`node-${i}`}
          cx={`${x}%`}
          cy={`${y}%`}
          r="4"
          fill="#3b82f6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

// Binary data stream component
function BinaryStream({ direction }: { direction: 'up' | 'down' }) {
  const [binaryData, setBinaryData] = useState<string>('');

  useEffect(() => {
    setBinaryData(Array.from({ length: 100 }, () => Math.round(Math.random())).join(''));
  }, []);

  if (!binaryData) return null;

  return (
    <motion.div
      className="text-green-400 text-[10px] font-mono leading-tight"
      animate={{ y: direction === 'up' ? [0, -500] : [-500, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    >
      {binaryData}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Matrix rain effect */}
      <MatrixRain />

      {/* Circuit pattern */}
      <CircuitLines />

      {/* Hex grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 17.32v34.64L30 60 0 51.96V17.32L30 0z' fill='none' stroke='%233b82f6' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanning radar effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.1) 30deg, transparent 60deg)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulsing rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20 pointer-events-none"
          style={{ width: ring * 300, height: ring * 300 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: ring * 0.5,
          }}
        />
      ))}

      {/* Binary data streams on sides */}
      <div className="absolute left-4 top-1/4 bottom-1/4 w-8 overflow-hidden pointer-events-none opacity-20">
        <BinaryStream direction="up" />
      </div>
      <div className="absolute right-4 top-1/4 bottom-1/4 w-8 overflow-hidden pointer-events-none opacity-20">
        <BinaryStream direction="down" />
      </div>

      <Header />

      <div className="flex items-center min-h-screen px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left side - Title with continuous animation */}
          <div className="overflow-visible relative text-center lg:text-left">
            {/* Glitch layers */}
            <motion.h1
              className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light leading-tight tracking-wider text-red-500/20 blur-[1px]"
              animate={{
                x: [-2, 2, -1, 2, -2],
                opacity: [0, 0.4, 0, 0.3, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="block">LET&apos;S</span>
              <span className="block font-normal">CONNECT</span>
            </motion.h1>
            <motion.h1
              className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light leading-tight tracking-wider text-cyan-500/20 blur-[1px]"
              animate={{
                x: [2, -2, 1, -2, 2],
                opacity: [0, 0.3, 0, 0.4, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3, delay: 0.05 }}
            >
              <span className="block">LET&apos;S</span>
              <span className="block font-normal">CONNECT</span>
            </motion.h1>

            {/* Main title */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light leading-tight tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">
                {"LET'S".split('').map((letter, index) => (
                  <motion.span
                    key={`lets-${index}`}
                    animate={{
                      color: ['#ffffff', '#3b82f6', '#60a5fa', '#3b82f6', '#ffffff'],
                      textShadow: [
                        '0 0 10px rgba(59, 130, 246, 0.3)',
                        '0 0 20px rgba(59, 130, 246, 0.6)',
                        '0 0 40px rgba(59, 130, 246, 0.8)',
                        '0 0 20px rgba(59, 130, 246, 0.6)',
                        '0 0 10px rgba(59, 130, 246, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.15,
                      ease: 'easeInOut',
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="block font-normal">
                {'CONNECT'.split('').map((letter, index) => (
                  <motion.span
                    key={`connect-${index}`}
                    animate={{
                      color: ['#ffffff', '#8b5cf6', '#a78bfa', '#8b5cf6', '#ffffff'],
                      textShadow: [
                        '0 0 10px rgba(139, 92, 246, 0.3)',
                        '0 0 20px rgba(139, 92, 246, 0.6)',
                        '0 0 40px rgba(139, 92, 246, 0.8)',
                        '0 0 20px rgba(139, 92, 246, 0.6)',
                        '0 0 10px rgba(139, 92, 246, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: (index + 5) * 0.15,
                      ease: 'easeInOut',
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Security status */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 mt-4 sm:mt-6 text-green-400 text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>SECURE CHANNEL</span>
              <span className="text-gray-500">|</span>
              <span className="text-blue-400">ENCRYPTED</span>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <motion.div
            className="w-full max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
