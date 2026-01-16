'use client';

import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function Contact() {
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

      <div className="flex items-center min-h-screen px-8 pt-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left side - Title */}
          <div className="overflow-hidden">
            {/* added animation */}
            <motion.h1
              className="text-6xl md:text-7xl font-display font-light text-theme leading-tight tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span
                className="block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.3 }}
              >
                LET&apos;S
              </motion.span>
              <motion.span
                className="block font-normal"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.5 }}
              >
                CONNECT
              </motion.span>
            </motion.h1>
          </div>

          {/* Right side - Form */}
          {/* added animation */}
          <motion.div
            className="max-w-md"
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
