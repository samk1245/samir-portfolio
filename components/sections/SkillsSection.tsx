"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, projectsData } from "@/data/portfolio";
import {
  Code2,
  Server,
  Database,
  Cloud,
  BookOpen,
  BrainCircuit,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
};

// Map skills to real projects & experience
const skillUsageMap: Record<string, string[]> = {
  "Docker": [
    "ShopSphere SaaS (Multi-tenant containerization)",
    "The Zaalima Development (Internship dev environment setup)",
    "SmartCity AirGuard (FastAPI container runtime)",
  ],
  "Express.js": [
    "The Zaalima Development (RESTful APIs for core app)",
    "ShopSphere (Modular tenant isolation middleware)",
    "Hotel Booking (Reservation inquiry backend)",
  ],
  "React.js": [
    "The Zaalima Development (Responsive client features)",
    "ShopSphere (Merchant store dashboard)",
  ],
  "Node.js": [
    "The Zaalima Development (Backend service layer)",
    "ShopSphere (MERN microservices)",
    "Hotel Booking (Reservation management)",
  ],
  "Python": [
    "EvoCode-AI (AST code evolution engine)",
    "SmartCity AirGuard (Telemetry data cleaning & regressions)",
    "Data Analytics Pipeline (Pandas & exploratory analysis)",
  ],
  "FastAPI": [
    "SmartCity AirGuard (High-throughput sensor ingestion)",
    "Data Analytics Pipeline (Lightweight analytics endpoints)",
  ],
  "MongoDB": [
    "ShopSphere (Multi-tenant document storage)",
    "Hotel Booking (Reservation inquiry storage)",
  ],
  "C++": [
    "Data Structures & Algorithms coursework at SIET",
    "Object-Oriented Programming (OOP) architectures",
  ],
  "Linux": [
    "Docker deployment environments & shell scripting",
    "Server administration basics & Git CLI workflows",
  ],
  "Git & GitHub": [
    "The Zaalima Development (Code reviews & commit history)",
    "Public repositories on github.com/samk1245",
  ],
};

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);

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
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface-50/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
              Core Technical Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              Technical Stack &amp; Implementation Matrix
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Verified skills across programming languages, backend systems, databases, containerization, and computer science fundamentals.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mt-4 md:mt-0 relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, language, or tool..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-surface-100 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white font-semibold"
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
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Live Implementation Peek Bar (When Hovering a Skill) */}
        <div className="mb-8 p-3.5 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-blue-400 font-bold">Interactive Project Inspector:</span>
            {activeSkillHover && skillUsageMap[activeSkillHover] ? (
              <span className="text-emerald-400 font-semibold">
                {activeSkillHover} ➔ Used in: {skillUsageMap[activeSkillHover].join(" • ")}
              </span>
            ) : (
              <span className="text-slate-400">
                Hover any technology below to see its real implementation in Samir&apos;s projects &amp; internship.
              </span>
            )}
          </div>
          <span className="text-slate-500 text-[11px] hidden sm:inline">Hands-On Verified</span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-surface-100 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-surface-200 text-blue-400">
                      {iconMap[category.icon] || <Code2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white light:text-slate-900 leading-snug">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {category.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill) => {
                      const isHovered = activeSkillHover === skill.name;
                      const hasUsage = !!skillUsageMap[skill.name];
                      return (
                        <div
                          key={skill.name}
                          onMouseEnter={() => hasUsage && setActiveSkillHover(skill.name)}
                          onMouseLeave={() => setActiveSkillHover(null)}
                          className={`px-3 py-2 rounded-xl border transition-all flex items-center justify-between cursor-default ${
                            isHovered
                              ? "bg-blue-600/15 border-blue-500 text-white"
                              : "bg-surface-200/50 border-white/5 hover:border-white/20 text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{skill.name}</span>
                            {hasUsage && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" title="Project linked" />
                            )}
                          </div>
                          {skill.level && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                skill.level === "Core"
                                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                                  : "bg-surface-50 text-slate-400 border border-white/10"
                              }`}
                            >
                              {skill.level}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>CV &amp; Coursework Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
