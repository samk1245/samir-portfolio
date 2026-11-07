import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Terminal, X, CornerDownLeft, Sparkles, ChevronRight } from "lucide-react";
import { personalInfo, projectsData, skillCategories, SkillCategory } from "@/data/portfolio";

export function QuickTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; out: string | React.ReactNode }>>([
    {
      cmd: "welcome",
      out: (
        <div>
          <p className="text-[#F2B31B] font-bold">
            Samir Khan Interactive CLI [Version 2.4.0-anime-edition]
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Type <span className="text-[#2F4BF0] font-bold">help</span> to list all interactive commands.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim().toLowerCase();
    if (!cleanCmd) return;

    let response: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        response = (
          <div className="space-y-1 text-slate-300 text-[11px]">
            <p className="text-[#F2B31B] font-bold">Available Commands:</p>
            <p><span className="text-[#2F4BF0] font-bold">whoami</span> — Profile introduction &amp; degree</p>
            <p><span className="text-[#2F4BF0] font-bold">projects</span> — List featured engineering repositories</p>
            <p><span className="text-[#2F4BF0] font-bold">skills</span> — Technical toolkit breakdown</p>
            <p><span className="text-[#2F4BF0] font-bold">anime</span> — Activate anime protagonist power-up</p>
            <p><span className="text-[#2F4BF0] font-bold">contact</span> — Get direct email &amp; phone</p>
            <p><span className="text-[#2F4BF0] font-bold">confetti</span> — Trigger interactive celebration</p>
            <p><span className="text-[#2F4BF0] font-bold">clear</span> — Reset terminal output</p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1 text-slate-300 text-[11px]">
            <p className="font-bold text-white">{personalInfo.name}</p>
            <p className="text-[#F2B31B]">{personalInfo.title}</p>
            <p>{personalInfo.college} &bull; {personalInfo.academicStatus} (CGPA {personalInfo.cgpa})</p>
            <p className="text-slate-400 italic mt-1">"{personalInfo.shortBio}"</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-[11px]">
            <p className="text-[#F2B31B] font-bold">Featured Projects:</p>
            {projectsData.map((p) => (
              <div key={p.id} className="text-slate-300">
                <span className="text-[#2F4BF0] font-bold">{p.title}</span>
                <span className="text-slate-400 block">{p.subtitle} &bull; {p.tags.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1.5 text-[11px]">
            <p className="text-[#F2B31B] font-bold">Technical Skills:</p>
            {skillCategories.map((cat: SkillCategory) => (
              <p key={cat.id} className="text-slate-300">
                <span className="text-slate-400 font-semibold">{cat.title}:</span>{" "}
                {cat.skills.map((s: { name: string }) => s.name).join(", ")}
              </p>
            ))}
          </div>
        );
        break;

      case "anime":
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#2F4BF0", "#F2B31B", "#00F0FF", "#FF69B4"],
          });
        } catch {}
        response = (
          <div className="text-emerald-400 font-bold text-[11px]">
            ⚡ ANIME PROTAGONIST MODE ACTIVATED! (Check out the avatar in the Hero section)
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-slate-300 text-[11px]">
            <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-[#2F4BF0] underline">{personalInfo.email}</a></p>
            <p>Phone: <span className="text-white">{personalInfo.phone}</span></p>
            <p>GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-[#F2B31B] underline">{personalInfo.github}</a></p>
          </div>
        );
        break;

      case "confetti":
        try {
          confetti({ particleCount: 75, spread: 60 });
        } catch {}
        response = <span className="text-[#F2B31B]">🎉 Confetti fired!</span>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = (
          <span className="text-red-400 text-[11px]">
            Command not recognized: "{cleanCmd}". Type <strong className="text-white">help</strong> for list.
          </span>
        );
    }

    setHistory((prev) => [...prev, { cmd: input, out: response }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Interactive Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group px-4 py-2.5 rounded-full bg-[#12141B] dark:bg-[#171A21] text-white border border-[#2F4BF0]/40 shadow-2xl hover:border-[#F2B31B] transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Terminal className="w-4 h-4 text-[#2F4BF0] group-hover:text-[#F2B31B] transition-colors" />
          <span className="text-xs font-mono font-bold tracking-wider">
            {isOpen ? "CLOSE CLI" : "SAMIR.CLI [⌘K]"}
          </span>
        </button>
      </div>

      {/* Slide-Up Terminal Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[480px] max-h-[500px] rounded-3xl bg-[#0E1015]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
          {/* Top Title Bar */}
          <div className="px-4 py-3 bg-[#171A21] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                samir@portfolio:~$
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal History */}
          <div className="p-4 overflow-y-auto space-y-3 font-mono text-left max-h-[340px]">
            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#2F4BF0] font-bold">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>{h.cmd}</span>
                </div>
                <div className="pl-4 text-xs">{h.out}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleCommand}
            className="p-3 bg-[#12141B] border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-[#2F4BF0] font-mono font-bold text-xs pl-2">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'help' or any command..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
              autoFocus
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#2F4BF0] text-white hover:bg-[#223ac7] transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
