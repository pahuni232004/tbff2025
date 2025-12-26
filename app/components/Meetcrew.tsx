"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MeetCrew() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const eleWrapRef = useRef<HTMLDivElement | null>(null);
    const eleImgRef = useRef<HTMLImageElement | null>(null);
    const tlRef = useRef<any>(null);

    const g1Ref = useRef<HTMLDivElement | null>(null);
    const leaf1Ref = useRef<HTMLImageElement | null>(null);

    function computePositions(
        wrapperRect: DOMRect,
        sec1Rect: DOMRect,
        sec2Rect: DOMRect,
        eleRect: DOMRect
    ) {
        const W = wrapperRect.width;

        const startLeft = Math.round(W * 0.009);
        const startTop = Math.round(
            sec1Rect.top - wrapperRect.top + (sec1Rect.height - eleRect.height) * 0.8
        );

        const finalLeft = Math.round(
            Math.min(W * 0.82 - eleRect.width * 0.5, W - eleRect.width - 32)
        );
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1068;
        const finalTop = isMobile 
            ? Math.round(sec2Rect.top - wrapperRect.top + (sec2Rect.height - eleRect.height) * 0.5 - 40) // mobile: moved up to prevent leg cutoff
            : Math.round(sec2Rect.top - wrapperRect.top + sec2Rect.height - eleRect.height * 0.92); // desktop: position so legs overflow into orange section (92% above = 8% legs overflow)

        const midLeft = Math.round(startLeft + (finalLeft - startLeft) * 0.45);
        const midTop = Math.round(startTop + (finalTop - startTop) * 0.45);

        return { startLeft, startTop, midLeft, midTop, finalLeft, finalTop };
    }



    useEffect(() => {
        const wrapper = wrapperRef.current;
        const eleWrap = eleWrapRef.current;
        const eleImg = eleImgRef.current;
        const g1 = g1Ref.current;
        const leaf1 = leaf1Ref.current;

        if (!wrapper || !eleWrap || !eleImg || !g1) return undefined;
        
        // Set leaf1 position for mobile - use setTimeout to ensure element is rendered
        const setLeaf1Position = () => {
            if (leaf1 && typeof window !== 'undefined') {
                const isMobile = window.innerWidth <= 1068;
                if (isMobile) {
                    leaf1.style.setProperty('top', 'calc(25vh - 300px)', 'important');
                } else {
                    leaf1.style.setProperty('top', '25vh', 'important');
                }
            }
        };
        
        // Try immediately and also after a short delay
        setLeaf1Position();
        setTimeout(setLeaf1Position, 100);
        requestAnimationFrame(setLeaf1Position);

        const sec1 = wrapper.querySelector(".meet1 .frames1") as HTMLElement | null;
        const sec2 = wrapper.querySelector(".meet2") as HTMLElement | null;
        if (!sec1 || !sec2) return undefined;

        function buildTimeline() {
            if (!wrapper || !eleWrap || !eleImg || !sec1 || !sec2) return;

            if (tlRef.current) {
                tlRef.current.scrollTrigger?.kill();
                tlRef.current.kill();
                tlRef.current = null;
            }

            const wrapperRect = wrapper.getBoundingClientRect();
            const sec1Rect = sec1.getBoundingClientRect();
            const sec2Rect = sec2.getBoundingClientRect();
            const eleRect = eleImg.getBoundingClientRect();

            const { startLeft, startTop, midLeft, midTop, finalLeft, finalTop } =
                computePositions(wrapperRect, sec1Rect, sec2Rect, eleRect);

            // ---------------- MOBILE OVERRIDES ----------------
            let sLeft = startLeft;
            let sTop = startTop;
            let fLeft = finalLeft;
            let fTop = finalTop;
            let mLeft = midLeft;

            const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1068;
            // Desktop: keep start aligned; apply a late shift to avoid overlapping awards/categories
            const desktopEndShift = !isMobile ? wrapperRect.width * 0.12 : 0;

            if (isMobile) {
                sLeft = -230; // Start from very left (slightly off-screen for effect), moved left by 50px for mobile
                sTop = -20; // Start position moved up by 20px for mobile

                fLeft = Math.round(Math.min(wrapperRect.width * 0.82 - eleRect.width * 0.5, wrapperRect.width * 0.75)) -20;
                fTop = Math.round(sec2Rect.top - wrapperRect.top + (sec2Rect.height - eleRect.height) * 0.45) + 170;
                mLeft = midLeft;
            }


            // place at start
            eleWrap.style.left = `${sLeft}px`;
            eleWrap.style.top = `${sTop}px`;

            // reset transforms
            gsap.set(eleWrap, { x: 0, y: 0, scale: 1, transformOrigin: "50% 50%" });
            gsap.set(eleImg, { scaleX: 1, transformOrigin: "50% 50%" });

            const dxMid = mLeft - sLeft;
            const dyMid = midTop - sTop;
            const dxFinal = fLeft - sLeft;
            const dyFinal = fTop - sTop;

            // Timeline durations (we use relative durations so the scroll progress maps to 40%/20%/40% + extra zoom)
            // move1: 40% , flip: 20%, move2: 40%, zoom: small extra portion
            const move1 = 0.8; // 40%
            const flipDur = 0.4; // 20%
            const move2 = 0.8; // 40%
            const zoomDur = 0.4; // extra zoom portion (total timeline maps to end += 140%)

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    // timeline mapped across 140% of the viewport so: first 100% finishes the move, next 40% handles zoom
                    end: "+=140%",
                    scrub: 1,
                    pin: false,
                },
            });

            // Move: start -> mid (40%)
            tl.to(eleWrap, {
                duration: move1,
                x: dxMid,
                y: dyMid,
            });

            // Flip (20%) — quick flip around vertical center
            tl.to(
                eleImg,
                {
                    duration: flipDur,
                    scaleX: -1,
                    transformOrigin: "50% 50%",
                },
                ">"
            );

            // Middle -> Final (40%) — arrive with a larger scale (1.5)
            // Note: we scale the wrapper so the element grows uniformly
            const finalScale = isMobile ? 0.75 : 1.0; // Reduced by 25% in second frame on mobile
            tl.to(
                eleWrap,
                {
                    duration: move2,
                    scale: finalScale, // arrives at final scale (0.75x on mobile, 1.0x on desktop)
                    x: dxFinal,
                    y: dyFinal,
                },
                ">"
            );

            // Desktop: final nudge to the right after main move to avoid overlap
            if (!isMobile && desktopEndShift !== 0) {
                tl.to(
                    eleWrap,
                    {
                        duration: 0.25,
                        x: dxFinal + desktopEndShift,
                    },
                    ">"
                );
            }

            // Move DOWN + zoom with scroll after reaching position 2
            const additionalY = isMobile ? 100 : 30; // minimal downward movement on desktop to keep legs visible in orange section
            const zoomScale = isMobile ? 1.05 : 1.4; // Reduced by 25% on mobile (1.4 * 0.75 = 1.05)
            tl.to(
                eleWrap,
                {
                    duration: zoomDur,
                    y: dyFinal + 100, // reduced downward movement to keep legs visible
                    scale: zoomScale, // zoom scale (reduced by 25% on mobile)
                    ease: "power1.out",
                },
                ">"
            );

            tlRef.current = tl;
        }

        if (eleImg.complete && eleImg.naturalWidth !== 0) {
            buildTimeline();
        } else {
            eleImg.onload = () => buildTimeline();
            // fallback build in case image load event doesn't fire reliably
            setTimeout(() => {
                if (wrapper && eleWrap && eleImg && sec1 && sec2) {
                    buildTimeline();
                }
            }, 500);
        }

        const resizeHandler = () => {
            if (!eleWrap || !eleImg) return;
            gsap.killTweensOf(eleWrap);
            gsap.killTweensOf(eleImg);
            ScrollTrigger.getAll().forEach((s) => s.kill());
            buildTimeline();
            
            // Update leaf1 position on resize
            if (leaf1 && typeof window !== 'undefined') {
                const isMobile = window.innerWidth <= 1068;
                if (isMobile) {
                    leaf1.style.setProperty('top', 'calc(25vh - 300px)', 'important');
                } else {
                    leaf1.style.setProperty('top', '25vh', 'important');
                }
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener("resize", resizeHandler);
        }

        // MOBILE INFINITE LOOP SLIDER// MOBILE SLIDER (Infinite Loop)
        // MOBILE SLIDER (Slide → Pause → Slide Loop)
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            const track = document.getElementById("juryMobileTrack");
            if (track) {
                const slideWidth = 200; // each slide width
                const totalSlides = 3;  // real slides (3 jurors only)
                const spacing = 2;
                const moveDistance = (slideWidth + spacing); // one slide shift
                let x = 0;

                const slideDuration = 600;  // ms (how long it moves)
                const pauseDuration = 2000; // ms pause after each slide

                function slideOnce() {
                    if (!track) return; // Guard clause for TypeScript
                    const targetX = x - moveDistance;

                    track.style.transition = `transform ${slideDuration}ms ease-out`;
                    track.style.transform = `translateX(${targetX}px)`;

                    x = targetX;

                    // after slide finishes
                    setTimeout(() => {
                        if (!track) return; // Guard clause for TypeScript

                        // reset after all slides (full cycle)
                        if (Math.abs(x) >= moveDistance * totalSlides) {
                            track.style.transition = "none";
                            x = 0;
                            track.style.transform = `translateX(0px)`;
                        }

                        // pause then slide again
                        setTimeout(slideOnce, pauseDuration);

                    }, slideDuration);
                }

                // start the cycle
                slideOnce();
            }
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("resize", resizeHandler);
            }
            ScrollTrigger.getAll().forEach((s) => s.kill());
            tlRef.current?.kill();
        };
    }, []);




    return (
        <>
            <div
                ref={wrapperRef}
                className="relative w-full overflow-hidden md:overflow-visible bg-[#6A9139] mobile-elephant-wrapper"
                // Make the section 2.5 viewports tall so we have room for the arrival + extra zoom
                style={{ height: "250vh" }}

            >
                <img
                    src="/assets/partition line.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none z-[5]"
                    style={{
                        top: "-15px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        height: "auto",
                        filter: "brightness(0)" // 👈 turns white/colored PNG into black
                    }}
                />

                {/* PAGE 1 */}
                <section className="meet1 h-screen relative flex items-start justify-center">

                    <div className="absolute top-28 md:right-112  md:top-20   right-[-8] -translate-x-1/2 z-10">
                        <Image src="/assets/jurymeet.png" alt="meet" width={280} height={100} className="w-[140px] sm:w-[180px] md:w-[240px] h-auto" />
                    </div>
                    {/* MOBILE SLIDER */}
                    <div className="md:hidden absolute right-6 bottom-30 w-[200px] overflow-hidden z-20">
                        <div
                            id="juryMobileTrack"
                            className="flex"
                            style={{ width: "9999px" }} // track grows automatically
                        >
                            {[
                                "/meet the jury/Juror 1.png",
                                "/meet the jury/Juror 2.png",
                                "/meet the jury/Juror 3.png",
                            ].map((src, i) => (
                                <div key={i} className="w-[200px] flex-shrink-0 px-1">
                                    <div className="relative w-[180px] mx-auto">
                                        <Image
                                            src={src}
                                            alt="Jury member"
                                            width={400}
                                            height={480}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div
                        ref={g1Ref}
                        className="
                         mobileghost
                        frames1 absolute
                        top-32 sm:top-40 md:top-96
                        left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0
                        right-4 md:right-12
                        hidden md:grid
                        grid-cols-2 lg:grid-cols-4 md:grid-rows-2
                        gap-4 md:gap-6
                        justify-center md:justify-end
                    ">
                        {[
                            "/meet the jury/Juror 1.png",
                            "/meet the jury/Juror 2.png",
                            "/meet the jury/Juror 3.png",
                            "/meet the jury/Juror 4.png",
                            "/meet the jury/Juror 5.png",
                            "/meet the jury/Juror 6.png",
                            "/meet the jury/Juror 7.png",
                            "/meet the jury/Juror 8.png",
                        ].map((src, idx) => (
                            <div key={idx} className="relative w-[150px] sm:w-[180px] md:w-[240px] mx-auto">
                                <Image
                                    src={src}
                                    alt="Jury member"
                                    width={360}
                                    height={440}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    {/* ELEPHANT BACKGROUND LEAF-PATH */}
                    <img
                        ref={leaf1Ref}
                        src="/assets/leaf1.png"
                        alt=""
                        className="leaf1 absolute pointer-events-none"
                        style={{
                            left: "0vw",
                            top: typeof window !== 'undefined' && window.innerWidth <= 1068 ? "calc(25vh - 300px)" : "25vh",
                            width: "80vw",
                            bottom: "-30",
                            zIndex: 1,
                            filter: "hue-rotate(120deg) saturate(0.8) brightness(0.7) contrast(1.2)",
                        }}
                    />


                    <img
                        src="/assets/leaf2.png"
                        alt=""
                        className="leaf2 absolute pointer-events-none"
                        style={{
                            right: "-12vw",
                            top: "90vh",
                            width: "55vw",
                            zIndex: 10,
                            filter: "hue-rotate(120deg) saturate(0.8) brightness(0.7) contrast(1.2)",
                        }}
                    />



                    {/* Elephant */}
                    <div
                        ref={eleWrapRef}
                        className="absolute z-30 will-change-transform block mobile-elephant-z"
                        style={{ left: 0, top: 0 }} // initial absolute positioning — timeline will reposition
                    >
                        <img
                            ref={eleImgRef}
                            src="/assets/elephant.png"
                            alt=""
                            // responsive heights: smaller on mobile, larger on desktop
                            className="block w-auto pointer-events-none"
                            style={{
                                height: typeof window !== 'undefined' && window.innerWidth <= 1068 ? "60vh" : "120vh",
                                objectFit: "contain",
                                objectPosition: "bottom center",
                            }}
                            draggable="false"
                        />
                    </div>
                </section>

                {/* PAGE 2 */}
                <section className="meet2 top-50 md:right-30 h-screen relative">
                    {/* LEFT STITCH STRIP */}

                    {/* MOBILE: Event Section Image */}
                    <div className="md:hidden absolute left-1/2 -translate-x-1/2 w-[70%] z-10 mobile-offerings-top">
                        <Image
                            src="/assets/event section.png"
                            alt="Event Offerings"
                            width={800}
                            height={600}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* DESKTOP: TEXT CONTENT */}
                    <div className="hidden md:block offerings-container absolute left-1/2 -translate-x-1/2 md:left-[30vw] w-[92%] md:w-auto z-10">
                        <div className="offerings-box p-5 md:p-0 bg-[#6A9139] md:bg-transparent rounded-md md:rounded-none shadow-none md:shadow-none relative">

                            {/* Title */}
                            <h2 className="offerings-title font-bebas text-4xl sm:text-5xl md:text-6xl md:pb-8 text-[#111]">
                                EVENT OFFERINGS
                            </h2>

                            <div className="flex gap-4 md:gap-6 items-start">
                                {/* STRIP for mobile + desktop */}
                                <div className="  md:w-10 w-44 flex-shrink-10">
                                    <img
                                        src="/assets/strip.png"
                                        alt=""
                                        className="w-auto !h-[390px]"
                                    />
                                </div>

                                {/* LIST */}
                                <ul className="offerings-list font-texta flex flex-col text-[#000]  text-base md:text-[16px] lg:text-[20px] sm:mt-0 sm:gap-[53px]">

                                    <li className="pb-8 sm:pb-0">
                                        <strong>Screenings:</strong>
                                        <span> A curated showcase of <br /> regional gems and fresh voices.</span>
                                    </li>

                                    <li className="pb-8 sm:pb-0">
                                        <strong>Workshops:</strong>
                                        <span> Immersive, practical, and <br /> playful sessions—hands-on learning <br /> at its best.</span>
                                    </li>

                                    <li className="pb-8 sm:pb-0 mt-[-10px]">
                                        <strong>Skill Development Initiatives:</strong>
                                        <span> From direction to editing, story labs <br /> to pitch clinics, we equip creators for the world stage.</span>
                                    </li>

                                    <li className="pb-8 sm:pb-0 mt-[-10px]">
                                        <strong>Panels and Discussions:</strong>
                                        <span> Where audiences meet artists, <br /> ideas, and the culture that shapes us.</span>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>


                </section>


                {/* No frames here; elephant should have arrived near the top of this section */}

                {/* PAGE 3 (half page to make it 2.5 total) */}
                <section className="h-1/2-screen relative">



                </section>

                {/* LEAF 3 — MOBILE ONLY */}
                <img
                    src="/assets/leaf3.png"
                    alt=""
                    className="circlep md:hidden absolute pointer-events-none"
                    style={{
                        left: "0",
                        bottom: "0vh",
                        width: "200vw",
                        zIndex: 20,
                        filter: "hue-rotate(120deg) saturate(0.8) brightness(0.7) contrast(1.2)",

                    }}
                />



            </div>

        </>
    );
}
