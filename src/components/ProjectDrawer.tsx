import React, { useState } from "react";
import { ProjectItem } from "@/data/portfolio";
import { X, Play, Terminal, ExternalLink, Cpu, Database, Server, Layers, CheckCircle2, Copy, Check } from "lucide-react";
import { GithubIcon } from "./icons";

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const [activeTab, setActiveTab] = useState<"arch" | "api" | "docker">("arch");
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleTestApi = () => {
    setApiLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiLoading(false);
      if (project.id === "shopsphere-ecommerce") {
        setApiResponse(
          JSON.stringify(
            {
              status: "200 OK",
              timestamp: new Date().toISOString(),
              tenant: "tenant_alpha_01",
              catalog: {
                total_items: 248,
                active_orders: 14,
                db_latency_ms: 12.4,
              },
              cache: "HIT (Redis)",
            },
            null,
            2
          )
        );
      } else if (project.id === "smartcity-airguard") {
        setApiResponse(
          JSON.stringify(
            {
              status: "200 OK",
              station_id: "UP-PRAYAGRAJ-04",
              aqi: 118,
              pm2_5: 42.6,
              pm10: 89.1,
              atmospheric_trend: "STABLE",
              forecast_confidence: "94.8%",
              inference_latency_ms: 28.5,
            },
            null,
            2
          )
        );
      } else {
        setApiResponse(
          JSON.stringify(
            {
              status: "200 OK",
              pipeline: "NLP Urgency Classifier",
              scored_cluster: "North District",
              urgency_index: "HIGH (0.87)",
              action_route: "DISPATCH_TIER_1",
            },
            null,
            2
          )
        );
      }
    }, 400);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-In Inspector Panel */}
      <div className="relative w-full max-w-2xl h-full bg-[#F6F7FA] dark:bg-[#12151D] border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-[slideInRight_0.4s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-black/10 dark:border-white/10 flex items-start justify-between bg-white dark:bg-[#171A21]">
          <div className="space-y-1 pr-4 text-left">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2F4BF0]/10 text-[#2F4BF0] text-[10px] font-mono font-bold uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Project {project.number}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#12141B] dark:text-[#EEF0F5] tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#F2B31B] font-semibold">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 sm:px-8 py-3 bg-white/50 dark:bg-black/20 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
          <button
            onClick={() => setActiveTab("arch")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "arch"
                ? "bg-[#2F4BF0] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Flow</span>
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "api"
                ? "bg-[#2F4BF0] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Interactive API</span>
          </button>

          <button
            onClick={() => setActiveTab("docker")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "docker"
                ? "bg-[#2F4BF0] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Deployment Blueprint</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6 text-left">
          {activeTab === "arch" && (
            <div className="space-y-6">
              {/* Architecture Node Flow Visualizer */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 shadow-sm space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#2F4BF0]" />
                  Modular System Architecture Pipeline
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#2F4BF0]/5 border border-[#2F4BF0]/20 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-[#2F4BF0] font-bold">01. INGESTION</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      Client / Sensors
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      React SPA &bull; TLS REST Endpoints
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F2B31B]/10 border border-[#F2B31B]/20 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-[#F2B31B] font-bold">02. PROCESSING</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      API Gateway
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      FastAPI / Express &bull; Auth &amp; Filtering
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">03. PERSISTENCE</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      Database Layer
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      MongoDB Schemas &bull; Redis Cache
                    </span>
                  </div>
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Key Engineering Capabilities
                </h4>
                <div className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2F4BF0] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#12141B] text-white font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE SIMULATED ENDPOINT
                  </span>
                  <span>HTTP/2</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#F2B31B] font-bold">GET</span>
                  <span className="text-slate-200 flex-1 truncate">
                    https://api.samir.dev/v1/{project.id}/status
                  </span>
                  <button
                    onClick={handleTestApi}
                    disabled={apiLoading}
                    className="px-3 py-1.5 rounded-lg bg-[#2F4BF0] hover:bg-[#243cc7] text-white font-bold flex items-center gap-1 text-[11px] transition-all disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{apiLoading ? "Sending..." : "Send Request"}</span>
                  </button>
                </div>
              </div>

              {/* API Response Viewer */}
              {apiResponse ? (
                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 text-[11px]">
                    <span>STATUS: 200 OK</span>
                    <button
                      onClick={() => handleCopyCode(apiResponse)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied" : "Copy JSON"}</span>
                    </button>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto p-2 bg-black/40 rounded-lg">
                    {apiResponse}
                  </pre>
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/10 text-center text-xs font-mono text-slate-400">
                  Click <strong className="text-[#2F4BF0]">"Send Request"</strong> above to test the RESTful API response.
                </div>
              )}
            </div>
          )}

          {activeTab === "docker" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0E1015] border border-white/10 text-white font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
                  <span>docker-compose.yml</span>
                  <span className="text-[#F2B31B]">production-ready</span>
                </div>
                <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
{`version: '3.8'
services:
  web:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=\${MONGO_URI}
    depends_on:
      - db
  db:
    image: mongo:6.0
    restart: always
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#171A21] border border-black/5 dark:border-white/10 text-xs space-y-1">
                <span className="font-mono font-bold text-[#2F4BF0] block">DevOps Parity</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Containerized environment ensuring exact runtime replication between local development and production servers.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#171A21] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#12141B] dark:bg-white dark:text-[#12141B] text-white font-bold text-xs font-mono flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <GithubIcon className="w-4 h-4 fill-current" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#2F4BF0] text-white font-bold text-xs font-mono flex items-center gap-2 hover:bg-[#243cc7] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Preview</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Slide to Close &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
