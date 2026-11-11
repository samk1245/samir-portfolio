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
      className={`group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-base tracking-wide uppercase overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
        boxShadow: "0 10px 30px -5px rgba(139, 92, 246, 0.45)",
      }}
    >
      <span className="relative z-10 font-bold">{text}</span>
      <span className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-4 h-4 text-white" />
      </span>
      {/* Ambient hover shine */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 group-hover:opacity-80 transition-opacity -z-10" />
    </a>
  );
}
