import React, { useEffect, useRef, useState } from "react";

interface SlideCurtainProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SlideCurtain({
  children,
  id,
  className = "",
}: SlideCurtainProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative transition-all duration-700 ${className}`}
    >
      {/* Subtle top neon ambient beam */}
      <div
        className={`h-px w-full bg-gradient-to-r from-transparent via-[#2F4BF0]/40 to-transparent transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Smooth Editorial Section Reveal */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-40 translate-y-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
