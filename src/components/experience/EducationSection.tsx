'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';

export function EducationSection() {
  const { education } = portfolioData;

  return (
    <Section
      id="education"
      label="Education"
      title="Academic Background"
      subtitle=""
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-6"
      >
        {education.map((edu, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-violet-600"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <Typography variant="body" className="font-semibold text-gray-900">
                    {edu.degree}
                  </Typography>
                  {edu.institution && (
                    <Typography variant="body" className="text-gray-500 mt-1">
                      {edu.institution}
                    </Typography>
                  )}
                  <Typography variant="caption" className="block mt-1 text-violet-500">
                    {edu.period}
                  </Typography>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
