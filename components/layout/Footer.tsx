"use client";

import React from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import {
  ArrowUp,
  Mail,
  Heart,
  Terminal,
  Cpu,
  Phone,
  GraduationCap,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

interface FooterProps {
  onOpenTerminal: () => void;
}

export function Footer({ onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#05070c] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold text-white text-base">
              {personalInfo.name}
            </span>
            <span className="text-xs font-mono text-cyan-400">
              // 3rd Year B.Tech CSE • SIET Prayagraj
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Backend development, distributed web architectures, Docker containerization, and applied AI systems.
          </p>
        </div>

        {/* Quick Actions & Socials */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-surface-100 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Open Interactive Terminal"
            aria-label="Open Interactive Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-100 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
            title="github.com/samk1245"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-100 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
            title="linkedin.com/in/samir-khan-59ss"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-lg bg-surface-100 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="Direct Email"
            title={personalInfo.email}
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.social.phone}
            className="p-2 rounded-lg bg-surface-100 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="Phone"
            title={personalInfo.phone}
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-surface-100 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">TOP</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <span>© {new Date().getFullYear()} {personalInfo.name}. Shambhunath Institute of Engineering and Technology, Prayagraj.</span>
        <span>Built with Next.js 15, Three.js 3D, React 19, TypeScript &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
