export interface PersonalInfo {
  name: string;
  firstName: string;
  role: string;
  headline: string;
  shortBio: string;
  aboutBio: string[];
  location: string;
  email: string;
  availability: {
    status: "available" | "busy" | "open_to_offers";
    label: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
  specialties: string[];
  resumeUrl: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

export interface SkillItem {
  name: string;
  iconName?: string;
  level?: "Core" | "Proficient" | "Exploring";
  tags?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "AI/ML" | "Full-Stack" | "Developer Tools" | "Systems" | "All";
  image: string;
  featured: boolean;
  featuredOrder?: number;
  tags: string[];
  problem: string;
  solution: string;
  architectureHighlights: string[];
  actualContribution: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "Completed" | "In Development" | "Prototype";
  metrics?: { label: string; value: string }[];
}

export interface TimelineItem {
  id: string;
  type: "education" | "experience" | "achievement" | "extracurricular";
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  skills?: string[];
  link?: string;
}

export interface GithubRepoItem {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export interface TerminalCommandResponse {
  output: string | string[];
  isError?: boolean;
}
