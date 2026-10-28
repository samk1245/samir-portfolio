"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/portfolio";
import { ProjectItem } from "@/types/portfolio";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  Sparkles,
  Info,
} from "lucide-react";
import { Github } from "@/components/ui/icons";

const categories = ["All", "AI/ML", "Full-Stack", "Data & Systems"] as const;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>03 // Portfolio Engineering Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              Featured Software &amp; AI Systems
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Scalable full-stack web applications, AI optimization platforms, and telemetry architectures.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-bold"
                    : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid: 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="h-full"
              >
                <Tilt3DCard>
                  <div className="group rounded-2xl bg-surface-100 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_0_35px_rgba(0,240,255,0.12)]">
                    {/* Visual Image Preview */}
                    <div
                      className="relative h-56 sm:h-64 w-full overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-black/40" />

                      {/* Category Pill and Status */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 text-[11px] font-mono">
                          {project.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] font-mono">
                          {project.status}
                        </span>
                      </div>

                      {/* Hover Hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg">
                          <Info className="w-3.5 h-3.5" />
                          Deep Dive Architecture
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => setSelectedProject(project)}
                          className="text-xl font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </h3>
                        <p className="text-sm text-slate-300 light:text-slate-600 mt-2 font-medium">
                          {project.tagline}
                        </p>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-surface-200 text-slate-300 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom CTA Links */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                        >
                          <span>Explore Case Study</span>
                          <span>→</span>
                        </button>

                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-surface-200 text-slate-400 hover:text-white transition-colors"
                              title="View GitHub Repository"
                              aria-label={`View ${project.title} on GitHub`}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-surface-200 text-slate-400 hover:text-cyan-400 transition-colors"
                              title="Live Demo"
                              aria-label={`Open live demo for ${project.title}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
