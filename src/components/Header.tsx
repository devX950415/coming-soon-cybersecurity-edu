'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo with continuous glow animation */}
      <motion.div className="flex items-center gap-3" variants={itemVariants}>
        <motion.div
          className="w-6 h-6 rounded relative"
          animate={{
            boxShadow: [
              '0 0 10px rgba(59, 130, 246, 0.3)',
              '0 0 20px rgba(59, 130, 246, 0.6)',
              '0 0 10px rgba(139, 92, 246, 0.6)',
              '0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 10px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ backgroundColor: 'var(--foreground)' }}
        />
        <motion.span
          className="font-display font-semibold text-lg cursor-pointer tracking-wider"
          animate={{
            color: ['#ffffff', '#3b82f6', '#ffffff', '#8b5cf6', '#ffffff'],
            textShadow: [
              '0 0 5px rgba(59, 130, 246, 0.3)',
              '0 0 15px rgba(59, 130, 246, 0.5)',
              '0 0 5px rgba(139, 92, 246, 0.3)',
              '0 0 15px rgba(139, 92, 246, 0.5)',
              '0 0 5px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          CYRA
        </motion.span>
      </motion.div>

      {/* Nav links with hover glow */}
      <motion.nav className="flex items-center gap-6 md:gap-10" variants={itemVariants}>
        <Link href="/" className="cursor-pointer">
          <motion.span
            className={`text-sm font-mono transition-colors ${pathname === '/' ? 'text-blue-400' : 'text-gray-400'}`}
            whileHover={{
              color: '#3b82f6',
              textShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
            }}
            animate={pathname === '/' ? {
              textShadow: [
                '0 0 5px rgba(59, 130, 246, 0.3)',
                '0 0 15px rgba(59, 130, 246, 0.6)',
                '0 0 5px rgba(59, 130, 246, 0.3)',
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            [HOME]
          </motion.span>
        </Link>
        <Link href="/contact" className="cursor-pointer">
          <motion.span
            className={`text-sm font-mono transition-colors ${pathname === '/contact' ? 'text-purple-400' : 'text-gray-400'}`}
            whileHover={{
              color: '#8b5cf6',
              textShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
            }}
            animate={pathname === '/contact' ? {
              textShadow: [
                '0 0 5px rgba(139, 92, 246, 0.3)',
                '0 0 15px rgba(139, 92, 246, 0.6)',
                '0 0 5px rgba(139, 92, 246, 0.3)',
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            [CONTACT]
          </motion.span>
        </Link>
      </motion.nav>

      {/* Right side with theme toggle and CTA */}
      <motion.div className="flex items-center gap-3 md:gap-5" variants={itemVariants}>
        <ThemeToggle />
        <Link href="/contact" className="cursor-pointer">
          <motion.div
            className="relative flex items-center gap-2 px-4 md:px-5 py-2 bg-blue-500/10 backdrop-blur-sm border-blue-500/30 text-white text-sm overflow-hidden font-mono border border-theme rounded-full"
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
              ACCESS
            </motion.span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.header>
  );
}
