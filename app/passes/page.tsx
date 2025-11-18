"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import SafeLink from "../components/SafeLink";

export default function PassesPage() {
  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden relative">
      
      {/* Decorative Circle Elements */}
      <div className="absolute top-20 left-0 w-[120px] sm:w-[200px] md:w-[250px] lg:w-[400px] h-auto z-0 pointer-events-none opacity-30">
        <Image
          src="/assets/circle.png"
          alt=""
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>
      
      <div className="absolute top-40 right-4 sm:right-10 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[300px] h-auto z-0 pointer-events-none opacity-25">
        <Image
          src="/assets/circlep.png"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto mix-blend-luminosity"
        />
      </div>

      

      {/* Small Decorative Elements - Leaves */}
      <div className="absolute top-[25%] right-[8%] z-15 pointer-events-none opacity-40 hidden md:block">
        <Image
          src="/assets/leaf1.png"
          alt="Leaf decoration"
          width={120}
          height={120}
          className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 object-contain"
          style={{ 
            transform: "rotate(-15deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      <div className="absolute top-[45%] left-[12%] z-15 pointer-events-none opacity-35 hidden md:block">
        <Image
          src="/assets/leaf2.png"
          alt="Leaf decoration"
          width={100}
          height={100}
          className="w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20 object-contain"
          style={{ 
            transform: "rotate(25deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      {/* Small Decorative Elements - Film Frames (Upper Area Only) */}
      <div className="absolute top-[30%] right-[12%] z-15 pointer-events-none opacity-25 hidden lg:block">
        <Image
          src="/assets/frame.png"
          alt="Film frame"
          width={80}
          height={60}
          className="w-16 md:w-20 lg:w-20 h-12 md:h-14 lg:h-16 object-contain"
          style={{ 
            transform: "rotate(10deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      <div className="absolute top-[35%] left-[18%] z-15 pointer-events-none opacity-20 hidden lg:block">
        <Image
          src="/assets/frame.png"
          alt="Film frame"
          width={70}
          height={50}
          className="w-12 md:w-14 lg:w-16 h-9 md:h-10 lg:h-12 object-contain"
          style={{ 
            transform: "rotate(-20deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      <div className="absolute top-[50%] right-[20%] z-15 pointer-events-none opacity-20 hidden lg:block">
        <Image
          src="/assets/frame.png"
          alt="Film frame"
          width={65}
          height={45}
          className="w-11 md:w-12 lg:w-14 h-8 md:h-9 lg:h-10 object-contain"
          style={{ 
            transform: "rotate(15deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      {/* Additional Small Leaf Elements */}
      <div className="absolute top-[55%] left-[20%] z-15 pointer-events-none opacity-30 hidden lg:block">
        <Image
          src="/assets/leaf1.png"
          alt="Leaf decoration"
          width={90}
          height={90}
          className="w-16 md:w-20 lg:w-20 h-16 md:h-20 lg:h-20 object-contain"
          style={{ 
            transform: "rotate(45deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      <div className="absolute top-[40%] right-[25%] z-15 pointer-events-none opacity-25 hidden lg:block">
        <Image
          src="/assets/leaf2.png"
          alt="Leaf decoration"
          width={85}
          height={85}
          className="w-16 md:w-20 lg:w-20 h-16 md:h-20 lg:h-20 object-contain"
          style={{ 
            transform: "rotate(-30deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      {/* Dog - Half on Top Left Corner */}
      <div className="absolute left-0 top-0 z-30 pointer-events-none overflow-hidden" style={{ transform: 'translateX(-50%) translateY(0)' }}>
        <Image
          src="/assets/dog.png"
          alt=""
          width={200}
          height={300}
          className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] h-auto object-contain"
        />
      </div>

      {/* Character - Half on Top Right Corner */}
      <div className="absolute right-0 top-0 z-30 pointer-events-none overflow-hidden passes-top-right-character" style={{ transform: 'translateX(calc(50% - 90px)) translateY(0) scaleX(-1)' }}>
        <Image
          src="/assets/Copy of 11-01.png"
          alt=""
          width={200}
          height={300}
          className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px] h-auto object-contain"
        />
      </div>

      {/* Bottom Characters - Left and Right Corners, Just Above Footer - 70% Visible */}
      <div className="absolute bottom-[80px] left-0 z-30 pointer-events-none overflow-hidden">
        <Image
          src="/assets/Copy of 6-01.png"
          alt=""
          width={100}
          height={200}
          className="w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px] xl:w-[540px] h-auto object-contain"
          style={{ transform: 'translateX(-40%)' }}
        />
      </div>
      <div className="absolute bottom-[80px] right-0 z-30 pointer-events-none overflow-hidden">
        <Image
          src="/assets/Copy of 7-01.png"
          alt=""
          width={100}
          height={200}
          className="w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px] xl:w-[540px] h-auto object-contain"
          style={{ transform: 'translateX(40%)' }}
        />
      </div>

      {/* Yellow Content Section */}
      <div className="relative w-full">
        {/* Main Yellow Content Area */}
        <div className="relative bg-[#FFCE21] px-4 md:px-6 lg:px-12 xl:px-16 pb-12 md:pb-16 lg:pb-16 pt-0 min-h-[calc(100vh-80px)]">
            {/* Content with padding to avoid large characters */}
            <div className="relative z-30 pl-16 sm:pl-20 md:pl-12 lg:pl-16 xl:pl-24 pr-16 sm:pr-20 md:pr-12 lg:pr-16 xl:pr-24 pt-20 md:pt-24 lg:pt-24 flex flex-col items-center justify-center min-h-[70vh] max-w-5xl mx-auto">
              {/* Coming Soon Title */}
              <h1 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-[#091529] mb-6 md:mb-8 uppercase tracking-tight text-center">
                Coming Soon
              </h1>
              
              <div className="w-24 md:w-28 lg:w-32 h-1 bg-[#091529] mb-6 md:mb-8"></div>
              
              <p className="font-texta text-[#091529] text-xl md:text-2xl lg:text-2xl mb-4 md:mb-6 text-center max-w-2xl leading-relaxed px-4 md:px-0">
                Festival passes and tickets will be available soon!
              </p>
              
              <p className="font-texta text-[#091529] text-base md:text-lg lg:text-lg mb-8 md:mb-12 text-center max-w-xl leading-relaxed opacity-90 px-4 md:px-0">
                Stay tuned for updates on passes, ticket pricing, and early bird offers. 
                Be the first to know when booking opens.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
                <SafeLink
                  href="/"
                  className="font-texta inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#091529] text-white rounded-md shadow-lg text-base md:text-lg font-medium hover:bg-[#0a1a35] transition transform hover:scale-105"
                >
                  Back to Home
                </SafeLink>
              </div>

              {/* Small Decorative Elements Around Content */}
              <div className="mt-16 flex items-center gap-6 opacity-30">
                <Image
                  src="/assets/frame.png"
                  alt="Film frame decoration"
                  width={60}
                  height={40}
                  className="w-12 h-8 object-contain"
                  style={{ transform: "rotate(-5deg)" }}
                />
                <Image
                  src="/assets/frame.png"
                  alt="Film frame decoration"
                  width={80}
                  height={55}
                  className="w-16 h-10 object-contain"
                />
                <Image
                  src="/assets/frame.png"
                  alt="Film frame decoration"
                  width={60}
                  height={40}
                  className="w-12 h-8 object-contain"
                  style={{ transform: "rotate(5deg)" }}
                />
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}

