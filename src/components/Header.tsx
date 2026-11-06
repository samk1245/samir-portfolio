import React, { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#E8EBF1]/85 dark:bg-[#0E1015]/85 backdrop-blur-md py-3.5 border-b border-[#12141B]/10 dark:border-white/10 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Circular Avatar / Logo & Name & Status */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Samir Khan Home"
        >
          <div className="w-10 h-10 rounded-full bg-[#2F4BF0] text-white flex items-center justify-center font-bold font-mono text-sm tracking-tight shadow-md group-hover:scale-105 transition-transform">
            SK
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#12141B] dark:text-[#EEF0F5] group-hover:text-[#2F4BF0] transition-colors uppercase">
              {personalInfo.name}
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                {personalInfo.availabilityStatus}
              </span>
            </div>
          </div>
        </a>

        {/* Right Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-6 text-sm font-semibold text-[#12141B]/80 dark:text-[#EEF0F5]/80">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-[#2F4BF0] dark:hover:text-[#2F4BF0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2F4BF0] hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-white/10" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-xl bg-white/80 dark:bg-[#171A21] border border-black/5 dark:border-white/10 hover:border-[#2F4BF0] transition-all shadow-sm text-[#12141B] dark:text-[#EEF0F5]"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#F2B31B]" />}
          </button>

          {/* Let's Talk CTA button */}
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-[#2F4BF0] hover:bg-[#233bc7] text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-[#2F4BF0]/25 transition-all hover:scale-[1.02] flex items-center gap-1.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Menu Button & Theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-xl bg-white/80 dark:bg-[#171A21] border border-black/5 dark:border-white/10 text-[#12141B] dark:text-[#EEF0F5]"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#F2B31B]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl bg-white/80 dark:bg-[#171A21] border border-black/5 dark:border-white/10 text-[#12141B] dark:text-[#EEF0F5]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#E8EBF1] dark:bg-[#0E1015] border-b border-[#12141B]/10 dark:border-white/10 px-6 py-6 shadow-2xl transition-all">
          <ul className="flex flex-col gap-4 text-base font-bold text-left">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#2F4BF0] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-[#2F4BF0] text-white font-bold text-sm tracking-wide shadow-md"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
