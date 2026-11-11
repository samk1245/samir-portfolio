import React from "react";
import { personalInfo } from "@/data/portfolioData";
import { ContactButton } from "./reusable/ContactButton";
import { DownloadCVButton } from "./reusable/DownloadCVButton";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#0C0C0C] text-white pt-24 pb-16 px-6 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Ambient footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-white/5 via-neutral-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col justify-between gap-16">
        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 block">
              Available For Opportunities &bull; Class of 2026
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white font-['Kanit',sans-serif]">
              Let's Build Something Meaningful.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed font-['Kanit',sans-serif]">
              Open for full-stack, backend engineering, and AI/ML internship opportunities.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <DownloadCVButton text="Download CV" />
              <ContactButton text="Contact Me" />
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Direct response within 24 hours
            </span>
          </div>
        </div>

        {/* Middle Navigation & Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Identity */}
          <div className="space-y-3">
            <h3 className="font-['Kanit',sans-serif] font-black text-xl uppercase tracking-wider text-white">
              {personalInfo.name}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {personalInfo.degree}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Direct Communication */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Direct Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Connect &amp; Code
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="Email Samir"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Scroll to Top */}
          <div className="flex flex-col items-start sm:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Samir Khan. Engineered with React, TypeScript &amp; Framer Motion.
          </p>
          <p>
            Shambhunath Institute of Engineering and Technology, Prayagraj
          </p>
        </div>
      </div>
    </footer>
  );
}
