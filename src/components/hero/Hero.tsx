'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { GlassCard } from '@/components/ui/GlassCard';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';

const Scene3D = lazy(() => import('@/components/three/Scene').then(m => ({ default: m.Scene3D })));

function Scene3DWrapper() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <Suspense fallback={null}><Scene3D /></Suspense>;
}

interface HeroProps {
  compact?: boolean;
}

export function Hero({ compact }: HeroProps) {
  const { name, tagline, summary, contact, links } = portfolioData;

  // Compact mode: used as mobile welcome strip above sidebar
  if (compact) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-white px-6 py-10 text-center">
        <div className="mx-auto max-w-lg">
          <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-violet-200">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <Typography variant="h3" className="text-gray-900 mb-1">
            {name}
          </Typography>
          <Typography variant="body" className="text-violet-600 text-sm font-medium mb-2">
            {tagline}
          </Typography>
          <Typography variant="caption" className="text-gray-500 block">
            {summary}
          </Typography>
        </div>
      </section>
    );
  }

  // Full hero for desktop main content area (more compact than original)
  return (
    <section id="hero" className="relative">
      <GlassCard className="p-8 md:p-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={fadeInUp}>
            <Typography variant="label" className="inline-block mb-4 text-violet-500 bg-violet-50 px-3 py-1 rounded-full text-xs">
              Overview
            </Typography>
            <Typography variant="h2" className="text-gray-900 mb-3">
              {name}
            </Typography>
            <Typography variant="body" gradient className="text-lg font-medium mb-4">
              {tagline}
            </Typography>
            <Typography variant="body" className="text-gray-600 leading-relaxed max-w-3xl">
              {summary}
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-100"
          >
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500 text-white rounded-full text-sm font-medium hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              Get in Touch
            </a>

            {links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                {link.platform}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </GlassCard>
    </section>
  );
}
