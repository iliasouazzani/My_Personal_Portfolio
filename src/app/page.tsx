'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Hero } from '@/components/hero/Hero';
import { AboutSection } from '@/components/hero/AboutSection';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';
import { EducationSection } from '@/components/experience/EducationSection';
import { ProjectsShowcase } from '@/components/projects/ProjectsShowcase';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ContentShowcase } from '@/components/content/ContentShowcase';
import { VolunteeringSection } from '@/components/volunteering/VolunteeringSection';
import { GallerySection } from '@/components/gallery/GallerySection';
import { ContactSection } from '@/components/contact/ContactSection';
import { FloatingAIAssistant } from '@/components/ui/FloatingAIAssistant';
import { staggerContainer, fadeInUp } from '@/animations/variants';

const Scene3D = lazy(() =>
  import('@/components/three/Scene').then((m) => ({ default: m.Scene3D }))
);

function Scene3DWrapper() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <Scene3D />
    </Suspense>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* 3D Scene Background - behind everything */}
      <Scene3DWrapper />

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />

      {/* Mobile Hero - visible only on small screens, before sidebar */}
      <div className="lg:hidden">
        <Hero compact />
      </div>

      <div className="relative z-10 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - on the left, outside max-w-7xl */}
          <aside className="w-full lg:w-80 xl:w-[22rem] lg:flex-shrink-0 lg:ml-16 xl:ml-24">
            <div className="lg:sticky lg:top-10 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto custom-scrollbar">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Sidebar />
              </motion.div>
            </div>
          </aside>

          {/* Main Content - centered in remaining space */}
          <main className="flex-1 min-w-0 max-w-5xl mx-auto px-4 sm:px-6 lg:pr-8 xl:pr-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6 md:space-y-8"
            >
              <Hero />
              <AboutSection />
              <ExperienceTimeline />
              <EducationSection />
              <ProjectsShowcase />
              <ContentShowcase />
              <SkillsSection />
              <VolunteeringSection />
              <GallerySection />
              <ContactSection />
            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
