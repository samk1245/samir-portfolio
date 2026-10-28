"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, verifiedStats } from "@/data/portfolio";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import {
  Cpu,
  GraduationCap,
  Sparkles,
  Terminal,
  Zap,
  Globe,
  Award,
  CheckCircle,
  Briefcase,
} from "lucide-react";

function Counter({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const steps = 25;
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
            <span>01 // Academic & Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
            About Samir Khan
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            B.Tech CSE 3rd Year student at Shambhunath Institute of Engineering and Technology, Prayagraj.
          </p>
        </div>

        {/* 2-Column Layout: Narrative + Interactive Architecture Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Narrative paragraphs */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 light:text-slate-600 leading-relaxed text-base">
            {personalInfo.aboutBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {/* Academic & Languages Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Education Card */}
              <div className="p-4 rounded-xl bg-surface-100 border border-white/10 hover:border-cyan-400/40 transition-all space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>College & Degree</span>
                </div>
                <p className="text-xs text-white light:text-slate-900 font-medium">
                  {personalInfo.college}
                </p>
                <p className="text-[11px] font-mono text-slate-400">
                  {personalInfo.degree} • CGPA: {personalInfo.cgpa}
                </p>
              </div>

              {/* Languages Spoken */}
              <div className="p-4 rounded-xl bg-surface-100 border border-white/10 hover:border-violet-400/40 transition-all space-y-1.5">
                <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold">
                  <Globe className="w-4 h-4" />
                  <span>Languages</span>
                </div>
                <div className="space-y-1 pt-0.5">
                  {personalInfo.spokenLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{lang.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Snapshot */}
            <div className="p-4 rounded-xl bg-surface-100 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2.5">
                <Award className="w-4 h-4" />
                <span>Industry Job Simulations & Certifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {personalInfo.certifications.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-surface-200/60 border border-white/5">
                    <p className="text-xs font-semibold text-white truncate">{c.title}</p>
                    <p className="text-[11px] text-cyan-400 font-mono mt-0.5">{c.issuer}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{c.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Architecture System Card */}
          <div className="lg:col-span-5">
            <Tilt3DCard>
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
                    <span className="text-violet-400">name</span>:{" "}
                    <span className="text-emerald-300">&quot;{personalInfo.name}&quot;</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-violet-400">college</span>:{" "}
                    <span className="text-emerald-300">&quot;SIET, Prayagraj&quot;</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-violet-400">academicYear</span>:{" "}
                    <span className="text-cyan-400">3</span> <span className="text-slate-500">// B.Tech CSE</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-violet-400">cgpa</span>:{" "}
                    <span className="text-cyan-400">6.9</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-violet-400">recentExperience</span>: &#123;
                    <div className="pl-4 text-slate-400">
                      role: <span className="text-emerald-300">&quot;Web Development Intern&quot;</span>,
                      <br />
                      company: <span className="text-emerald-300">&quot;The Zaalima Development&quot;</span>,
                      <br />
                      stack: [&quot;React.js&quot;, &quot;Node.js&quot;, &quot;Express&quot;, &quot;Docker&quot;]
                    </div>
                    &#125;,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-violet-400">focusAreas</span>: [
                    <div className="pl-4 text-slate-400">
                      &quot;Backend Development&quot;, &quot;AI Engineering&quot;, &quot;Docker&quot;
                    </div>
                    ],
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-violet-400">availableForRoles</span>:{" "}
                    <span className="text-cyan-400">true</span>
                  </div>
                  <div>&#125;;</div>

                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Verified CV Credentials
                    </span>
                    <span className="text-slate-500">3D Tilt Enabled</span>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>

        {/* Compact Verified Statistics Cards with 3D Tilt */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {verifiedStats.map((stat) => (
            <Tilt3DCard key={stat.id}>
              <div className="p-5 rounded-xl bg-surface-100 border border-white/10 hover:border-cyan-400/40 transition-all group h-full flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-sm font-semibold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {stat.description}
                </p>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
