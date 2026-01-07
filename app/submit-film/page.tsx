"use client";

import Image from "next/image";

export default function SubmitFilmPage() {
  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden relative">
      {/* Side Strips - Left - Flush with navbar (no visible gap) */}
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

      {/* Side Strips - Right - Flush with navbar (no visible gap) */}
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

      {/* Content Wrapper */}
      <div className="relative w-full">
        {/* Yellow Content Section */}
        <div className="relative w-full">
          {/* Main Yellow Content Area */}
          <div className="relative bg-[#FFCE21] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-0 pt-0 min-h-[calc(100vh-80px)]" style={{ marginLeft: '8px' }}>
            {/* Content with padding to avoid side strips - full width */}
            <div className="relative z-20 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16 pt-0 w-full max-w-[1600px] mx-auto">
              {/* Title */}
              <h1 className="font-bebas text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#091529] mb-1 sm:mb-1 md:mb-2 lg:mb-2 uppercase tracking-tight mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-left">
                SUBMISSION GUIDELINES & ENTRY FORM
              </h1>
              {/* (keep all rules/guidelines content here as before, if needed, or truncate for brevity) */}

              {/* Submission Closed Notice */}
              <div className="w-full py-24 flex justify-center items-center">
                <div className="bg-[#091529] text-white rounded-lg shadow-lg p-8 text-center max-w-lg mx-auto">
                  <h2 className="font-bebas text-2xl sm:text-3xl font-bold uppercase mb-4">Submissions Closed</h2>
                  <p className="font-texta text-base sm:text-lg">
                    Thank you for your interest! Film submissions for TBFF 2025 are now closed.<br />
                    Please follow us on our social media for updates and future calls for entries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Element Above Footer */}
      <div className="relative w-full overflow-hidden z-20 mt-8 sm:mt-12 md:mt-16 -mb-[50px] sm:mb-0" style={{ transform: 'translateY(-60px)' }}>
        <div className="translate-x-0 sm:translate-x-0">
          <Image
            src="/assets/element above footer .png"
            alt=""
            width={1200}
            height={400}
            className="w-full h-auto object-cover pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </main>
  );
}
