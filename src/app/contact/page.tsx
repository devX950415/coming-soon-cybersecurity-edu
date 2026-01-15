import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Blue glow background effect */}
      <div className="blue-glow absolute inset-0 pointer-events-none" />
      
      <Header />

      <div className="flex items-center min-h-screen px-8 pt-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left side - Title */}
          <div>
            <h1 className="text-6xl md:text-7xl font-light text-white leading-tight">
              LET&apos;S
              <br />
              <span className="font-normal">CONNECT</span>
            </h1>
          </div>

          {/* Right side - Form */}
          <div className="max-w-md">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
