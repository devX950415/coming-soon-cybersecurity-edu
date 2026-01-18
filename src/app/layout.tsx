import type { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import './globals.css';

// Futuristic display font for headings
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

// Modern tech font for body text
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CYRA - Coming Soon',
  description: 'The future of cybersecurity careers is AI-native. Cyra merges structured skill paths with dynamic, real-world labs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-body">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
