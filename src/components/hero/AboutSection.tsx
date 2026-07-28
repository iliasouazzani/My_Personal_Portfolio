'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp, scaleIn } from '@/animations/variants';
import { TextReveal } from '@/animations/gsap';

export function AboutSection() {
  const { summary, languages, contentStats, contact } = portfolioData;

  return (
    <Section
      id="about"
      label="About"
      title="Who I Am"
      subtitle="A multi-disciplinary creator spanning AI systems, content creation, and community impact."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid lg:grid-cols-5 gap-8"
      >
        {/* Main bio */}
        <motion.div variants={fadeInUp} className="lg:col-span-3">
          <GlassCard className="p-8 h-full">
            <TextReveal
              text={summary}
              as="p"
              stagger={0.02}
              duration={0.6}
              className="text-gray-600 leading-relaxed text-base md:text-lg"
            />

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <Typography
                  variant="h3"
                  gradient
                  className="text-2xl font-bold"
                >
                  {contentStats.followers / 1000}K+
                </Typography>
                <Typography variant="caption" className="text-gray-500 mt-1 block">
                  TikTok Followers
                </Typography>
              </div>
              <div className="text-center">
                <Typography
                  variant="h3"
                  gradient
                  className="text-2xl font-bold"
                >
                  {(contentStats.views / 1000000).toFixed(0)}M+
                </Typography>
                <Typography variant="caption" className="text-gray-500 mt-1 block">
                  Total Views
                </Typography>
              </div>
              <div className="text-center">
                <Typography
                  variant="h3"
                  gradient
                  className="text-2xl font-bold"
                >
                  4
                </Typography>
                <Typography variant="caption" className="text-gray-500 mt-1 block">
                  Major Events Volunteered
                </Typography>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick info panels */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
          {/* Languages */}
          <GlassCard className="p-6">
            <Typography
              variant="label"
              className="block mb-4 uppercase tracking-widest text-xs"
            >
              Languages
            </Typography>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between"
                >
                  <Typography
                    variant="body"
                    className="font-medium text-gray-900 text-sm"
                  >
                    {lang.name}
                  </Typography>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100"
                  >
                    {lang.level}
                  </motion.span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Availability */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <Typography
                variant="body"
                className="font-semibold text-gray-900"
              >
                Open to Opportunities
              </Typography>
            </div>
            <Typography variant="body" className="text-sm text-gray-500">
              Available for roles in AI development, content creation, and
              community-focused positions. Based in Rabat, Morocco.
            </Typography>
            <motion.a
              href={`mailto:${contact.email}?subject=Portfolio%20Inquiry`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-violet-500 text-white rounded-full text-sm font-medium hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              Get in Touch
            </motion.a>
          </GlassCard>
        </motion.div>
      </motion.div>
    </Section>
  );
}
