import React from "react";
import { aboutHighlights, personalInfo } from "@/data/portfolio";
import { GraduationCap, Briefcase, BrainCircuit, CheckCircle2 } from "lucide-react";

export function About() {
  const highlightIcons = [
    <GraduationCap className="w-5 h-5 text-[#2F4BF0]" />,
    <Briefcase className="w-5 h-5 text-[#F2B31B]" />,
    <BrainCircuit className="w-5 h-5 text-[#2F4BF0]" />,
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Heading with Number Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              01 &bull; Personal Profile
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              A LITTLE ABOUT ME.
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Shambhunath Institute of Engineering &amp; Technology
          </div>
        </div>

        {/* 2-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            <p className="font-semibold text-lg sm:text-xl text-[#12141B] dark:text-[#EEF0F5]">
              I'm a Computer Science and Engineering student with a strong foundation in programming, data structures, algorithms and full-stack web development.
            </p>
            <p>
              I have hands-on experience working with React.js, Node.js, Express.js, Python and MongoDB. During my web development internship, I worked on responsive web applications, RESTful APIs, debugging and Docker-based development environments.
            </p>
            <p>
              I'm particularly interested in backend engineering, AI/ML and building scalable digital products that deliver real utility.
            </p>

            {/* Core Competency Bullets */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Clean, maintainable code architectures",
                "Scalable RESTful API engineering",
                "Containerized Docker environments",
                "Data analysis & predictive pipelines",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#2F4BF0] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Academic & Professional Summary Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-xl space-y-6">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
              Verified Snapshot
            </h3>

            <div className="space-y-4 divide-y divide-slate-100 dark:divide-white/5">
              <div className="pt-2 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Full Name</span>
                <span className="font-bold text-[#12141B] dark:text-[#EEF0F5]">{personalInfo.name}</span>
              </div>
              <div className="pt-4 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Institution</span>
                <span className="font-bold text-[#12141B] dark:text-[#EEF0F5] text-right text-xs sm:text-sm">SIET, Prayagraj</span>
              </div>
              <div className="pt-4 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">B.Tech Year</span>
                <span className="font-bold text-[#2F4BF0] font-mono">3rd Year (CSE)</span>
              </div>
              <div className="pt-4 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Official CGPA</span>
                <span className="font-bold font-mono text-[#12141B] dark:text-[#EEF0F5]">{personalInfo.cgpa}</span>
              </div>
              <div className="pt-4 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Internship</span>
                <span className="font-bold text-[#F2B31B] font-mono">The Zaalima Dev (3 Mo)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Visual Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutHighlights.map((item, idx) => (
            <div
              key={item.number}
              className="p-8 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-black text-[#2F4BF0]">
                    {item.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 group-hover:scale-110 transition-transform">
                    {highlightIcons[idx]}
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-[#12141B] dark:text-[#EEF0F5] mb-1">
                  {item.title}
                </h3>
                <span className="text-xs font-mono font-semibold text-[#F2B31B] block mb-3">
                  {item.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
