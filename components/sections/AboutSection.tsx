"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, verifiedStats } from "@/data/portfolio";
import { StatItem } from "@/types/portfolio";
import {
  Code,
  Compass,
  Cpu,
  GraduationCap,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

function Counter({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-bold text-white light:text-slate-900">
      {count}
      {suffix && <span className="text-cyan-400 text-2xl sm:text-3xl ml-0.5">{suffix}</span>}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>01 // Background & Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
            About Me & Technical Journey
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            Designing resilient software architectures with focus on correctness, speed, and continuous learning.
          </p>
        </div>

        {/* 2-Column Layout: Narrative + Interactive Architecture Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Narrative paragraphs */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 light:text-slate-600 leading-relaxed text-base">
            {personalInfo.aboutBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {/* Current Focus vs Future Interests Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-surface-100 border border-white/10 hover:border-cyan-400/30 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Current Focus</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Distributed system scalability, Next.js 15 App Router architecture, and building production-ready RAG pipelines with LLM tool-calling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-100 border border-white/10 hover:border-violet-400/30 transition-all">
                <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Future Interests</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  High-throughput concurrency in Rust/Go, WebAssembly runtime performance, and autonomous multi-agent verification systems.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Architecture System Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-surface-100 border border-white/10 overflow-hidden shadow-2xl relative">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-surface-200/60 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>samir_profile.sys</span>
                </div>
              </div>

              {/* Code / Visual Representation */}
              <div className="p-5 font-mono text-xs space-y-3 leading-relaxed">
                <div>
                  <span className="text-slate-500">const</span>{" "}
                  <span className="text-cyan-400">engineer</span> = &#123;
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-violet-400">identity</span>:{" "}
                  <span className="text-emerald-300">&quot;{personalInfo.name}&quot;</span>,
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-violet-400">role</span>:{" "}
                  <span className="text-emerald-300">&quot;CS Engineering Student&quot;</span>,
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-violet-400">mindset</span>:{" "}
                  <span className="text-emerald-300">&quot;First-principles thinking&quot;</span>,
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-violet-400">principles</span>: [
                  <div className="pl-4 text-slate-400">
                    &quot;Type-safety by default&quot;,
                    <br />
                    &quot;Premature optimization is evil, unmeasured code is worse&quot;,
                    <br />
                    &quot;Architect for clarity before complexity&quot;
                  </div>
                  ],
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-violet-400">openToOpportunities</span>:{" "}
                  <span className="text-cyan-400">true</span>
                </div>
                <div>&#125;;</div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Profile
                  </span>
                  <span className="text-slate-500">UTF-8 / Node.js 22</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Verified Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {verifiedStats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-xl bg-surface-100 border border-white/10 hover:border-cyan-400/40 transition-all group"
            >
              <div className="mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm font-semibold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
