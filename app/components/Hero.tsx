// src/components/Hero.tsx
"use client";

import Image from "next/image";
import SafeLink from "./SafeLink";
import { MotionValue, useReducedMotion, useTransform, motion } from "framer-motion";

type Props = { scrollProgress: MotionValue<number> };

export default function Hero({ scrollProgress }: Props) {
  const prefersReduced = useReducedMotion();

  // INPUT ranges are fractions of total scroll (0..1)
  // OUTPUT ranges are degrees / px we want to animate
  const rotateX = useTransform(
    scrollProgress,
    [0, 0.18, 0.45, 0.8],   // key points along scroll
    prefersReduced ? [0, 0, 0, 0] : [0, 45, 45, -45] // bend forward -> hold -> lean back
  );

  const rotateY = useTransform(
    scrollProgress,
    [0, 0.45, 0.65, 1],
    prefersReduced ? [0, 0, 0, 0] : [0, 180, 180, 180] // flip around mid-scroll
  );

  const translateY = useTransform(
    scrollProgress,
    [0, 0.18, 0.4],
    prefersReduced ? [0, 0, 0] : [0, 140, 120] // fall down a bit
  );

  const translateX = useTransform(
    scrollProgress,
    [0, 0.4, 1],
    prefersReduced ? [0, 0, 0] : [0, 120, 420] // move right across sections
  );

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center"
      style={{ backgroundColor: "#FFCE21", perspective: 1200 }}
    >
      {/* Left: large director artwork (positioned absolute so it overflows like design) */}
      <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden lg:block">
        <motion.div
          // animated container for director (use motion div + bind transforms)
          style={{
            x: translateX,
            y: translateY,
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="absolute -left-36 md:-left-56 top-6 md:top-12 w-[60vw] max-w-[1100px] z-40"
        >
          <Image
            src="/assets/director.png"
            alt="Director"
            width={1600}
            height={900}
            priority
            className="w-full h-auto select-none"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Right: content */}
      <div className="relative ml-auto w-full lg:w-1/2 z-30 px-6 md:px-12">
        <div className="max-w-xl py-16 md:py-28">
          <h1 className="font-bebas font-extrabold text-[#091529] leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            CELEBRATING CINEMA
            <br />
            THAT SPEAKS, SINGS,
            <br />
            AND REMEMBERS.
          </h1>

          <p className="font-texta mt-6 text-[#091529] text-base md:text-lg">
            A day of celebrating films, voices, and live experiences —{" "}
            <strong>21st February 2026, Bhopal</strong>
          </p>

          <div className="mt-8 flex gap-4">
            <SafeLink
              href="/passes"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#091529] text-white rounded-md shadow-sm text-sm"
            >
              Book Tickets
            </SafeLink>

            <SafeLink
              href="/submit-film"
              className="inline-flex items-center justify-center px-5 py-3 border-2 border-[#091529] text-[#091529] rounded-md text-sm"
            >
              Submit Film
            </SafeLink>
          </div>
        </div>
      </div>
    </section>
  );
}
