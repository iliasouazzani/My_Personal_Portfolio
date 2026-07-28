'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { GlassCard } from '@/components/ui/GlassCard';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import { TextReveal, ScrollReveal } from '@/animations/gsap';

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

interface HeroProps {
  compact?: boolean;
}

export function Hero({ compact }: HeroProps) {
  const { name, tagline, summary, contact } = portfolioData;

  // Compact mode: used as mobile welcome strip above sidebar
  if (compact) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-violet-50/80 via-white to-transparent px-6 py-10 text-center"
      >
        {/* Mini mesh gradient blobs */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(109,74,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(200,180,255,0.1) 0%, transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-xs">
          {/* Avatar */}
          <div className="mx-auto mb-4 h-20 w-20 rounded-full overflow-hidden ring-2 ring-violet-200">
            <img
              src="/images/profile.png"
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <Typography variant="h3" className="text-gray-900 mb-1">
            {name}
          </Typography>
          <Typography
            variant="body"
            gradient
            className="text-sm font-medium mb-2"
          >
            {tagline}
          </Typography>
          <Typography variant="caption" className="text-gray-500 block">
            {summary.length > 120 ? `${summary.slice(0, 120)}...` : summary}
          </Typography>
        </div>
      </motion.section>
    );
  }

  // Full hero for desktop main content area
  return (
    <section id="hero" className="relative">
      <GlassCard className="relative overflow-hidden p-8 md:p-10 lg:p-12">
        {/* Inner gradient accent */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(109,74,255,0.2) 0%, transparent 70%)',
          }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block mb-4 text-violet-500 bg-violet-50/80 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
              Overview
            </span>

            <TextReveal
              text={name}
              as="h2"
              className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3"
              stagger={0.03}
              duration={0.8}
            />

            <Typography
              variant="body"
              gradient
              className="text-lg md:text-xl font-medium mb-4"
            >
              {tagline}
            </Typography>

            <Typography
              variant="body"
              className="text-gray-600 leading-relaxed max-w-3xl"
            >
              {summary}
            </Typography>
          </motion.div>

          {/* CTA and quick stats */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-100"
          >
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-full text-sm font-medium hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
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

            {/* Quick availability badge */}
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Opportunities
            </span>
          </motion.div>
        </motion.div>
      </GlassCard>
    </section>
  );
}
