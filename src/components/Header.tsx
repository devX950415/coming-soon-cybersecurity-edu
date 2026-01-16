'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">

      {/* logo */}

      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center gap-2 relative relative">
        <Image
          src="/logo.png"
          fill
          alt="CYRA Logo"
          className="object-contain"
        />
      </div>

      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className={`text-sm transition-colors ${pathname === '/' ? 'text-theme' : 'text-muted hover:text-theme'}`}
        >
          Home
        </Link>
        <Link
          href="/contact"
          className={`text-sm transition-colors ${pathname === '/contact' ? 'text-theme' : 'text-muted hover:text-theme'}`}
        >
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-2.5 border border-theme rounded-full text-theme text-sm hover:opacity-80 transition-colors"
        >
          Get in touch
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--foreground)' }}>
            <svg className="w-3 h-3" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </header>
  );
}
