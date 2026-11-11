import React from "react";
import { Download } from "lucide-react";

interface DownloadCVButtonProps {
  className?: string;
  text?: string;
  variant?: "primary" | "secondary";
}

export function DownloadCVButton({
  className = "",
  text = "Download CV",
  variant = "secondary",
}: DownloadCVButtonProps) {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  if (variant === "primary") {
    return (
      <a
        href={resumeUrl}
        download="Samir_Khan_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-black text-sm sm:text-base tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${className}`}
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #E6E9EE 100%)",
          boxShadow:
            "0 2px 6px -1px rgba(0, 0, 0, 0.12), 0 8px 28px -4px rgba(255, 255, 255, 0.22), inset 0 1px 1.5px rgba(255, 255, 255, 1), inset 0 -1.5px 2px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
        }}
      >
        <span className="relative z-10 font-extrabold tracking-wider">{text}</span>
        <span className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-y-0.5">
          <Download className="w-4 h-4 text-black group-hover:text-white transition-colors duration-300" />
        </span>
        <div className="absolute inset-0 rounded-full bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>
    );
  }

  // Soft-touch matte obsidian button
  return (
    <a
      href={resumeUrl}
      download="Samir_Khan_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white text-sm sm:text-base tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none backdrop-blur-xl ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(28, 30, 36, 0.95) 0%, rgba(16, 17, 21, 0.98) 100%)",
        boxShadow:
          "0 4px 18px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.18), inset 0 -1px 2px rgba(0, 0, 0, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.16)",
      }}
    >
      <span className="relative z-10 tracking-wider text-neutral-200 group-hover:text-white transition-colors duration-300">
        {text}
      </span>
      <span className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:translate-y-0.5">
        <Download className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300" />
      </span>
      {/* Soft touch ambient micro-sheen */}
      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute -inset-1 rounded-full blur-md bg-white/10 opacity-0 group-hover:opacity-60 transition-opacity -z-10 pointer-events-none" />
    </a>
  );
}
