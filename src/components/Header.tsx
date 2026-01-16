'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  // added animations with framer motion
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
    // added animation
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-3" variants={itemVariants}>
        <div className="w-6 h-6 bg-theme text-theme rounded" style={{ backgroundColor: 'var(--foreground)' }} />
        <span className="text-theme font-display font-semibold text-lg cursor-pointer tracking-wider">CYRA</span>
      </motion.div>

      <motion.nav className="flex items-center gap-6 md:gap-10" variants={itemVariants}>
        <Link
          href="/"
          className={`text-sm cursor-pointer transition-colors ${pathname === '/' ? 'text-theme' : 'text-muted hover:text-theme'}`}
        >
          Home
        </Link>
        <Link
          href="/contact"
          className={`text-sm cursor-pointer transition-colors ${pathname === '/contact' ? 'text-theme' : 'text-muted hover:text-theme'}`}
        >
          Contact
        </Link>
      </motion.nav>

      <motion.div className="flex items-center gap-3 md:gap-5" variants={itemVariants}>
        <ThemeToggle />
        <Link href="/contact" className="cursor-pointer">
          <motion.div
            className="relative flex items-center gap-2 px-4 md:px-5 py-2 border border-theme rounded-full text-theme text-sm overflow-hidden"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute inset-0 bg-white"
              variants={{
                initial: { x: '-100%' },
                hover: { x: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
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
    </motion.header>
  );
}
