'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';

export function SkillsSection() {
  const technical = portfolioData.skills.filter((s) => s.category === 'technical');
  const soft = portfolioData.skills.filter((s) => s.category === 'soft');

  return (
    <Section
      id="skills"
      label="Skills"
      title="Skills & Abilities"
      subtitle="A blend of technical expertise and interpersonal strengths built across AI, content creation, and community work."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-12"
      >
        {/* Technical Skills */}
        <div>
          <motion.div variants={fadeInUp} className="mb-6">
            <Typography variant="h4" className="text-gray-900 mb-2">
              Technical
            </Typography>
            <Typography variant="caption" className="block">
              Systems, development, and creative tools
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative -mx-6 overflow-hidden px-6 sm:-mx-10 sm:px-10"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div className="flex gap-3 marquee-track">
              {[...technical, ...technical].map((skill, i) => (
                <motion.span
                  key={`${skill.name}-${i}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-block whitespace-nowrap px-4 py-2 rounded-full bg-white/70 border border-violet-100 text-gray-700 text-sm font-medium shadow-sm hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700 transition-all duration-200 cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Soft Skills */}
        <div>
          <motion.div variants={fadeInUp} className="mb-6">
            <Typography variant="h4" className="text-gray-900 mb-2">
              Interpersonal
            </Typography>
            <Typography variant="caption" className="block">
              Communication, teamwork, and adaptability
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {soft.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border border-gray-100 soft-shadow"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-violet-600"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <Typography variant="body" className="text-sm text-gray-700">
                  {skill.name}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
