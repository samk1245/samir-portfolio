import React from "react";
import { certificationsData } from "@/data/portfolio";
import { Award, Calendar, CheckCircle, ShieldCheck } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              06 &bull; Industry Credentials
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              ALWAYS LEARNING.
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Professional &amp; Simulation Certifications
          </div>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md"
                    style={{ backgroundColor: cert.badgeColor }}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-[#2F4BF0]" />
                    {cert.date}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2B31B]">
                    {cert.issuer}
                  </span>
                  <h3 className="text-xl font-bold text-[#12141B] dark:text-[#EEF0F5] mt-1 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Skills acquired */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#E8EBF1] dark:bg-white/5 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Simulation &bull; {cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
