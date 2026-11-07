import React, { useEffect, useRef, useState } from "react";
import { FacePhysicsEngine, ExpressionType } from "./engine";
import { Sparkles, RefreshCcw, Smile, Zap, Heart, Headphones, HelpCircle, Eye } from "lucide-react";

export function FaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<FacePhysicsEngine | null>(null);

  const [patience, setPatience] = useState(100);
  const [stateText, setStateText] = useState("Calm & Friendly (Protagonist Mode) ✨");
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

  const handleSetExpression = (expr: ExpressionType) => {
    if (engineRef.current) {
      engineRef.current.setExpressionDirect(expr);
      setExpression(expr);
    }
  };

  const handleBlink = () => {
    if (engineRef.current) {
      engineRef.current.triggerBlink();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-[560px] mx-auto select-none"
    >
      {/* Cobalt-Blue Circular Disc Background with Anime Radial Pulse */}
      <div
        className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] rounded-full bg-[#2F4BF0] -z-10 shadow-[0_20px_70px_rgba(47,75,240,0.4)] transition-transform duration-700 ease-out"
        style={{
          transform: `scale(${1 + (100 - patience) * 0.0015})`,
        }}
      >
        {/* Radial highlight on disc */}
        <div className="absolute inset-0 rounded-full bg-radial from-white/25 via-transparent to-black/25 pointer-events-none" />

        {/* Ambient Orbit Accent Ring with Neon Dash */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-dashed border-[#F2B31B]/50 pointer-events-none animate-[spin_40s_linear_infinite]" />

        {/* Cyber Inner Pulse Ring */}
        <div className="absolute inset-4 rounded-full border border-white/20 pointer-events-none animate-pulse" />
      </div>

      {/* Handwritten "Try interacting with me" Hint with Anime Marker */}
      <div className="absolute -top-4 -right-2 sm:-right-8 sm:-top-6 z-20 pointer-events-none flex flex-col items-center rotate-6">
        <span className="font-['Caveat',cursive] text-lg sm:text-2xl font-bold text-[#F2B31B] bg-[#12141B] dark:bg-[#0E1015] px-3.5 py-1 rounded-full border border-[#F2B31B]/60 shadow-xl tracking-wide flex items-center gap-1.5">
          <span>Stretch my anime cheeks!</span>
          <span className="text-sm">↗</span>
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
      <div className="w-full max-w-[420px] mt-2 px-4 py-3.5 rounded-2xl bg-white/95 dark:bg-[#171A21]/95 backdrop-blur-md border border-[#12141B]/10 dark:border-white/10 shadow-2xl flex flex-col gap-2.5 z-10 transition-all">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#12141B] dark:text-[#EEF0F5]">
            <Sparkles className="w-3.5 h-3.5 text-[#F2B31B]" />
            Anime Character Elasticity
          </span>
          <span
            className={`font-bold transition-colors ${
              patience > 60
                ? "text-[#2F4BF0]"
                : patience > 30
                  ? "text-[#F2B31B]"
                  : "text-[#EF4444]"
            }`}
          >
            {patience}% Patience
          </span>
        </div>

        {/* Meter Gauge Bar */}
        <div className="w-full h-2 rounded-full bg-[#E8EBF1] dark:bg-white/10 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-150 rounded-full ${
              patience > 60
                ? "bg-gradient-to-r from-[#2F4BF0] to-[#577CFA]"
                : patience > 30
                  ? "bg-gradient-to-r from-[#F2B31B] to-[#F59E0B]"
                  : "bg-gradient-to-r from-[#EF4444] to-[#DC2626] animate-pulse"
            }`}
            style={{ width: `${patience}%` }}
          />
        </div>

        {/* Reaction Status */}
        <div className="flex items-center justify-between text-[11px] font-sans text-slate-600 dark:text-slate-300">
          <span className="italic font-medium">{stateText}</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 font-bold text-[#2F4BF0] dark:text-[#F2B31B]">
            {expression}
          </span>
        </div>

        {/* Quick Anime Expression Switcher Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold hidden sm:inline">
            Expressions:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => handleSetExpression("neutral")}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                expression === "neutral"
                  ? "bg-[#2F4BF0] text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
              title="Confident Anime Smirk"
            >
              <Smile className="w-3 h-3 text-[#F2B31B]" />
              <span>Smirk</span>
            </button>

            <button
              onClick={() => handleSetExpression("startled")}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                expression === "startled"
                  ? "bg-[#2F4BF0] text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
              title="Shocked Anime Reaction"
            >
              <Zap className="w-3 h-3 text-[#F2B31B]" />
              <span>Shock</span>
            </button>

            <button
              onClick={() => handleSetExpression("blush")}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                expression === "blush"
                  ? "bg-[#2F4BF0] text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
              title="Manga Cheek Blush"
            >
              <Heart className="w-3 h-3 text-pink-400" />
              <span>Blush</span>
            </button>

            <button
              onClick={() => handleSetExpression("cyber")}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                expression === "cyber"
                  ? "bg-[#2F4BF0] text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
              title="Cyber Techwear Audio Vibe"
            >
              <Headphones className="w-3 h-3 text-cyan-400" />
              <span>Cyber</span>
            </button>

            <button
              onClick={handleBlink}
              className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all"
              title="Trigger Anime Eye Blink"
            >
              <Eye className="w-3.5 h-3.5 text-[#2F4BF0]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
