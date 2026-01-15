import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import Link from 'next/link';

export default function Home() {
  // Set launch date to 86 days from now (matching the design)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 86);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Blue glow background effect */}
      <div className="blue-glow absolute inset-0 pointer-events-none" />
      
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        {/* Coming Soon Text */}
        <h1 className="coming-soon-text text-[120px] md:text-[180px] font-bold tracking-tight leading-none mb-8">
          COMING SOON
        </h1>

        {/* Countdown Timer */}
        <Countdown targetDate={launchDate} />

        {/* Description */}
        <div className="mt-20 max-w-md text-left">
          <p className="text-gray-300 text-sm leading-relaxed">
            The future of cybersecurity careers is AI-native.
            <br />
            Cyra merges structured skill paths with dynamic, real-world labs to train the next generation of elite defenders.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-white/30 rounded-full text-white text-sm hover:bg-white/10 transition-colors"
          >
            Get in touch
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
