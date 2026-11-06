import React from "react";
import { personalInfo } from "@/data/portfolio";
import { FaceCanvas } from "@/face/FaceCanvas";
import { ArrowDown, Code2, Sparkles, Terminal, FileText, Send } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Top Badges / Context Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 text-xs font-mono font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2F4BF0]" />
            <span className="text-[#12141B] dark:text-[#EEF0F5]">
              Full-Stack &amp; AI/ML Developer
            </span>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:block">
            SIET Prayagraj &bull; Class of 2026
          </div>
        </div>

        {/* Massive Full-Width Hero Headline */}
        <div className="w-full text-left mb-6 sm:mb-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.92] text-[#12141B] dark:text-[#EEF0F5]">
            HEY, I'M{" "}
            <span className="mustard-marker text-[#12141B] dark:text-[#EEF0F5]">
              SAMIR
            </span>
            .
          </h1>
        </div>

        {/* 2-Column Editorial Grid: Left Copy & CTAs, Right 3D Face Physics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-2">
          {/* Left Column: Supporting Statement, Bio, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#12141B] dark:text-[#EEF0F5] leading-snug">
              {personalInfo.supportingHeadline}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
              {personalInfo.shortBio}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {personalInfo.introduction}
            </p>

            {/* CTAs & Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-2xl bg-[#2F4BF0] hover:bg-[#233bc7] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-[#2F4BF0]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-[#171A21] hover:bg-slate-50 dark:hover:bg-[#1f232c] text-[#12141B] dark:text-[#EEF0F5] font-bold text-sm tracking-wide uppercase border border-black/10 dark:border-white/10 transition-all shadow-sm hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-[#F2B31B]" />
                <span>Let's Talk</span>
              </a>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 font-semibold text-sm transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>CV Preview</span>
              </a>
            </div>

            {/* Quick Status Ticker */}
            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#2F4BF0]" />
                <span>B.Tech CSE 3rd Year</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F2B31B]" />
                <span>MERN &bull; Python &bull; Docker</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Face Physics Experience */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <FaceCanvas />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span>Scroll down to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#2F4BF0]" />
        </span>
        <span className="hidden sm:inline">25°27'N 81°51'E &bull; Prayagraj, India</span>
      </div>
    </section>
  );
}
