"use client";

import Image from "next/image";
import SafeLink from "../components/SafeLink";

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden relative">
      
      {/* Section 1 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 1 .png" 
          alt="TBFF 2026 - Section 1" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
          priority
        />
      </section>

      {/* Section 2 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 2 .png" 
          alt="TBFF 2026 - Section 2" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 3 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/Section 3.png" 
          alt="TBFF 2026 - Section 3" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 4 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 4.png" 
          alt="TBFF 2026 - Section 4" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 5 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 5.png" 
          alt="TBFF 2026 - Section 5" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 6 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 6.png" 
          alt="TBFF 2026 - Section 6" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 7 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 7.png" 
          alt="TBFF 2026 - Section 7" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 8 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 8.png" 
          alt="TBFF 2026 - Section 8" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 9 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 9.png" 
          alt="TBFF 2026 - Section 9" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 10 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 10.png" 
          alt="TBFF 2026 - Section 10" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 11 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 11.png" 
          alt="TBFF 2026 - Section 11" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 12 */}
      <section className="w-full">
        <Image 
          src="/Event 2026/section 12.png" 
          alt="TBFF 2026 - Section 12" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Section 13 */}
      <section className="w-full pb-16 md:pb-0">
        <Image 
          src="/Event 2026/section 13.png" 
          alt="TBFF 2026 - Section 13" 
          width={1920} 
          height={1080} 
          className="w-full h-auto"
          quality={100}
          unoptimized
        />
      </section>

      {/* Spacer for mobile to prevent footer overlap */}
      <div className="h-20 md:hidden bg-[#FFCE21]"></div>

      {/* Bottom Navigation - Hidden on mobile */}
      <div className="hidden md:flex w-full bg-[#FFCE21] px-4 md:px-8 lg:px-16 py-12 justify-center gap-4">
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
          Book Tickets
        </a>
      </div>

    </main>
  );
}
