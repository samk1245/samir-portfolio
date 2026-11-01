"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, verifiedStats } from "@/data/portfolio";
import {
  GraduationCap,
  Briefcase,
  Layers,
  Box,
  Terminal,
  Globe,
  Award,
  CheckCircle2,
  Code2,
  ExternalLink,
} from "lucide-react";

function Counter({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const steps = 24;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono text-3xl font-bold text-white light:text-slate-900">
      {count}
      {suffix && <span className="text-blue-400 text-2xl ml-0.5">{suffix}</span>}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
            Academic &amp; Professional Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
            Engineering Foundations &amp; Hands-On Experience
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            3rd Year B.Tech Computer Science &amp; Engineering student at Shambhunath Institute of Engineering and Technology (SIET), Prayagraj, with practical industry experience in full-stack web and backend development.
          </p>
        </div>

        {/* 2-Column Grid: Narrative & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Narrative paragraphs */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 light:text-slate-600 leading-relaxed text-sm sm:text-base text-left">
            <p>
              I am an engineering undergraduate focused on backend architectures, full-stack web development, and applied machine learning. My technical foundation centers on Data Structures, Algorithms, and Object-Oriented Programming in C++, combined with practical experience building scalable web applications in JavaScript, Node.js, and Python.
            </p>
            <p>
              During my 3-month internship at <strong>The Zaalima Development</strong>, I actively contributed to building and testing modular RESTful APIs using Express.js, maintaining responsive user interfaces with React.js, and containerizing application development workflows with Docker to ensure zero configuration drift across the team.
            </p>
            <p>
              I prioritize robust architecture over superficial complexity—structuring decoupled services, ensuring clean version control with Git, and integrating intelligent features where they solve genuine operational bottlenecks.
            </p>

            {/* Language Proficiency Bar */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 block mb-2 uppercase tracking-wider">
                Language Proficiencies
              </span>
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.spokenLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3 rounded-xl bg-surface-100 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-white">{lang.name}</span>
                    <span className="font-mono text-blue-400 text-[11px]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Credentials Cards */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {/* Institution Card */}
            <div className="p-5 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-blue-400 text-sm font-semibold">
                <GraduationCap className="w-5 h-5" />
                <span>Undergraduate Degree</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white light:text-slate-900">
                  {personalInfo.degree}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {personalInfo.college}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs font-mono text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Status: 3rd Year (Expected 2026)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-200 border border-white/5">
                    CGPA: {personalInfo.cgpa}
                  </span>
                </div>
              </div>
            </div>

            {/* Internship Card */}
            <div className="p-5 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-semibold">
                <Briefcase className="w-5 h-5" />
                <span>Web Development Internship</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white light:text-slate-900">
                    The Zaalima Development
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Duration: 3 Months</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Developed responsive web application features using React.js and Node.js. Built and tested RESTful APIs using Express.js. Containerized development environments using Docker.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["React.js", "Node.js", "Express.js", "Docker", "REST APIs", "Git"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Industry Certifications */}
            <div className="p-5 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <Award className="w-4 h-4" />
                <span>Job Simulations &amp; Certifications</span>
              </div>
              <div className="space-y-2">
                {personalInfo.certifications.map((c, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-surface-200/50 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-white block">{c.title}</span>
                      <span className="text-[11px] text-blue-400 font-mono">{c.issuer}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Verified Statistics Counter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {verifiedStats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-2xl bg-surface-100 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-sm font-semibold text-white light:text-slate-900">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
