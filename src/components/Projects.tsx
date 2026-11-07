import React, { useState } from "react";
import { projectsData, ProjectItem } from "@/data/portfolio";
import { ExternalLink, CheckCircle, Cpu, Eye, Layers } from "lucide-react";
import { GithubIcon } from "./icons";
import { ProjectDrawer } from "./ProjectDrawer";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Full-Stack", "Data & Systems", "AI/ML"] as const;

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              03 &bull; Engineering Showcase
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              THINGS I'VE BUILT.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base max-w-xl font-medium">
              Scalable web architectures, real-time civic AI intelligence platforms, and environmental data telemetry pipelines.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#2F4BF0] text-white shadow-md shadow-[#2F4BF0]/30"
                    : "bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#2F4BF0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-black/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md text-[#2F4BF0] text-xs font-mono font-bold uppercase border border-black/5 dark:border-white/10 shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-medium">
                      Project {project.number}
                    </span>
                  </div>

                  {/* Title on Image bottom */}
                  <div className="absolute bottom-4 left-5 right-5 text-left text-white">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#F2B31B] font-semibold block mb-0.5">
                      {project.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-6 text-left">
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features List */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#2F4BF0]" />
                      Key Features &amp; Architecture:
                    </h4>
                    <ul className="space-y-1.5">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-[#F2B31B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-[#E8EBF1] dark:bg-white/5 text-xs font-mono font-semibold text-[#12141B] dark:text-[#EEF0F5] border border-black/5 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Slide-to-Open Inspector */}
              <div className="p-6 sm:p-8 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-white/5 mt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2.5 rounded-xl bg-[#2F4BF0] hover:bg-[#233bc7] text-white font-mono text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all shadow-md shadow-[#2F4BF0]/20 hover:scale-[1.02]"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Slide to Inspect</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5 fill-current" />
                      <span>Code</span>
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-400 italic">
                      Details coming soon
                    </span>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Slide-Over Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
