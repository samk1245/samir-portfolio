"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/components/ui/ThemeProvider";
import {
  Menu,
  X,
  Sun,
  Moon,
  FileText,
  Terminal,
  Command as CommandIcon,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#experience" },
  { name: "Repositories", href: "#github" },
  { name: "Contact", href: "#contact" },
];

export function Navbar({ onOpenCommandPalette, onOpenTerminal }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Detect active section
      const sections = ["about", "skills", "projects", "experience", "github", "contact"];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06080e]/80 dark:bg-[#06080e]/85 light:bg-white/85 backdrop-blur-md border-b border-white/5 light:border-black/5 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent pt-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Monogram Brand */}
        <Link
          href="#"
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          aria-label="Home"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-100 border border-white/10 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
            SK
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 -mt-1 tracking-wider uppercase">
              B.Tech CSE • SIET
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-900"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-surface-100 border border-white/10 hover:border-cyan-400/40 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] opacity-75">Ctrl+K</span>
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-md bg-surface-100 border border-white/10 hover:border-cyan-400/40 text-slate-300 light:text-slate-700 hover:text-cyan-400 transition-colors"
            title="Interactive Terminal"
            aria-label="Open Interactive Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-surface-100 border border-white/10 hover:border-cyan-400/40 text-slate-300 light:text-slate-700 hover:text-cyan-400 transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Quick CTA */}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-surface-100 border border-white/10 text-slate-300 light:text-slate-700 hover:text-white"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-x-0 top-16 bg-[#06080e]/95 light:bg-white/95 backdrop-blur-xl border-b border-white/10 light:border-black/10 px-6 py-6 transition-all shadow-2xl animate-in slide-in-from-top-2"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 light:text-slate-800 hover:text-cyan-400 transition-colors py-1 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-cyan-400/60">→</span>
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 font-medium text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-surface-100 border border-white/10 text-slate-300 text-xs font-mono"
              >
                <CommandIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Command Palette (Ctrl + K)</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
