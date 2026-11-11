import React, { useState, useEffect } from "react";
import { personalInfo, navLinks } from "@/data/portfolioData";
import { ContactButton } from "./reusable/ContactButton";
import { FadeIn } from "./reusable/FadeIn";
import { Magnet } from "./reusable/Magnet";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#0C0C0C] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient background glows for 3D cinematic depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-pink-600/5 blur-[140px] pointer-events-none" />

      {/* =========================================================
          NAVBAR
          Links: About, Price, Projects, Contact
          ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0C0C0C]/85 backdrop-blur-xl py-4 border-b border-white/10 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-white tracking-wider font-extrabold uppercase text-lg sm:text-xl"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0C0C0C] rounded-full flex items-center justify-center font-black text-xs text-white">
                SK
              </div>
            </div>
            <span className="font-['Kanit',sans-serif] tracking-wider text-white">
              SAMIR KHAN
            </span>
          </a>

          {/* Desktop Nav: Exactly 4 Links (About, Price, Projects, Contact) */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-neutral-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick Contact CTA pill in Navbar */}
            <a
              href="mailto:samir4khan555@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs tracking-wider uppercase border border-white/15 transition-all duration-300 hover:scale-105"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0C0C0C]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
            <ul className="space-y-4 text-base font-semibold uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-neutral-300 hover:text-white py-2 border-b border-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <ContactButton className="w-full text-center" />
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO MAIN CONTENT
          ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-16 flex-1 flex flex-col justify-center">
        {/* Availability / Status Badge */}
        <FadeIn delay={0.1} direction="down">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold tracking-widest uppercase mb-8 sm:mb-12 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300">
              Full-Stack Developer &bull; AI/ML Enthusiast
            </span>
          </div>
        </FadeIn>

        {/* Main 2-Column Hero Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Description, ContactButton */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Massive Hero Heading */}
            <FadeIn delay={0.2} direction="up" distance={50}>
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] font-black uppercase tracking-tighter leading-[0.88] text-white overflow-hidden mb-6 sm:mb-8 font-['Kanit',sans-serif]">
                <span className="block bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                  Hi, I'm
                </span>
                <span className="block bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                  Samir
                </span>
              </h1>
            </FadeIn>

            {/* Hero Description */}
            <FadeIn delay={0.35} direction="up" distance={30}>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10 font-['Kanit',sans-serif]">
                {personalInfo.heroDescription}
              </p>
            </FadeIn>

            {/* Contact Button */}
            <FadeIn delay={0.5} direction="up" distance={20}>
              <div className="flex flex-wrap items-center gap-5">
                <ContactButton text="Contact Me" />
                <a
                  href="#projects"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold text-base tracking-wide uppercase transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
                >
                  Featured Projects
                </a>
              </div>
            </FadeIn>

            {/* Verified Student Metadata */}
            <FadeIn delay={0.6} direction="up" distance={15}>
              <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-neutral-500 uppercase tracking-widest font-medium">
                <span>SIET Prayagraj &bull; 3rd Year CSE</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>CGPA: 6.5/10</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>Prayagraj, India</span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Hero Portrait with Magnet component */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <FadeIn delay={0.4} direction="up" distance={40}>
              <Magnet strength={0.25} className="w-full flex justify-center">
                <div className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-[4/5] rounded-[2.5rem] p-3 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden group">
                  {/* Subtle 3D Depth Backlight Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

                  {/* Inner Image Container */}
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-neutral-900">
                    <img
                      src={personalInfo.portraitUrl}
                      alt="Samir Khan — Software Engineer & Full-Stack Developer"
                      className="w-full h-full object-cover object-top filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      loading="eager"
                      fetchPriority="high"
                    />

                    {/* Subtle cinematic gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-80" />

                    {/* Floating Status Pill over portrait */}
                    <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          <span>Open for Opportunities</span>
                        </div>
                        <div className="text-xs font-semibold text-white tracking-wide">
                          Software / Backend / AI &amp; ML
                        </div>
                      </div>
                      <a
                        href="https://github.com/samk1245"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all"
                        aria-label="GitHub Profile"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Magnet>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Subtle bottom separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
