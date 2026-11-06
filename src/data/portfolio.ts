export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Full-Stack" | "Backend" | "AI/ML" | "Data & Systems";
  image: string;
  tags: string[];
  description: string;
  problem: string;
  solution: string;
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "Completed" | "Production-Ready" | "In Development" | "Details coming soon";
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: { name: string; tag?: string }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  status: string;
  academicYear: string;
  cgpa: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  badgeColor: string;
}

export const personalInfo = {
  name: "Samir Khan",
  title: "Full-Stack Developer | Backend Developer | AI/ML Enthusiast",
  headline: "HEY, I'M SAMIR.",
  supportingHeadline: "I BUILD DIGITAL THINGS THAT ACTUALLY WORK.",
  shortBio: "Building things for the web. Exploring what's next in AI.",
  introduction:
    "I'm Samir Khan, a Computer Science Engineering student passionate about building scalable web applications, developing reliable backend systems and exploring the possibilities of AI and machine learning. I enjoy turning complex problems into practical digital products through clean code, thoughtful engineering and creative problem-solving.",
  email: "samir4khan555@gmail.com",
  phone: "+91-7887087151",
  location: "Prayagraj, Uttar Pradesh, India",
  availabilityStatus: "Available for opportunities",
  linkedin: "https://linkedin.com/in/samir-khan-59ss",
  github: "https://github.com/samk1245",
  college: "Shambhunath Institute of Engineering and Technology, Prayagraj",
  degree: "B.Tech — Computer Science and Engineering",
  academicStatus: "Currently in 3rd Year",
  cgpa: "6.9/10",
  resumeUrl: "/resume.pdf",
};

export const aboutHighlights = [
  {
    number: "01",
    title: "3rd Year CS Student",
    subtitle: "SIET Prayagraj (2022–2026)",
    description: "Solid theoretical foundation in DSA, OOP, DBMS, and operating system principles.",
  },
  {
    number: "02",
    title: "3 Months Internship",
    subtitle: "The Zaalima Development",
    description: "Full-stack development building reactive interfaces, REST APIs, and Docker workflows.",
  },
  {
    number: "03",
    title: "Full-Stack & AI/ML",
    subtitle: "Modern Engineering Stack",
    description: "Passionate about combining robust backend architectures with applied AI agents and machine learning pipelines.",
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "zaalima-internship",
    company: "The Zaalima Development",
    position: "Web Development Intern",
    period: "3 Months",
    duration: "3 Months",
    location: "Remote / Hybrid",
    type: "Internship",
    responsibilities: [
      "Developed and maintained responsive web application features using React.js and Node.js.",
      "Built and tested RESTful APIs using Express.js for seamless client-server communication.",
      "Collaborated with the development team to debug and resolve application issues and edge cases.",
      "Used Git for version control and participated in active code reviews to maintain clean code quality.",
      "Containerized development environments using Docker to ensure seamless environment parity across team members.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Docker", "Git"],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "shopsphere-ecommerce",
    number: "01",
    title: "ShopSphere — Multi-Tenant E-Commerce SaaS",
    subtitle: "Full-Stack Web Application",
    tagline: "Scalable MERN multi-tenant e-commerce platform with Dockerized containerization",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Docker"],
    description:
      "Designed and developed a scalable full-stack web application with a modular backend architecture, RESTful API endpoints and MongoDB integration.",
    problem:
      "Independent merchants require isolated store data, customized catalogues, and independent checkout flows without bearing enterprise hosting overhead.",
    solution:
      "Built a modular multi-tenant web application separating tenant schemas in MongoDB, protected by role-based JWT authentication and fully containerized with Docker.",
    features: [
      "Modular backend architecture with tenant isolation middleware",
      "RESTful API development for catalogs, carts, and order processing",
      "Database integration with optimized MongoDB indexing and schemas",
      "Dockerized development and deployment pipeline for dev-to-prod parity",
      "Responsive frontend single-page application with modern UI feedback",
    ],
    githubUrl: "https://github.com/samk1245/shopsphere-multitenant-ecommerce",
    status: "Completed",
    metrics: [
      { label: "Architecture", value: "Modular MERN" },
      { label: "Deployment", value: "Docker Compose" },
      { label: "Tenants", value: "Isolated Schemas" },
    ],
  },
  {
    id: "smartcity-airguard",
    number: "02",
    title: "SmartCity AirGuard — Environmental Telemetry AI",
    subtitle: "Data Analytics Dashboard",
    tagline: "IoT air quality monitoring, predictive analytics, and lightweight API network",
    category: "Data & Systems",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "FastAPI", "Jupyter Notebook", "Pandas", "Data Analytics"],
    description:
      "Built a data processing pipeline to clean, analyze and visualize structured datasets, supported by a lightweight FastAPI backend.",
    problem:
      "Urban municipal sensors generate noisy, raw time-series data without automated outlier filtration or lightweight citizen alert delivery.",
    solution:
      "Engineered an environmental analytics pipeline in Python and Jupyter Notebook that aggregates particulate data, performs regression forecasts, and streams clean metrics via FastAPI.",
    features: [
      "Data cleaning and time-series normalization in Jupyter Notebook",
      "Data analysis detecting statistical outliers and atmospheric shifts",
      "Data visualization displaying Air Quality Index (AQI) trends",
      "API-based analytics integration with sub-40ms FastAPI endpoints",
      "Actionable insights providing early citizen air quality warnings",
    ],
    githubUrl: "https://github.com/samk1245/SmartCity-AirGuard-AI-System",
    status: "Completed",
    metrics: [
      { label: "Latency", value: "< 40ms FastAPI" },
      { label: "Pipeline", value: "Python + Pandas" },
      { label: "Accuracy", value: "Normalized AQI" },
    ],
  },
  {
    id: "need-radar",
    number: "03",
    title: "NeedRadar — Civic Unmet Needs Intelligence",
    subtitle: "AI/ML Intelligence Platform",
    tagline: "Natural language categorization engine scoring civic urgency and community action",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "TypeScript", "FastAPI", "AI Intelligence", "Next.js"],
    description:
      "AI platform synthesizing unstructured civic feedback, scoring unmet community urgency, and visualizing geographic cluster density.",
    problem:
      "Community organizations struggle to synthesize public requests, delaying response times to critical local needs.",
    solution:
      "Built an NLP categorization pipeline that extracts entity urgency scores, routes civic alerts, and displays trend clusters.",
    features: [
      "Natural language extraction pipeline for civic reports",
      "Urgency priority matrix based on severity and cluster volume",
      "Real-time RESTful ingestion API structured with FastAPI",
      "Interactive analytics dashboard providing trend alerts",
    ],
    githubUrl: "https://github.com/samk1245/NeedRadar",
    status: "Production-Ready",
    metrics: [
      { label: "Ingestion", value: "Real-time" },
      { label: "Scoring", value: "Urgency Matrix" },
    ],
  },
  {
    id: "evocode-ai",
    number: "04",
    title: "EvoCode-AI — Evolutionary Code Engine",
    subtitle: "AI/ML Code Optimization",
    tagline: "Autonomous Python-based code optimization and AST evolutionary engine",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "AST Analysis", "Algorithms", "Machine Learning"],
    description:
      "Python platform that parses syntax trees, analyzes execution complexity, and synthesizes higher-performance algorithmic refactorings.",
    problem:
      "Developers spend repetitive manual hours profiling algorithmic bottlenecks and generating optimized variants of computationally heavy code routines.",
    solution:
      "Constructed an AST mutation analyzer that benchmarks code variations against baseline test suites to ensure zero syntactic regression.",
    features: [
      "Abstract Syntax Tree (AST) analysis for syntactic safety verification",
      "Automated benchmark harness verifying execution time delta against baseline",
      "Modular agentic loop iteratively optimizing loop structures and memory allocation",
    ],
    githubUrl: "https://github.com/samk1245/EvoCode-AI",
    status: "Completed",
    metrics: [
      { label: "Safety", value: "AST Verified" },
      { label: "Runtime", value: "Python 3.11" },
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    description: "Strong foundation in procedural, object-oriented, and dynamic programming.",
    skills: [
      { name: "C", tag: "Procedural & Memory" },
      { name: "C++", tag: "OOP & Algorithms" },
      { name: "Python", tag: "FastAPI & AI/Data" },
      { name: "JavaScript", tag: "Modern ES6+ Async" },
      { name: "HTML", tag: "Semantic Markup" },
      { name: "CSS", tag: "Modern Layouts" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Crafting responsive, accessible, high-performance user interfaces.",
    skills: [
      { name: "React.js", tag: "Hooks & Component Architecture" },
      { name: "HTML", tag: "Accessibility & Semantics" },
      { name: "CSS", tag: "Flexbox, Grid & Modern Styling" },
      { name: "JavaScript", tag: "DOM & Reactive State" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Building reliable REST APIs, microservices, and server applications.",
    skills: [
      { name: "Node.js", tag: "Runtime & Asynchronous IO" },
      { name: "Express.js", tag: "REST API Architecture & Middleware" },
      { name: "FastAPI", tag: "High-Performance Python Endpoints" },
    ],
  },
  {
    id: "database",
    title: "Database Management",
    description: "Data modeling, schema design, and query optimization.",
    skills: [
      { name: "MongoDB", tag: "Document Stores, Mongoose & Aggregations" },
    ],
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    description: "Containerization, developer tooling, and version control.",
    skills: [
      { name: "Docker", tag: "Containerization & Parity" },
      { name: "Linux", tag: "CLI & System Fundamentals" },
      { name: "Git", tag: "Version Control & Branching" },
      { name: "Jupyter Notebook", tag: "Data Prototyping & Analysis" },
    ],
  },
  {
    id: "core-concepts",
    title: "Computer Science Fundamentals",
    description: "Rigorous academic and practical engineering foundations.",
    skills: [
      { name: "Data Structures and Algorithms", tag: "Trees, Graphs, Sorting & Search" },
      { name: "Object-Oriented Programming", tag: "Encapsulation, Inheritance, Polymorphism" },
      { name: "DBMS", tag: "Relational Concepts & Normalization" },
    ],
  },
  {
    id: "areas-of-interest",
    title: "Specialized Areas of Interest",
    description: "Continuous exploration into advanced engineering domains.",
    skills: [
      { name: "Backend Development", tag: "Distributed Systems & Scalability" },
      { name: "Machine Learning", tag: "Supervised Learning & Model Evaluation" },
      { name: "Data Analytics", tag: "Cleaning, Feature Engineering & Viz" },
      { name: "AI Engineering", tag: "LLMs, Vector Search & Autonomous Agents" },
    ],
  },
];

export const educationData: EducationItem = {
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Science and Engineering",
  institution: "Shambhunath Institute of Engineering and Technology, Prayagraj",
  location: "Prayagraj, Uttar Pradesh",
  status: "Currently enrolled",
  academicYear: "3rd Year (Class of 2026)",
  cgpa: "6.9/10",
  highlights: [
    "Core coursework in Data Structures, Algorithms, DBMS, Operating Systems, and Object-Oriented Software Design.",
    "Active participant in technical coding challenges and full-stack project building.",
    "Developing real-world platforms combining MERN stack with machine learning APIs.",
  ],
};

export const certificationsData: CertificationItem[] = [
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    date: "September 2025",
    skills: ["Data Analysis", "Statistical Modeling", "Business Intelligence", "Problem Solving"],
    badgeColor: "#2F4BF0",
  },
  {
    title: "Gen-AI Powered Data Analytics Job Simulation",
    issuer: "Forage",
    date: "2025",
    skills: ["Generative AI", "Data Synthesis", "Automated Analytics", "Prompt Engineering"],
    badgeColor: "#F2B31B",
  },
  {
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud",
    date: "2024",
    skills: ["Cloud Architecture", "GCP Core Services", "Networking & Storage", "Virtualization"],
    badgeColor: "#34A853",
  },
];
