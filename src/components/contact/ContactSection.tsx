'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';

export function ContactSection() {
  const { contact, links, languages } = portfolioData;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's Connect"
      subtitle="Available for opportunities across AI development, content creation, and community-focused roles."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid lg:grid-cols-5 gap-8"
      >
        {/* Contact info */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 space-y-6">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 group"
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-violet-600"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-400">
                  Email
                </Typography>
                <Typography variant="body" className="text-gray-900 group-hover:text-violet-600 transition-colors break-all">
                  {contact.email}
                </Typography>
              </div>
            </a>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-violet-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-400">
                  Phone
                </Typography>
                <Typography variant="body" className="text-gray-900">
                  {contact.phone}
                </Typography>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-gray-100">
              <Typography variant="caption" className="block mb-3">
                Social & Portfolio
              </Typography>
              <div className="flex gap-3">
                <a
                  href={links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href={links[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="TikTok"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Languages */}
          <GlassCard className="p-6">
            <Typography variant="label" className="mb-4 block">
              Languages
            </Typography>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <Typography variant="body" className="font-medium text-gray-900 text-sm">
                    {lang.name}
                  </Typography>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-600">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact message / CTA */}
        <motion.div variants={fadeInUp} className="lg:col-span-3">
          <GlassCard className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="max-w-md">
              <div className="h-16 w-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-violet-600"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <Typography variant="h4" className="text-gray-900 mb-4">
                Want to work together?
              </Typography>
              <Typography variant="body" className="text-gray-500 mb-8">
                I'm open to opportunities in AI development, content creation, or
                community-oriented roles. Reach out and let's talk about how I can
                contribute.
              </Typography>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Portfolio%20Inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-violet-500 text-white rounded-full font-medium hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                Send an Email
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </Section>
  );
}
