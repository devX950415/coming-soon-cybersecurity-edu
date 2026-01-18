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
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center gap-2 relative">
        <Image
          src="/logo.png"
          fill
          alt="CYRA Logo"
          className="object-contain"
        />
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="cursor-pointer">
          <span
            className={`text-sm font-mono transition-colors ${pathname === '/' ? 'text-blue-400' : 'text-gray-400'} hover:text-blue-400`}
          >
            [HOME]
          </span>
        </Link>
        <Link href="/contact" className="cursor-pointer">
          <span
            className={`text-sm font-mono transition-colors ${pathname === '/contact' ? 'text-purple-400' : 'text-gray-400'} hover:text-purple-400`}
          >
            [CONTACT]
          </span>
        </Link>
      </nav>

      {/* Right side with theme toggle */}
      <div className="flex items-center gap-3 md:gap-5">
        <ThemeToggle />
        <Link href="/contact" className="cursor-pointer">
          <div className="relative flex items-center gap-2 px-4 md:px-5 py-2 bg-blue-500/10 backdrop-blur-sm border-blue-500/30 text-white text-sm overflow-hidden font-mono border border-theme rounded-full hover:bg-blue-500/20 transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            ACCESS
          </div>
        </Link>
      </div>
    </header>
  );
}
