"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "@/data/portfolio";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";

const filterTabs = [
  { id: "all", label: "All Milestones" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Work & Internships" },
  { id: "certification", label: "Certifications" },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems = timelineData.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface-50/40 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
              Timeline &amp; Career History
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              Education, Experience &amp; Certifications
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Chronological milestones from Shambhunath Institute of Engineering &amp; Technology, Prayagraj, web development internship at The Zaalima Development, and industry job simulations.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-surface-100 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const icon =
                item.type === "education" ? (
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                ) : item.type === "experience" ? (
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Award className="w-4 h-4 text-amber-400" />
                );

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="relative group"
                >
                  {/* Timeline Node dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-6 h-6 rounded-full bg-surface-100 border border-white/20 flex items-center justify-center group-hover:border-blue-400 group-hover:scale-105 transition-all shadow-md">
                    {icon}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 rounded-2xl bg-surface-100 border border-white/10 hover:border-blue-500/40 transition-all space-y-4 shadow-sm">
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                              item.type === "education"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                : item.type === "experience"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white light:text-slate-900 group-hover:text-blue-400 transition-colors mt-1">
                          {item.title}
                        </h3>
                        <div className="text-sm font-medium text-slate-300 light:text-slate-700 flex items-center gap-2 mt-0.5">
                          <span>{item.organization}</span>
                          {item.location && (
                            <>
                              <span className="text-slate-600">•</span>
                              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-200 border border-white/5 text-xs font-mono text-slate-300 self-start sm:self-auto">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Bullet highlights */}
                    {item.highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {item.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                          >
                            <span className="text-blue-400 font-bold">›</span>
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
