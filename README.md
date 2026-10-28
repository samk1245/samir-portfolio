# Samir — Premium Next-Generation Developer Portfolio

A production-ready, ultra-premium personal portfolio engineered for high impact, responsiveness, and performance. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, and high-performance interactive Canvas visual systems.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?style=flat-square)

---

## ⚡ Key Highlights & Features

- **Architectural Aesthetic**: Deep midnight/charcoal theme with electric cyan, violet, and cobalt glow accents. Editorial-grade typography and balanced whitespace.
- **Interactive 3D / Particle Hero**: Lightweight 60 FPS Canvas constellation hero scene with mouse attraction physics, automatic viewport pause, and `prefers-reduced-motion` compliance.
- **Command Palette (`Ctrl / Cmd + K`)**: Instant keyboard navigation across all portfolio sections, quick actions (resume download, copy email, toggle theme), and project search.
- **Interactive Terminal Engine**: Press `` ` `` (backtick) or click the terminal icon to access a UNIX-inspired safe shell (`help`, `about`, `skills`, `projects`, `contact`, `whoami`, `sudo`).
- **Deep Dive Project Showcase & Modals**: Filterable bento grid with architecture highlights, problem/solution analysis, metrics, direct code, and live demo links.
- **Enterprise Contact API (`/api/contact`)**:
  - Client-side & server-side validation.
  - In-memory sliding-window IP rate limiting (anti-abuse).
  - Invisible honeypot spam protection.
  - Resend API integration support with graceful unconfigured fallback.
- **Zero Hydration Mismatch & Dual Theme**: Dark and light themes with smooth transitions.
- **Custom Desktop Cursor**: Precision follower with hover states; automatically disabled on touch devices.

---

## 📁 Project Architecture

```
samir-portfolio/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # Server-side validation, rate limiting, Resend integration
│   │   └── github/route.ts       # GitHub API sync with curated fallback
│   ├── globals.css               # Design system tokens, glassmorphism, glowing borders
│   ├── layout.tsx                # SEO metadata, OpenGraph, ThemeProvider, Cursor
│   ├── not-found.tsx             # Custom high-tech 404 page
│   └── page.tsx                  # Main portfolio experience
├── components/
│   ├── animations/
│   │   └── HeroConstellation.tsx # 60 FPS interactive particle canvas
│   ├── layout/
│   │   ├── Navbar.tsx            # Floating glass navigation with scroll tracking
│   │   └── Footer.tsx            # Footer with status indicator & back-to-top
│   ├── projects/
│   │   └── ProjectModal.tsx      # Comprehensive architecture modal
│   ├── sections/
│   │   ├── HeroSection.tsx       # Availability badge, animated specialties, CTAs
│   │   ├── AboutSection.tsx      # Verified stats count-up, engineering ethos
│   │   ├── SkillsSection.tsx     # 8 categorized skill groups with live search
│   │   ├── ProjectsSection.tsx   # Bento grid showcase with category filtering
│   │   ├── ExperienceSection.tsx # Chronological education & milestone timeline
│   │   ├── GithubSection.tsx     # Verified repositories and open-source code
│   │   └── ContactSection.tsx    # Accessible contact form with validation & copy actions
│   └── ui/
│       ├── CommandPalette.tsx    # Cmd+K fuzzy navigation
│       ├── CustomCursor.tsx      # Desktop magnetic cursor follower
│       ├── InteractiveTerminal.tsx # UNIX shell simulator
│       ├── ScrollProgress.tsx    # Top scroll progress indicator
│       └── ThemeProvider.tsx     # Theme context & storage
├── data/
│   └── portfolio.ts              # Single source of truth for all portfolio data
├── lib/
│   ├── utils.ts                  # Tailwind clsx/twMerge helper
│   └── validation/
│       └── contact.ts            # Client & server validation schemas
├── public/
│   └── resume.pdf                # Resume document
└── types/
    └── portfolio.ts              # Strict TypeScript interfaces
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18.0 or newer
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd "samir portfolio"

# Install dependencies
npm install
```

### 3. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

Configure any desired environment variables:
- `RESEND_API_KEY`: Get a free key at [resend.com](https://resend.com) for real email forwarding.
- `CONTACT_EMAIL`: Recipient email (default: `samir.dev@example.com`).
- `ALLOW_DEMO_SUBMISSIONS`: Set to `true` to test form submissions locally without an external email provider.

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the portfolio.

---

## 🛠️ Customizing Your Content

All personal information, projects, statistics, and skills are maintained in a single configuration file:
👉 **`data/portfolio.ts`**

Simply update `personalInfo`, `verifiedStats`, `skillCategories`, `projectsData`, or `timelineData` to reflect your specific credentials.

---

## 🚢 Building & Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import your project into [Vercel](https://vercel.com).
3. Under Environment Variables, add `RESEND_API_KEY` (if using live email delivery).
4. Click **Deploy**.
