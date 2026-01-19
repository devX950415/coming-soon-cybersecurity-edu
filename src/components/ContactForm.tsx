"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const inputVariants = {
    initial: { borderColor: 'rgba(59, 130, 246, 0.3)' },
    focus: {
      borderColor: 'rgba(59, 130, 246, 0.8)',
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal-style header */}
      <motion.div
        className="flex items-center gap-2 mb-4 sm:mb-6 text-green-400 text-[10px] sm:text-xs font-mono"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-gray-500">&gt;</span>
        <span>INITIALIZING_SECURE_FORM...</span>
        <motion.span
          className="w-2 h-4 bg-green-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.div>

      <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 font-mono">
        <span className="text-green-400">&gt;</span> Let&apos;s talk about your next way of education through AI-powered cybersecurity training
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial="initial"
          animate={focusedField === 'firstName' ? 'focus' : 'initial'}
          variants={inputVariants}
          className="relative"
        >
          <label className="block text-blue-400 text-xs mb-2 font-mono uppercase tracking-wider">
            <span className="text-gray-500">[</span>First_Name<span className="text-gray-500">]</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => setFocusedField(null)}
            className="w-full bg-[#0a0a0f]/50 border border-blue-500/30 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
            placeholder="Somya"
          />
          {focusedField === 'firstName' && (
            <motion.div
              className="absolute -inset-px rounded pointer-events-none"
              style={{ border: '1px solid rgba(59, 130, 246, 0.5)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        <motion.div
          initial="initial"
          animate={focusedField === 'lastName' ? 'focus' : 'initial'}
          variants={inputVariants}
          className="relative"
        >
          <label className="block text-blue-400 text-xs mb-2 font-mono uppercase tracking-wider">
            <span className="text-gray-500">[</span>Last_Name<span className="text-gray-500">]</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => setFocusedField(null)}
            className="w-full bg-[#0a0a0f]/50 border border-blue-500/30 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
            placeholder="Prakash"
          />
          {focusedField === 'lastName' && (
            <motion.div
              className="absolute -inset-px rounded pointer-events-none"
              style={{ border: '1px solid rgba(59, 130, 246, 0.5)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      <motion.div
        initial="initial"
        animate={focusedField === 'email' ? 'focus' : 'initial'}
        variants={inputVariants}
        className="relative"
      >
        <label className="block text-purple-400 text-xs mb-2 font-mono uppercase tracking-wider">
          <span className="text-gray-500">[</span>Email_Address<span className="text-gray-500">]</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-[#0a0a0f]/50 border border-purple-500/30 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          placeholder="somya@gmail.com"
        />
        {focusedField === 'email' && (
          <motion.div
            className="absolute -inset-px rounded pointer-events-none"
            style={{ border: '1px solid rgba(139, 92, 246, 0.5)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      <motion.div
        initial="initial"
        animate={focusedField === 'phone' ? 'focus' : 'initial'}
        variants={inputVariants}
        className="relative"
      >
        <label className="block text-blue-400 text-xs mb-2 font-mono uppercase tracking-wider">
          <span className="text-gray-500">[</span>Phone_Number<span className="text-gray-500">]</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-[#0a0a0f]/50 border border-blue-500/30 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
          placeholder="0876543210"
        />
        {focusedField === 'phone' && (
          <motion.div
            className="absolute -inset-px rounded pointer-events-none"
            style={{ border: '1px solid rgba(59, 130, 246, 0.5)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      <motion.div
        initial="initial"
        animate={focusedField === 'message' ? 'focus' : 'initial'}
        variants={inputVariants}
        className="relative"
      >
        <label className="block text-purple-400 text-xs mb-2 font-mono uppercase tracking-wider">
          <span className="text-gray-500">[</span>Message<span className="text-gray-500">]</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          rows={3}
          className="w-full bg-[#0a0a0f]/50 border border-purple-500/30 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all resize-none"
          placeholder="Tell us more about yourself..."
        />
        {focusedField === 'message' && (
          <motion.div
            className="absolute -inset-px rounded pointer-events-none"
            style={{ border: '1px solid rgba(139, 92, 246, 0.5)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Cybersecurity-themed submit button */}
      <motion.button
        type="submit"
        className="relative w-full sm:w-auto mt-4 sm:mt-6 px-6 py-2.5 sm:py-3 bg-blue-500/10 backdrop-blur-sm border-blue-500/30 text-white text-sm overflow-hidden font-mono cursor-pointer border border-theme rounded-full"
        whileHover="hover"
        initial="initial"
        animate={{
          borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.5)', 'rgba(59, 130, 246, 0.3)'],
          boxShadow: [
            '0 0 10px rgba(59, 130, 246, 0.1)',
            '0 0 20px rgba(139, 92, 246, 0.2)',
            '0 0 10px rgba(59, 130, 246, 0.1)',
          ],
        }}
        transition={{
          borderColor: { duration: 2, repeat: Infinity },
          boxShadow: { duration: 2, repeat: Infinity },
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
          className="relative z-10 flex items-center gap-2 justify-center"
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
          [TRANSMIT_DATA]
        </motion.span>
      </motion.button>

      {/* Status indicator */}
      <motion.div
        className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4 text-gray-500 text-[10px] sm:text-xs font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span>ENCRYPTION: AES-256</span>
        <span className="text-gray-600">|</span>
        <span>STATUS: READY</span>
      </motion.div>
    </motion.form>
  );
}
