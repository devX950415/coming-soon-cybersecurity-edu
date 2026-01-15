import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
