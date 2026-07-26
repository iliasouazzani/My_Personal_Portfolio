'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';

const Scene3D = lazy(() => import('@/components/three/Scene').then(m => ({ default: m.Scene3D })));

function Scene3DWrapper() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <Suspense fallback={null}><Scene3D /></Suspense>;
}

export function Hero() {
  const { name, tagline, summary, contact, links } = portfolioData;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 mesh-gradient" />
      <Scene3DWrapper />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 lg:px-12 pt-24 pb-16 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Name */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Typography
              variant="label"
              className="inline-block mb-6 text-violet-500 bg-violet-50 px-4 py-1.5 rounded-full"
            >
              Portfolio
            </Typography>
            <Typography
              variant="h1"
              className="text-gray-900 mb-4"
            >
              {name}
            </Typography>
            <Typography
              variant="h4"
              gradient
              className="mb-6"
            >
              {tagline}
            </Typography>
            <Typography
              variant="body"
              className="max-w-2xl mx-auto text-gray-600"
            >
              {summary}
            </Typography>
          </motion.div>

          {/* Contact & Links */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-full font-medium hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              Get in Touch
            </a>

            <a
              href={links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-white hover:border-gray-300 transition-all soft-shadow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>

            <a
              href={links[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-white hover:border-gray-300 transition-all soft-shadow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              TikTok
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                Scroll
              </span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-gray-300">
                <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="2" />
                <motion.circle
                  cx="8" cy="8" r="2" fill="currentColor"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
