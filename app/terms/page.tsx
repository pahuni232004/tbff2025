"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden relative">

      {/* Side Strips - Left - Flush with navbar (no visible gap) */}
      <div className="absolute left-0 w-2 sm:w-3 md:w-6 lg:w-10 z-20 pointer-events-none" style={{ top: 0, bottom: 0, margin: 0, padding: 0 }}>
        <Image
          src="/assets/Terms side strip.svg"
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
      <div className="absolute right-0 w-2 sm:w-3 md:w-6 lg:w-10 z-20 pointer-events-none" style={{ top: 0, bottom: 0, margin: 0, padding: 0 }}>
        <Image
          src="/assets/Terms side strip.svg"
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

      {/* Yellow Content Section */}
      <div className="relative w-full">
        {/* Main Yellow Content Area */}
        <div className="relative bg-[#FFCE21] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-2 sm:pb-3 md:pb-4 lg:pb-6 pt-0 min-h-[calc(100vh-80px)]">
            {/* Content with padding to avoid side strips */}
            <div className="relative z-20 pl-4 sm:pl-6 md:pl-8 lg:pl-12 pr-4 sm:pr-6 md:pr-8 lg:pr-12 pt-0">
              {/* Title */}
              <h1 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#091529] mb-1 sm:mb-1 md:mb-2 lg:mb-2 uppercase tracking-tight mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                TERMS AND CONDITIONS
              </h1>
              
              <p className="font-texta text-[#091529] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed">
                By submitting a film to The Bhopal Film Festival, you (the filmmaker/submitter) agree to the following terms and conditions:
              </p>

              {/* Content Sections */}
              <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 text-[#091529]">
              
              {/* AUTHORITY & RIGHTS */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">AUTHORITY & RIGHTS</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  You confirm that you are the <strong>rightful owner</strong> of the film or have the necessary authority/permission to submit it. If you are submitting on behalf of a team, you must have consent from all producers/rights-holders. You must also have permission from any third-party rights holders (e.g., music composers, stock footage providers). You warrant that <strong>no other party's rights are infringed</strong> and that you will <strong>indemnify the festival</strong> for any losses or damages arising from claims regarding rights or disputes.
                </p>
              </section>

              {/* ORIGINAL CONTENT */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">ORIGINAL CONTENT</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  Your film <strong>must not contain</strong> any content that <strong>violates copyright</strong> or intellectual property rights. All music, footage, images, or graphics must be original or properly licensed. The festival will <strong>NOT BE liable</strong> for copyright infringements, with responsibility lying solely with the applicant/filmmaker.
                </p>
              </section>

              {/* PROHIBITED CONTENT */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">PROHIBITED CONTENT</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  The festival <strong>will not accept films that contain hateful or malicious content</strong>. Specifically, we disallow content that <strong>promotes racism, hate speech, communal or religious disharmony, gender discrimination, extreme violence towards animals, or serves as propaganda</strong> for any extremist ideology. Pornography or material illegal under Indian laws will also not be screened. Films violating these guidelines will be disqualified.
                </p>
              </section>

              {/* CERTIFICATION & GOVERNMENT CLEARANCE */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">CERTIFICATION & GOVERNMENT CLEARANCE</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  While Indian law generally requires censorship clearance for public screenings, the festival will obtain an <strong>exemption from the Central Board of Film Certification (CBFC)</strong> for festival screenings. Therefore, a <strong>CBFC certificate is NOT required</strong> for submission or selection. If a film is already CBFC certified, only that version will be screened. Otherwise, the festival will apply for a <strong>one-time screening exemption from the Ministry of Information & Broadcasting (Govt. of India)</strong> on behalf of all selected films. Submitting implies agreement to cooperate with this process. It notes that the exemption process is usually routine for recognized festivals, and filmmakers typically don't need to do anything, but may be asked for an undertaking or information in rare cases. All screened films will have either a CBFC certificate or an official exemption letter.
                </p>
              </section>

              {/* LEGAL CLEARANCES */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">LEGAL CLEARANCES</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  Films should not be under any pending <strong>legal disputes or litigation</strong> that could affect their screening. Any court injunctions or disputes must be resolved or disclosed before submission. Misrepresentation can lead to disqualification.
                </p>
              </section>

              {/* INSTITUTIONAL FILMS */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">INSTITUTIONAL FILMS</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  For films produced by a film institute, university, government agency, or organization, an <strong>NOC (No Objection Certificate)</strong> or written permission from the relevant authority is required for submission and screening. Examples: a student diploma film needs the institute's nod; a funded film needs organizational permission. Proof of such permission may be requested if the film is selected.
                </p>
              </section>

              {/* USAGE OF SUBMITTED MATERIALS */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">USAGE OF SUBMITTED MATERIALS</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  By entering, the filmmaker grants The Bhopal Film Festival <strong>the rights to screen your film</strong> (if selected) <strong>without any screening fee</strong>. Permission is also granted to use <strong>promotional materials</strong> (stills, trailers, clips, film title, synopsis) in the festival catalogue, website, social media, and press releases for marketing.
                </p>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  The festival will not commercially exploit the film; rights remain with the filmmaker. This usage is solely for promoting the screening and the festival.
                </p>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  The applicant grants an <strong>irrevocable, non-exclusive, royalty-free, worldwide, perpetual license</strong> to show, use, market, copy, modify, publish, distribute, create derivative works from, and display the film in any format and media for non-commercial purposes, without additional payment.
                </p>
              </section>

              {/* NO SCREENING FEE & NO RETURN OF MATERIALS */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">NO SCREENING FEE & NO RETURN OF MATERIALS</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  The festival will not pay any screening fee, licensing fee, or shipping cost. We assume submitters understand this for an indie festival with free submission and non-commercial intent. Physical media or materials submitted will not be returned. Since the process is primarily online, this likely doesn't apply. The festival also cannot provide insurance for any tapes/drives sent, preferring online submission to avoid this.
                </p>
              </section>

              {/* FINAL DECISION */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">FINAL DECISION</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  Decisions by the festival selection committee and jury regarding film selection, categorization, awards, or any other competition aspect are <strong>final and binding</strong>. The festival organizers reserve the right to <strong>disqualify</strong> any entry that violates rules or to resolve unaddressed cases at their discretion, aligning with principles of fairness and integrity.
                </p>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  Exceptions or changes to rules may be made in special cases, with participants informed accordingly.
                </p>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  By submitting, applicants agree that <strong>no legal claim or dispute</strong> will be pursued against the festival, jury, organizers, or partners regarding selection or awards, and they <strong>accept all above terms</strong> and interpretations by the festival management.
                </p>
              </section>

              {/* PARTICIPATION & CONDUCT */}
              <section>
                <h2 className="font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-0 uppercase">PARTICIPATION & CONDUCT</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  If selected, the filmmaker/representative should maintain professional conduct.
                </p>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  Any attempt to unduly influence jury members or the selection process will result in immediate disqualification. The festival aims to keep the process transparent and fair to all.
                </p>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-relaxed">
                  By adhering to these terms, a smooth festival experience is ensured for organizers, audiences, and filmmakers alike. These rules follow standards set by respected festivals, adapted to the local context.
                </p>
              </section>

              </div>
            </div>
          </div>
        </div>

      {/* Element above footer */}
      <div className="relative w-full overflow-hidden z-30 -mt-2 sm:-mt-3 md:-mt-4">
        <Image
          src="/assets/element above footer .png"
          alt=""
          width={1200}
          height={400}
          className="w-full h-auto object-cover object-top pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Footer at the end - No gap */}
   
    </main>
  );
}








