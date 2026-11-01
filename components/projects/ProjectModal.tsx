"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/types/portfolio";
import {
  X,
  ExternalLink,
  CheckCircle,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { Github } from "@/components/ui/icons";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active image index whenever a different project is opened
  useEffect(() => {
    setActiveIndex(0);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
      }
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

  // Build gallery from primary image plus all screenshots
  const gallery = [
    {
      title: "Architecture Overview",
      caption: project.tagline,
      url: project.image,
    },
    ...(project.screenshots || []),
  ];

  const currentMedia = gallery[activeIndex] || gallery[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#0c0f17] border border-white/10 shadow-2xl overflow-hidden my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 text-slate-300 hover:text-white transition-all shadow-lg"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image / Screenshot Interactive Viewer */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-surface-200 group">
          <Image
            key={currentMedia.url}
            src={currentMedia.url}
            alt={`${project.title} - ${currentMedia.title}`}
            fill
            className="object-cover transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f17] via-[#0c0f17]/40 to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-600/40 border border-blue-400 text-blue-300 text-xs font-mono font-semibold backdrop-blur-md">
              {project.category}
            </span>
            {gallery.length > 1 && (
              <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-slate-300 text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md">
                <Images className="w-3 h-3 text-blue-400" />
                <span>
                  {activeIndex + 1} / {gallery.length}
                </span>
              </span>
            )}
          </div>

          {/* Gallery Navigation Arrows (if multiple screenshots) */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 transition-all shadow-lg opacity-80 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 transition-all shadow-lg opacity-80 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Active Image Title & Caption Banner */}
          <div className="absolute bottom-3 left-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs font-mono text-blue-400 font-semibold mb-0.5">
              <span>{currentMedia.title}</span>
              <span className="text-[10px] text-slate-400">
                {project.status}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2">
              {currentMedia.caption}
            </p>
          </div>
        </div>

        {/* Thumbnail Selector Strip (if more than 1 image) */}
        {gallery.length > 1 && (
          <div className="px-6 pt-3 pb-1 bg-[#090c13] border-b border-white/10 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
            {gallery.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  activeIndex === idx
                    ? "bg-blue-600/20 border-blue-500 text-white shadow-sm"
                    : "bg-surface-100/60 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="text-[11px] font-mono leading-tight max-w-[130px] truncate">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
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
                  <span className="text-base font-bold text-blue-400">{m.value}</span>
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
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              Key Technical Features &amp; Architecture
            </h4>
            <ul className="space-y-2">
              {project.architectureHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actual Contribution */}
          <div className="p-4 rounded-xl bg-surface-100 border border-blue-500/20">
            <h4 className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Engineering Contribution by Samir
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.actualContribution}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Technologies &amp; Libraries
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
                  className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-slate-200 text-xs font-medium flex items-center gap-2 transition-all hover:text-white"
                >
                  <Github className="w-4 h-4 text-blue-400" />
                  <span>View Repository on GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-blue-600/30"
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
              Close [Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
