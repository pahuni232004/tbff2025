"use client";

import Image from "next/image";
import { useState } from "react";

export default function SubmitFilmPage() {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
    description: "",
    filmCategory: "",
    filmTitle: "",
    synopsis: "",
    crewDetails: "",
    filmLink: "",
    cbfcCertification: "",
    declaration: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      cbfcCertification: value,
    });
  };

  const validateFilmLink = (url: string) => {
    // Accept Google Drive, Vimeo, YouTube, Dropbox links
    const linkRegex = /^(https?:\/\/)?(www\.)?(drive\.google\.com|vimeo\.com|youtube\.com|youtu\.be|dropbox\.com|docs\.google\.com).+$/;
    return linkRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.age || !formData.city || !formData.phoneNumber || 
        !formData.emailAddress || !formData.filmCategory || !formData.filmTitle || !formData.synopsis || 
        !formData.crewDetails || !formData.filmLink || !formData.termsAccepted) {
      setSubmitStatus("error");
      alert("Please fill in all required fields marked with *.");
      return;
    }

    if (!validateFilmLink(formData.filmLink)) {
      setSubmitStatus("error");
      alert("Please enter a valid Google Drive, Vimeo, or YouTube link.");
      return;
    }

    if (formData.synopsis.split(/\s+/).length > 200) {
      setSubmitStatus("error");
      alert("Synopsis must be 200 words or less.");
      return;
    }

    if (!scriptUrl) {
      console.error("Missing NEXT_PUBLIC_GOOGLE_SCRIPT_URL env variable");
      setSubmitStatus("error");
      alert("Form is temporarily unavailable. Please try again later.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });
      
      // With no-cors mode, we can't read the response, but we assume success
      // The data will be saved to Google Sheets by the Apps Script
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        age: "",
        city: "",
        phoneNumber: "",
        emailAddress: "",
        description: "",
        filmCategory: "",
        filmTitle: "",
        synopsis: "",
        crewDetails: "",
        filmLink: "",
        cbfcCertification: "",
        declaration: "",
        termsAccepted: false,
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      alert("Failed to submit form. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadGuideline = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/submission-guidelines.pdf';
    link.download = 'TBFF-2025-Submission-Guidelines.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

            <p className="font-texta text-[#091529] text-md sm:text-xl md:text-lg mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-normal text-left">
              Before submitting, please read the Festival Details & Submission Guidelines carefully.
            </p>

            {/* Content Sections */}
            <div className="font-texta text-[#091529] pb-0 mb-0 text-left">
              
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
                  <li>
                  <strong>No Entry Fee:</strong> Participation is <strong>free</strong> for this first edition to encourage maximum entries.
                  </li>
                  <li>
                  <strong>Event Format:</strong> A <strong>one-day event</strong> featuring selected short films across <strong>four categories</strong>, followed by the <strong>award ceremony</strong>. All styles and genres are welcome – what matters most is originality and storytelling.
                  </li>
                </ul>
              </section>

              {/* CATEGORIES OF ENTRY */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">CATEGORIES OF ENTRY</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-tight mb-2 sm:mb-3 md:mb-3 text-left">
                  You can submit your short film in one of the following four categories, based on theme and duration:
                </p>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-disc pl-6 sm:pl-8 text-left">
                  <li>
                  <strong>Fiction (Under 10 Minutes):</strong> Narrative live-action or animated short films up to 10 minutes long (including credits). Any genre or topic is welcome, as long as it's a work of fiction.
                  </li>
                  <li>
                  <strong>Non-Fiction (Under 10 Minutes):</strong> Documentary or factual short films up to 10 minutes. This includes documentaries, observational films, or any non-fiction storytelling.
                  </li>
                  <li>
                  <strong>Women's Voices (Under 5 Minutes):</strong> Short films (up to 5 minutes) made by women filmmakers that focus on women's stories, issues, or viewpoints. These can be fiction or non-fiction.
                  </li>
                  <li>
                  <strong>Heart of India (Under 5 Minutes):</strong> Short films (up to 5 minutes) that show the culture, heritage, people, or stories of <strong>Madhya Pradesh (the Heart of India)</strong>. These can also be fiction or non-fiction.
                  </li>
                </ul>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-tight mt-2 sm:mt-2.5 text-left">
                  <strong>Note:</strong> The duration includes all opening and closing credits. For example, a "5-minute film" must be 5:00 or less in total. Each film can only be submitted in one category, but you may submit multiple films separately if you wish.
                </p>
              </section>

              {/* ELIGIBILITY CRITERIA FOR FILMS & FILMMAKERS */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">ELIGIBILITY CRITERIA FOR FILMS & FILMMAKERS</h2>
                <p className="font-texta text-sm sm:text-base md:text-lg leading-tight mb-2 sm:mb-3 md:mb-3 text-left">
                  To be eligible, please follow these requirements:
                </p>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-disc pl-6 sm:pl-8 text-left">
                  <li>
                  <strong>Short Film Duration:</strong> Films must follow the time limits of their category (either 10 minutes or 5 minutes). There's no minimum length, but even very short films should fit meaningfully within a category.
                  </li>
                  <li>
                  <strong>Completion Date:</strong> Films must have been completed between <strong>January 1, 2023, and December 30, 2025</strong>. Only finished films are accepted; works in progress are not eligible.
                  </li>
                  <li>
                  <strong>Production:</strong> The festival focuses on <strong>independent cinema</strong>. Your film should be made independently, not as a commercial studio production. Sponsors or grants are fine, but the creative control must remain with the filmmaker.
                  </li>
                  <li>
                  <strong>Originality:</strong> Films must be your <strong>own creative work</strong> with original storytelling. Do not use copyrighted material (music, clips, etc.) without permission.
                  </li>
                  <li>
                  <strong>Language & Subtitles:</strong> Films in any language are accepted. If your film isn't in English, please include <strong>English subtitles</strong>. Even if it's in Hindi or a regional language, English subtitles are strongly encouraged for wider understanding. Subtitles are your responsibility to prepare.
                  </li>
                  <li>
                  <strong>Geographical Focus:</strong> The festival is open to everyone, but we especially encourage entries from <strong>filmmakers from Madhya Pradesh</strong> or films connected to <strong>Madhya Pradesh/Central India</strong> – whether through story, setting, or production. This includes films based in or shot in Madhya Pradesh or made by filmmakers from the state. Highlighting your MP connection can strengthen your submission.
                  </li>
                  <li>
                  <strong>Prior Screenings:</strong> Films don't need to be premieres. You can submit films that have screened elsewhere or are online. However, showing something new or lesser known to local audiences adds excitement. If your film has won awards or been shown before, mention it in the form – it won't affect your eligibility.
                  </li>
                  <li>
                  <strong>Format & Technical Requirements:</strong> Films shot on any device (camera, DSLR, or phone) are accepted. Submit your film as a <strong>digital file or link</strong>. It must be in <strong>HD quality (720p or 1080p)</strong> and in a common format like <strong>MP4 or MOV (H.264)</strong>. If selected, we may ask for a higher-quality version for screening.
                  </li>
                  <li>
                  <strong>Age Limit:</strong> Filmmakers aged <strong>16 to 35 years</strong> can submit entries.
                  </li>
                  <li>
                  <strong>Submission Limit:</strong> There's no limit on how many films you can submit, but each film must have its <strong>own entry form</strong> and fit only <strong>one category</strong>.
                  </li>
                  <li>
                  <strong>Submission Fee:</strong> <strong>No fee</strong> will be charged. The festival is free to enter but beware of fake messages or websites asking for money. Only follow the official submission process.
                  </li>
                </ul>
              </section>

              {/* SUBMISSION PROCESS & REQUIREMENTS */}
              <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">SUBMISSION PROCESS & REQUIREMENTS</h2>
                <ol className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-decimal pl-6 sm:pl-8 text-left">
                  <li>
                    <strong>Fill Out the Entry Form:</strong> Complete the official "Bhopal Film Festival Submission Form" (attached below). The link will be available on the festival's website and social media pages. All required details about the submitter and film must be filled in. Incomplete forms will not be accepted.
                  </li>
                  <li>
                    <strong>Provide a Screening Link:</strong> Share a URL link for film viewing; physical copies (DVDs, drives) are not accepted. Recommended platforms: Vimeo (preferred), YouTube unlisted, or Google Drive/Dropbox. The link must be viewable or downloadable without login requests. If password-protected (e.g., on Vimeo), the password must be included in the form.
                  </li>
                  <li>
                    <strong>Keep the Link Active:</strong> The film link must remain active until <strong>February 2026</strong>. Avoid using links that expire (like WeTransfer). Google Drive or Vimeo are recommended. File size recommendations: under <strong>2GB for 10-minute films</strong> and under <strong>1GB for 5-minute films</strong> for easier viewing. The link will only be used by the jury. If the film is selected, a better-quality version and permission to use short clips for festival promotion may be requested.
                  </li>
                  <li>
                    <strong>Submit Before the Deadline:</strong> The last date for submission is <strong>December 31, 2025 (11:59 PM IST)</strong>. Late or incomplete entries may not be accepted. A confirmation message or email will be received upon submission. Contact the festival team before the deadline if any issues arise.
                  </li>
                  <li>
                    <strong>Avoid Duplicate Submissions:</strong> Submit each film only once. If submitting multiple films, a separate form must be filled out for each.
                  </li>
                  <li>
                    <strong>Queries and Support:</strong> For help or questions, contact <strong>info@thebhopalfilmfestival.com</strong>. The team will assist with submission or technical issues. There is no entry fee – your only effort is to make a great film and submit it correctly.
                  </li>
                </ol>
              </section>

              {/* SELECTION PROCESS & JURY DELIBERATION */}
              <section className="mb-0">
                <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0 uppercase text-left">SELECTION PROCESS & JURY DELIBERATION</h2>
                <ul className="font-texta text-sm sm:text-base md:text-lg leading-tight space-y-2 sm:space-y-2.5 list-disc pl-6 sm:pl-8 text-left">
                  <li>
                  <strong>Jury Panel:</strong> A panel of respected filmmakers and artists from Madhya Pradesh will review all entries. Their names will be announced on the festival website once confirmed.
                  </li>
                  <li>
                  <strong>Selection Criteria:</strong> Films will be judged on <strong>originality, creativity, technical quality, storytelling</strong>, and how well they fit their category and the festival's vision.
                  </li>
                  <li>
                  <strong>Limited Screenings:</strong> This is a one-day event, so only a <strong>limited number of films</strong> can be screened. A shortlist of finalists will be chosen in each category.
                  </li>
                  <li>
                  <strong>Notification of Selection:</strong> Official selections will be announced by <strong>January 30, 2026</strong>, approximately two weeks before the event. Filmmakers will be informed via email or phone, and the list will be posted online.
                  </li>
                  <li>
                  <strong>Materials from Selected Films:</strong> Selected filmmakers must quickly confirm participation and share high-resolution stills, a poster, a short director bio, a synopsis, and credits. They may also be asked to send a higher-quality film file. Delays could result in replacement by another film.
                  </li>
                  <li>
                  <strong>No Changes or Withdrawal:</strong> Once participation is confirmed, films cannot be withdrawn. Submit only if ready to screen.
                  </li>
                  <li>
                  <strong>Screenings:</strong> Selected films will be shown at <strong>Ravindra Bhawan</strong> before a live audience. A screening schedule will be shared in advance. Filmmakers are encouraged (but not required) to attend for networking opportunities.
                  </li>
                  <li>
                  <strong>Jury Decision & Awards:</strong> The jury will decide the winners after watching all selected films. Their decisions are final and cannot be challenged.
                  </li>
                  <li>
                  <strong>Feedback:</strong> Due to time limits, the festival cannot provide individual feedback. If a film isn't selected, it doesn't mean it wasn't good; sometimes it's about fitting the schedule or theme. Filmmakers are encouraged to keep creating and try again in future editions.
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative bg-[#FFCE21] pb-20 sm:pb-24 md:pb-28 lg:pb-32 pt-0" style={{ marginTop: '-4px', marginLeft: '8px' }}>
        {/* Submission Form Image - Full Width Above Heading */}
        <div className="w-full -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 mb-6 sm:mb-8 md:mb-10 mt-8 sm:mt-10 md:mt-12 lg:mt-16 translate-x-[13px] sm:translate-x-[33px]">
          <Image
            src="/assets/submission form upside down.png"
            alt="Submission Form"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="relative z-20 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16 w-full max-w-[1600px] mx-auto">
            {/* Form Title */}
            <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl   text-[#091529] mb-6 sm:mb-7 md:mb-8 lg:mb-10 mt-8 sm:mt-10 md:mt-12 lg:mt-16 uppercase tracking-tight text-center md:text-left">
              TBFF 2025 SUBMISSION FORM
            </h2>

          {/* Main Form Container */}
          <div className="relative w-full">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-400 text-green-800 rounded-lg font-texta">
                <p className=" ">Submission Successful!</p>
                <p className="text-sm mt-1">We've received your film submission. Our team will review it and get back to you via email.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-400 text-red-800 rounded-lg font-texta">
                <p className=" ">Submission Failed</p>
                <p className="text-sm mt-1">Please check all required fields and try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="font-texta space-y-4 sm:space-y-5 md:space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1">
                    <label htmlFor="age" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                      Age<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="16"
                      max="35"
                      className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label htmlFor="city" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                      City<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                        onChange={handleChange}
                        required
                      className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                      />
                    </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label htmlFor="phoneNumber" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                      Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                      />
                    </div>
                  </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label htmlFor="emailAddress" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                      onChange={handleChange}
                    required
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                    />
                </div>
                  </div>

              {/* Film Details Section */}
              <div className="space-y-4 pt-4 border-t border-[#091529]/30">
                <h3 className="font-bebas text-base md:text-lg   text-[#091529] mb-4">Film Details</h3>
                
                {/* Film Category */}
                <div className="space-y-1">
                  <label htmlFor="filmCategory" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Film Category<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="filmCategory"
                    name="filmCategory"
                    value={formData.filmCategory}
                    onChange={handleChange}
                    required
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] focus:border-[#091529] focus:outline-none text-sm md:text-base cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option value="Fiction (Under 10 Minutes)">Fiction (Under 10 Minutes)</option>
                    <option value="Non-Fiction (Under 10 Minutes)">Non-Fiction (Under 10 Minutes)</option>
                    <option value="Women's Voices (Under 5 Minutes)">Women&apos;s Voices (Under 5 Minutes)</option>
                    <option value="Heart of India (Under 5 Minutes)">Heart of India (Under 5 Minutes)</option>
                  </select>
                </div>

                {/* Description (Optional) */}
                <div className="space-y-1">
                  <label htmlFor="description" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Description <span className="text-[#091529]/60 text-xs font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none resize-none text-sm md:text-base"
                  />
                  </div>

                {/* Title of the Film */}
                <div className="space-y-1">
                  <label htmlFor="filmTitle" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Title of the Film<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="filmTitle"
                      name="filmTitle"
                      value={formData.filmTitle}
                      onChange={handleChange}
                      required
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                    />
                  </div>

                {/* Synopsis */}
                <div className="space-y-1">
                  <label htmlFor="synopsis" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Synopsis of the Film (max 200 words)<span className="text-red-500">*</span>
                    </label>
                  <p className="font-texta text-xs md:text-sm text-[#091529]/70 mb-1.5">Briefly describe your story, theme, and key message.</p>
                  <textarea
                    id="synopsis"
                    name="synopsis"
                    value={formData.synopsis}
                      onChange={handleChange}
                    required
                    rows={4}
                    maxLength={1500}
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none resize-none text-sm md:text-base"
                  />
                  <p className="font-texta text-xs text-[#091529]/60">
                    {formData.synopsis.split(/\s+/).filter(word => word.length > 0).length} / 200 words
                  </p>
                  </div>

                {/* Crew Details */}
                <div className="space-y-1">
                  <label htmlFor="crewDetails" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Crew Details<span className="text-red-500">*</span>
                      </label>
                  <p className="font-texta text-xs md:text-sm text-[#091529]/70 mb-1.5">List key members like Director, Writes, DOP, etc.</p>
                  <textarea
                    id="crewDetails"
                    name="crewDetails"
                    value={formData.crewDetails}
                        onChange={handleChange}
                    required
                    rows={3}
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none resize-none text-sm md:text-base"
                  />
                </div>
                    </div>

              {/* Film Link Section */}
              <div className="space-y-4 pt-4 border-t border-[#091529]/30">
                <div className="space-y-1">
                  <label htmlFor="filmLink" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                    Link to the Film<span className="text-red-500">*</span>
                      </label>
                  <p className="font-texta text-xs md:text-sm text-[#091529]/70 mb-1.5">Submit a Google Drive/ Vimeo/ YouTube link with proper viewing access.</p>
                      <input
                    type="url"
                    id="filmLink"
                    name="filmLink"
                    value={formData.filmLink}
                        onChange={handleChange}
                    required
                    className="font-texta w-full px-3 py-2.5 rounded-md border border-[#091529]/40 bg-[#FFFEF0] text-[#091529] placeholder:text-[#091529]/50 focus:border-[#091529] focus:outline-none text-sm md:text-base"
                      />
                    </div>
                  </div>

              {/* CBFC Certification */}
              <div className="space-y-4 pt-4 border-t border-[#091529]/30">
                <label className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-2">
                  Do you have CBFC certification for your film?
                </label>
                <div className="flex gap-4">
                  <label className="font-texta flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cbfcCertification"
                      value="yes"
                      checked={formData.cbfcCertification === "yes"}
                      onChange={() => handleRadioChange("yes")}
                      className="w-4 h-4 text-[#091529] focus:ring-[#091529] border-2 border-[#091529]/40"
                    />
                    <span className="text-[#091529] text-sm md:text-base">Yes</span>
                  </label>
                  <label className="font-texta flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cbfcCertification"
                      value="no"
                      checked={formData.cbfcCertification === "no"}
                      onChange={() => handleRadioChange("no")}
                      className="w-4 h-4 text-[#091529] focus:ring-[#091529] border-2 border-[#091529]/40"
                    />
                    <span className="text-[#091529] text-sm md:text-base">No</span>
                  </label>
                  </div>
                </div>

              {/* Declaration */}
              <div className="pt-4 border-t border-[#091529]/30">
                <label htmlFor="declaration" className="font-texta block text-[#091529] font-semibold text-sm md:text-base mb-1">
                  Declaration
                </label>
                  </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 -mt-3">
                <label className="font-texta flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                    className="mt-0.5 w-4 h-4 text-[#091529] focus:ring-[#091529] rounded border-2 border-[#091529]/40 flex-shrink-0"
                  />
                  <span className="text-sm md:text-base text-[#091529] leading-relaxed">
                    I confirm that I have read and understood the TBFF Festival Details & Submission Guidelines and agree to all the terms and conditions<span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Submission Instructions */}
              <div className="font-texta pt-4 space-y-1 text-sm md:text-base text-[#091529]/80 leading-relaxed">
                <p>Please review your response before submitting, no edits will be allowed post submission.</p>
                <p>When ready, click the button below to officially submit your film to TBFF 2025</p>
              </div>

              {/* Submit Button and Download Guideline Button */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-texta w-full md:w-auto px-12 py-3 bg-[#091529] text-white rounded-md   text-base md:text-lg uppercase tracking-wide hover:bg-[#0a1a35] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Film"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadGuideline}
                  className="font-texta w-full md:w-auto px-12 py-3 bg-[#091529] text-white rounded-md text-base md:text-lg uppercase tracking-wide hover:bg-[#0a1a35] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Download Submission Guideline
                </button>
              </div>
            </form>
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
