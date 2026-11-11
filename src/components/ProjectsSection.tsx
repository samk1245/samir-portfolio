import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectsData, ProjectItem } from "@/data/portfolioData";
import { LiveProjectButton } from "./reusable/LiveProjectButton";
import { FadeIn } from "./reusable/FadeIn";
import { Sparkles, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "./icons";

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] text-white rounded-t-[3rem] sm:rounded-t-[4rem] lg:rounded-t-[4.5rem] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 z-30"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Tag */}
        <FadeIn delay={0.1} direction="down">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-neutral-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>03 &bull; Engineering Showcase</span>
            </div>
            <span className="text-xs font-mono font-medium text-neutral-500 uppercase hidden sm:block">
              Curated Production-Ready Systems
            </span>
          </div>
        </FadeIn>

        {/* Heading: "Featured Projects" */}
        <FadeIn delay={0.2} direction="up" distance={30}>
          <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-white font-['Kanit',sans-serif]">
              <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                Featured
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 font-normal max-w-md leading-relaxed font-['Kanit',sans-serif]">
              A showcase of scalable web platforms, real-time AI predictive engines, and data intelligence platforms built with rigorous engineering.
            </p>
          </div>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="relative flex flex-col gap-12 sm:gap-16 pb-12">
          {projectsData.map((project: ProjectItem, index: number) => (
            <StickyProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StickyProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
}

function StickyProjectCard({ project, index, total }: StickyProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll listener for sticky scroll-based scaling
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Calculate subtle scaling as subsequent cards stack over
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (total - 1 - index) * 0.04]
  );
  const topOffset = 80 + index * 32; // 80px, 112px, 144px

  return (
    <motion.div
      ref={cardRef}
      style={{
        top: `${topOffset}px`,
        scale,
        transformOrigin: "top center",
      }}
      className="sticky w-full rounded-[2rem] sm:rounded-[2.75rem] bg-[#141414] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden group will-change-transform"
    >
      {/* Background glow per project */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      {/* Card Header Information */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-white/10 mb-8">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono font-medium text-indigo-400 uppercase">
              {project.projectType}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-['Kanit',sans-serif]">
            {project.title}
          </h3>
        </div>

        {/* Project Number Indicator & Live Button */}
        <div className="flex items-center gap-4 self-start md:self-auto">
          <span className="text-4xl sm:text-5xl font-mono font-bold text-neutral-600">
            /{project.number}
          </span>
          <LiveProjectButton href={project.githubUrl} label="View Project" />
        </div>
      </div>

      {/* Description & Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-7 space-y-4 text-left">
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal font-['Kanit',sans-serif]">
            {project.description}
          </p>

          {/* Key Features Bullets */}
          <div className="pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Core Features:</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-300 font-normal">
              {project.keyFeatures.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Technologies Applied:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <GithubIcon className="w-4 h-4 text-white" />
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline underline-offset-4 truncate"
            >
              {project.githubUrl.replace("https://github.com/", "github.com/")}
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          ORIGINAL TWO-COLUMN IMAGE LAYOUT
          - Left: Two stacked images (stackedTop, stackedBottom)
          - Right: One tall image (tallRight)
          ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pt-4">
        {/* Left Column: Two Stacked Images */}
        <div className="md:col-span-6 flex flex-col gap-4 sm:gap-6">
          <div className="relative h-48 sm:h-56 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
            <img
              src={project.images.stackedTop}
              alt={`${project.title} Interface 1`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative h-48 sm:h-56 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
            <img
              src={project.images.stackedBottom}
              alt={`${project.title} Interface 2`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: One Tall Image */}
        <div className="md:col-span-6">
          <div className="relative h-72 sm:h-96 md:h-full min-h-[300px] md:min-h-[536px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
            <img
              src={project.images.tallRight}
              alt={`${project.title} Full Architecture Telemetry`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-neutral-300">
                Verified Production Architecture
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-400">
                ACTIVE REPOSITORY
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
