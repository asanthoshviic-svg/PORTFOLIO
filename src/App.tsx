import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { ParallaxBackground } from './components/ParallaxBackground';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AiLabSection } from './components/AiLabSection';
import { JourneySection } from './components/JourneySection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export const App: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07070b] text-gray-100 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Precision Micro-Interaction Custom Cursor */}
      <CustomCursor />

      {/* Top Edge Scroll Progress & Side Timeline */}
      <ScrollProgress />

      {/* Persistent Multi-Layer Parallax Background */}
      <ParallaxBackground />

      {/* Glassmorphic Navigation Header */}
      <Navigation onOpenContact={() => setContactModalOpen(true)} />

      {/* Main Cinematic Scroll Sequence */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 1. HERO (Sticky Camera Zoom & Parallax Transition) */}
        <HeroSection onOpenContact={() => setContactModalOpen(true)} />

        {/* 2. ABOUT (Blur-to-sharp & Staggered Stats Sequence) */}
        <AboutSection />

        {/* 3. TOOLKIT / SKILLS (Depth Layers & Matrix Camera Transition) */}
        <SkillsSection />

        {/* 4. PROJECTS SHOWCASE (Pinned Product Showcase & Layered 3D Depth Transformation) */}
        <ProjectsSection />

        {/* 5. AI PLAYGROUND / ACTIVE LAB (Rotating Neural Orb & Expanding Lab Environment) */}
        <AiLabSection />

        {/* 6. LEARNING JOURNEY (Progressive Draw Timeline with Energy Pulse) */}
        <JourneySection />

        {/* 7. EDUCATION & CREDENTIALS */}
        <EducationSection onOpenContact={() => setContactModalOpen(true)} />

        {/* 8. CONTACT (Typography Reveal & Direct Dispatch Channels) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact & Resume Modal Dialog */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};

export default App;
