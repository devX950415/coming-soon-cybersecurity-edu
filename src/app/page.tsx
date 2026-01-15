'use client';

import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  // Set launch date to 86 days from now (matching the design)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 86);

  return (
    <main className="min-h-screen bg-theme relative overflow-hidden">
      {/* Animated spotlight background effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' as const }}
      >
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          initial={{ x: '-50%', y: '-50%', top: '30%', left: '-20%' }}
          animate={{ 
            left: ['−20%', '30%', '20%'],
            top: ['30%', '20%', '35%'],
          }}
          transition={{ 
            duration: 8, 
            ease: 'easeInOut' as const,
            repeat: Infinity,
            repeatType: 'reverse' as const,
          }}
        />
      </motion.div>

      {/* Blue glow background effect */}
      <div className="blue-glow absolute inset-0 pointer-events-none" />
      
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        {/* Coming Soon Text - Letter by letter animation */}
        <div className="overflow-hidden">
          <h1 className="coming-soon-text text-[120px] md:text-[180px] font-bold tracking-tight leading-none mb-8 flex">
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
            <span className="ml-6">
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

        {/* Description added animation */}
        <motion.div
          className="mt-20 max-w-md text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' as const, delay: 0.9 }}
        >
          <p className="text-muted text-sm leading-relaxed">
            The future of cybersecurity careers is AI-native.
            <br />
            Cyra merges structured skill paths with dynamic, real-world labs to train the next generation of elite defenders.
          </p>

          <Link href="/contact" className="cursor-pointer inline-block mt-6">
            <motion.div
              className="relative flex items-center gap-2 px-5 py-2.5 border border-theme rounded-full text-theme text-sm overflow-hidden"
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
                className="relative z-10"
                variants={{
                  initial: { color: 'var(--foreground)' },
                  hover: { color: 'var(--background)' },
                }}
                transition={{ duration: 0.3 }}
              >
                Get in touch
              </motion.span>
              <motion.span
                className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--foreground)' }}
                variants={{
                  initial: { backgroundColor: 'var(--foreground)' },
                  hover: { backgroundColor: 'var(--background)' },
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  variants={{
                    initial: { color: 'var(--background)' },
                    hover: { color: 'var(--foreground)' },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
