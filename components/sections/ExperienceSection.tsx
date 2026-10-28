"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "@/data/portfolio";
import { TimelineItem } from "@/types/portfolio";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Milestone,
} from "lucide-react";

const filterTabs = [
  { id: "all", label: "Complete Journey" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience & Roles" },
  { id: "achievement", label: "Achievements & Awards" },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems = timelineData.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface-50/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Milestone className="w-3.5 h-3.5" />
              <span>04 // Experience & Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              Education & Engineering History
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Chronological milestones detailing academic training, hands-on engineering work, and technical honors.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-semibold"
                    : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const icon =
                item.type === "education" ? (
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                ) : item.type === "experience" ? (
                  <Briefcase className="w-4 h-4 text-blue-400" />
                ) : (
                  <Award className="w-4 h-4 text-amber-400" />
                );

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Node dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-surface-100 border border-white/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:scale-110 transition-all shadow-md">
                    {icon}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 rounded-2xl bg-surface-100 border border-white/10 hover:border-cyan-400/40 transition-all space-y-4 shadow-sm">
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-sm font-medium text-slate-300 light:text-slate-700 flex items-center gap-2 mt-0.5">
                          <span>{item.organization}</span>
                          {item.location && (
                            <>
                              <span className="text-slate-600">•</span>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-200 border border-white/5 text-xs font-mono text-cyan-400/90 self-start sm:self-auto">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet highlights */}
                    {item.highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {item.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed"
                          >
                            <span className="text-cyan-400 font-bold">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Skills pills */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200/80 text-slate-300 border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
