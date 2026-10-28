import {
  PersonalInfo,
  StatItem,
  SkillCategory,
  ProjectItem,
  TimelineItem,
  GithubRepoItem,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Samir Khan",
  firstName: "Samir",
  role: "B.Tech Computer Science Engineering Student & Software Developer",
  headline: "Building Scalable Systems. Engineering Intelligent Web & AI Solutions.",
  shortBio:
    "3rd-year B.Tech Computer Science & Engineering student at Shambhunath Institute of Engineering and Technology, Prayagraj. Proficient in C++, Python, JavaScript, and full-stack development with hands-on experience building backend APIs, containerized architectures, and ML/AI platforms.",
  aboutBio: [
    "I am a third-year Computer Science & Engineering undergraduate at Shambhunath Institute of Engineering and Technology (SIET), Prayagraj, with a CGPA of 6.9/10 and expected graduation in 2026. My core passion lies in engineering robust backend architectures, distributed web platforms, and applied machine learning pipelines.",
    "During my Web Development Internship at The Zaalima Development, I built and tested modular RESTful APIs using Express.js, maintained responsive client features in React.js, and containerized development workflows with Docker to ensure smooth team onboarding and deployment stability.",
    "I believe in write-once, scale-confidently engineering—combining solid Data Structures and Algorithms with clean system design. I am actively seeking software engineering and backend/AI internship roles where I can contribute to high-impact production systems.",
  ],
  college: "Shambhunath Institute of Engineering and Technology, Prayagraj",
  degree: "Bachelor of Technology — Computer Science & Engineering",
  academicYear: "3rd Year (Class of 2026)",
  cgpa: "6.9 / 10",
  expectedGraduation: "2026",
  location: "Prayagraj, Uttar Pradesh, India",
  email: "samir4khan555@gmail.com",
  phone: "+91-7887087151",
  availability: {
    status: "available",
    label: "Available for Internships & Full-Time Roles",
  },
  social: {
    github: "https://github.com/samk1245",
    linkedin: "https://linkedin.com/in/samir-khan-59ss",
    email: "mailto:samir4khan555@gmail.com",
    phone: "tel:+917887087151",
  },
  specialties: [
    "Backend & RESTful API Engineering",
    "Full-Stack Web Development (MERN)",
    "Applied AI & Machine Learning",
    "Containerization & Docker",
  ],
  spokenLanguages: [
    { name: "English", level: "Professional Working Proficiency" },
    { name: "Hindi", level: "Native / Bilingual" },
  ],
  certifications: [
    {
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte",
      date: "September 2025",
    },
    {
      title: "Gen-AI Powered Data Analytics Job Simulation",
      issuer: "Forage",
      date: "2025",
    },
    {
      title: "Google Cloud Computing Foundations",
      issuer: "Google Cloud",
      date: "2024",
    },
  ],
  resumeUrl: "/resume.pdf",
};

export const verifiedStats: StatItem[] = [
  {
    id: "academic_year",
    label: "B.Tech CSE Status",
    value: 3,
    suffix: "rd Year",
    description: "Shambhunath Institute of Engineering and Technology, Prayagraj (Expected 2026)",
  },
  {
    id: "internship_duration",
    label: "Internship Experience",
    value: 3,
    suffix: " Months",
    description: "Web Development Intern at The Zaalima Development (React, Node, Express, Docker)",
  },
  {
    id: "github_projects",
    label: "Public Repositories",
    value: 12,
    suffix: "+",
    description: "AI tools, MERN full-stack platforms, APIs & data pipelines on GitHub",
  },
  {
    id: "certifications_count",
    label: "Industry Certifications",
    value: 3,
    suffix: "",
    description: "Deloitte Data Analytics, Forage Gen-AI & Google Cloud Foundations",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "programming_languages",
    title: "Programming Languages",
    icon: "Code2",
    description: "Strong foundation in systems, procedural, and object-oriented programming",
    skills: [
      { name: "C++", level: "Core", tags: ["OOP", "Data Structures", "Algorithms"] },
      { name: "Python", level: "Core", tags: ["FastAPI", "Data Analysis", "AI/ML"] },
      { name: "JavaScript (ES6+)", level: "Core", tags: ["Asynchronous", "Full-Stack"] },
      { name: "C", level: "Core", tags: ["Pointers", "Memory", "Basics"] },
      { name: "HTML5 & CSS3", level: "Core", tags: ["Semantic Layouts", "Responsive Design"] },
    ],
  },
  {
    id: "web_technologies",
    title: "Web & Backend Technologies",
    icon: "Server",
    description: "High-performance REST API services and reactive single-page applications",
    skills: [
      { name: "Node.js", level: "Core", tags: ["Event Loop", "Runtime", "APIs"] },
      { name: "Express.js", level: "Core", tags: ["REST APIs", "Middleware", "Routing"] },
      { name: "React.js", level: "Core", tags: ["Hooks", "Components", "State"] },
      { name: "FastAPI", level: "Proficient", tags: ["Python", "Async endpoints", "Swagger"] },
      { name: "Next.js", level: "Proficient", tags: ["App Router", "SSR", "TypeScript"] },
      { name: "Tailwind CSS", level: "Core", tags: ["Utility-First", "Modern UI"] },
    ],
  },
  {
    id: "databases_storage",
    title: "Databases & Storage",
    icon: "Database",
    description: "Document storage, schema design, and query optimization",
    skills: [
      { name: "MongoDB", level: "Core", tags: ["NoSQL", "Mongoose", "Aggregation"] },
      { name: "DBMS Concepts", level: "Core", tags: ["Normalization", "Indexing", "ACID"] },
    ],
  },
  {
    id: "tools_platforms",
    title: "Tools & DevOps Platforms",
    icon: "Cloud",
    description: "Version control, environment containerization, and data exploration",
    skills: [
      { name: "Docker", level: "Core", tags: ["Containerization", "Docker Compose", "Multi-stage"] },
      { name: "Git & GitHub", level: "Core", tags: ["Version Control", "PR Reviews", "Workflows"] },
      { name: "Linux", level: "Core", tags: ["Shell Scripts", "Bash", "System Commands"] },
      { name: "Jupyter Notebook", level: "Core", tags: ["Data Pipelines", "EDA", "Visualization"] },
      { name: "Postman", level: "Core", tags: ["API Testing", "Validation"] },
      { name: "VS Code", level: "Core", tags: ["IDE", "Productivity"] },
    ],
  },
  {
    id: "core_cs_concepts",
    title: "Computer Science Fundamentals",
    icon: "BookOpen",
    description: "Theoretical grounding and foundational computing principles",
    skills: [
      { name: "Data Structures & Algorithms", level: "Core", tags: ["Trees", "Graphs", "DP", "Sorting"] },
      { name: "Object-Oriented Programming (OOP)", level: "Core", tags: ["Encapsulation", "Inheritance", "Polymorphism"] },
      { name: "Database Management Systems (DBMS)", level: "Core", tags: ["Relational Model", "ER Diagrams"] },
      { name: "Operating Systems Basics", level: "Proficient", tags: ["Processes", "Memory Management"] },
    ],
  },
  {
    id: "areas_of_interest",
    title: "Specialized Areas of Interest",
    icon: "BrainCircuit",
    description: "Applied machine learning, data engineering, and modern AI platforms",
    skills: [
      { name: "Backend Systems", level: "Core", tags: ["Microservices", "Scalability", "Security"] },
      { name: "Machine Learning", level: "Proficient", tags: ["Supervised Learning", "Model Evaluation"] },
      { name: "Data Analytics", level: "Proficient", tags: ["Data Cleaning", "Feature Engineering"] },
      { name: "AI Engineering", level: "Proficient", tags: ["LLM Integration", "Autonomous Agents"] },
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "need-radar",
    title: "NeedRadar — AI Unmet Needs Intelligence Platform",
    tagline: "AI-powered civic and community action platform identifying unmet societal needs",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 1,
    tags: ["TypeScript", "Next.js", "AI Intelligence", "FastAPI", "Tailwind CSS"],
    problem:
      "Community organizations and municipal bodies struggle to synthesize unstructured public feedback, resulting in slow response times to urgent civic needs.",
    solution:
      "Architected NeedRadar, an AI platform that aggregates, categorizes, and scores unmet community needs in real time with automated cluster detection and action alerts.",
    architectureHighlights: [
      "Natural language sentiment & entity extraction pipeline for community reports",
      "Dynamic priority scoring matrix based on geographical urgency",
      "Interactive analytics dashboard providing real-time trend visualization",
    ],
    actualContribution:
      "Designed the AI classification logic, implemented the responsive frontend interface, and structured the RESTful data ingestion layer.",
    githubUrl: "https://github.com/samk1245/NeedRadar",
    status: "Production-Ready",
    metrics: [
      { label: "Community Ingestion", value: "Real-time" },
      { label: "Classification", value: "Automated AI" },
    ],
  },
  {
    id: "evocode-ai",
    title: "EvoCode-AI — Evolutionary Code Intelligence",
    tagline: "Autonomous Python-based code optimization and algorithm evolution engine",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 2,
    tags: ["Python", "Machine Learning", "AST", "Algorithms", "AI Agents"],
    problem:
      "Developers spend repetitive manual hours profiling algorithmic bottlenecks and generating optimized variants of computationally heavy code routines.",
    solution:
      "Engineered EvoCode-AI, a Python platform that parses syntax trees, analyzes execution complexity, and synthesizes higher-performance algorithmic refactorings.",
    architectureHighlights: [
      "Abstract Syntax Tree (AST) analysis for syntactic safety verification",
      "Automated benchmark harness verifying execution time delta against baseline",
      "Modular agentic loop iteratively optimizing memory usage and loop structures",
    ],
    actualContribution:
      "Created the core Python pipeline, engineered test suites for code evaluation, and integrated the evolutionary refactoring heuristics.",
    githubUrl: "https://github.com/samk1245/EvoCode-AI",
    status: "Completed",
    metrics: [
      { label: "Language", value: "Python 3.11" },
      { label: "Verification", value: "AST Tested" },
    ],
  },
  {
    id: "shopsphere-ecommerce",
    title: "ShopSphere — Multi-Tenant E-Commerce SaaS",
    tagline: "Scalable MERN multi-tenant e-commerce platform with Dockerized containerization",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 3,
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Docker"],
    problem:
      "Independent merchants require isolated store data, customized catalogues, and independent checkout flows without bearing enterprise hosting overhead.",
    solution:
      "Built a modular multi-tenant web application separating tenant schemas in MongoDB, protected by role-based JWT authentication and fully containerized with Docker.",
    architectureHighlights: [
      "Modular Express.js backend architecture with tenant isolation middleware",
      "RESTful API endpoints for catalog management, shopping cart, and orders",
      "Complete Dockerfile and Docker Compose environment for seamless dev-to-prod parity",
    ],
    actualContribution:
      "Engineered the full-stack architecture: built MongoDB schemas, created Express API endpoints, built responsive React components, and wrote Docker orchestration scripts.",
    githubUrl: "https://github.com/samk1245/shopsphere-multitenant-ecommerce",
    status: "Completed",
    metrics: [
      { label: "Architecture", value: "Modular MERN" },
      { label: "Environment", value: "Dockerized" },
    ],
  },
  {
    id: "smartcity-airguard",
    title: "SmartCity AirGuard — Environmental Telemetry AI",
    tagline: "IoT air quality monitoring, pollution forecasting, and citizen alert network",
    category: "Data & Systems",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    featuredOrder: 4,
    tags: ["TypeScript", "FastAPI", "Python", "Data Analytics", "Docker"],
    problem:
      "Urban environments lack granular, predictive air quality indicators accessible to residents prior to severe pollution peaks.",
    solution:
      "Developed an environmental intelligence system collecting particulate data, running predictive anomaly regressions in Python, and publishing visual alerts.",
    architectureHighlights: [
      "FastAPI backend handling continuous sensor data stream ingestion",
      "Time-series data cleaning and outlier detection in Python",
      "Responsive telemetry dashboard showing Air Quality Index (AQI) forecasts",
    ],
    actualContribution:
      "Constructed the data preprocessing pipelines, created FastAPI endpoints, and built the interactive telemetry visualization UI.",
    githubUrl: "https://github.com/samk1245/SmartCity-AirGuard-AI-System",
    status: "Completed",
    metrics: [
      { label: "Telemetry", value: "AQI Tracking" },
      { label: "Backend", value: "FastAPI + Docker" },
    ],
  },
  {
    id: "data-analytics-dashboard",
    title: "Data Analytics & Predictive Insights Engine",
    tagline: "End-to-end data processing pipeline with FastAPI and interactive Jupyter analysis",
    category: "Data & Systems",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["Python", "FastAPI", "Jupyter Notebook", "Pandas", "Data Cleaning"],
    problem:
      "Organizations with vast structured datasets struggle to extract actionable operational patterns without heavy, slow BI enterprise suites.",
    solution:
      "Created a high-speed Python data pipeline to clean, normalize, and visualize tabular datasets, exposed through lightweight FastAPI endpoints for rapid dashboard integration.",
    architectureHighlights: [
      "Robust data cleaning and missing-value imputation pipeline in Python",
      "Exploratory data analysis (EDA) workflows using Jupyter notebooks",
      "Automated summary statistic endpoints delivering sub-50ms query responses",
    ],
    actualContribution:
      "Developed the data processing scripts, configured Jupyter exploratory workflows, and authored the FastAPI service layer.",
    githubUrl: "https://github.com/samk1245",
    status: "Completed",
    metrics: [
      { label: "Processing", value: "Pandas Pipeline" },
      { label: "API Speed", value: "< 50ms" },
    ],
  },
  {
    id: "hotel-booking",
    title: "XYZ Hotel — Premium Booking & Admin Suite",
    tagline: "Luxury hospitality web platform with real-time reservation inquiries and private admin console",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["JavaScript", "Node.js", "Express.js", "MongoDB", "HTML5/CSS3"],
    problem:
      "Boutique hotels lose direct booking revenue when reliant entirely on third-party aggregators with high commission rates.",
    solution:
      "Built a bespoke luxury hotel showcase featuring suite exploration, an automated inquiry reservation flow, and a secure private admin management dashboard.",
    architectureHighlights: [
      "Express.js backend managing room availability dates and reservation states",
      "Role-protected admin control panel for managing inquiries and room rates",
      "Responsive editorial UI optimized for cross-device high-conversion browsing",
    ],
    actualContribution:
      "Implemented the reservation backend, built the admin dashboard interface, and styled the customer-facing frontend.",
    githubUrl: "https://github.com/samk1245/hotel-booking",
    status: "Completed",
    metrics: [
      { label: "Console", value: "Private Admin" },
      { label: "Architecture", value: "Node/Express" },
    ],
  },
];

export const timelineData: TimelineItem[] = [
  {
    id: "edu-siet",
    type: "education",
    title: "Bachelor of Technology — Computer Science & Engineering",
    organization: "Shambhunath Institute of Engineering and Technology (SIET)",
    location: "Prayagraj, Uttar Pradesh, India",
    period: "2022 — Expected 2026 (Currently in 3rd Year)",
    description:
      "Undergraduate curriculum covering foundational and advanced computing subjects. Focus on Data Structures, Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), and Web Technologies. Current CGPA: 6.9 / 10.",
    highlights: [
      "Rigorous hands-on practice in C++, Python, and full-stack web architectures",
      "Active participant in technical development, algorithm problem-solving, and AI research",
      "Consistently developing open-source projects addressing real-world community and software needs",
    ],
    skills: ["Data Structures & Algorithms", "C++", "Python", "DBMS", "OOP", "Computer Networks"],
  },
  {
    id: "exp-zaalima",
    type: "experience",
    title: "Web Development Intern",
    organization: "The Zaalima Development",
    location: "Remote / Hybrid",
    period: "Duration: 3 Months",
    description:
      "Developed and maintained full-stack web application features using React.js and Node.js. Built scalable RESTful APIs with Express.js to facilitate seamless communication between frontend and backend services.",
    highlights: [
      "Developed responsive UI features using React.js and Node.js, improving user interaction across the platform",
      "Built and tested RESTful APIs using Express.js, enabling robust and decoupled service communication",
      "Collaborated actively with senior developers to diagnose and resolve bugs, enhancing application stability",
      "Maintained disciplined Git version control, participating in code reviews and clean commit workflows",
      "Containerized development environments with Docker, streamlining local setup and team onboarding",
    ],
    skills: ["React.js", "Node.js", "Express.js", "REST APIs", "Docker", "Git", "Debugging"],
  },
  {
    id: "cert-deloitte",
    type: "certification",
    title: "Data Analytics Job Simulation",
    organization: "Deloitte",
    location: "Online / Forage",
    period: "September 2025",
    description:
      "Completed practical job simulation tasks simulating real-world analytics challenges faced by Deloitte technology consultants.",
    highlights: [
      "Processed and cleansed complex client datasets to uncover strategic operational patterns",
      "Synthesized analytical findings into structured dashboards and executive summaries",
    ],
    skills: ["Data Analytics", "Data Cleaning", "Business Intelligence", "Problem Solving"],
  },
  {
    id: "cert-forage-genai",
    type: "certification",
    title: "Gen-AI Powered Data Analytics Job Simulation",
    organization: "Forage",
    location: "Online",
    period: "2025",
    description:
      "Hands-on simulation leveraging Generative AI techniques to augment data analysis, automated feature insights, and predictive reporting.",
    highlights: [
      "Utilized Gen-AI prompts and workflows to accelerate exploratory data queries",
      "Evaluated AI-assisted data model outputs for accuracy, bias, and business relevance",
    ],
    skills: ["Generative AI", "Data Analytics", "Prompt Engineering", "Predictive Insights"],
  },
  {
    id: "cert-google-cloud",
    type: "certification",
    title: "Google Cloud Computing Foundations",
    organization: "Google Cloud",
    location: "Online",
    period: "2024",
    description:
      "Foundational certification covering cloud architecture, infrastructure basics, serverless computing, and managed cloud databases.",
    highlights: [
      "Gained deep understanding of cloud storage, virtual machines, and container deployment",
      "Practiced cloud security principles and identity management",
    ],
    skills: ["Google Cloud", "Cloud Computing", "Virtual Machines", "Cloud Storage"],
  },
];

export const manualGithubRepos: GithubRepoItem[] = [
  {
    name: "NeedRadar",
    description: "AI-Powered Unmet Needs Intelligence & Community Action Platform",
    language: "TypeScript",
    stars: 12,
    forks: 3,
    url: "https://github.com/samk1245/NeedRadar",
    topics: ["ai-intelligence", "nextjs", "typescript", "civic-tech"],
  },
  {
    name: "EvoCode-AI",
    description: "Autonomous Python-based code optimization and evolutionary algorithm engine",
    language: "Python",
    stars: 15,
    forks: 4,
    url: "https://github.com/samk1245/EvoCode-AI",
    topics: ["python", "ai-agents", "ast-analysis", "code-optimization"],
  },
  {
    name: "shopsphere-multitenant-ecommerce",
    description: "Multi-tenant e-commerce SaaS built with MERN stack & Docker containerization",
    language: "JavaScript",
    stars: 18,
    forks: 5,
    url: "https://github.com/samk1245/shopsphere-multitenant-ecommerce",
    topics: ["mern-stack", "docker", "ecommerce", "multi-tenant", "express"],
  },
  {
    name: "SmartCity-AirGuard-AI-System",
    description: "Environmental telemetry monitoring, AQI forecasting & citizen notification network",
    language: "TypeScript",
    stars: 9,
    forks: 2,
    url: "https://github.com/samk1245/SmartCity-AirGuard-AI-System",
    topics: ["telemetry", "ai-forecasting", "fastapi", "docker"],
  },
  {
    name: "hotel-booking",
    description: "XYZ Hotel - Premium Luxury Hotel Website with Booking Inquiry & Admin Dashboard",
    language: "JavaScript",
    stars: 11,
    forks: 2,
    url: "https://github.com/samk1245/hotel-booking",
    topics: ["hotel-reservation", "admin-dashboard", "nodejs", "mongodb"],
  },
  {
    name: "Gensyn-ai-Rl-Swarm_Guide",
    description: "Step-by-step guide for deploying Gensyn-ai / RL-Swarm distributed compute nodes",
    language: "Markdown",
    stars: 8,
    forks: 2,
    url: "https://github.com/samk1245/Gensyn-ai-Rl-Swarm_Guide",
    topics: ["distributed-ai", "gensyn", "reinforcement-learning"],
  },
];
