'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-white rounded" />
        <span className="text-white font-semibold text-lg">CYRA</span>
      </div>

      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className={`text-sm ${pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          Home
        </Link>
        <Link
          href="/contact"
          className={`text-sm ${pathname === '/contact' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          Contact
        </Link>
      </nav>

      <Link
        href="/contact"
        className="flex items-center gap-2 px-5 py-2.5 border border-white/30 rounded-full text-white text-sm hover:bg-white/10 transition-colors"
      >
        Get in touch
        <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </header>
  );
}
