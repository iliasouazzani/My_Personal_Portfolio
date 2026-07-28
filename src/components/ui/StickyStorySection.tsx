'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StoryPanel {
  title: string;
  subtitle: string;
  content: string;
  gradient: string;
  icon?: React.ReactNode;
}

interface StickyStorySectionProps {
  panels: StoryPanel[];
  id?: string;
}

export function StickyStorySection({ panels, id }: StickyStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  if (reducedMotion) {
    return (
      <section id={id} className="py-16 space-y-8">
        {panels.map((panel, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 bg-white/60 backdrop-blur-sm border border-white/60 soft-shadow-lg"
            style={{ background: panel.gradient }}
          >
            <span className="text-violet-500 text-xs font-medium uppercase tracking-wider">
              {panel.subtitle}
            </span>
            <Typography variant="h3" className="text-gray-900 mt-2 mb-4">
              {panel.title}
            </Typography>
            <Typography variant="body" className="text-gray-600">
              {panel.content}
            </Typography>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id={id} ref={containerRef} className="relative">
      <div className="relative">
        {panels.map((panel, i) => {
          const start = i / panels.length;
          const end = (i + 1) / panels.length;

          const opacity = useTransform(
            scrollYProgress,
            [start, start + 0.1, end - 0.1, end],
            [0, 1, 1, 0]
          );

          const y = useTransform(
            scrollYProgress,
            [start, end],
            [60, -60]
          );

          const scale = useTransform(
            scrollYProgress,
            [start, start + 0.1, end - 0.1, end],
            [0.95, 1, 1, 0.95]
          );

          return (
            <motion.div
              key={i}
              style={{ opacity, y, scale }}
              className="sticky top-24 mb-4 last:mb-0"
            >
              <div
                className="rounded-2xl p-8 md:p-10 backdrop-blur-sm border border-white/60 soft-shadow-lg overflow-hidden"
                style={{ background: panel.gradient }}
              >
                {/* Inner glow */}
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(109,74,255,0.15) 0%, transparent 70%)',
                  }}
                />

                <div className="relative">
                  <span className="inline-block text-violet-500 text-xs font-medium uppercase tracking-wider mb-2 bg-violet-50/50 px-3 py-1 rounded-full">
                    {panel.subtitle}
                  </span>
                  <div className="flex items-start gap-4 mt-3">
                    {panel.icon && (
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-violet-100/50 flex items-center justify-center">
                        {panel.icon}
                      </div>
                    )}
                    <div>
                      <Typography variant="h3" className="text-gray-900 mb-3">
                        {panel.title}
                      </Typography>
                      <Typography variant="body" className="text-gray-600 leading-relaxed max-w-2xl">
                        {panel.content}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
