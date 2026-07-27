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
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center p-2.5">
                  <img
                    src="/icons/stadium-logo.png"
                    alt="Prince Moulay Abdellah Stadium"
                    className="h-full w-full object-contain"
                  />
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
