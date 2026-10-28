"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { HeroConstellation } from "@/components/animations/HeroConstellation";
import {
  ArrowDown,
  Mail,
  FileDown,
  Sparkles,
  ChevronRight,
  ExternalLink,
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
      {/* Background Interactive Constellation */}
      <HeroConstellation />

      {/* Radial Atmospheric Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100/90 border border-white/10 shadow-sm backdrop-blur-md mb-6 hover:border-emerald-500/40 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-medium text-slate-300 light:text-slate-700">
            {personalInfo.availability.label}
          </span>
        </motion.div>

        {/* Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white light:text-slate-900 leading-[1.1] mb-6"
        >
          Building Intelligent Systems.{" "}
          <span className="text-gradient-cyan block mt-1">
            Engineering What&apos;s Next.
          </span>
        </motion.h1>

        {/* Animated Specialties Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-8 mb-5 flex items-center justify-center text-sm sm:text-base font-mono text-cyan-400 light:text-blue-600 font-semibold"
        >
          <span className="text-slate-400 light:text-slate-500 mr-2 font-normal">Specializing in:</span>
          <motion.span
            key={currentSpecialtyIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline-block border-b border-cyan-400/40 pb-0.5"
          >
            {personalInfo.specialties[currentSpecialtyIndex]}
          </motion.span>
        </motion.div>

        {/* Concise Editable Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg text-slate-300 light:text-slate-600 mb-8 leading-relaxed font-sans"
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center gap-2 group"
          >
            <span>Explore My Work</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-cyan-400/40 text-slate-200 light:text-slate-800 font-medium text-sm transition-all flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="px-5 py-3 rounded-lg bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 light:text-slate-600 hover:text-white light:hover:text-black font-medium text-sm transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Get In Touch</span>
          </a>
        </motion.div>

        {/* Social Profile Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4 text-slate-400"
        >
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-surface-100 hover:bg-surface-200 hover:text-cyan-400 border border-white/5 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-surface-100 hover:bg-surface-200 hover:text-cyan-400 border border-white/5 transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.social.email}
            className="p-2 rounded-full bg-surface-100 hover:bg-surface-200 hover:text-cyan-400 border border-white/5 transition-all"
            aria-label="Send direct email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 flex flex-col items-center gap-1.5 text-slate-500 light:text-slate-400 text-xs font-mono"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}
