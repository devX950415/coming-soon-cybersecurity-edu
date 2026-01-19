'use client';

import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// Matrix rain characters
const matrixChars = '01011101010101000111000111000110001111000011100011000111000';

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
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
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal lines */}
      {[20, 40, 60, 80].map((y) => (
        <motion.line
          key={`h-${y}`}
          x1="0%"
          y1={`${y}%`}
          x2="100%"
          y2={`${y}%`}
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: y / 40 }}
        />
      ))}
      {/* Vertical lines */}
      {[15, 35, 65, 85].map((x) => (
        <motion.line
          key={`v-${x}`}
          x1={`${x}%`}
          y1="0%"
          x2={`${x}%`}
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: x / 50 }}
        />
      ))}
      {/* Circuit nodes */}
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

export default function Home() {
  const launchDate = useMemo(() => new Date('2026-04-01T00:00:00'), []);

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

      {/* Animated cyber shield in background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-5">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100 10 L180 50 L180 120 Q180 180 100 190 Q20 180 20 120 L20 50 Z"
            fill="none"
            stroke="url(#shieldGrad)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M100 30 L160 60 L160 110 Q160 160 100 170 Q40 160 40 110 L40 60 Z"
            fill="none"
            stroke="url(#shieldGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      </motion.div>

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

      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
        {/* Coming Soon Text with continuous glitch effect */}
        <div className="overflow-visible relative max-w-[90vw]">
          {/* Glitch layers - red */}
          <motion.h1
            className="absolute font-display font-bold tracking-wide leading-none flex whitespace-nowrap uppercase text-red-500/30 blur-[1px]"
            style={{ fontSize: 'clamp(32px, 8vw, 140px)' }}
            animate={{
              x: [-3, 3, -1, 2, -3],
              y: [0, -1, 1, 0, 0],
              opacity: [0, 0.6, 0, 0.4, 0],
              skewX: [0, 2, -1, 0, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
          >
            COMING<span className="ml-3 md:ml-5">SOON</span>
          </motion.h1>

          {/* Glitch layers - cyan */}
          <motion.h1
            className="absolute font-display font-bold tracking-wide leading-none flex whitespace-nowrap uppercase text-cyan-500/30 blur-[1px]"
            style={{ fontSize: 'clamp(32px, 8vw, 140px)' }}
            animate={{
              x: [3, -3, 1, -2, 3],
              y: [0, 1, -1, 0, 0],
              opacity: [0, 0.5, 0, 0.3, 0],
              skewX: [0, -2, 1, 0, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5, delay: 0.05 }}
          >
            COMING<span className="ml-3 md:ml-5">SOON</span>
          </motion.h1>

          {/* Main text with continuous wave animation */}
          <motion.h1
            className="font-display font-bold tracking-wide leading-none mb-8 flex whitespace-nowrap uppercase relative"
            style={{ fontSize: 'clamp(32px, 8vw, 140px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {'COMING'.split('').map((letter, index) => (
              <motion.span
                key={`coming-${index}`}
                animate={{
                  color: ['#ffffff', '#3b82f6', '#60a5fa', '#3b82f6', '#ffffff'],
                  textShadow: [
                    '0 0 10px rgba(59, 130, 246, 0.3)',
                    '0 0 20px rgba(59, 130, 246, 0.6)',
                    '0 0 40px rgba(59, 130, 246, 0.8)',
                    '0 0 20px rgba(59, 130, 246, 0.6)',
                    '0 0 10px rgba(59, 130, 246, 0.3)',
                  ],
                  y: [0, -3, 0, 3, 0],
                  scale: [1, 1.02, 1, 0.98, 1],
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
            <span className="ml-3 md:ml-5">
              {'SOON'.split('').map((letter, index) => (
                <motion.span
                  key={`soon-${index}`}
                  animate={{
                    color: ['#ffffff', '#8b5cf6', '#a78bfa', '#8b5cf6', '#ffffff'],
                    textShadow: [
                      '0 0 10px rgba(139, 92, 246, 0.3)',
                      '0 0 20px rgba(139, 92, 246, 0.6)',
                      '0 0 40px rgba(139, 92, 246, 0.8)',
                      '0 0 20px rgba(139, 92, 246, 0.6)',
                      '0 0 10px rgba(139, 92, 246, 0.3)',
                    ],
                    y: [0, -3, 0, 3, 0],
                    scale: [1, 1.02, 1, 0.98, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: (index + 7) * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>

        {/* Security status indicator */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 mb-4 sm:mb-6 text-green-400 text-[10px] sm:text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span>SYSTEM SECURE</span>
          <span className="text-gray-500">|</span>
          <span className="text-blue-400">INITIALIZING...</span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.6 }}
        >
          <Countdown targetDate={launchDate} />
        </motion.div>

        {/* Description */}
        <motion.div
          className="mt-8 sm:mt-12 max-w-lg text-center px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' as const, delay: 0.9 }}
        >
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono">
            <span className="text-green-400">&gt;</span> The future of cybersecurity careers is AI-native.
            <br />
            <span className="text-green-400">&gt;</span> Cyra merges structured skill paths with dynamic, real-world
            <br />
            <span className="text-green-400">&gt;</span> labs to train the next generation of elite defenders.
          </p>

          <Link href="/contact" className="cursor-pointer inline-block mt-6 sm:mt-8">
            <motion.div
              className="relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-500/10 backdrop-blur-sm border-blue-500/30 text-white text-xs sm:text-sm overflow-hidden font-mono border border-theme rounded-full"
              whileHover="hover"
              initial="initial"
              animate={{
                borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.5)', 'rgba(59, 130, 246, 0.3)'],
              }}
              transition={{
                borderColor: { duration: 2, repeat: Infinity },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500"
                variants={{
                  initial: { x: '-100%' },
                  hover: { x: 0 },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' as const }}
              />
              <motion.span
                className="relative z-10 flex items-center gap-2"
                variants={{
                  initial: { color: '#ffffff' },
                  hover: { color: '#ffffff' },
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                [ACCESS_PORTAL]
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
