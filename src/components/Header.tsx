'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 flex items-center justify-between">
      {/* logo */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center gap-2 relative">
        <Image
          src="/logo.png"
          fill
          sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
          alt="CYRA Logo"
          className="object-contain"
        />
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-3 sm:gap-6 md:gap-10">
        <Link href="/" className="cursor-pointer">
          <span
            className={`text-xs sm:text-sm font-mono transition-colors ${pathname === '/' ? 'text-blue-400' : 'text-gray-400'} hover:text-blue-400`}
          >
            [HOME]
          </span>
        </Link>
        <Link href="/contact" className="cursor-pointer">
          <span
            className={`text-xs sm:text-sm font-mono transition-colors ${pathname === '/contact' ? 'text-purple-400' : 'text-gray-400'} hover:text-purple-400`}
          >
            [CONTACT]
          </span>
        </Link>
      </nav>

      {/* Right side CTA - hidden on very small screens */}
      <div className="hidden sm:flex items-center">
        <Link href="/contact" className="cursor-pointer">
          <div className="relative flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-blue-500/10 backdrop-blur-sm border-blue-500/30 text-white text-xs sm:text-sm overflow-hidden font-mono border border-theme rounded-full hover:bg-blue-500/20 transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            ACCESS
          </div>
        </Link>
      </div>
    </header>
  );
}
