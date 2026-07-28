'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { portfolioData, projects } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import { ScrollReveal } from '@/animations/gsap';

export function ProjectsShowcase() {
  return (
    <Section
      id="projects"
      label="Projects"
      title="Key Projects"
      subtitle="Projects that showcase technical range, from AI-powered e-commerce to social impact hackathons."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeInUp}>
            <Card tilt glare className="p-6 md:p-8 h-full flex flex-col">
              <div className="flex-1">
                <Typography
                  variant="label"
                  className="text-violet-500 mb-2 inline-block"
                >
                  {project.subtitle}
                </Typography>
                <Typography variant="h4" className="text-gray-900 mb-3">
                  {project.title}
                </Typography>
                <Typography variant="body" className="text-gray-600 mb-4">
                  {project.description}
                </Typography>

                <ul className="space-y-2 mb-4">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 min-w-[6px] rounded-full bg-violet-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-violet-50 border border-violet-100 text-sm font-medium text-violet-700 hover:bg-violet-100 hover:border-violet-200 transition-all group/link"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      View on GitHub
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform group-hover/link:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
