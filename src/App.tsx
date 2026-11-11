import React from "react";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#0C0C0C] text-white selection:bg-white selection:text-black font-['Kanit',sans-serif]">
      {/* 1. HeroSection */}
      <HeroSection />

      {/* 2. MarqueeSection */}
      <MarqueeSection />

      {/* 3. AboutSection */}
      <AboutSection />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. ProjectsSection */}
      <ProjectsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
