'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';
import { staggerContainer, fadeInUp } from '@/animations/variants';

export function VolunteeringSection() {
  const { volunteering } = portfolioData;

  return (
    <Section
      id="volunteering"
      label="Volunteering"
      title="Community Involvement"
      subtitle="Contributing to major international events at Prince Moulay Abdellah Stadium, Rabat."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {volunteering.map((event) => (
          <motion.div key={event.id} variants={fadeInUp}>
            <Card tilt className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-amber-600"
                  >
                    <path d="M12 6v6l4 2" />
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <Typography variant="body" className="font-semibold text-gray-900 mb-1">
                    {event.event}
                  </Typography>
                  <Typography variant="caption" className="block mb-1">
                    {event.location}
                  </Typography>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                    {event.date}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
