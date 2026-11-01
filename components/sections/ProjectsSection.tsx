"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/portfolio";
import { ProjectItem } from "@/types/portfolio";
import { ProjectModal } from "@/components/projects/ProjectModal";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  Info,
  GitBranch,
  Images,
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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
              Portfolio Engineering Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              Featured Software &amp; AI Systems
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Production-oriented web platforms, civic AI scoring systems, MERN multi-tenant SaaS, and telemetry architectures.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group rounded-2xl bg-surface-100 border border-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-blue-600/5"
              >
                {/* Visual Image Preview */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141824] via-transparent to-black/30" />

                  {/* Category Pill and Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-blue-400 text-[10px] font-mono font-semibold">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.screenshots && project.screenshots.length > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-mono font-medium flex items-center gap-1 shadow-sm">
                          <Images className="w-3 h-3" />
                          <span>{project.screenshots.length + 1} Visuals</span>
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-[10px] font-mono">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Hover Inspect Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md">
                      <Info className="w-3.5 h-3.5" />
                      Inspect Architecture
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-base sm:text-lg font-bold text-white light:text-slate-900 group-hover:text-blue-400 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="text-xs text-slate-300 light:text-slate-600 mt-2 font-medium line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA Links */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                    >
                      <span>Deep Dive</span>
                      <span>→</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-surface-200 text-slate-400 hover:text-white transition-colors"
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
                          className="p-1.5 rounded-lg hover:bg-surface-200 text-slate-400 hover:text-blue-400 transition-colors"
                          title="Live Demo"
                          aria-label={`Open live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
