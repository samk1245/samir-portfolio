import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactButtonProps {
  className?: string;
  text?: string;
}

export function ContactButton({
  className = "",
  text = "Contact Me",
}: ContactButtonProps) {
  return (
    <a
      href="mailto:samir4khan555@gmail.com"
      className={`group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-black text-sm sm:text-base tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${className}`}
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #E6E9EE 100%)",
        boxShadow:
          "0 2px 6px -1px rgba(0, 0, 0, 0.12), 0 8px 28px -4px rgba(255, 255, 255, 0.22), inset 0 1px 1.5px rgba(255, 255, 255, 1), inset 0 -1.5px 2px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
      }}
    >
      <span className="relative z-10 font-extrabold tracking-wider">{text}</span>
      <span className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-4 h-4 text-black group-hover:text-white transition-colors duration-300" />
      </span>
      {/* Soft touch ambient micro-sheen */}
      <div className="absolute inset-0 rounded-full bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute -inset-1 rounded-full blur-md bg-white/20 opacity-0 group-hover:opacity-80 transition-opacity -z-10 pointer-events-none" />
    </a>
  );
}
