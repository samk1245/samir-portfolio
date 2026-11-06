import React from "react";
import { educationData } from "@/data/portfolio";
import { GraduationCap, Award, BookOpen, CheckCircle2, MapPin } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              05 &bull; Academic Background
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              THE LEARNING JOURNEY.
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Formal Engineering Education
          </div>
        </div>

        {/* Educational Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/5">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2F4BF0]/10 text-[#2F4BF0] text-xs font-mono font-bold uppercase mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{educationData.degree}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#12141B] dark:text-[#EEF0F5] tracking-tight">
                {educationData.field}
              </h3>
              <p className="text-base sm:text-lg font-bold text-[#F2B31B] mt-1">
                {educationData.institution}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#2F4BF0]" />
                <span>{educationData.location}</span>
              </div>
            </div>

            {/* Academic Metrics Pill */}
            <div className="flex flex-row md:flex-col items-start md:items-end gap-3 text-left md:text-right">
              <div className="p-4 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-mono text-slate-500 uppercase block">Academic Status</span>
                <span className="text-base sm:text-lg font-bold text-[#2F4BF0] font-mono">{educationData.academicYear}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-mono text-slate-500 uppercase block">Verified CGPA</span>
                <span className="text-base sm:text-lg font-bold text-[#12141B] dark:text-[#EEF0F5] font-mono">{educationData.cgpa}</span>
              </div>
            </div>
          </div>

          {/* Highlights & Curriculum */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2F4BF0]" />
              Engineering Core Curriculum &amp; Milestones:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {educationData.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#E8EBF1]/60 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2F4BF0]" />
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
