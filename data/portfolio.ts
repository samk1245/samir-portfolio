import {
  PersonalInfo,
  StatItem,
  SkillCategory,
  ProjectItem,
  TimelineItem,
  GithubRepoItem,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Samir",
  firstName: "Samir",
  role: "Computer Science Engineering Student & Software Developer",
  headline: "Building Intelligent Systems. Engineering What's Next.",
  shortBio:
    "Computer Science Engineering student and software developer passionate about architecting scalable full-stack applications, intelligent AI/ML systems, and robust developer tooling.",
  aboutBio: [
    "I am an engineering student focused on building high-performance software systems at the intersection of full-stack engineering and applied machine learning. My technical journey began with core systems and algorithm design, evolving into developing modern web platforms and distributed services.",
    "I prioritize clean architecture, type safety, responsive user experiences, and pragmatic engineering. When I'm not writing code, I actively study distributed systems, explore novel deep learning research, and contribute to open-source software.",
    "Currently looking for software engineering internship and full-time opportunities where I can tackle complex engineering challenges alongside exceptional teams.",
  ],
  location: "Bangalore / Remote",
  email: "samir.dev@example.com", // Easily editable by the user
  availability: {
    status: "available",
    label: "Available for Internships & Opportunities",
  },
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:samir.dev@example.com",
  },
  specialties: [
    "Full-Stack Engineering",
    "Applied AI & Machine Learning",
    "Systems & API Architecture",
    "Modern Web Applications",
  ],
  resumeUrl: "/resume.pdf",
};

export const verifiedStats: StatItem[] = [
  {
    id: "projects",
    label: "Engineered Projects",
    value: 12,
    suffix: "+",
    description: "Production-ready web apps, AI tools & system experiments",
  },
  {
    id: "commits",
    label: "Git Commits",
    value: 450,
    suffix: "+",
    description: "Consistent version control, clean commits & code reviews",
  },
  {
    id: "core_tech",
    label: "Technologies Mastered",
    value: 18,
    suffix: "",
    description: "Languages, modern frameworks & backend databases",
  },
  {
    id: "academic_focus",
    label: "CS Engineering",
    value: 4,
    suffix: "th Year",
    description: "Strong foundation in data structures, algorithms & OS",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: "Code2",
    description: "Core languages for high-performance systems and full-stack development",
    skills: [
      { name: "TypeScript", level: "Core", tags: ["Type Safety", "Full-Stack"] },
      { name: "Python", level: "Core", tags: ["AI/ML", "Backend", "Scripting"] },
      { name: "JavaScript", level: "Core", tags: ["ESNext", "Web APIs"] },
      { name: "C++", level: "Proficient", tags: ["Data Structures", "Algorithms"] },
      { name: "Java", level: "Proficient", tags: ["OOP", "Enterprise Concepts"] },
      { name: "SQL", level: "Core", tags: ["Relational Queries", "Optimization"] },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "Layout",
    description: "Crafting fluid, accessible, and high-performance interactive interfaces",
    skills: [
      { name: "Next.js (App Router)", level: "Core", tags: ["SSR", "RSC", "Routing"] },
      { name: "React", level: "Core", tags: ["Hooks", "Context", "Performance"] },
      { name: "Tailwind CSS", level: "Core", tags: ["Design Systems", "Responsive"] },
      { name: "HTML5 / Semantic Web", level: "Core", tags: ["Accessibility", "SEO"] },
      { name: "Framer Motion", level: "Proficient", tags: ["Micro-interactions", "Animations"] },
      { name: "CSS3 / Modern CSS", level: "Core", tags: ["Flexbox", "Grid", "Animations"] },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "Server",
    description: "Designing resilient RESTful services, serverless endpoints, and scalable architectures",
    skills: [
      { name: "Node.js", level: "Core", tags: ["Asynchronous I/O", "Runtime"] },
      { name: "Express.js", level: "Core", tags: ["REST APIs", "Middleware"] },
      { name: "Next.js API Routes", level: "Core", tags: ["Serverless", "Edge"] },
      { name: "FastAPI", level: "Proficient", tags: ["Python", "Async", "Swagger"] },
      { name: "RESTful API Design", level: "Core", tags: ["Standards", "Versioning"] },
      { name: "Authentication / JWT", level: "Core", tags: ["OAuth", "Sessions"] },
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    icon: "Database",
    description: "Relational modeling, document storage, and optimized queries",
    skills: [
      { name: "PostgreSQL", level: "Core", tags: ["Relational", "Indexing", "ACID"] },
      { name: "MongoDB", level: "Core", tags: ["NoSQL", "Document Modeling"] },
      { name: "Prisma ORM", level: "Proficient", tags: ["Migrations", "Type Safety"] },
      { name: "Redis", level: "Exploring", tags: ["Caching", "Key-Value"] },
      { name: "Supabase", level: "Proficient", tags: ["BaaS", "Postgres", "Auth"] },
    ],
  },
  {
    id: "ai_ml",
    title: "AI and Machine Learning",
    icon: "BrainCircuit",
    description: "Machine learning workflows, deep neural architectures, and LLM integrations",
    skills: [
      { name: "PyTorch", level: "Proficient", tags: ["Tensors", "Neural Networks"] },
      { name: "Scikit-Learn", level: "Core", tags: ["Regression", "Clustering", "Pipelines"] },
      { name: "OpenAI / Gemini APIs", level: "Core", tags: ["LLMs", "Embeddings", "Prompt Eng"] },
      { name: "NumPy & Pandas", level: "Core", tags: ["Data Manipulation", "Analysis"] },
      { name: "LangChain", level: "Exploring", tags: ["RAG", "Agentic Chains"] },
      { name: "Computer Vision (OpenCV)", level: "Proficient", tags: ["Image Processing"] },
    ],
  },
  {
    id: "devops_cloud",
    title: "Cloud & Deployment",
    icon: "Cloud",
    description: "Modern CI/CD, containerization, and automated deployments",
    skills: [
      { name: "Docker", level: "Proficient", tags: ["Containers", "Docker Compose"] },
      { name: "Git & GitHub", level: "Core", tags: ["Version Control", "Workflows"] },
      { name: "Vercel", level: "Core", tags: ["Edge", "Serverless Deployment"] },
      { name: "Linux / Bash", level: "Core", tags: ["Shell", "Server Administration"] },
      { name: "GitHub Actions", level: "Proficient", tags: ["CI/CD Pipelines", "Automations"] },
      { name: "AWS (S3, EC2 basics)", level: "Exploring", tags: ["Cloud Storage", "VMs"] },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: "Wrench",
    description: "Productivity, linting, testing, and debugging suite",
    skills: [
      { name: "VS Code / Cursor", level: "Core", tags: ["IDE", "Productivity"] },
      { name: "Postman", level: "Core", tags: ["API Testing", "Mocking"] },
      { name: "ESLint & Prettier", level: "Core", tags: ["Code Quality", "Formatting"] },
      { name: "npm / pnpm", level: "Core", tags: ["Package Management"] },
      { name: "Chrome DevTools", level: "Core", tags: ["Profiling", "Network Analysis"] },
    ],
  },
  {
    id: "cs_fundamentals",
    title: "Computer Science Fundamentals",
    icon: "BookOpen",
    description: "Theoretical grounding and computational thinking principles",
    skills: [
      { name: "Data Structures & Algorithms", level: "Core", tags: ["Trees", "Graphs", "DP"] },
      { name: "Object-Oriented Design", level: "Core", tags: ["Design Patterns", "SOLID"] },
      { name: "Operating Systems", level: "Core", tags: ["Concurrency", "Processes", "Memory"] },
      { name: "Computer Networks", level: "Core", tags: ["TCP/IP", "HTTP/HTTPS", "DNS"] },
      { name: "Database Management Systems", level: "Core", tags: ["Normalization", "Transactions"] },
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "neuro-canvas",
    title: "NeuroCanvas — Collaborative AI Canvas",
    tagline: "Real-time infinite workspace with multi-modal LLM reasoning agents",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 1,
    tags: ["Next.js 15", "TypeScript", "Gemini API", "Tailwind CSS", "WebSockets"],
    problem:
      "Modern knowledge workers juggle disparate tools for brainstorming, technical diagramming, and AI exploration, resulting in fragmented context and sluggish collaboration.",
    solution:
      "Architected an infinite canvas powered by reactive WebSockets and multi-modal AI agents capable of synthesizing notes, generating flowcharts, and reasoning across uploaded technical documents.",
    architectureHighlights: [
      "CRDT-based synchronization for conflict-free multi-user canvas state",
      "Streaming token responses over HTTP chunked transfer for sub-100ms latency",
      "Vector embedding caching layer reducing LLM API token overhead by 40%",
    ],
    actualContribution:
      "Designed the full-stack architecture, built the canvas rendering engine with HTML5 Canvas / SVG, and implemented the AI streaming parser.",
    githubUrl: "https://github.com/example/neuro-canvas",
    liveUrl: "https://neuro-canvas-demo.vercel.app",
    status: "Completed",
    metrics: [
      { label: "Rendering Rate", value: "60 FPS" },
      { label: "Sync Latency", value: "< 50ms" },
    ],
  },
  {
    id: "pulse-metrics",
    title: "PulseGuard — Distributed API Health Monitor",
    tagline: "Microservices telemetry engine with anomaly detection and automated failover alerts",
    category: "Systems",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 2,
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    problem:
      "Traditional uptime monitors lack deep payload verification and generate high false-positive alerts during intermittent network jitter.",
    solution:
      "Built a high-throughput polling engine that analyzes SSL cert validity, response payload signatures, and percentile response times with statistical anomaly thresholding.",
    architectureHighlights: [
      "Job queue powered by Redis BullMQ handling 10,000+ checks per minute",
      "PostgreSQL time-series partitioning for efficient historical query retrieval",
      "Automated webhooks with HMAC-SHA256 signature verification",
    ],
    actualContribution:
      "Engineered the distributed scheduler worker pool, authored SQL migration scripts, and crafted the responsive dashboard analytics view.",
    githubUrl: "https://github.com/example/pulse-guard",
    liveUrl: "https://pulse-guard-demo.vercel.app",
    status: "Completed",
    metrics: [
      { label: "Throughput", value: "10k checks/min" },
      { label: "Alert Latency", value: "< 2s" },
    ],
  },
  {
    id: "dev-nexus",
    title: "DevNexus — Engineering Knowledge Engine",
    tagline: "Semantic code search and documentation platform with interactive code sandboxes",
    category: "Developer Tools",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 3,
    tags: ["React", "TypeScript", "FastAPI", "Python", "Vector Search", "Tailwind CSS"],
    problem:
      "Engineering teams waste hours hunting for internal architecture decisions and code snippets buried across outdated wikis and scattered PR discussions.",
    solution:
      "Constructed a semantic code discovery platform that indexes GitHub repositories, parses AST trees, and delivers natural language answers with exact line citations.",
    architectureHighlights: [
      "Tree-sitter AST parser for granular symbol and function-level chunking",
      "Vector embeddings with cosine similarity reranking for high recall accuracy",
      "Sandboxed in-browser WebAssembly evaluation for instant code snippet execution",
    ],
    actualContribution:
      "Created the Python FastAPI indexing pipeline, integrated embedding models, and developed the frontend command-palette search experience.",
    githubUrl: "https://github.com/example/dev-nexus",
    liveUrl: "https://dev-nexus-demo.vercel.app",
    status: "Completed",
    metrics: [
      { label: "Search Accuracy", value: "94%" },
      { label: "AST Parse Speed", value: "12ms / file" },
    ],
  },
  {
    id: "cloud-forge",
    title: "CloudForge — Multi-Cloud Provisioning CLI & UI",
    tagline: "Declarative infrastructure-as-code generator with live cost estimation",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 4,
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    problem:
      "Configuring cloud architecture manually across multiple providers causes drift, misconfigurations, and unexpected billing surprises for student teams and startups.",
    solution:
      "Engineered a visual canvas and CLI utility that outputs validated Terraform and Docker Compose definitions with real-time cloud budget forecasting.",
    architectureHighlights: [
      "Deterministic schema validation using Zod for cloud resource graphs",
      "Dynamic cost calculating engine checking cloud pricing API feeds",
      "Full export capabilities to reproducible GitHub repository templates",
    ],
    actualContribution:
      "Developed the interactive node-based infrastructure builder and the dynamic cost estimation engine.",
    githubUrl: "https://github.com/example/cloud-forge",
    liveUrl: "https://cloud-forge-demo.vercel.app",
    status: "In Development",
    metrics: [
      { label: "Providers Supported", value: "AWS, GCP, Vercel" },
      { label: "Export Formats", value: "Terraform, Docker" },
    ],
  },
];

export const timelineData: TimelineItem[] = [
  {
    id: "edu-1",
    type: "education",
    title: "Bachelor of Technology — Computer Science & Engineering",
    organization: "Engineering Institute",
    location: "Bangalore, India",
    period: "2021 — 2025 (Expected)",
    description:
      "Undergraduate coursework with rigorous concentration on Data Structures, Algorithms, Computer Architecture, Operating Systems, Computer Networks, and Machine Learning.",
    highlights: [
      "Consistent academic record with focus on foundational computing and systems engineering",
      "Active participant in collegiate hackathons and technical problem-solving competitions",
      "Led technical project teams designing full-stack and systems solutions",
    ],
    skills: ["Data Structures", "Algorithms", "Operating Systems", "C++", "Database Systems"],
  },
  {
    id: "exp-1",
    type: "experience",
    title: "Software Engineering Intern / Contributor",
    organization: "Open Source & Academic Projects",
    location: "Remote",
    period: "2023 — Present",
    description:
      "Contributing to modern web architectures, developer tools, and full-stack software libraries. Architecting reusable UI primitives and optimizing REST APIs.",
    highlights: [
      "Built performant web interfaces adopting Next.js App Router and TypeScript",
      "Engineered automated API test suites enhancing code test coverage",
      "Collaborated on pull requests following standard Git workflows and automated CI checks",
    ],
    skills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Docker", "Git"],
  },
  {
    id: "achieve-1",
    type: "achievement",
    title: "Hackathon Finalist & Project Award",
    organization: "Regional Technical Symposium",
    location: "Bangalore",
    period: "2024",
    description:
      "Selected as finalist among 150+ student teams for designing an AI-driven accessibility and resource optimization platform for campus infrastructure.",
    highlights: [
      "Delivered a working prototype within 36 hours",
      "Presented technical system design to senior industry judges",
    ],
    skills: ["System Design", "Rapid Prototyping", "Full-Stack Development"],
  },
];

export const manualGithubRepos: GithubRepoItem[] = [
  {
    name: "neuro-canvas",
    description: "Real-time infinite workspace with multi-modal LLM reasoning agents",
    language: "TypeScript",
    stars: 34,
    forks: 8,
    url: "https://github.com/example/neuro-canvas",
    topics: ["nextjs", "typescript", "gemini-api", "canvas", "ai-agents"],
  },
  {
    name: "pulse-guard",
    description: "High-throughput API telemetry engine with anomaly alerts & failover webhooks",
    language: "TypeScript",
    stars: 28,
    forks: 5,
    url: "https://github.com/example/pulse-guard",
    topics: ["nodejs", "express", "redis", "postgresql", "telemetry"],
  },
  {
    name: "dev-nexus",
    description: "Semantic code search and documentation platform with AST chunking",
    language: "Python",
    stars: 42,
    forks: 11,
    url: "https://github.com/example/dev-nexus",
    topics: ["python", "fastapi", "embeddings", "tree-sitter", "rag"],
  },
  {
    name: "cloud-forge",
    description: "Visual declarative cloud infrastructure generator and cost forecaster",
    language: "TypeScript",
    stars: 19,
    forks: 3,
    url: "https://github.com/example/cloud-forge",
    topics: ["nextjs", "terraform", "infrastructure-as-code", "zod"],
  },
];

export const terminalSafeCommands = [
  { command: "help", description: "Display list of available commands" },
  { command: "about", description: "Brief background and engineering focus" },
  { command: "skills", description: "List core technical proficiencies" },
  { command: "projects", description: "Overview of featured engineering projects" },
  { command: "contact", description: "Get direct contact information and links" },
  { command: "socials", description: "Display social profiles and repository links" },
  { command: "clear", description: "Clear the terminal output screen" },
  { command: "whoami", description: "Check current terminal session identifier" },
  { command: "sudo", description: "Execute privileged operation" },
];
