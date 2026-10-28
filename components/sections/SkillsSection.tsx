"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import {
  Code2,
  Server,
  Database,
  Cloud,
  BookOpen,
  BrainCircuit,
  Search,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
};

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = skillCategories.filter((cat) => {
    if (selectedCategory !== "all" && cat.id !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() === "") return true;

    const query = searchQuery.toLowerCase();
    const matchesTitle = cat.title.toLowerCase().includes(query);
    const matchesSkill = cat.skills.some(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.tags?.some((t) => t.toLowerCase().includes(query))
    );
    return matchesTitle || matchesSkill;
  });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>02 // Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              Languages, Frameworks &amp; Core Concepts
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              C++, Python, JavaScript, MERN stack, Docker containerization, and foundational computer science principles.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mt-4 md:mt-0 relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search C++, Docker, Python, MongoDB..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-surface-100 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-semibold"
                : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            All Competencies ({skillCategories.length})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-semibold"
                  : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <Tilt3DCard>
                  <div className="p-6 rounded-2xl bg-surface-100 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between h-full group shadow-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.08)]">
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-surface-200 text-cyan-400 group-hover:scale-105 transition-transform">
                          {iconMap[category.icon] || <Code2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white light:text-slate-900 leading-snug">
                            {category.title}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            {category.skills.length} skills verified
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      {/* Skills List */}
                      <div className="space-y-2">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="px-3 py-2 rounded-lg bg-surface-200/50 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between"
                          >
                            <span className="text-xs font-medium text-slate-200 light:text-slate-800">
                              {skill.name}
                            </span>
                            {skill.level && (
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                  skill.level === "Core"
                                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                                    : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                                }`}
                              >
                                {skill.level}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom subtle tag hint */}
                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>CV &amp; Hands-On Experience</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
