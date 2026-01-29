"use client";

import { useEffect, useRef } from "react";
import SafeLink from "./SafeLink";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useAnimation, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function DogScroller() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const dogRef = useRef<HTMLImageElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const resizeRaf = useRef<number | null>(null);
    const circle2Ref = useRef<HTMLImageElement | null>(null);        // ✅ CIRCLE-2 ref
    const homeControls = useAnimation();
    const aboutControls = useAnimation();
    const homeRef = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const homeInView = useInView(homeRef, { once: true, margin: "-50px" });
    const aboutInView = useInView(aboutRef, { once: true, margin: "-50px" });
    const circleRef = useRef<HTMLImageElement | null>(null);
    const circle3Ref = useRef<HTMLImageElement | null>(null); // ✅ circle3
    const dogWrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (homeInView) homeControls.start({ y: 0, opacity: 1 });
    }, [homeInView, homeControls]);

    useEffect(() => {
        if (aboutInView) aboutControls.start({ y: 0, opacity: 1 });
    }, [aboutInView, aboutControls]);

    function computePositions(
        wrapperRect: DOMRect,
        homeRect: DOMRect,
        aboutRect: DOMRect,
        dogRect: DOMRect
    ) {
        const W = wrapperRect.width;

        const startLeft = Math.round(W * -0.11);
        const startTop = Math.round(
            homeRect.top - wrapperRect.top + (homeRect.height - dogRect.height) * 0.55 + 90 // Moved down by 15px from navbar
        );

        const finalLeft = Math.round(
            Math.min(W * 0.82 - dogRect.width * 0.5, W * 0.75)
        );
        // Position character so it's half in section 2 (about) and half in section 3 (MeetCrew)
        // Position moved up a bit for the refined desktop layout
        const finalTop = Math.round(
            aboutRect.top -
            wrapperRect.top +
            aboutRect.height -
            (dogRect.height * 0.35) -
            170 // Moved up by 170px to match desktop tweak
        );

        const midLeft = Math.round(startLeft + (finalLeft - startLeft) * 0.45);
        const midTop = Math.round(
            startTop + Math.max(typeof window !== 'undefined' ? window.innerHeight * 0.1 : 0, (finalTop - startTop) * 0.45)
        );

        return { startLeft, startTop, midLeft, midTop, finalLeft, finalTop };
    }

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const dog = dogRef.current;
        if (!wrapper || !dog) return;

        const circle = circleRef.current;

        if (circle && wrapper) {
            const wrapperHeight = wrapper.getBoundingClientRect().height;

            gsap.fromTo(
                circle,
                { y: 0 },
                {
                    y: -wrapperHeight + 200,
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top top",
                        end: "+=100%",
                        scrub: true,
                    },
                }
            );
        }

        const homeContent = wrapper.querySelector(".home .content");
        const aboutContent = wrapper.querySelector(".about .content");
        if (!homeContent || !aboutContent) return;

        function onLoaded() {
            buildTimeline();

            function onResize() {
                if (resizeRaf.current !== null) {
                    cancelAnimationFrame(resizeRaf.current);
                }
                resizeRaf.current = requestAnimationFrame(() => buildTimeline());
            }
            if (typeof window !== 'undefined') {
                window.addEventListener("resize", onResize);
            }
            return () => {
                if (typeof window !== 'undefined') {
                    window.removeEventListener("resize", onResize);
                }
            };
        }

        function buildTimeline() {
            if (!wrapper || !dog || !homeContent || !aboutContent) return;
            if (tlRef.current) {
                tlRef.current.scrollTrigger && tlRef.current.scrollTrigger.kill();
                tlRef.current.kill();
                tlRef.current = null;
            }

            const wrapperRect = wrapper.getBoundingClientRect();
            const homeRect = homeContent.getBoundingClientRect();
            const aboutRect = aboutContent.getBoundingClientRect();
            const dogRect = dog.getBoundingClientRect();

            const { startLeft, startTop, midLeft, midTop, finalLeft, finalTop } =
                computePositions(wrapperRect, homeRect, aboutRect, dogRect);

            // detect mobile breakpoint (same as your other code)
            const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1068;

            // mobile overrides for start position (you tuned these already)
            let mobileStartLeft = -190;
            let mobileStartTop = homeRect.height * 0.96;

            let sLeft = startLeft;
            let sTop = startTop;
            if (isMobile) {
                sLeft = mobileStartLeft;
                sTop = mobileStartTop;
            }

            dog.style.left = `${sLeft}px`;
            dog.style.top = `${sTop}px`;
            gsap.set(dog, { x: 0, y: 0, rotation: 0, scaleX: 1 });

            let dxFinal = finalLeft - sLeft;
            let dyFinal = finalTop - sTop;

            // mobile final offset tweak (trial & error friendly)
            if (isMobile) {
                dxFinal += -160;   // nudge left on mobile (extra 100px)
                dyFinal += -220;  // nudge up on mobile
            }
            else {
                dxFinal += -40;     // small left nudge
                dyFinal += -250;    // lift up on desktop too
            }

            const tl = gsap.timeline({
                defaults: { ease: "power1.inOut" },
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "+=145%",
                    scrub: 1.4,
                    anticipatePin: 1,
                },
            });

            gsap.set(dog, {
                x: 0,
                y: 0,
                rotation: 0,
                scaleX: 1,
                transformOrigin: "50% 50%",
            });

            const moveDuration = 3.8;
            tl.addLabel("moveStart");

            tl.to(
                dogWrapRef.current,
                {
                    duration: moveDuration,
                    x: dxFinal,
                    y: dyFinal,
                    scale: 1.0,
                    rotation: isMobile ? -30 : 0,  // small bend on mobile final pose
                    ease: "power2.inOut",
                    force3D: true,
                },
                "moveStart"
            );

            // ⭐ Zoom AFTER dog reaches final position
            tl.to(
                dogWrapRef.current,
                {
                    duration: 0.4,      // adjust slow/fast zoom
                    scale: 1.2,        // final zoom size
                    ease: "power2.out",
                },
                `moveStart+=${moveDuration}` // starts AFTER final movement finishes
            );


            // ---------- CIRCLE-2: position relative to dog's final box, with Y offset ----------
            const circle2 = circle2Ref.current;
            if (circle2) {
                // ensure wrapper is positioned so absolute coords are relative to it
                if (wrapper && getComputedStyle(wrapper).position === "static") {
                    wrapper.style.position = "relative";
                }

                // THESE values are the desktop-optimized ones from your friend's tuned version.
                // Visibility: desktop-only (hidden on mobile). We keep this behavior to avoid clutter on small screens.
                // If you want circle-2 visible on mobile, remove `hidden md:block` from the JSX.
                const offsetX = 0;
                const offsetY = -220; // moved up a bit for desktop composition

                // compute anchor using final values (same as desktop)
                let anchorX = finalLeft + dogRect.width * 0.55 + offsetX;
                let anchorY = finalTop + dogRect.height * 0.22 + offsetY;

                // If you want to nudge the circle differently on mobile, tweak here:
                if (isMobile) {
                    // small mobile nudge; change numbers while testing
                    anchorX -= 40;
                    anchorY += 200;
                }

                circle2.style.position = "absolute";
                circle2.style.left = `${Math.round(anchorX)}px`;
                circle2.style.top = `${Math.round(anchorY)}px`;
                circle2.style.transform = "translate(-50%, -50%)";
                circle2.style.transformOrigin = "50% 50%";
                circle2.style.willChange = "transform,opacity";

                tl.fromTo(
                    circle2,
                    {
                        opacity: 0,
                        rotate: -180,
                    },
                    {
                        opacity: 1,
                        rotate: 0,
                        duration: 3.5,
                        ease: "power3.out",
                    },
                    `moveStart+=${moveDuration * 0.3}`
                );
            }

            // ✅ CIRCLE-3 (bottom-right of circle2)


            // flip the dog's image horizontally mid-animation for "look" effect
            tl.to(
                dogRef.current,
                {
                    duration: 0.6,
                    scaleX: -1,
                    ease: "power3.inOut",
                    force3D: true,
                },
                `moveStart+=${moveDuration * 0.35}`
            );

            tlRef.current = tl;
        }

        if (dog && dog instanceof HTMLImageElement) {
            if (dog.complete) {
                onLoaded();
            } else {
                dog.addEventListener("load", onLoaded, { once: true });
            }
        }

        return () => {
            if (tlRef.current) {
                tlRef.current.scrollTrigger && tlRef.current.scrollTrigger.kill();
                tlRef.current.kill();
                tlRef.current = null;
            }
            ScrollTrigger.getAll().forEach((st) => st.kill && st.kill());
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="animation-wrapper "
            style={{
                backgroundColor: "#FFCE21",
                overflow: "visible", // Allow character to extend into next section
            }}
        >
            
            {/* 🟡 HOME SECTION */}
            <section
                className="section home relative"
                style={{ alignItems: "flex-start", justifyContent: "start" }}
            >
                {/* Content Container - Centered on mobile, right-aligned on desktop */}
                <motion.div
                    ref={homeRef}
                    initial={{ y: 60, opacity: 0 }}
                    animate={homeControls}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="
    content flex flex-col 
    gap-3 md:gap-4
    text-left left-0 md:left-10
    md:ml-auto 
    pl-8 pr-6 md:px-6 md:pr-[8vw]
    max-w-full md:max-w-[700px]
    z-50 relative 
    w-full md:w-auto
    pt-8 md:pt-20
  "
                >
                    <h1 className="
    font-bebas 
    text-[34px] sm:text-[40px] md:text-[60px] lg:text-[80px]
    leading-[1.05] md:leading-[82px]
    text-[#000] 
  ">
                        CELEBRATING CINEMA <br />
                        THAT SPEAKS, SINGS <br />
                        AND REMEMBERS.
                    </h1>

                    <p className="
    font-texta
    text-[15px] sm:text-[16px] md:text-[20px]
    text-[#091529] 
    mt-[-6] md:mt-[-16] 
    leading-[1.4]
  ">
                        A day of celebrating films, voices and live<br /> experiences
                        <strong> - 21st & 22nd February 2026, Minto Hall, Bhopal</strong>
                    </p>

                    <div className="
    flex flex-row 
    justify-start 
    gap-3 
    mt-4 md:mt-4 
    w-full md:w-auto

  ">
                        <div className="flex gap-6 md:gap-8 mr-0 md:mr-24 mt-[-10] ">
                            <a
                                href="https://konfhub.com/the-bhopal-film-festival-2026"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-texta px-6 py-2.5 bg-[#091529] text-white rounded-md  text-sm md:text-lg text-center hover:opacity-90 transition whitespace-nowrap"
                            >
                                Book Tickets
                            </a>
                            <SafeLink
                                href="/submit-film"
                                className="font-texta px-6 py-2.5 border-2 border-[#091529] bg-[#FFCE21] text-[#091529] rounded-md  text-sm md:text-lg text-center hover:opacity-90 transition whitespace-nowrap"
                            >
                                Submit Film
                            </SafeLink>
                        </div>
                    </div>
                </motion.div>

                {/* Desktop animated character — hidden on mobile */}
                <div
                    ref={dogWrapRef}
                    className="absolute block md:block"
                    style={{ left: 0, top: 0, zIndex: 30, willChange: "transform" }}
                >
                    <img
                        ref={dogRef}
                        src="/assets/dog.png"
                        alt="dog"
                        className="dog"
                        draggable="false"
                        style={{ display: "block", willChange: "transform" }}
                    />
                </div>

                {/* Mobile Character — visible on mobile only */}
                {/* <div
                    className="absolute bottom-0 right-0 md:hidden pointer-events-none z-10"
                    style={{
                        width: "120%",
                        height: "55vh",
                        bottom: "-20px",   
                    }}
                >
                    <img
                        src="/assets/dog.png"
                        alt="character holding megaphone"
                        className="mobile-dog absolute bottom-0 right-0 w-auto max-w-full object-contain object-bottom"
                        draggable="false"
                        style={{ zIndex: 20 }}
                    />

                </div> */}
                {/* circle background (desktop only) */}
                <img
                    ref={circleRef}
                    src="/assets/circle.png"
                    alt=""
                    className="circle1 absolute left-0 h-auto z-10 block md:w-[750px] w-[300px]"
                    style={{ bottom: "-100px" }} // moved up a bit for the refined composition
                    draggable="false"
                />

                {/* ✅ CIRCLE-2 element - desktop only (hidden on mobile) */}
                <img
                    ref={circle2Ref}
                    src="/assets/circlep.png"
                    className=" circleha absolute w-[800px] h-auto z-20 pointer-events-none mix-blend-luminosity  md:block"
                    style={{ zIndex: 8, opacity: 0 }}
                    alt="circle behind dog"
                    draggable="false"
                />

                {/* ✅ circle-3 - desktop only */}



            </section>


            {/* 🟡 ABOUT SECTION */}
            <section className="section about justify-start md:justify-start">
                <motion.div
                    ref={aboutRef}
                    initial={{ y: 60, opacity: 0 }}
                    animate={aboutControls}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="content flex flex-col gap-0 text-left px-4 md:pl-[8vw] max-w-full md:max-w-[700px] z-50 relative"
                >
                    <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl  text-[#000] uppercase tracking-tight mb-0 pb-0">
                        WHO WE ARE
                    </h2>

                    <p className="about-text font-texta  text-[#091529] text-sm md:text-lg lg:text-xl -mt-4 md:-mt-5">
                        <span className="md:hidden about-text-mobile">
                            <span className="block">We are a collective of dreamers,</span>
                            <span className="block">doers and storytellers at the</span>
                            <span className="block">vibrant crossroads of Madhya Pradesh.</span>
                            <span className="block">We champion authentic narratives and</span>
                            <span className="block">connect them to the world—nurturing</span>
                            <span className="block">creative souls and building bridges between</span>
                            <span className="block">cinema, arts, literature and people.</span>
                            <span className="block">Our festival thrives on real stories, shared</span>
                            <span className="block">laughter, creative ambition</span>
                            <span className="block">and collective wisdom. <strong>Our heart beats</strong></span>
                            <span className="block"><strong>for cinema that digs deep</strong></span>
                            <span className="block"><strong>into roots and grows new ideas skyward.</strong></span>
                        </span>
                        <span className="hidden md:inline">
                            We are a collective of dreamers,<br/> doers, and storytellers at the vibrant<br/> crossroads of Madhya Pradesh. We<br/> champion authentic narratives and<br/> connect them to the world—nurturing<br/> creative souls, building bridges between<br/> cinema, arts, literature, and people. Our<br/> festival thrives on real stories, shared<br/> laughter, creative ambition, and<br/> collective wisdom. <strong>Our heart beats<br/> for cinema that digs deep into roots<br/> and grows new ideas skyward.</strong>
                        </span>
                    </p>

                    <SafeLink
                        href="/about"
                        className="read-more font-texta flex items-center md:text-lg lg:text-xl gap-2 md:gap-0 text-sm mb-8 mt-0 md:mt-4 lg:mt-6 pt-0 text-[#000] font-semibold"
                    >
                        <img src="/assets/readmore.svg" className="w-8 h-8" />
                        Read More
                    </SafeLink>

                </motion.div>

                <img
                    ref={circle3Ref}
                    src="/assets/circlepq.png"
                    className="bcircle absolute pointer-events-none"
                    style={{
                        bottom: "calc(-10vh - 15px)",
                        left: "90%",
                        transform: "translateX(-50%)",
                        opacity: 1,
                        zIndex: 10
                    }}
                />

            </section>
        </div>
    );
}
