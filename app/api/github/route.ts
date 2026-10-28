import { NextResponse } from "next/server";
import { manualGithubRepos } from "@/data/portfolio";
import { GithubRepoItem } from "@/types/portfolio";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (!username) {
    // Return verified manual repositories
    return NextResponse.json({
      source: "curated",
      repos: manualGithubRepos,
    });
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Samir-Portfolio-App",
    };

    // If a server-side token is available, use it without leaking to client
    if (process.env.GITHUB_PAT) {
      headers.Authorization = `token ${process.env.GITHUB_PAT}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      // Graceful fallback to verified curated repositories
      return NextResponse.json({
        source: "curated_fallback",
        repos: manualGithubRepos,
      });
    }

    const data = await response.json();
    const repos: GithubRepoItem[] = data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      language: repo.language || "Code",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      topics: repo.topics || [],
    }));

    return NextResponse.json({
      source: "github_api",
      repos,
    });
  } catch (error) {
    return NextResponse.json({
      source: "curated_fallback",
      repos: manualGithubRepos,
    });
  }
}
