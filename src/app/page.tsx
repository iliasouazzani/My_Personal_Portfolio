import { Navigation } from '@/components/layout/Navigation';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';
import { EducationSection } from '@/components/experience/EducationSection';
import { ProjectsShowcase } from '@/components/projects/ProjectsShowcase';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ContentShowcase } from '@/components/content/ContentShowcase';
import { VolunteeringSection } from '@/components/volunteering/VolunteeringSection';
import { ContactSection } from '@/components/contact/ContactSection';

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <Hero />
        <ExperienceTimeline />
        <EducationSection />
        <ProjectsShowcase />
        <ContentShowcase />
        <SkillsSection />
        <VolunteeringSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
