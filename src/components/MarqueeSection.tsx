import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { marqueeImages } from "@/data/portfolioData";

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll listener for scroll-driven horizontal movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Split the 21 curated images across the two rows (Row 1: 11 images, Row 2: 10 images)
  const row1Images = marqueeImages.slice(0, 11);
  const row2Images = marqueeImages.slice(11);

  // Triple image repetition for continuous uninterrupted flow
  const tripleRow1 = [...row1Images, ...row1Images, ...row1Images];
  const tripleRow2 = [...row2Images, ...row2Images, ...row2Images];

  // Scroll-driven horizontal movement in opposite scrolling directions
  const xRow1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const xRow2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 bg-[#0C0C0C] overflow-hidden select-none"
      aria-label="Visual Engineering Showcase Marquee"
    >
      {/* Subtle edge gradient masks for cinematic fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0C0C0C] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0C0C0C] to-transparent z-20 pointer-events-none" />

      <div className="flex flex-col gap-6 sm:gap-8">
        {/* ROW 1: Scrolling Left */}
        <motion.div
          style={{ x: xRow1 }}
          className="flex gap-6 sm:gap-8 whitespace-nowrap will-change-transform"
        >
          {tripleRow1.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="relative shrink-0 w-[260px] sm:w-[340px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[240px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl group"
            >
              <img
                src={src}
                alt="Developer & 3D Visual Asset"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 contrast-105 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>

        {/* ROW 2: Scrolling Right (Opposite Direction) */}
        <motion.div
          style={{ x: xRow2 }}
          className="flex gap-6 sm:gap-8 whitespace-nowrap will-change-transform"
        >
          {tripleRow2.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="relative shrink-0 w-[260px] sm:w-[340px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[240px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl group"
            >
              <img
                src={src}
                alt="Intelligent Architecture & Visual System"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 contrast-105 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
