import { personalInfo } from "@/data/portfolio";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#0E1015] relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand / Statement */}
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2F4BF0] text-white flex items-center justify-center font-bold font-mono text-xs">
              SK
            </div>
            <span className="font-black text-sm tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-xs font-mono font-bold tracking-widest text-[#2F4BF0] uppercase pt-1">
            DESIGNED WITH CURIOSITY. BUILT WITH CODE.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; 2026 Samir Khan. All rights reserved.
          </p>
        </div>

        {/* Links & Socials */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 hover:bg-[#2F4BF0] hover:text-white transition-all text-[#12141B] dark:text-[#EEF0F5]"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 hover:bg-[#2F4BF0] hover:text-white transition-all text-[#12141B] dark:text-[#EEF0F5]"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="p-3 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 hover:bg-[#2F4BF0] hover:text-white transition-all text-[#12141B] dark:text-[#EEF0F5]"
            aria-label="Email Samir"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-[#E8EBF1] dark:bg-white/5 hover:bg-[#F2B31B] hover:text-[#12141B] transition-all text-[#12141B] dark:text-[#EEF0F5] ml-2"
            title="Scroll to Top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
