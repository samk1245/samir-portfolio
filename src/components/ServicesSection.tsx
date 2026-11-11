import React from "react";
import { servicesData, technicalSkills } from "@/data/portfolioData";
import { FadeIn } from "./reusable/FadeIn";
import { ArrowUpRight, Sparkles, Layers, Server, Brain, BarChart3, Globe } from "lucide-react";

export function ServicesSection() {
  const serviceIcons = [
    <Layers className="w-6 h-6" />,
    <Server className="w-6 h-6" />,
    <Brain className="w-6 h-6" />,
    <BarChart3 className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-white text-black rounded-t-[3rem] sm:rounded-t-[4rem] lg:rounded-t-[4.5rem] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Eyebrow */}
        <FadeIn delay={0.1} direction="down">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 text-xs font-semibold tracking-widest uppercase text-neutral-600">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>02 &bull; Technical Offerings</span>
            </div>
            <span className="text-xs font-mono font-medium text-neutral-500 uppercase hidden sm:block">
              Core Capabilities &bull; 2026
            </span>
          </div>
        </FadeIn>

        {/* Heading: "Expertise" */}
        <FadeIn delay={0.2} direction="up" distance={30}>
          <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-black font-['Kanit',sans-serif]">
              Expertise
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-medium max-w-md leading-relaxed font-['Kanit',sans-serif]">
              Crafting reliable software architectures from robust backends and database schemas to reactive interfaces and intelligent AI pipelines.
            </p>
          </div>
        </FadeIn>

        {/* 5 Service Items with Staggered FadeIn */}
        <div className="divide-y divide-black/15 border-y border-black/15">
          {servicesData.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={0.15 * index}
              direction="up"
              distance={25}
            >
              <div className="group py-10 sm:py-14 transition-colors duration-300 hover:bg-neutral-50/80 px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-10">
                {/* Number & Title */}
                <div className="lg:w-5/12 flex items-start gap-6 sm:gap-8">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-neutral-400 group-hover:text-black transition-colors">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-black group-hover:translate-x-1 transition-transform duration-300 font-['Kanit',sans-serif]">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:w-6/12">
                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal font-['Kanit',sans-serif]">
                    {service.description}
                  </p>
                </div>

                {/* Icon Action Pill */}
                <div className="lg:w-1/12 flex lg:justify-end">
                  <div className="w-12 h-12 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white text-black flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Technical Toolkit Grid */}
        <FadeIn delay={0.4} direction="up" distance={30}>
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-100 border border-black/10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 gap-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-800 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Verified Technical Stack &amp; Core Competencies</span>
              </h4>
              <span className="text-xs font-mono text-neutral-500">
                Samir Khan &bull; Technical Toolkit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Programming Languages */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm">
                <span className="text-xs font-mono font-semibold uppercase text-neutral-500 block mb-3">
                  Programming Languages
                </span>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.languages.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 text-black text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Web Technologies */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm">
                <span className="text-xs font-mono font-semibold uppercase text-neutral-500 block mb-3">
                  Web Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.web.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 text-black text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases & Tools */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm">
                <span className="text-xs font-mono font-semibold uppercase text-neutral-500 block mb-3">
                  Databases, Tools &amp; Platforms
                </span>
                <div className="flex flex-wrap gap-2">
                  {[...technicalSkills.databases, ...technicalSkills.tools].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 text-black text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Concepts */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm md:col-span-2 lg:col-span-1">
                <span className="text-xs font-mono font-semibold uppercase text-neutral-500 block mb-3">
                  Core Engineering Concepts
                </span>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.coreConcepts.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 text-black text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm md:col-span-2 lg:col-span-2">
                <span className="text-xs font-mono font-semibold uppercase text-neutral-500 block mb-3">
                  Areas of Specialization &amp; Interest
                </span>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.interests.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium tracking-wide"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
