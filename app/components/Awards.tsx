"use client";

import React from "react";

/**
 * Awards page
 * - Root container is tall (200vh) so the large character can visually span page1 -> page2
 * - Decorative images are absolutely positioned in the root so they aren't clipped by a section
 * - Tailwind used for layout; a couple of inline styles for vw/vh offsets that are easier to tweak
 */

export default function Awards() {
    return (
        <main className="relative w-full  min-h-[200vh] bg-[#F4921F]">
            {/* Partition line before awards section */}
            <img
                src="/assets/partition line.png"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none z-[5]"
                style={{
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "auto",
                }}
            />
            {/* BIG CHARACTER: placed in root so it can overlap both viewports */}

            {/* BG CIRCLE behind the movie character */}
            {/* Semi-circle background: behind character but in front of page background - hidden on mobile */}
            <img
                src="/assets/hhhh.png"
                alt=""
                aria-hidden="true"
                className="hidden pointer-events-none absolute select-none z-10 md:block mobile-hhhh"
                style={{
                    top: "calc(12vh + 50px)",
                    height: "160vh",
                    width: "auto",
                    objectFit: "contain",
                }}
            />

            {/* Main character: above semi-circle, below award frames */}
            <img
                src="/assets/movie.png"
                alt="Large movie character holding clapperboard"
                aria-hidden="true"
                className="pointer-events-none absolute z-20 md:z-40 select-none  md:block mobile-movie"
                style={{
                    left: "-10vw",
                    top: "calc(8vh + 70px)",
                    height: "150vh",
                    width: "auto",
                    objectFit: "contain",
                }}
            />

            {/* ---------- PAGE 1 ---------- */}
            <section className="relative h-screen w-full flex items-center justify-left">

                {/* Content block (awardboard + categories + winner/runner up) - centered on mobile, vertical stack on desktop */}
                <aside
                    className="relative md:absolute md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 z-50 w-[calc(100%-2rem)] md:w-[600px] max-w-[500px] md:max-w-[600px] px-4 md:px-0 desktop-awards-center flex flex-col md:flex-col items-center md:items-center gap-6 md:gap-[52px]"
                >
                    {/* Section 1: Award board */}
                    <div className="flex justify-center md:ml-[90px]">
                        <div className="w-full max-w-[240px] sm:max-w-[280px] md:w-[280px] md:max-w-[280px] mt-[-24] md:mt-0 md:mx-auto relative overflow-hidden">
                            <img
                                src="/assets/awardboard.png"
                                alt="Awards and categories title"
                                className="w-full h-auto block pointer-events-none relative z-30"
                                style={{ filter: 'brightness(0)' }}
                            />
                            {/* Yellow background inside the box */}
                            <div className="absolute bg-[#FFCE21] z-20" style={{
                                top: "14%",
                                bottom: "15%",
                                left: "9%",
                                right: "9%"
                            }}></div>
                        </div>
                    </div>

                    {/* Section 2: Categories + vertical strip */}
                    <div className="relative flex items-start gap-4 md:gap-6 mt-6 md:mt-0 justify-center md:justify-center pl-0 md:pl-0 md:ml-[140px] md:mx-auto desktop-categories-container">

                        {/* hhhh.png image on the right - flipped vertically - hidden on mobile */}
                        <div className="hidden absolute top-1/2 w-[300px] md:w-[400px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px] z-10 pointer-events-none md:hidden" style={{
                            right: '-300px',
                            transform: 'translateY(-50%)'
                        }}>
                            <img
                                src="/assets/hhhh.png"
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-contain pointer-events-none"
                                style={{
                                    transform: 'scaleX(-1)',
                                    filter: 'hue-rotate(100deg) saturate(1.5) brightness(0.9)'
                                }}
                            />
                        </div>

                        {/* Strip - positioned to align symbols with text */}
                        <div className="relative right-10 md:right-0 md:block flex-shrink-0 md:relative desktop-strip-container" style={{ paddingTop: "8px" }}>
                            <img
                                src="/assets/strip.png"
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none w-auto object-contain desktop-strip"
                                style={{
                                    height: "calc(2em + 80px + 2em + 80px + 2em + 80px + 2em + 20px)"
                                }}
                            />
                        </div>

                        {/* Category List */}
                        <ul
                            className="
    flex flex-col items-start right-0 md:right-0
    md:items-start flex-shrink-0 relative z-20 gap-[72px] md:gap-[60px] pt-4 pl-0 mobile-category-list desktop-category-list
  "
                        >
                            {[
                                "Fiction (Under 10 Minutes)",
                                "Non-Fiction (Under 10 Minutes)",
                                "Women's Voices (Under 5 Minutes)",
                                "Heart of India (Under 5 Minutes)"
                            ].map((label) => {
                                // Extract category text and bracket text
                                const bracketMatch = label.match(/^(.+?)\s*\((.+?)\)$/);
                                const categoryText = bracketMatch ? bracketMatch[1] : label;
                                const bracketText = bracketMatch ? `(${bracketMatch[2]})` : '';
                                
                                return (
                                    <li
                                        key={label}
                                        className="
            text-[#111] font-bold
            text-lg md:text-xl lg:text-2xl
            leading-tight flex flex-col md:flex-row md:items-start mobile-category-text
          "
                                        style={{ lineHeight: "1.2", fontFamily: '"Texta Alt Heavy", sans-serif', marginLeft: '-40px', paddingLeft: 0, marginTop: '9px' }}
                                    >
                                        <span>{categoryText}</span>
                                        {bracketText && (
                                            <span className="md:ml-1">{bracketText}</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Mobile-only side leaf */}
                        <img
                            src="/assets/sideleaf.png"
                            alt=""
                            className="sideleaf absolute md:hidden"
                            style={{
                                right: "-10px",
                                top: "20px",
                                width: "140px",
                                pointerEvents: "none",
                                zIndex: 5,
                            }}
                        />


                    </div>

                    {/* Section 3: Winner and Runner Up - Desktop only, vertical stack */}
                    <div className="hidden md:flex md:flex-row md:items-center md:justify-center md:gap-10 z-30 mt-4 w-full md:ml-[135px] desktop-award-frames-container">
                        {/* Award 1 - Winner */}
                        <div
                            className="award-item desktop-award-item md:mt-0 md:m-4"
                            style={{
                                width: "230px",
                                maxWidth: "230px"
                            }}
                        >
                            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1.2" }}>
                                <img
                                    src="/assets/awardFrame1.png"
                                    className="pointer-events-none w-full h-full object-contain relative z-30"
                                />
                                <div className="absolute bg-[#FFCE21] z-20" style={{
                                    top: "13%",
                                    bottom: "12%",
                                    left: "12%",
                                    right: "12%",
                                    transform: "translateY(10px)"
                                }}></div>
                            </div>
                        </div>

                        {/* Award 2 - Runner Up */}
                        <div
                            className="award-item desktop-award-item md:mt-0 md:m-4"
                            style={{
                                width: "230px",
                                maxWidth: "230px"
                            }}
                        >
                            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1.2" }}>
                                <img
                                    src="/assets/awardframe2.png"
                                    className="pointer-events-none w-full h-full object-contain relative z-30"
                                />
                                <div className="absolute bg-[#FFCE21] z-20" style={{
                                    top: "13%",
                                    bottom: "12%",
                                    left: "12%",
                                    right: "12%",
                                    transform: "translateY(10px)"
                                }}></div>
                            </div>
                        </div>
                    </div>

                </aside>

            </section>

            {/* ---------- PAGE 2 ---------- */}
            <section className="relative h-screen w-full ">
                {/* small decorative awards on the right of page2 - hidden on mobile */}
                {/* PAGE 2 AWARDS — MOBILE ONLY (vertical) */}
                <div
                    className="absolute w-full left-20 flex flex-col
                items-center justify-center 
                gap-20 z-30 mobile-award-container md:hidden"
                    style={{ top: "40px" }} // moved down by 40px
                >

                    {/* Award 1 */}
                    <div
                        className="award-item mobile-award mt-[-160] mr-8"
                        style={{
                            width: "230px",
                            maxWidth: "300px"
                        }}
                    >
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1.2" }}>
                            <img
                                src="/assets/awardFrame1.png"
                                className="pointer-events-none w-full h-full object-contain relative z-30"
                            />
                            <div className="absolute bg-[#FFCE21] z-20" style={{
                                top: "13%",
                                bottom: "12%",
                                left: "12%",
                                right: "12%",
                                transform: "translateY(10px)"
                            }}></div>
                        </div>
                    </div>

                    {/* Award 2 */}
                    <div
                        className="award-item mobile-award mobile-award-frame2 mb-40 mr-8"
                        style={{
                            width: "230px",
                            maxWidth: "300px"
                        }}
                    >
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1.2" }}>
                            <img
                                src="/assets/awardframe2.png"
                                className="pointer-events-none w-full h-full object-contain relative z-30"
                            />
                            <div className="absolute bg-[#FFCE21] z-20" style={{
                                top: "13%",
                                bottom: "12%",
                                left: "12%",
                                right: "12%",
                                transform: "translateY(10px)"
                            }}></div>
                        </div>
                    </div>

                </div>

            </section>

            {/* ---------- SVG SECTION ---------- */}
            <section className="relative w-full flex items-center justify-center pt-0 pb-4 md:pb-8 svg-section-mobile md:-mt-72 z-30">
                <div className="flex items-center justify-center w-full">
                    <img
                        src="/assets/Group 81 (1) 1 (1).svg"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-auto object-cover pointer-events-none"
                    />
                </div>
            </section>
        </main>
    );
}
