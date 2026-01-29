"use client";

import Image from "next/image";
import SafeLink from "../components/SafeLink";

export default function SubmitFilmPage() {
  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden relative">
      
      {/* Side Strips - Left */}
      <div className="absolute left-0 w-2 sm:w-3 md:w-6 lg:w-10 z-20 pointer-events-none" style={{ top: 0, bottom: 0, margin: 0, padding: 0 }}>
          <Image
          src="/assets/Submit side strip.svg"
          alt="Side strip decoration"
          width={200}
          height={2000}
          className="w-full h-full object-cover opacity-90"
            style={{ 
            objectFit: "cover", 
            height: "100%",
            display: "block"
            }}
          />
        </div>

      {/* Side Strips - Right */}
      <div className="absolute right-0 w-2 sm:w-3 md:w-6 lg:w-10 z-20 pointer-events-none md:top-[108px]" style={{ top: 0, bottom: 0, margin: 0, padding: 0 }}>
          <Image
          src="/assets/Submit side strip.svg"
          alt="Side strip decoration"
          width={200}
          height={2000}
          className="w-full h-full object-cover opacity-90"
            style={{ 
            objectFit: "cover", 
            height: "100%", 
            display: "block",
            transform: "scaleX(-1)"
            }}
          />
        </div>

      {/* Content */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center">
        <div className="relative z-30 px-8 py-16 text-center max-w-2xl mx-auto">
          <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#091529] mb-6 uppercase tracking-tight">
            Submissions Closed
            </h1>

          <div className="w-24 md:w-32 h-1 bg-[#091529] mx-auto mb-8"></div>
          
          <p className="font-texta text-[#091529] text-lg md:text-xl mb-6 leading-relaxed">
            Thank you for your interest in The Bhopal Film Festival 2026!
          </p>
          
          <p className="font-texta text-[#091529] text-base md:text-lg mb-8 leading-relaxed opacity-80">
            Film submissions for this edition are now closed. Stay tuned for announcements about selected films and future submission windows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <SafeLink
              href="/"
              className="font-texta inline-flex items-center justify-center px-8 py-3 bg-[#091529] text-white rounded-md text-lg font-medium hover:bg-[#0a1a35] transition"
            >
              Back to Home
            </SafeLink>
            <a
              href="https://konfhub.com/the-bhopal-film-festival-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="font-texta inline-flex items-center justify-center px-8 py-3 border-2 border-[#091529] text-[#091529] rounded-md text-lg font-medium hover:bg-[#091529] hover:text-white transition"
            >
              Get Passes
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="relative w-full overflow-hidden z-20 -mb-[50px] sm:mb-0" style={{ transform: 'translateY(-60px)' }}>
        <Image
            src="/assets/element above footer .png"
          alt=""
            width={1200}
          height={400}
            className="w-full h-auto object-cover pointer-events-none"
          aria-hidden="true"
        />
        </div>
    </main>
  );
}

/*
 * =====================================================
 * ORIGINAL SUBMIT FILM PAGE - COMMENTED OUT
 * =====================================================
 * 
 * The full submission form code has been commented out
 * as submissions are now closed for TBFF 2026.
 * 
 * To restore the form, replace this file with the 
 * original version from git history.
 * 
 * =====================================================
 */
