import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Track scroll progress as the element moves through the center of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = text.split(" ");
  const totalCharacters = text.replace(/\s+/g, "").length;

  let runningCharCount = 0;

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap leading-relaxed select-none ${className}`}
    >
      {words.map((word, wordIndex) => {
        const chars = word.split("");
        const wordElement = (
          <span
            key={wordIndex}
            className="inline-block whitespace-nowrap mr-[0.28em] my-[0.08em]"
          >
            {chars.map((char, charIndex) => {
              const charStart = runningCharCount / totalCharacters;
              runningCharCount++;
              const charEnd = runningCharCount / totalCharacters;

              return (
                <CharacterSpan
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[charStart, charEnd]}
                />
              );
            })}
          </span>
        );
        return wordElement;
      })}
    </p>
  );
}

interface CharacterSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function CharacterSpan({ char, progress, range }: CharacterSpanProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(255, 255, 255, 0.22)", "rgba(255, 255, 255, 1)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-75"
    >
      {char}
    </motion.span>
  );
}
