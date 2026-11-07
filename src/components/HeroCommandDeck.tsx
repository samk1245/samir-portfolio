import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Compass, ChevronDown, Activity, Cpu } from "lucide-react";

export function HeroCommandDeck() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize modern sci-fi UI chime using Web Audio API
  const playUiSound = (freq = 440, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // AudioContext unavailable
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      setTimeout(() => playUiSound(580, "triangle"), 50);
    }
  };

  const scrollTo = (id: string, freq = 480) => {
    setActiveSection(id);
    playUiSound(freq, "sine");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 flex flex-col items-center gap-5 z-20">
      {/* Floating Holographic Command Deck Bar */}
      <div className="w-full p-2.5 sm:p-3 rounded-2xl sm:rounded-full bg-white/90 dark:bg-[#171A21]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 transition-all hover:border-[#2F4BF0]/40">
        
        {/* Left: Engine Telemetry & Audio Synth Toggle */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#2F4BF0]" />
              <span>128×128 Physics Engine</span>
            </span>
          </div>

          <div className="h-3 w-px bg-slate-300 dark:bg-white/20 hidden sm:block" />

          {/* Audio Synthesizer Button */}
          <button
            onClick={toggleSound}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all flex items-center gap-1.5 ${
              soundEnabled
                ? "bg-[#2F4BF0] text-white shadow-sm shadow-[#2F4BF0]/30"
                : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
            title="Toggle Web Audio UI Synthesizer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3 h-3 text-[#F2B31B] animate-pulse" />
                <span>AUDIO ON</span>
                {/* Dancing Equalizer Bars */}
                <div className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-0.5 h-full bg-[#F2B31B] animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2/3 bg-white animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-4/5 bg-[#F2B31B] animate-[pulse_0.3s_ease-in-out_infinite]" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-slate-400" />
                <span>AUDIO FX</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Interactive Compass Radar Jump Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full py-1 sm:py-0">
          {[
            { id: "about", label: "01 ABOUT", freq: 440 },
            { id: "experience", label: "02 WORK", freq: 520 },
            { id: "projects", label: "03 PROJECTS", freq: 620 },
            { id: "skills", label: "04 SKILLS", freq: 720 },
            { id: "contact", label: "05 CONTACT", freq: 840 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id, item.freq)}
              onMouseEnter={() => playUiSound(item.freq * 0.75, "sine")}
              className={`px-3 py-1.5 rounded-xl sm:rounded-full text-[11px] font-mono font-bold tracking-wider transition-all whitespace-nowrap ${
                activeSection === item.id
                  ? "bg-[#2F4BF0] text-white shadow-md shadow-[#2F4BF0]/30 scale-105"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:text-[#2F4BF0] dark:hover:text-[#F2B31B] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Quick Action Pill */}
        <div className="hidden lg:flex items-center gap-2 pr-2">
          <a
            href="#projects"
            onClick={() => playUiSound(680, "triangle")}
            className="px-3.5 py-1.5 rounded-full bg-[#F2B31B] hover:bg-[#dba116] text-[#12141B] text-[11px] font-mono font-extrabold tracking-wide uppercase shadow-sm transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Showcase</span>
          </a>
        </div>
      </div>

      {/* Modern Editorial Scroll Down Prompt */}
      <button
        onClick={() => scrollTo("about", 440)}
        className="group flex flex-col items-center gap-2 text-slate-400 hover:text-[#2F4BF0] dark:hover:text-[#F2B31B] transition-colors cursor-pointer pt-1"
      >
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.25em] text-slate-500 group-hover:text-[#2F4BF0] dark:group-hover:text-[#F2B31B] transition-colors">
          Scroll To Explore
        </span>

        {/* Minimalist Editorial Mouse Pill with Animated Sliding Dot */}
        <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center p-1 relative">
          <div className="w-1 h-2 rounded-full bg-current animate-[bounce_1.5s_infinite]" />
        </div>

        <ChevronDown className="w-4 h-4 -mt-1 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
