import React, { useState } from "react";
import { personalInfo, experienceInfo, technicalSkills, certifications } from "@/data/portfolioData";
import { AnimatedText } from "./reusable/AnimatedText";
import { ContactButton } from "./reusable/ContactButton";
import { FadeIn } from "./reusable/FadeIn";
import { GraduationCap, Briefcase, Award, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

export function AboutSection() {
  const [showResponsibilities, setShowResponsibilities] = useState(false);
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] text-white py-28 sm:py-36 px-6 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative 3D Ambient Visual Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

      {/* Decorative Floating 3D Graphic Shapes */}
      <div className="absolute top-16 right-8 sm:right-20 opacity-20 pointer-events-none animate-[pulse_4s_ease-in-out_infinite]">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="50 20, 80 35, 80 65, 50 80, 20 65, 20 35" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Tag */}
        <FadeIn delay={0.1} direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>01 &bull; Personal Overview</span>
          </div>
        </FadeIn>

        {/* Gradient Heading: "About Me" */}
        <FadeIn delay={0.2} direction="up" distance={30}>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-12 sm:mb-16 font-['Kanit',sans-serif]">
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
        </FadeIn>

        {/* Character-by-character scroll-driven text reveal */}
        <div className="mb-14 sm:mb-20">
          <AnimatedText
            text={personalInfo.aboutParagraph}
            className="text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-medium leading-[1.35] tracking-tight font-['Kanit',sans-serif]"
          />
        </div>

        {/* Verified Technical Credentials Grid */}
        <FadeIn delay={0.3} direction="up" distance={30}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pt-8 border-t border-white/10">
            {/* Education Summary */}
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1 font-['Kanit',sans-serif]">
                Education
              </h3>
              <p className="text-sm font-semibold text-indigo-400 mb-2">
                B.Tech in Computer Science &amp; Engineering
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {personalInfo.college}
              </p>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 pt-3 border-t border-white/10">
                <span>{personalInfo.academicStatus}</span>
                <span className="text-indigo-400">CGPA: {personalInfo.cgpa}</span>
              </div>
            </div>

            {/* Verified Internship Experience */}
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1 font-['Kanit',sans-serif]">
                  Experience
                </h3>
                <p className="text-sm font-semibold text-purple-400 mb-2">
                  {experienceInfo.role}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {experienceInfo.company} &bull; {experienceInfo.duration}
                </p>

                {/* Key responsibilities snippet / toggle */}
                <div className="space-y-2 mb-3">
                  {(showResponsibilities
                    ? experienceInfo.responsibilities
                    : experienceInfo.responsibilities.slice(0, 2)
                  ).map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{resp}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowResponsibilities(!showResponsibilities)}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold mb-3 transition-colors cursor-pointer"
                >
                  <span>
                    {showResponsibilities
                      ? "Show less"
                      : `+${experienceInfo.responsibilities.length - 2} more responsibilities`}
                  </span>
                  {showResponsibilities ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="text-xs text-neutral-300 pt-3 border-t border-white/10 flex items-center justify-between">
                <span>Full-Stack &amp; REST APIs</span>
                <span className="text-purple-400">Docker Parity</span>
              </div>
            </div>

            {/* Certifications Snapshot */}
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-5">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1 font-['Kanit',sans-serif]">
                  Certifications
                </h3>
                <ul className="space-y-3 text-xs text-neutral-300 my-4">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <span className="font-semibold text-white">{cert.title}</span>
                        <div className="text-neutral-400 text-[11px]">
                          {cert.issuer}
                          {cert.date ? ` &bull; ${cert.date}` : ""}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-neutral-300 pt-3 border-t border-white/10 flex items-center justify-between">
                <span>Industry Simulation</span>
                <span className="text-pink-400">Cloud &amp; Analytics</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Contact CTA */}
        <FadeIn delay={0.4} direction="up" distance={20}>
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">
                Have a question or collaboration?
              </p>
              <p className="text-sm text-neutral-300">
                Direct email: <span className="text-white font-mono">{personalInfo.email}</span>
              </p>
            </div>
            <ContactButton text="Contact Me" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
