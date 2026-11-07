import React, { useEffect, useRef, useState } from "react";

interface SlideCurtainProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  shutterLabel?: string;
}

export function SlideCurtain({
  children,
  id,
  className = "",
  shutterLabel,
}: SlideCurtainProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpen(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
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
      className={`relative overflow-hidden transition-all duration-700 ${className}`}
    >
      {/* Sliding Aperture Shutter Left Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#E8EBF1] to-[#D5DAE6] dark:from-[#0E1015] dark:to-[#171A21] z-30 pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] border-r-2 border-[#2F4BF0] ${
          isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      />

      {/* Sliding Aperture Shutter Right Panel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#E8EBF1] to-[#D5DAE6] dark:from-[#0E1015] dark:to-[#171A21] z-30 pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] border-l-2 border-[#F2B31B] ${
          isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      />

      {/* Shutter Opening Center Neon Seam Laser */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#2F4BF0] via-[#00F0FF] to-[#F2B31B] z-40 pointer-events-none transition-opacity duration-700 shadow-[0_0_15px_#2F4BF0] ${
          isOpen ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
        }`}
      />

      {/* Actual Section Content */}
      <div
        className={`transition-all duration-1000 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-40 translate-y-8 blur-[1px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
