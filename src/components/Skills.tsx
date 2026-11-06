import React, { useState } from "react";
import { skillCategories, SkillCategory } from "@/data/portfolio";
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  BookOpen,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>(skillCategories[0].id);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "programming-languages":
        return <Code2 className="w-5 h-5 text-[#2F4BF0]" />;
      case "frontend":
        return <Layout className="w-5 h-5 text-[#F2B31B]" />;
      case "backend":
        return <Server className="w-5 h-5 text-[#2F4BF0]" />;
      case "database":
        return <Database className="w-5 h-5 text-[#2F4BF0]" />;
      case "tools-platforms":
        return <Terminal className="w-5 h-5 text-[#F2B31B]" />;
      case "core-concepts":
        return <BookOpen className="w-5 h-5 text-[#2F4BF0]" />;
      case "areas-of-interest":
        return <BrainCircuit className="w-5 h-5 text-[#2F4BF0]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#2F4BF0]" />;
    }
  };

  const activeCategory = skillCategories.find((c) => c.id === selectedCategory) || skillCategories[0];

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2F4BF0] block mb-2">
              04 &bull; Technical Competencies
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#12141B] dark:text-[#EEF0F5] uppercase">
              MY TOOLKIT.
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Theory &bull; System Implementation &bull; Frameworks
          </div>
        </div>

        {/* 2-Column Responsive Layout: Left Category Buttons, Right Expanded Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Selection Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {skillCategories.map((cat: SkillCategory) => {
              const isSelected = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#2F4BF0] text-white border-[#2F4BF0] shadow-xl shadow-[#2F4BF0]/20"
                      : "bg-white dark:bg-[#171A21] border-black/5 dark:border-white/10 text-[#12141B] dark:text-[#EEF0F5] hover:border-[#2F4BF0]/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isSelected
                          ? "bg-white/15 text-white"
                          : "bg-[#E8EBF1] dark:bg-white/5"
                      }`}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base leading-tight">
                        {cat.title}
                      </h3>
                      <span
                        className={`text-xs font-mono ${
                          isSelected ? "text-white/80" : "text-slate-500"
                        }`}
                      >
                        {cat.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs font-bold transition-transform ${
                      isSelected ? "translate-x-1" : "text-slate-400 group-hover:translate-x-1"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Active Skills Detail Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-xl space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2F4BF0] mb-2">
                {getCategoryIcon(activeCategory.id)}
                <span>Active Domain</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#12141B] dark:text-[#EEF0F5] tracking-tight">
                {activeCategory.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
                {activeCategory.description}
              </p>
            </div>

            {/* Detailed Skills Tags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeCategory.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#E8EBF1]/60 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[#2F4BF0]/50 hover:bg-[#E8EBF1] dark:hover:bg-white/10 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#12141B] dark:text-[#EEF0F5] group-hover:text-[#2F4BF0] transition-colors">
                      {skill.name}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#2F4BF0]/40 group-hover:bg-[#2F4BF0] transition-colors" />
                  </div>
                  {skill.tag && (
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                      {skill.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Note on genuine proficiency */}
            <div className="p-4 rounded-2xl bg-[#F2B31B]/10 border border-[#F2B31B]/30 text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#F2B31B] shrink-0" />
              <span>
                Demonstrated through real coursework at SIET Prayagraj, 3-month production internship at The Zaalima Development, and self-directed GitHub projects.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
