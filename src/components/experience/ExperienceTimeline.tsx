'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInLeft, fadeInRight } from '@/animations/variants';

const typeLabels: Record<string, string> = {
  internship: 'Internship',
  hackathon: 'Hackathon',
  freelance: 'Freelance',
  volunteering: 'Volunteering',
};

const typeColors: Record<string, string> = {
  internship: 'bg-violet-100 text-violet-600',
  hackathon: 'bg-blue-100 text-blue-600',
  freelance: 'bg-emerald-100 text-emerald-600',
  volunteering: 'bg-amber-100 text-amber-600',
};

export function ExperienceTimeline() {
  const { experiences } = portfolioData;

  return (
    <Section
      id="experience"
      label="Experience"
      title="Professional Journey"
      subtitle="A diverse path spanning AI systems, hackathons, content creation, and event volunteering."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative space-y-12 md:space-y-16"
      >
        {/* Timeline line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-200 via-violet-100 to-transparent hidden md:block" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
            className="relative md:pl-16 group"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 hidden md:flex items-center justify-center">
              <div className="w-[14px] h-[14px] rounded-full border-2 border-violet-300 bg-white group-hover:bg-violet-400 group-hover:border-violet-500 transition-all duration-300 shadow-sm" />
            </div>

            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${typeColors[exp.type] || 'bg-gray-100 text-gray-600'}`}>
                      {typeLabels[exp.type] || exp.type}
                    </span>
                    <Typography variant="caption">
                      {exp.period}
                    </Typography>
                  </div>
                  <Typography variant="h4" className="text-gray-900">
                    {exp.title}
                  </Typography>
                  {exp.subtitle && (
                    <Typography variant="body" className="text-gray-500 mt-1">
                      {exp.subtitle}
                    </Typography>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="mt-2 h-1 w-1 min-w-[4px] rounded-full bg-violet-400" />
                    <Typography variant="body" className="text-sm md:text-base">
                      {desc}
                    </Typography>
                  </li>
                ))}
              </ul>

              {exp.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
