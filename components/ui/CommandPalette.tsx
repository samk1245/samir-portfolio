"use client";

import React, { useState, useEffect, useRef } from "react";
import { personalInfo, projectsData } from "@/data/portfolio";
import { useTheme } from "@/components/ui/ThemeProvider";
import {
  Search,
  Command as CommandIcon,
  X,
  FileText,
  Mail,
  Sun,
  Moon,
  Layers,
  Code2,
  Terminal,
  ExternalLink,
  Milestone,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open is handled by parent listener
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      id: "nav-about",
      title: "About Samir",
      category: "Navigation",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = "#about";
        onClose();
      },
    },
    {
      id: "nav-skills",
      title: "Technical Skills",
      category: "Navigation",
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = "#skills";
        onClose();
      },
    },
    {
      id: "nav-projects",
      title: "Projects Showcase",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = "#projects";
        onClose();
      },
    },
    {
      id: "nav-journey",
      title: "Milestones & Journey",
      category: "Navigation",
      icon: <Milestone className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = "#experience";
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Contact Samir",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = "#contact";
        onClose();
      },
    },
    {
      id: "act-terminal",
      title: "Launch Interactive Terminal",
      category: "Actions",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: "act-resume",
      title: "Download Resume (PDF)",
      category: "Actions",
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(personalInfo.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "act-copy-email",
      title: `Copy Email (${personalInfo.email})`,
      category: "Actions",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText(personalInfo.email);
        onClose();
      },
    },
    {
      id: "act-copy-phone",
      title: `Copy Phone (${personalInfo.phone})`,
      category: "Actions",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText(personalInfo.phone);
        onClose();
      },
    },
    {
      id: "act-theme",
      title: `Toggle Theme (${theme === "dark" ? "Light Mode" : "Dark Mode"})`,
      category: "Preferences",
      icon:
        theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-violet-400" />
        ),
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    ...projectsData.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      category: "Projects",
      icon: <ExternalLink className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = "#projects";
        onClose();
      },
    })),
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#090d16] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, or section name..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-all ${
                  selectedIndex === index
                    ? "bg-cyan-500/15 border border-cyan-400/40 text-white"
                    : "text-slate-300 hover:bg-surface-200/50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-surface-200">{item.icon}</div>
                  <span className="text-xs font-medium">{item.title}</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2.5 bg-surface-200/50 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-cyan-400">Samir // CLI Engine</span>
        </div>
      </div>
    </div>
  );
}
