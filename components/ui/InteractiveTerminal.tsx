"use client";

import React, { useState, useRef, useEffect } from "react";
import { personalInfo, projectsData, skillCategories } from "@/data/portfolio";
import { X, Terminal as TerminalIcon, Minimize2, Maximize2 } from "lucide-react";

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal({
  isOpen,
  onClose,
}: InteractiveTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            Samir OS v2.5.0 (x86_64-pc-portfolio-engine)
          </p>
          <p className="text-slate-400">
            Type <span className="text-emerald-400">&apos;help&apos;</span> to explore available shell commands.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold mb-1">Available Commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block">about</span> : Summary of engineering background and vision</p>
            <p><span className="text-emerald-400 w-24 inline-block">skills</span> : Core technical stack across languages & systems</p>
            <p><span className="text-emerald-400 w-24 inline-block">projects</span> : List of featured engineering projects</p>
            <p><span className="text-emerald-400 w-24 inline-block">contact</span> : Direct email and communications</p>
            <p><span className="text-emerald-400 w-24 inline-block">resume</span> : View or download resume</p>
            <p><span className="text-emerald-400 w-24 inline-block">whoami</span> : Current session identity</p>
            <p><span className="text-emerald-400 w-24 inline-block">sudo</span> : Administrative escalation test</p>
            <p><span className="text-emerald-400 w-24 inline-block">clear</span> : Clear output stream</p>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">{personalInfo.role}</p>
            <p>{personalInfo.shortBio}</p>
            <p className="text-slate-400 text-[11px]">Specialties: {personalInfo.specialties.join(" • ")}</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">Core Technical Proficiencies:</p>
            {skillCategories.map((c) => (
              <p key={c.id}>
                <span className="text-violet-400 font-semibold">{c.title}:</span>{" "}
                {c.skills.map((s) => s.name).join(", ")}
              </p>
            ))}
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">Featured Projects:</p>
            {projectsData.map((p, idx) => (
              <div key={p.id} className="pl-2 border-l border-cyan-400/30">
                <p className="text-emerald-300 font-semibold">
                  [{idx + 1}] {p.title} ({p.category})
                </p>
                <p className="text-slate-400 text-xs">{p.tagline}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-cyan-400">Email:</span> {personalInfo.email}</p>
            <p><span className="text-cyan-400">Phone:</span> {personalInfo.phone}</p>
            <p><span className="text-cyan-400">GitHub:</span> {personalInfo.social.github}</p>
            <p><span className="text-cyan-400">LinkedIn:</span> {personalInfo.social.linkedin}</p>
            <p><span className="text-cyan-400">College:</span> {personalInfo.college}</p>
          </div>
        );
        break;

      case "resume":
        response = (
          <div className="text-slate-300">
            <p>Resume document path: <span className="text-cyan-400">{personalInfo.resumeUrl}</span></p>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline block mt-1"
            >
              Click here to download PDF
            </a>
          </div>
        );
        break;

      case "whoami":
        response = (
          <p className="text-slate-300">
            visitor@tech-recruiter: <span className="text-cyan-400">Authenticated Guest [Read-Only]</span>
          </p>
        );
        break;

      case "sudo":
        response = (
          <p className="text-rose-400 font-mono">
            Permission denied: User &apos;visitor&apos; is not in the sudoers file. This incident will be reported to Samir.
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      default:
        response = (
          <p className="text-rose-400">
            Command not found: &apos;{trimmed}&apos;. Type <span className="text-cyan-400 font-bold">&apos;help&apos;</span> for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-[520px] rounded-2xl bg-[#070a11] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-surface-100 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>samir@portfolio: ~</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-400 font-bold">➜</span>
                <span className="text-emerald-400 font-semibold">samir-shell</span>
                <span>$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-surface-100/90 border-t border-white/10 flex items-center gap-2 font-mono text-xs"
        >
          <span className="text-cyan-400 font-bold">➜</span>
          <span className="text-emerald-400 font-semibold">samir-shell</span>
          <span className="text-slate-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
