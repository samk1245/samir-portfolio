import React, { useEffect, useRef, useState } from "react";
import { FacePhysicsEngine, ExpressionType } from "./engine";
import { Sparkles, RefreshCcw } from "lucide-react";

export function FaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<FacePhysicsEngine | null>(null);

  const [patience, setPatience] = useState(100);
  const [stateText, setStateText] = useState("Calm & Friendly 😊");
  const [expression, setExpression] = useState<ExpressionType>("neutral");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, 560);
      if (engineRef.current) {
        engineRef.current.resize(size, size);
      }
    };

    const engine = new FacePhysicsEngine(canvas, {
      onPatienceChange: (p, label) => {
        setPatience(p);
        setStateText(label);
      },
      onExpressionChange: (expr) => {
        setExpression(expr);
      },
    });
    engineRef.current = engine;

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-[560px] mx-auto select-none"
    >
      {/* Cobalt-Blue Circular Disc Background */}
      <div
        className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] rounded-full bg-[#2F4BF0] -z-10 shadow-[0_20px_60px_rgba(47,75,240,0.35)] transition-transform duration-700 ease-out"
        style={{
          transform: `scale(${1 + (100 - patience) * 0.0012})`,
        }}
      >
        {/* Subtle radial inner glow on disc */}
        <div className="absolute inset-0 rounded-full bg-radial from-white/20 via-transparent to-black/20 pointer-events-none" />

        {/* Ambient Orbit Accent Ring */}
        <div className="absolute -inset-3.5 sm:-inset-5 rounded-full border-2 border-dashed border-[#F2B31B]/40 pointer-events-none animate-[spin_45s_linear_infinite]" />
      </div>

      {/* Handwritten "Try interacting with me" Hint with Mustard Yellow Doodle */}
      <div className="absolute -top-4 -right-2 sm:-right-8 sm:-top-6 z-20 pointer-events-none flex flex-col items-center rotate-6">
        <span className="font-['Caveat',cursive] text-lg sm:text-2xl font-bold text-[#F2B31B] bg-[#12141B] dark:bg-[#0E1015] px-3.5 py-1 rounded-full border border-[#F2B31B]/50 shadow-lg tracking-wide">
          Try stretching my cheeks! ↗
        </span>
        <svg
          className="w-8 h-8 text-[#F2B31B] -mt-1 -scale-x-100"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M10 5 C 15 20, 25 25, 32 32 M 24 32 L 32 32 L 32 24" />
        </svg>
      </div>

      {/* WebGL2 Canvas */}
      <div className="relative w-full aspect-square max-w-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain touch-none"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Live Patience Meter & Status Bar */}
      <div className="w-full max-w-[380px] mt-2 px-4 py-3 rounded-2xl bg-white/90 dark:bg-[#171A21]/90 backdrop-blur-md border border-[#12141B]/10 dark:border-white/10 shadow-xl flex flex-col gap-2 z-10 transition-all">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#12141B] dark:text-[#EEF0F5]">
            <Sparkles className="w-3.5 h-3.5 text-[#F2B31B]" />
            Patience Meter
          </span>
          <span
            className={`font-semibold transition-colors ${
              patience > 60
                ? "text-[#2F4BF0]"
                : patience > 30
                  ? "text-[#F2B31B]"
                  : "text-[#EF4444]"
            }`}
          >
            {patience}%
          </span>
        </div>

        {/* Meter Gauge Bar */}
        <div className="w-full h-2 rounded-full bg-[#E8EBF1] dark:bg-white/10 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-150 rounded-full ${
              patience > 60
                ? "bg-[#2F4BF0]"
                : patience > 30
                  ? "bg-[#F2B31B]"
                  : "bg-[#EF4444] animate-pulse"
            }`}
            style={{ width: `${patience}%` }}
          />
        </div>

        {/* Dynamic Reaction Line */}
        <div className="flex items-center justify-between text-[11px] font-sans text-slate-500 dark:text-slate-400">
          <span className="italic">{stateText}</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-medium">
            State: {expression}
          </span>
        </div>
      </div>
    </div>
  );
}
