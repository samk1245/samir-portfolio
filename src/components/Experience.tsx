import React, { useState } from "react";
import { experienceData } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal, ChevronRight, Sparkles } from "lucide-react";

export function Experience() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              02 &bull; Career Experience
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              WHERE I'VE WORKED.
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-world Industry Internship
          </div>
        </div>

        {/* Interactive Slide Scrubber Bar */}
        <div className="mb-12 p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-[#F2B31B]" />
            <span>TIMELINE MILESTONE FOCUS:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {experienceData.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setActiveStep(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeStep === idx
                    ? "bg-[#2F4BF0] text-white shadow-md shadow-[#2F4BF0]/30"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                <span>{exp.company}</span>
                <span className="text-[10px] opacity-75">({exp.duration})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[#2F4BF0]/30 space-y-12">
          {experienceData.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#2F4BF0] border-4 border-[#E8EBF1] dark:border-[#0E1015] group-hover:scale-125 transition-transform shadow-md" />

              {/* Main Experience Card with Slide-In Physics */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-xl space-y-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F4BF0]/10 text-[#2F4BF0] text-xs font-mono font-bold uppercase mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.type}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#12141B] dark:text-[#EEF0F5] tracking-tight">
                      {exp.position}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-[#F2B31B] mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2F4BF0]" />
                      Duration: {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F2B31B]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Responsibilities list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Core Engineering Contributions:
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#2F4BF0] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-[#2F4BF0]" />
                    Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-[#E8EBF1] dark:bg-white/5 text-xs font-mono font-semibold text-[#12141B] dark:text-[#EEF0F5] border border-black/5 dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
