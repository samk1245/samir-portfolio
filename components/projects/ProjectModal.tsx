"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/types/portfolio";
import {
  X,
  ExternalLink,
  CheckCircle,
  Cpu,
  Layers,
  Sparkles,
  Activity,
} from "lucide-react";
import { Github } from "@/components/ui/icons";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#090d16] border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-slate-300 hover:text-white transition-all"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image / Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-surface-200">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 text-xs font-mono">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-100/90 border border-white/10 text-slate-300 text-xs font-mono">
              Status: {project.status}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface-100 border border-white/10">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-400">{m.label}</span>
                  <span className="text-base font-bold text-cyan-400">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-100/60 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                The Problem
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-100/60 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Architectural Solution
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Architecture Highlights */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Key Technical Features & Architecture
            </h4>
            <ul className="space-y-2">
              {project.architectureHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actual Contribution */}
          <div className="p-4 rounded-xl bg-surface-100 border border-cyan-500/20">
            <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              My Direct Engineering Contribution
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.actualContribution}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-surface-200 text-xs font-mono text-slate-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 text-slate-200 text-xs font-medium flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
            >
              Close Window [Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
