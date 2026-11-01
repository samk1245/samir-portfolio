"use client";

import React, { useEffect, useState } from "react";
import { personalInfo, manualGithubRepos } from "@/data/portfolio";
import { GithubRepoItem } from "@/types/portfolio";
import {
  GitFork,
  Star,
  ExternalLink,
  FolderGit2,
  CheckCircle,
} from "lucide-react";
import { Github } from "@/components/ui/icons";

export function GithubSection() {
  const [repos, setRepos] = useState<GithubRepoItem[]>(manualGithubRepos);
  const [sourceStatus, setSourceStatus] = useState<string>("curated");

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github?username=samk1245");
        if (res.ok) {
          const data = await res.json();
          if (data.repos && Array.isArray(data.repos) && data.repos.length > 0) {
            setRepos(data.repos);
            setSourceStatus(data.source);
          }
        }
      } catch (err) {
        // Fallback to verified curated repositories
      }
    }

    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
              Open Source &amp; Code Repositories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
              GitHub Repositories by Samir
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Public software repositories on <span className="text-blue-400 font-mono">@samk1245</span> across AI platforms, full-stack web applications, and system utilities.
            </p>
          </div>

          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-blue-400/40 text-slate-200 text-xs font-mono flex items-center gap-2 self-start md:self-auto transition-all hover:text-white"
          >
            <Github className="w-4 h-4 text-blue-400" />
            <span>github.com/samk1245</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.name}
              className="p-6 rounded-2xl bg-surface-100 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between h-full group hover:shadow-lg hover:shadow-blue-600/5"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-base font-semibold text-white light:text-slate-900 group-hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="truncate">{repo.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 shrink-0" />
                  </a>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-200 text-blue-400 border border-white/5 shrink-0">
                    {repo.language || "Code"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed line-clamp-2 mb-4 font-sans">
                  {repo.description || "Active software repository by Samir Khan"}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Repo Stats Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>{repo.stars || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    <span>{repo.forks || 0}</span>
                  </div>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <span>View Code</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Source verification footer notice */}
        <div className="mt-8 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {sourceStatus === "github_api"
              ? "Live synchronized with GitHub: @samk1245"
              : "Verified GitHub repository data from @samk1245"}
          </span>
        </div>
      </div>
    </section>
  );
}
