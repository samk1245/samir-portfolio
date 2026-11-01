"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { InteractiveArchitectureConsole } from "@/components/animations/InteractiveArchitectureConsole";
import {
  ArrowDown,
  Mail,
  FileDown,
  ChevronRight,
  GraduationCap,
  Phone,
  Sparkles,
  MapPin,
  Code2,
  Terminal,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

export function HeroSection() {
  const [currentSpecialtyIndex, setCurrentSpecialtyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpecialtyIndex((prev) => (prev + 1) % personalInfo.specialties.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
      {/* Subtle Ambient Radial Lighting (Soft & Elegant) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline & Identity */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 border border-white/10 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-300 light:text-slate-700">
              {personalInfo.availability.label}
            </span>
          </motion.div>

          {/* Master Name Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white light:text-slate-900 leading-[1.1] mb-4"
          >
            Samir Khan
          </motion.h1>

          {/* Academic & Role Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-2 text-sm sm:text-base font-mono text-blue-400 mb-5 font-semibold"
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>3rd Year B.Tech CSE • SIET Prayagraj (Expected 2026)</span>
          </motion.div>

          {/* Specialties ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-7 mb-5 flex items-center text-xs sm:text-sm font-mono text-slate-300 light:text-slate-600"
          >
            <span className="text-slate-500 mr-2">Specializing in:</span>
            <motion.span
              key={currentSpecialtyIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-semibold text-white light:text-slate-900 border-b border-blue-500/50 pb-0.5"
            >
              {personalInfo.specialties[currentSpecialtyIndex]}
            </motion.span>
          </motion.div>

          {/* Bio paragraph from CV */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm sm:text-base text-slate-300 light:text-slate-600 mb-8 leading-relaxed max-w-xl"
          >
            Computer Science student with hands-on internship experience in full-stack web architectures,
            modular RESTful APIs using Express.js and Node.js, and containerized deployment with Docker.
            Passionate about backend systems, ML/AI engineering, and clean algorithm design.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-8 w-full"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 group"
            >
              <span>Explore Engineered Systems</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-blue-400/40 text-slate-200 light:text-slate-800 font-medium text-sm transition-all flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-blue-400" />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 light:text-slate-700 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Contact</span>
            </a>
          </motion.div>

          {/* Social Profiles & Direct Coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-3 text-slate-400"
          >
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-mono"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">github.com/samk1245</span>
            </a>

            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-mono"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">samir-khan-59ss</span>
            </a>

            <a
              href={personalInfo.social.phone}
              className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-mono"
              title="Phone"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{personalInfo.phone}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Live Interactive Architecture Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 flex justify-center w-full"
        >
          <InteractiveArchitectureConsole />
        </motion.div>
      </div>

      {/* Scroll to explore hint */}
      <div className="mt-14 flex flex-col items-center gap-1.5 text-slate-500 text-xs font-mono select-none">
        <span>SCROLL TO EXPLORE ARCHITECTURE</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-blue-400" />
      </div>
    </section>
  );
}
