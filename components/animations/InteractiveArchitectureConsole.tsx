"use client";

import React, { useState } from "react";
import {
  Server,
  Database,
  Layers,
  Cpu,
  Play,
  CheckCircle2,
  Terminal,
  Activity,
  Box,
  Network,
  Code2,
} from "lucide-react";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  status: string;
  metrics: string;
  details: string;
}

const nodes: ArchitectureNode[] = [
  {
    id: "client",
    name: "Client Presentation",
    role: "Single Page App",
    tech: "React.js 19 / Next.js",
    status: "Healthy",
    metrics: "TTFB < 60ms",
    details: "Component-driven responsive interfaces with client state management and Tailwind CSS styling.",
  },
  {
    id: "gateway",
    name: "API Gateway & Router",
    role: "Reverse Proxy & Auth",
    tech: "Express.js / NGINX",
    status: "Active",
    metrics: "Rate Limited (100 req/min)",
    details: "JWT token validation, CORS security, request payload sanitization, and route multiplexing.",
  },
  {
    id: "services",
    name: "Application Services",
    role: "Business Logic & APIs",
    tech: "Node.js & FastAPI",
    status: "Running",
    metrics: "p99 < 45ms",
    details: "Decoupled RESTful endpoints for multi-tenant stores (ShopSphere) and AI analytics pipelines (NeedRadar).",
  },
  {
    id: "container",
    name: "Containerized Runtime",
    role: "Orchestration & Parity",
    tech: "Docker & Compose",
    status: "Containerized",
    metrics: "100% Dev/Prod Parity",
    details: "Multi-stage Dockerfiles ensuring reproducible builds, isolated dependencies, and rapid onboarding.",
  },
  {
    id: "database",
    name: "Persistence & Data Store",
    role: "Document & Schema",
    tech: "MongoDB & Mongoose",
    status: "Connected",
    metrics: "Indexed Queries < 8ms",
    details: "Isolated multi-tenant database collections with indexing, aggregation pipelines, and ACID transactions.",
  },
];

const sampleEndpoints = [
  {
    id: "needradar",
    name: "POST /api/v1/need-radar/analyze",
    project: "NeedRadar AI",
    payload: '{\n  "report": "Water supply interruption sector 4",\n  "locality": "Prayagraj"\n}',
    response: '{\n  "status": "success",\n  "urgency_score": 0.89,\n  "category": "Civil Utilities",\n  "cluster_id": "PRG-WAT-402",\n  "dispatch_alert": true,\n  "latency_ms": 14\n}',
  },
  {
    id: "shopsphere",
    name: "POST /api/v1/tenant/store/checkout",
    project: "ShopSphere SaaS",
    payload: '{\n  "tenantId": "tnt_mercer_88",\n  "items": [{"sku": "DEV-01", "qty": 1}]\n}',
    response: '{\n  "orderId": "ord_88291039",\n  "tenant": "Mercer Goods",\n  "status": "CONFIRMED",\n  "isolationLevel": "Tenant_Schema_Isolated",\n  "dockerEnv": "active"\n}',
  },
  {
    id: "airguard",
    name: "GET /api/v1/telemetry/forecast?city=Prayagraj",
    project: "AirGuard Telemetry",
    payload: '// Query params: city=Prayagraj&horizon=24h',
    response: '{\n  "city": "Prayagraj",\n  "current_aqi": 118,\n  "prediction_24h": 124,\n  "model": "FastAPI_Regression_Pipeline",\n  "sensor_nodes_active": 42\n}',
  },
];

export function InteractiveArchitectureConsole() {
  const [activeTab, setActiveTab] = useState<"topology" | "api" | "metrics">("topology");
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(nodes[2]);
  const [selectedEndpoint, setSelectedEndpoint] = useState(sampleEndpoints[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const handleExecute = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput(selectedEndpoint.response);
    }, 450);
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-surface-100/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col text-left transition-all">
      {/* Console Top Window Bar */}
      <div className="px-4 py-3 bg-surface-200/80 border-b border-white/5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
            samir@siet-prayagraj ~ systems-console
          </span>
        </div>

        {/* Console Mode Switcher */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-50 border border-white/5 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab("topology")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "topology"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Topology
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "api"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Live API
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "metrics"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Stack Specs
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive System Architecture Topology */}
      {activeTab === "topology" && (
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Network className="w-3.5 h-3.5" />
              Interactive Architectural Flow (Click node to inspect)
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Runtime Active
            </span>
          </div>

          {/* Node Pipeline Map */}
          <div className="grid grid-cols-5 gap-2">
            {nodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                    isSelected
                      ? "bg-blue-600/15 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)] text-white"
                      : "bg-surface-200/50 border-white/5 hover:border-white/20 text-slate-300"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-surface-50 text-blue-400 mb-1.5">
                    {node.id === "client" && <Layers className="w-3.5 h-3.5" />}
                    {node.id === "gateway" && <Network className="w-3.5 h-3.5" />}
                    {node.id === "services" && <Server className="w-3.5 h-3.5" />}
                    {node.id === "container" && <Box className="w-3.5 h-3.5" />}
                    {node.id === "database" && <Database className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-[11px] font-semibold tracking-tight line-clamp-1">
                    {node.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                    {node.tech.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Node Inspector Card */}
          <div className="p-4 rounded-xl bg-surface-200/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white">{selectedNode.name}</span>
                <span className="text-[11px] font-mono text-blue-400 block">
                  {selectedNode.tech} • {selectedNode.role}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {selectedNode.status}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">
                  {selectedNode.metrics}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
              {selectedNode.details}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Live API Request/Response Tester */}
      {activeTab === "api" && (
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Select Project API Endpoint:</span>
            <span className="text-blue-400 font-semibold">{selectedEndpoint.project}</span>
          </div>

          {/* Endpoint Selector */}
          <div className="flex flex-wrap gap-1.5">
            {sampleEndpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setSelectedEndpoint(ep);
                  setExecutionOutput(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedEndpoint.id === ep.id
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-surface-200/60 border border-white/5 text-slate-300 hover:text-white"
                }`}
              >
                {ep.id}
              </button>
            ))}
          </div>

          {/* Endpoint Bar + Execute Action */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-50 border border-white/10 font-mono text-xs">
            <span className="text-emerald-400 font-bold px-1.5 py-0.5 bg-emerald-500/10 rounded">
              {selectedEndpoint.name.split(" ")[0]}
            </span>
            <span className="flex-1 text-slate-200 truncate">
              {selectedEndpoint.name.split(" ")[1]}
            </span>
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Calling...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>Execute</span>
                </>
              )}
            </button>
          </div>

          {/* Response Output Console */}
          <div className="p-3.5 rounded-xl bg-[#07090e] border border-white/5 font-mono text-xs text-slate-300 min-h-[120px] max-h-[160px] overflow-y-auto">
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/5 pb-1.5 mb-2">
              <span>OUTPUT STREAM // JSON</span>
              <span>{executionOutput ? "HTTP 200 OK" : "Click 'Execute' to run"}</span>
            </div>
            <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed text-[11px]">
              {executionOutput || selectedEndpoint.payload}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: Verified Stack Specs */}
      {activeTab === "metrics" && (
        <div className="p-5 space-y-4 text-xs font-mono">
          <div className="text-slate-400 flex items-center justify-between">
            <span>Verified System Specifications:</span>
            <span className="text-blue-400">SIET Prayagraj Class of 2026</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">Languages</span>
              <span className="text-white font-semibold">C++, Python, JavaScript (ES6+), C</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">Backend & Frameworks</span>
              <span className="text-white font-semibold">Node.js, Express.js, FastAPI, React</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">Persistence & DB</span>
              <span className="text-white font-semibold">MongoDB (Mongoose), DBMS Core</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">DevOps & Tooling</span>
              <span className="text-white font-semibold">Docker, Linux, Git, Jupyter, Postman</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-slate-300 text-[11px] leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Hands-On Internship: The Zaalima Development</span>
            Engineered modular RESTful APIs using Express.js &amp; React, containerized dev environments with Docker.
          </div>
        </div>
      )}

      {/* Console Footer */}
      <div className="px-4 py-2.5 bg-surface-200/50 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Interactive Engineering Sandbox</span>
        </div>
        <span className="text-blue-400 font-semibold">Samir Khan // Portfolio</span>
      </div>
    </div>
  );
}
