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
      className={`group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-neutral-200 hover:scale-105 active:scale-95 shadow-lg ${className}`}
    >
      <span>{label}</span>
      <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-3.5 h-3.5 text-black" />
      </span>
    </a>
  );
}
