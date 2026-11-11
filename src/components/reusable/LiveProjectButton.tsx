import React from "react";
import { ArrowUpRight } from "lucide-react";

interface LiveProjectButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function LiveProjectButton({
  href,
  label = "View Project",
  className = "",
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-black text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${className}`}
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #E6E9EE 100%)",
        boxShadow:
          "0 2px 6px -1px rgba(0, 0, 0, 0.12), 0 6px 20px -2px rgba(255, 255, 255, 0.2), inset 0 1px 1px #FFFFFF, inset 0 -1px 2px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
      }}
    >
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 w-6 h-6 rounded-full bg-black/10 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:text-white transition-colors duration-300" />
      </span>
      <div className="absolute inset-0 rounded-full bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </a>
  );
}
