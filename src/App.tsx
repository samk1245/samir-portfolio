import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { SlideCurtain } from "./components/SlideCurtain";
import { QuickTerminal } from "./components/QuickTerminal";

export default function App() {
  return (
    <div className="relative min-h-screen editorial-grid">
      <Header />
      <main id="main-content" className="relative z-10">
        <Hero />

        <SlideCurtain id="about-section">
          <About />
        </SlideCurtain>

        <SlideCurtain id="experience-section">
          <Experience />
        </SlideCurtain>

        <SlideCurtain id="projects-section">
          <Projects />
        </SlideCurtain>

        <SlideCurtain id="skills-section">
          <Skills />
        </SlideCurtain>

        <SlideCurtain id="education-section">
          <Education />
        </SlideCurtain>

        <SlideCurtain id="certifications-section">
          <Certifications />
        </SlideCurtain>

        <SlideCurtain id="contact-section">
          <Contact />
        </SlideCurtain>
      </main>

      <Footer />
      <QuickTerminal />
    </div>
  );
}
