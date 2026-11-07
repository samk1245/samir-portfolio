import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { ChevronsRight, Sparkles, Check, ArrowDown } from "lucide-react";

interface SlideToExploreProps {
  targetId?: string;
}

export function SlideToExplore({ targetId = "about" }: SlideToExploreProps) {
  const [sliderPos, setSliderPos] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isUnlocked) return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current || isUnlocked) return;
    const rect = trackRef.current.getBoundingClientRect();
    const knobWidth = 52;
    const maxTravel = rect.width - knobWidth;
    if (maxTravel <= 0) return;

    const currentX = e.clientX - rect.left - knobWidth / 2;
    const clampedRatio = Math.max(0, Math.min(1, currentX / maxTravel));
    setSliderPos(clampedRatio);

    if (clampedRatio >= 0.88) {
      triggerUnlock();
    }
  };

  const handlePointerUp = () => {
    if (!isUnlocked) {
      setIsDragging(false);
      setSliderPos(0);
    }
  };

  const triggerUnlock = () => {
    setIsUnlocked(true);
    setIsDragging(false);
    setSliderPos(1);

    // Explosive Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.85 },
        colors: ["#2F4BF0", "#F2B31B", "#00F0FF", "#EEF0F5"],
      });
    } catch {
      // fallback if canvas-confetti is not loaded
    }

    // Smooth slide-scroll to target section
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450);

    // Reset after 3.5s so user can slide again if they want
    setTimeout(() => {
      setIsUnlocked(false);
      setSliderPos(0);
    }, 3800);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-6 px-4">
      {/* Slider Track Container */}
      <div
        ref={trackRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-14 rounded-full bg-white/90 dark:bg-[#171A21]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl overflow-hidden flex items-center select-none p-1.5 touch-none"
      >
        {/* Active Fill Track */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#2F4BF0] via-[#4867F5] to-[#F2B31B] opacity-90 transition-all rounded-full pointer-events-none"
          style={{
            width: `${Math.max(sliderPos * 100, isUnlocked ? 100 : 0)}%`,
          }}
        />

        {/* Shimmering Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase transition-opacity flex items-center gap-2 ${
              sliderPos > 0.35 || isUnlocked
                ? "text-white drop-shadow-md"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {isUnlocked ? (
              <>
                <Sparkles className="w-4 h-4 text-[#F2B31B] animate-spin" />
                <span>UNLOCKED &bull; SLIDING IN</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">SLIDE TO OPEN SHOWCASE</span>
                <span className="sm:hidden">SLIDE TO OPEN</span>
                <ChevronsRight className="w-4 h-4 text-[#F2B31B] animate-pulse" />
              </>
            )}
          </span>
        </div>

        {/* Draggable Slider Knob */}
        <div
          onPointerDown={handlePointerDown}
          className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform cursor-grab active:cursor-grabbing ${
            isUnlocked
              ? "bg-[#F2B31B] text-[#12141B] scale-110"
              : "bg-[#2F4BF0] text-white hover:bg-[#233bc7]"
          }`}
          style={{
            transform: `translateX(${
              sliderPos *
              ((trackRef.current?.getBoundingClientRect().width ?? 320) - 52 - 12)
            }px)`,
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {isUnlocked ? (
            <Check className="w-5 h-5 font-black stroke-[3]" />
          ) : (
            <ChevronsRight className="w-5 h-5 animate-pulse" />
          )}
        </div>
      </div>

      {/* Accessible Fast-Click Link */}
      <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span>Or click:</span>
        <button
          onClick={triggerUnlock}
          className="text-[#2F4BF0] dark:text-[#F2B31B] font-bold hover:underline flex items-center gap-1"
        >
          <span>Instant Slide Open</span>
          <ArrowDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
