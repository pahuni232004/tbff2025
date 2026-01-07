"use client";

import Image from "next/image";

export default function SubmitFilmPage() {
  return (
    <main className="min-h-screen bg-[#FFCE21] overflow-x-hidden relative">
      {/* Side strips */}
      <div className="absolute left-0 w-2 sm:w-3 md:w-6 lg:w-10 z-20 pointer-events-none" style={{ top: 0, bottom: 0 }}>
        <Image src="/assets/Submit side strip.svg" alt="Side strip decoration" width={200} height={2000} className="w-full h-full object-cover opacity-90" style={{ objectFit: 'cover', height: '100%', display: 'block' }} />
      </div>
      <div className="absolute right-0 w-2 sm:w-3 md:w-6 lg:w-10 z-20 pointer-events-none md:top-[108px]" style={{ top: 0, bottom: 0 }}>
        <Image src="/assets/Submit side strip.svg" alt="Side strip decoration" width={200} height={2000} className="w-full h-full object-cover opacity-90" style={{ objectFit: 'cover', height: '100%', display: 'block', transform: 'scaleX(-1)' }} />
      </div>

      {/* Content Wrapper: All Submission Guidelines, then Closed Message */}
      <div className="relative w-full">
        <div className="relative w-full">
          <div className="relative bg-[#FFCE21] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-0 pt-0 min-h-[calc(100vh-80px)]" style={{ marginLeft: '8px' }}>
            <div className="relative z-20 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16 pt-0 w-full max-w-[1600px] mx-auto">
              <h1 className="font-bebas text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#091529] mb-1 sm:mb-1 md:mb-2 lg:mb-2 uppercase tracking-tight mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-left">
                SUBMISSION GUIDELINES & ENTRY FORM
              </h1>

              {/* --- Submission Guidelines content here (restored as per previous version) --- */}
              <p className="font-texta text-[#091529] text-md sm:text-xl md:text-lg mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-normal text-left">
                Before submitting, please read the Festival Details & Submission Guidelines carefully.
              </p>
              {/* INTRODUCTION & FESTIVAL OVERVIEW */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">INTRODUCTION & FESTIVAL OVERVIEW</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-normal text-left">
                  The Bhopal Film Festival (TBFF) is a new independent short film competition taking place on <strong>21 February 2026</strong> at <strong>Ravindra Bhawan Auditorium, Bhopal</strong>. The festival celebrates the unique culture of Central India and provides a platform for <strong>emerging filmmakers</strong> to share local stories with pride and reach a wider audience.
                </p>
              </section>
              {/* KEY DETAILS */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl mb-0 uppercase text-left">KEY DETAILS</h3>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-1.5 sm:space-y-2 list-disc pl-6 sm:pl-8 text-left">
                  <li><strong>No Entry Fee:</strong> Participation is <strong>free</strong> for this first edition to encourage maximum entries.</li>
                  <li><strong>Event Format:</strong> A <strong>one-day event</strong> featuring selected short films across <strong>four categories</strong>, followed by the <strong>award ceremony</strong>. All styles and genres are welcome – what matters most is originality and storytelling.</li>
                </ul>
              </section>
              {/* CATEGORIES OF ENTRY */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">CATEGORIES OF ENTRY</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-tight mb-2 sm:mb-3 md:mb-3 text-left">
                  You can submit your short film in one of the following four categories, based on theme and duration:
                </p>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-disc pl-6 sm:pl-8 text-left">
                  <li><strong>Fiction (Under 10 Minutes):</strong> Narrative live-action or animated short films up to 10 minutes long (including credits). Any genre or topic is welcome, as long as it's a work of fiction.</li>
                  <li><strong>Non-Fiction (Under 10 Minutes):</strong> Documentary or factual short films up to 10 minutes. This includes documentaries, observational films, or any non-fiction storytelling.</li>
                  <li><strong>Women's Voices (Under 5 Minutes):</strong> Short films (up to 5 minutes) made by women filmmakers that focus on women's stories, issues, or viewpoints. These can be fiction or non-fiction.</li>
                  <li><strong>Heart of India (Under 5 Minutes):</strong> Short films (up to 5 minutes) that show the culture, heritage, people, or stories of <strong>Madhya Pradesh (the Heart of India)</strong>. These can also be fiction or non-fiction.</li>
                </ul>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-tight mt-2 sm:mt-2.5 text-left">
                  <strong>Note:</strong> The duration includes all opening and closing credits. For example, a "5-minute film" must be 5:00 or less in total. Each film can only be submitted in one category, but you may submit multiple films separately if you wish.
                </p>
              </section>

              {/* ELIGIBILITY CRITERIA FOR FILMS & FILMMAKERS */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">ELIGIBILITY CRITERIA FOR FILMS & FILMMAKERS</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-tight mb-2 sm:mb-3 md:mb-3 text-left">To be eligible, please follow these requirements:</p>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-disc pl-6 sm:pl-8 text-left">
                  <li><strong>Short Film Duration:</strong> Films must follow the time limits of their category (either 10 minutes or 5 minutes). There's no minimum length, but even very short films should fit meaningfully within a category.</li>
                  <li><strong>Completion Date:</strong> Films must have been completed after <strong>January 1, 2023</strong>. Only finished films are accepted; works in progress are not eligible.</li>
                  <li><strong>Production:</strong> The festival focuses on <strong>independent cinema</strong>. Your film should be made independently, not as a commercial studio production. Sponsors or grants are fine, but the creative control must remain with the filmmaker.</li>
                  <li><strong>Originality:</strong> Films must be your <strong>own creative work</strong> with original storytelling. Do not use copyrighted material (music, clips, etc.) without permission.</li>
                  <li><strong>Language & Subtitles:</strong> Films in any language are accepted. If your film isn't in English, please include <strong>English subtitles</strong>. Even if it's in Hindi or a regional language, English subtitles are strongly encouraged for wider understanding. Subtitles are your responsibility to prepare.</li>
                  <li><strong>Geographical Focus:</strong> Film submissions are open to all filmmakers. However, the following eligibility criteria apply only to under 10 minute- General Fiction and General Non-Fiction categories:<br />At least one of the following must be met:
                    <ul className="list-disc pl-6 sm:pl-8 mt-2 space-y-1">
                      <li><strong>The filmmaker is from Madhya Pradesh; or</strong></li>
                      <li><strong>The film has been shot in Madhya Pradesh; or</strong></li>
                      <li><strong>The story is set in, or substantially based on, Madhya Pradesh.</strong></li>
                    </ul>
                    <br />Meeting any one of the above conditions is sufficient for eligibility in these categories.<br /><strong>The special categories- <strong>Heart of India</strong> and <strong>Women's Voices</strong> both are open to filmmakers from everywhere, with no regional restrictions.</strong></li>
                  <li><strong>Prior Screenings:</strong> Films don't need to be premieres. You can submit films that have screened elsewhere or are online. However, showing something new or lesser known to local audiences adds excitement. If your film has won awards or been shown before, mention it in the form – it won't affect your eligibility.</li>
                  <li><strong>Format & Technical Requirements:</strong> Films shot on any device (camera, DSLR, or phone) are accepted. Submit your film as a <strong>digital file or link</strong>. It must be in <strong>HD quality (720p or 1080p)</strong> and in a common format like <strong>MP4 or MOV (H.264)</strong>. If selected, we may ask for a higher-quality version for screening.</li>
                  <li><strong>Age Limit:</strong> Filmmakers aged <strong>16 to 35 years</strong> can submit entries.</li>
                  <li><strong>Submission Limit:</strong> There's no limit on how many films you can submit, but each film must have its <strong>own entry form</strong> and fit only <strong>one category</strong>.</li>
                  <li><strong>Submission Fee:</strong> <strong>No fee</strong> will be charged. The festival is free to enter but beware of fake messages or websites asking for money. Only follow the official submission process.</li>
                </ul>
              </section>

              {/* SUBMISSION PROCESS & REQUIREMENTS */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">SUBMISSION PROCESS & REQUIREMENTS</h2>
                <ol className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-decimal pl-6 sm:pl-8 text-left">
                  <li><strong>Fill Out the Entry Form:</strong> Submission is now closed. No films are being accepted at this time. All previously received entries will be considered.</li>
                  <li><strong>Provide a Screening Link:</strong> If you have already submitted, your film will be considered as per the guidelines. New submissions are not possible.</li>
                  <li><strong>Keep the Link Active:</strong> The film link must remain active until <strong>February 2026</strong> for the jury to access your work if already submitted.</li>
                  <li><strong>Submit Before the Deadline:</strong> The last date for submission has passed. New entries will not be accepted.</li>
                  <li><strong>Avoid Duplicate Submissions:</strong> Submit each film only once. Multiple submissions after the deadline are not allowed.</li>
                  <li><strong>Queries and Support:</strong> For help or questions, contact <strong>info@thebhopalfilmfestival.com</strong>. The team will assist with submission or technical issues. There is no entry fee – your only effort is to make a great film and submit it correctly.</li>
                </ol>
              </section>

              {/* SELECTION PROCESS & JURY DELIBERATION */}
              <section className="mb-0">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">SELECTION PROCESS & JURY DELIBERATION</h2>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-disc pl-6 sm:pl-8 text-left">
                  <li><strong>Jury Panel:</strong> A panel of respected filmmakers and artists from Madhya Pradesh will review all entries. Their names will be announced on the festival website once confirmed.</li>
                  <li><strong>Selection Criteria:</strong> Films will be judged on <strong>originality, creativity, technical quality, storytelling</strong>, and how well they fit their category and the festival's vision.</li>
                  <li><strong>Limited Screenings:</strong> This is a one-day event, so only a <strong>limited number of films</strong> can be screened. A shortlist of finalists will be chosen in each category.</li>
                  <li><strong>Notification of Selection:</strong> Official selections will be announced by <strong>January 30, 2026</strong>, approximately two weeks before the event. Filmmakers will be informed via email or phone, and the list will be posted online.</li>
                  <li><strong>Materials from Selected Films:</strong> Selected filmmakers must quickly confirm participation and share high-resolution stills, a poster, a short director bio, a synopsis, and credits. They may also be asked to send a higher-quality film file. Delays could result in replacement by another film.</li>
                  <li><strong>No Changes or Withdrawal:</strong> Once participation is confirmed, films cannot be withdrawn. Submit only if ready to screen.</li>
                  <li><strong>Screenings:</strong> Selected films will be shown at <strong>Ravindra Bhawan</strong> before a live audience. A screening schedule will be shared in advance. Filmmakers are encouraged (but not required) to attend for networking opportunities.</li>
                  <li><strong>Jury Decision & Awards:</strong> The jury will decide the winners after watching all selected films. Their decisions are final and cannot be challenged.</li>
                  <li><strong>Feedback:</strong> Due to time limits, the festival cannot provide individual feedback. If a film isn't selected, it doesn't mean it wasn't good; sometimes it's about fitting the schedule or theme. Filmmakers are encouraged to keep creating and try again in future editions.</li>
                </ul>
              </section>

              {/* --- End Guidelines --- */}

              {/* Submission Closed Message (only, no form) */}
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
          <Image src="/assets/element above footer .png" alt="" width={1200} height={400} className="w-full h-auto object-cover pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
