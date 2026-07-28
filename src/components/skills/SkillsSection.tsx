'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp, scaleIn } from '@/animations/variants';
import { ScrollReveal } from '@/animations/gsap';
import { useMousePosition } from '@/hooks/useMousePosition';

export function SkillsSection() {
  const technical = portfolioData.skills.filter((s) => s.category === 'technical');
  const soft = portfolioData.skills.filter((s) => s.category === 'soft');

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [0, 1], [2, -2]);
  const rotateY = useTransform(springX, [0, 1], [-2, 2]);

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
        {/* Technical Skills - Interactive Galaxy */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <Typography variant="h4" className="text-gray-900">
                Technical
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Systems, development, and creative tools
              </Typography>
            </div>
          </div>

          {/* Categorized skill cloud */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {technical.map((skill, i) => {
              const isHighlight = [
                'Linux (Ubuntu) System Configuration',
                'AI Agent Setup & Configuration (OpenClaw)',
                'NLP-Based Chatbot Development',
                'Python',
                'Video Editing',
              ].includes(skill.name);

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: i * 0.03,
                      duration: 0.4,
                      ease: 'easeOut',
                    },
                  }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl p-4 h-full border transition-all duration-300 ${
                      isHighlight
                        ? 'bg-gradient-to-br from-violet-50 to-white border-violet-200 shadow-md shadow-violet-500/10'
                        : 'bg-white/60 border-gray-100 soft-shadow hover:border-violet-200 hover:bg-violet-50/30'
                    }`}
                  >
                    {/* Accent dot */}
                    {isHighlight && (
                      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-400 animate-gentle-pulse" />
                    )}
                    <div className="flex flex-col gap-1">
                      <Typography
                        variant="body"
                        className={`text-sm font-medium ${
                          isHighlight ? 'text-violet-700' : 'text-gray-700'
                        }`}
                      >
                        {skill.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-xs text-gray-400"
                      >
                        {isHighlight ? 'Core competency' : 'Experienced'}
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Animated marquee */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative mt-6 -mx-6 overflow-hidden px-6 sm:-mx-10 sm:px-10"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <motion.div
              className="flex gap-3"
              style={{ rotateX, rotateY, transformPerspective: 800 }}
            >
              <div className="flex gap-3 marquee-track">
                {[...technical, ...technical].map((skill, i) => (
                  <span
                    key={`${skill.name}-${i}`}
                    className="inline-block whitespace-nowrap px-4 py-2 rounded-full bg-white/70 border border-violet-100 text-gray-600 text-sm shadow-sm hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700 transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <Typography variant="h4" className="text-gray-900">
                Interpersonal
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Communication, teamwork, and adaptability
              </Typography>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {soft.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: 'easeOut',
                  },
                }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border border-gray-100 soft-shadow hover:border-violet-200 hover:bg-violet-50/20 transition-all duration-300 cursor-default"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-violet-100 to-amber-100 flex items-center justify-center">
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
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
