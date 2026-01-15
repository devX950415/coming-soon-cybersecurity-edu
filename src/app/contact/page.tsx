'use client';

import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function Contact() {
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
            left: ['-20%', '30%', '20%'],
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

      <div className="flex items-center min-h-screen px-8 pt-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left side - Title */}
          <div className="overflow-hidden">
            {/* added animation */}
            <motion.h1
              className="text-6xl md:text-7xl font-light text-theme leading-tight"
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
