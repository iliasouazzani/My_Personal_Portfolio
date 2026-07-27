import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
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
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Mobile Hero — visible only on small screens, before sidebar */}
      <div className="lg:hidden">
        <Hero compact />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — profile card, sticky on desktop */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-10">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content — scrollable sections */}
          <main className="flex-1 min-w-0 space-y-8">
            <Hero />
            <ExperienceTimeline />
            <EducationSection />
            <ProjectsShowcase />
            <ContentShowcase />
            <SkillsSection />
            <VolunteeringSection />
            <ContactSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
