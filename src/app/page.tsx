'use client';

import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  // Fixed launch date - April 12, 2026 (86 days from Jan 16, 2026)
  // This ensures the countdown persists across page refreshes
  const launchDate = new Date('2026-04-01T00:00:00');

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)',
        }}
      />

      {/* Spotlight from top-left corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'conic-gradient(from 135deg at 0% 0%, rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0.05) 30deg, transparent 60deg)',
        }}
      />
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Spotlight from top-right corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'conic-gradient(from -135deg at 100% 0%, rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0.05) 30deg, transparent 60deg)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Blue glow effect from left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 30%, transparent 60%)',
        }}
      />

      {/* Subtle ambient light on text area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)',
        }}
      />

      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        {/* Coming Soon Text - Letter by letter animation */}
        <div className="overflow-hidden">
          <h1 className="font-display text-[60px] md:text-[100px] lg:text-[140px] font-bold tracking-wide leading-none mb-8 flex uppercase text-white/90">
            {'COMING'.split('').map((letter, index) => (
              <motion.span
                key={`coming-${index}`}
                initial={{ y: 100, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.2 + index * 0.08,
                }}
                className="inline-block"
                style={{ transformOrigin: 'bottom' }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="ml-3 md:ml-5">
              {'SOON'.split('').map((letter, index) => (
                <motion.span
                  key={`soon-${index}`}
                  initial={{ y: -100, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.33, 1, 0.68, 1],
                    delay: 0.6 + index * 0.08,
                  }}
                  className="inline-block"
                  style={{ transformOrigin: 'top' }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.6 }}
        >
          <Countdown targetDate={launchDate} />
        </motion.div>

        {/* Description - centered with quotes */}
        <motion.div
          className="mt-12 max-w-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' as const, delay: 0.9 }}
        >
          <p className="text-gray-400 text-sm leading-relaxed">
            &ldquo;The future of cybersecurity careers is AI-native.
            <br />
            Cyra merges structured skill paths with dynamic, real-world
            <br />
            labs to train the next generation of elite defenders.&rdquo;
          </p>

          <Link href="/contact" className="cursor-pointer inline-block mt-8">
            <motion.div
              className="relative flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm overflow-hidden"
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 bg-white"
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
                  hover: { color: '#0a0a0f' },
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                Get <span className="text-blue-400 group-hover:text-blue-600">Registered</span>
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
