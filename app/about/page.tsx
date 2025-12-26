"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  // Scroll-based flip for mobile characters
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 767) return; // Only for mobile
    
    const flipCards = document.querySelectorAll('.character-flip-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('flipped');
          } else {
            entry.target.classList.remove('flipped');
          }
        });
      },
      {
        threshold: 0.5, // Flip when 50% visible
        rootMargin: '0px'
      }
    );
    
    flipCards.forEach((card) => {
      observer.observe(card);
    });
    
    return () => {
      flipCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden overflow-y-visible relative">
      
      {/* Main Content Section */}
      <div className="relative w-full overflow-x-hidden overflow-y-visible">
        {/* Side Semicircles - Left (hhhh.png) - Bulge facing right towards text */}
        <div className="absolute left-0 top-0 h-full w-[150px] md:w-[400px] pointer-events-none z-[1]">
          {/* Mobile version - smaller */}
          <Image
            src="/assets/hhhh.png"
            alt=""
            width={400}
            height={1200}
            className="md:hidden absolute left-0 h-full w-auto object-contain"
            style={{
              top: "50%",
              transform: "translateY(calc(-50% + 300px - 250px)) translateX(-30%) scale(0.4) scaleY(-1)",
            }}
            aria-hidden="true"
          />
          {/* Desktop version - full size (hidden on tablet) */}
          <Image
            src="/assets/hhhh.png"
            alt=""
            width={400}
            height={1200}
            className="hidden lg:block absolute left-0 h-full w-auto object-contain"
            style={{
              top: "50%",
              transform: "translateY(calc(-50% + 300px - 250px)) translateX(-30%) scaleY(-1)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Side Semicircles - Left (hhhh.png duplicated) - Top - Green - Top Left Corner */}
        <div className="absolute left-0 top-[158px] pointer-events-none z-[-10] hidden lg:block" style={{ overflow: 'visible' }}>
          <img
            src="/assets/hhhh.png"
            alt=""
            className="absolute left-0"
            style={{
              width: '2000px',
              height: 'auto',
              transform: "rotate(-35deg) scale(4)",
              transformOrigin: "top left",
              filter: "hue-rotate(80deg) saturate(1.5) brightness(1.1)",
              opacity: 1
            }}
            aria-hidden="true"
          />
        </div>

        {/* Side Semicircles - Right (hhhh.png duplicated) - Top - Green - Top Right Corner */}
        <div className="absolute right-0 top-[158px] pointer-events-none z-[-10] hidden lg:block" style={{ overflow: 'visible' }}>
          <img
            src="/assets/hhhh.png"
            alt=""
            className="absolute right-0"
            style={{
              width: '2000px',
              height: 'auto',
              transform: "scaleX(-1) rotate(35deg) scale(4)",
              transformOrigin: "top right",
              filter: "hue-rotate(80deg) saturate(1.5) brightness(1.1)",
              opacity: 1
            }}
            aria-hidden="true"
          />
        </div>

        {/* Side Semicircles - Right (hhhh.png duplicated) - Bottom - Flipped - Aligns with second paragraph */}
        <div className="absolute right-0 top-0 h-full w-[500px] pointer-events-none z-[1] hidden lg:block">
          <Image
            src="/assets/hhhh.png"
            alt=""
            width={500}
            height={1500}
            className="absolute right-0 h-auto object-contain"
            style={{
              top: "calc(108px + 100px + 25vh)",
              height: "80vh",
              width: "auto",
              transform: "translateX(0%) scaleX(-1) scale(1.5)"
            }}
            aria-hidden="true"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-6 lg:px-12 xl:px-16 flex flex-col pt-8 sm:pt-12 md:pt-14 lg:pt-20 xl:pt-24 pb-0" style={{ paddingBottom: '0', marginTop: '30px' }}>
          {/* About Us Section */}
          <div className="flex flex-row lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-start w-full mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
            
            {/* Left Side - Character with Spotlight Illustration */}
            <div className="relative flex flex-col items-start justify-start w-[35%] sm:w-[40%] md:w-[38%] lg:w-[45%] xl:w-[48%] h-full z-30 overflow-visible -ml-8 sm:-ml-12 md:-ml-12 lg:-ml-32 xl:-ml-48 2xl:-ml-60">
              {/* Desktop character size reduced further (≈3x smaller on large screens) */}
              <div className="relative w-full max-w-[150px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[150px] xl:max-w-[175px] 2xl:max-w-[200px] z-40 -ml-[25px] md:ml-0">
                <Image
                  src="/assets/Copy of 5-01.png"
                  alt="Film spotlight character"
                  width={3900}
                  height={5850}
                  className="w-full h-auto object-contain about-character-img"
                  priority
                  style={{
                    transformOrigin: "center top",
                    position: 'relative',
                    zIndex: 40
                  }}
                />
              </div>
              {/* hhhh.png below character */}
              <div className="relative w-full mt-4 pointer-events-none z-10" style={{ zIndex: 10 }}>
                <Image
                  src="/assets/hhhh.png"
                  alt=""
                  width={400}
                  height={1200}
                  className="w-full h-auto object-contain"
                  style={{
                    maxWidth: '300px',
                    transform: 'scaleY(-1)',
                    position: 'relative',
                    zIndex: 10
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Right Side - ABOUT US Text - Split into 2 sections */}
            <div className="relative z-20 w-[65%] sm:w-[60%] md:w-[62%] lg:w-[55%] xl:w-[52%] flex flex-col justify-center items-start text-left px-2 sm:px-4 md:px-4 lg:items-center lg:text-center lg:px-0 lg:-ml-[140px]">
              {/* hhhh.png beside About Us content */}
              <div 
                className="absolute pointer-events-none z-10 hidden lg:block"
                style={{
                  top: '200px',
                  left: '-500px',
                  width: '300px',
                  height: 'auto'
                }}
              >
                <Image
                  src="/assets/hhhh.png"
                  alt=""
                  width={400}
                  height={1200}
                  className="w-full h-auto object-contain"
                  aria-hidden="true"
                />
              </div>
              
              {/* Heading */}
              <h1 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-[#091529] uppercase tracking-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-left lg:text-center">
                ABOUT US
              </h1>
              
              {/* Section 1 - First Paragraph */}
              <div className="relative z-20 mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-2xl" style={{ marginBottom: '30px' }}>
                <p className="font-texta text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-[1.4] text-left lg:text-center text-[#091529] px-0">
                  This is a passionate collective of filmmakers, artists, and storytellers who believe in the power of cinema to build connections and spark dialogue. The Bhopal Film Festival was born from the desire to create a space where independent voices can be seen, heard, and celebrated, right here in the heart of Madhya Pradesh.
                </p>
              </div>

              {/* Section 2 - Second Paragraph */}
              <div className="relative z-20 max-w-2xl lg:mt-[30px]">
                <p className="font-texta text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-[1.4] text-left lg:text-center text-[#091529] px-0">
                  Our work grows from collaboration and curiosity. We come from different creative backgrounds, but share a commitment to stories that are honest, rooted, and imaginative. Together, we aim to nurture a community where cinema becomes more than an art form, it becomes a shared experience that brings people closer. We see this festival as a living, evolving platform, one that supports filmmakers, engages audiences, and places Bhopal firmly on the map for independent cinema and cultural dialogue.
                </p>
              </div>
            </div>
          </div>

          {/* Meet the Crew Section - Below About Us */}
          <div className="relative z-30 w-screen mt-4 sm:mt-6 md:mt-8 lg:-mt-[200px] mb-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', marginBottom: '0' }}>
            {/* MEET THE CREW Image - Above the section */}
            <div className="relative w-full flex justify-center mb-4" style={{ marginTop: '0' }}>
              <Image
                src="/assets/meet.png"
                alt="Meet the Crew"
                width={240}
                height={80}
                className="w-[200px] sm:w-[240px] md:w-[280px] h-auto"
                priority
              />
            </div>
            
            {/* Background Image Container - Full width edge to edge, no padding */}
            <div className="relative w-full overflow-hidden mt-4 sm:mt-6 md:mt-8 lg:mt-10" style={{ marginBottom: '0' }}>
              <div className="relative w-full" style={{ position: 'relative', aspectRatio: 'auto' }}>
                {/* Background Image - Full height to show all segments */}
                <Image
                  src="/assets/about us bg.png"
                  alt="Meet the Crew Background"
                  width={2000}
                  height={2800}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  priority
                />
                
                {/* Character Overlays - 4 characters in sequence: 9-01, 10-01, dog, 1-01 */}
                <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', top: 0, left: 0, right: 0, bottom: 0 }}>
                  {/* Character 1 - Copy of 9-01 */}
                  <div 
                    className="absolute pointer-events-auto z-20 character-flip-card character-flip-scroll top-[10%] left-0 w-[60%] max-w-[300px] md:top-[12%] md:left-0 md:-ml-[50px] md:w-[76%] md:max-w-[1100px]"
                  >
                    <div className="character-flip-card-inner">
                      <div className="character-flip-card-front">
                        <Image
                          src="/assets/Copy of 9-01.png"
                          alt="Character 1"
                          width={400}
                          height={750}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="character-flip-card-back" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Image
                          src="/crew/crew 1.png"
                          alt="Crew Member 1"
                          width={320}
                          height={360}
                          className="object-contain w-[150px] max-w-[150px] md:w-[420px] md:max-w-[420px] h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Character 2 - Copy of 10-01 */}
                  <div 
                    className="absolute pointer-events-auto z-20 character-flip-card character-flip-scroll top-[25%] right-0 w-[60%] max-w-[300px] md:top-[28%] md:right-0 md:-mr-[50px] md:w-[76%] md:max-w-[1100px]"
                  >
                    <div className="character-flip-card-inner">
                      <div className="character-flip-card-front">
                        <Image
                          src="/assets/Copy of 10-01.png"
                          alt="Character 2"
                          width={400}
                          height={750}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="character-flip-card-back" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Image
                          src="/crew/crew 2.png"
                          alt="Crew Member 2"
                          width={300}
                          height={340}
                          className="object-contain w-[120px] max-w-[120px] md:w-[350px] md:max-w-[350px] h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Character 3 - dog.png */}
                  <div 
                    className="absolute pointer-events-auto z-20 character-flip-card character-flip-scroll top-[45%] left-0 w-[55%] max-w-[270px] md:top-[48%] md:left-0 md:w-[50%] md:max-w-[700px]"
                    style={{ marginLeft: '-30px' }}
                  >
                    <div className="character-flip-card-inner">
                      <div className="character-flip-card-front">
                        <Image
                          src="/assets/dog.png"
                          alt="Character 3"
                          width={400}
                          height={750}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="character-flip-card-back" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Image
                          src="/crew/crew 3.png"
                          alt="Crew Member 3"
                          width={300}
                          height={340}
                          className="object-contain w-[120px] max-w-[120px] md:w-[350px] md:max-w-[350px] h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Character 4 - Copy of 1-01 */}
                  <div 
                    className="absolute pointer-events-auto z-20 character-flip-card character-flip-scroll top-[65%] right-0 w-[65%] max-w-[320px] md:top-[70%] md:right-0 md:w-[90%] md:max-w-[1300px]"
                  >
                    <div className="character-flip-card-inner">
                      <div className="character-flip-card-front">
                        <Image
                          src="/assets/Copy of 1-01.png"
                          alt="Character 4"
                          width={400}
                          height={750}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="character-flip-card-back" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Image
                          src="/crew/crew 4.png"
                          alt="Crew Member 4"
                          width={300}
                          height={340}
                          className="object-contain w-[120px] max-w-[120px] md:w-[350px] md:max-w-[350px] h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </main>
  );
}
