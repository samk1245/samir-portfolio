export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  projectType: string;
  description: string;
  techStack: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string;
  images: {
    stackedTop: string;
    stackedBottom: string;
    tallRight: string;
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export const personalInfo = {
  name: "Samir Khan",
  firstName: "Samir",
  title: "Full-Stack Developer | AI/ML Enthusiast | Computer Science Engineering Student",
  heroHeading: "Hi, I'm Samir",
  heroDescription:
    "Computer science engineer passionate about building intelligent applications, scalable digital products, and innovative AI-powered solutions.",
  aboutParagraph:
    "I'm Samir Khan, a third-year Computer Science and Engineering student at Shambhunath Institute of Engineering and Technology, Prayagraj. I'm passionate about full-stack development, backend engineering, artificial intelligence, and machine learning. I enjoy transforming ideas into practical digital solutions by combining programming, modern web technologies, and intelligent systems. Through academic learning, internships, personal projects, and industry simulations, I'm continuously developing my technical and problem-solving abilities. My goal is to build scalable software products and contribute to innovative technology-driven companies.",
  email: "samir4khan555@gmail.com",
  phone: "+91-7887087151",
  location: "Prayagraj, Uttar Pradesh, India",
  college: "Shambhunath Institute of Engineering and Technology, Prayagraj",
  degree: "B.Tech in Computer Science & Engineering",
  academicStatus: "Third-Year Student",
  cgpa: "6.5/10",
  careerGoal:
    "Seeking software development, full-stack development, backend development, and AI/ML internship opportunities.",
  linkedin: "https://linkedin.com/in/samir-khan-59ss",
  github: "https://github.com/samk1245",
  portraitUrl: "/images/samir-suit.jpg",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Price", href: "#services" }, // Price maps to Services section as requested
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }, // Contact maps to Contact section / footer
];

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Building responsive and scalable web applications using React.js, Node.js, Express.js, and MongoDB. Developing complete frontend and backend solutions with clean architecture.",
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Creating RESTful APIs, server-side applications, database integrations, and backend systems using Node.js, Express.js, Python, and FastAPI.",
  },
  {
    number: "03",
    title: "AI & Machine Learning",
    description:
      "Developing intelligent applications and exploring AI/ML solutions using Python, data processing, machine learning concepts, and generative AI technologies.",
  },
  {
    number: "04",
    title: "Data Analytics",
    description:
      "Working with structured datasets, Python-based data processing, data cleaning, analytical workflows, and visualization to extract meaningful insights.",
  },
  {
    number: "05",
    title: "Modern Web Technologies",
    description:
      "Creating responsive and interactive web experiences using HTML, CSS, JavaScript, React.js, and modern development tools.",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "smartcity-airguard",
    number: "01",
    title: "Smart City AirGuard AI System",
    category: "AI / Machine Learning / Data Analytics",
    projectType: "Personal Project",
    description:
      "An intelligent air quality monitoring and pollution prediction system designed to analyze historical pollution data, predict future air quality conditions, and provide location-based pollution insights.",
    techStack: ["Python", "Pandas", "Scikit-learn", "FastAPI"],
    keyFeatures: [
      "Historical air pollution analysis",
      "Air quality prediction",
      "Location-based pollution monitoring",
      "Data visualization",
      "Pollution alerts and insights",
    ],
    githubUrl: "https://github.com/samk1245/SmartCity-AirGuard-AI-System",
    images: {
      stackedTop:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=80",
      stackedBottom:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      tallRight:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
    },
  },
  {
    id: "need-radar",
    number: "02",
    title: "NeedRadar",
    category: "Data Analytics / Intelligent Systems",
    projectType: "Personal Project",
    description:
      "An intelligent platform designed to identify clusters of unmet needs and visualize areas where demand or essential services may be lacking. The project focuses on discovering patterns from data and mapping potential opportunities.",
    techStack: ["Python", "FastAPI", "TypeScript", "React", "Data Analytics"],
    keyFeatures: [
      "Identification of unmet needs",
      "Cluster-based analysis",
      "Geographic visualization",
      "Data-driven insights",
      "Opportunity mapping",
    ],
    githubUrl: "https://github.com/samk1245/NeedRadar",
    images: {
      stackedTop:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80",
      stackedBottom:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80",
      tallRight:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    },
  },
  {
    id: "shopsphere-ecommerce",
    number: "03",
    title: "Full-Stack Web Application",
    category: "Full-Stack Development",
    projectType: "Personal Project",
    description:
      "A scalable full-stack web application built with a modular backend architecture, RESTful APIs, and database integration. Designed to provide structured data management and consistent application behavior across development and production environments.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Docker"],
    keyFeatures: [
      "Modular backend architecture",
      "RESTful API development",
      "MongoDB database integration",
      "Efficient data storage and retrieval",
      "Dockerized development environment",
    ],
    githubUrl: "https://github.com/samk1245/shopsphere-multitenant-ecommerce",
    images: {
      stackedTop:
        "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80",
      stackedBottom:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      tallRight:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
  },
];

export const marqueeImages = [
  // 21 curated high-definition 3D & tech visual cards
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
];

export const experienceInfo = {
  company: "The Zaalima Development",
  role: "Web Development Intern",
  duration: "3 Months",
  responsibilities: [
    "Developed and maintained responsive web application features using React.js and Node.js.",
    "Built and tested RESTful APIs using Express.js.",
    "Collaborated with the development team to debug and resolve application issues.",
    "Used Git for version control and maintained clean commit history.",
    "Containerized development environments using Docker.",
    "Contributed to improving application stability and development workflows.",
  ],
};

export const technicalSkills = {
  languages: ["C", "C++", "Python", "JavaScript", "HTML", "CSS"],
  web: ["React.js", "Node.js", "Express.js", "FastAPI"],
  databases: ["MongoDB"],
  tools: ["Docker", "Linux", "Git", "Jupyter Notebook"],
  coreConcepts: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
  ],
  interests: [
    "Backend Development",
    "Machine Learning",
    "Data Analytics",
    "AI Engineering",
  ],
};

export const certifications = [
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
    date: "",
  },
];
