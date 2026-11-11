import React from "react";
import { Download } from "lucide-react";

interface DownloadCVButtonProps {
  className?: string;
  text?: string;
}

export function DownloadCVButton({
  className = "",
  text = "Download CV",
}: DownloadCVButtonProps) {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <a
      href={resumeUrl}
      download="Samir_Khan_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold text-base tracking-wide uppercase transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
    >
      <span>{text}</span>
      <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:translate-y-0.5">
        <Download className="w-4 h-4 transition-colors" />
      </span>
    </a>
  );
}
