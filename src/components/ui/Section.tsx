'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Typography } from './Typography';
import { fadeInUp } from '@/animations/variants';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Section({
  id,
  title,
  subtitle,
  label,
  className,
  children,
  fullWidth = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)}>
      <div className={cn(!fullWidth && 'mx-auto max-w-7xl px-6 md:px-8 lg:px-12')}>
        {(label || title) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            {label && (
              <Typography variant="label" className="mb-4 block text-violet-500">
                {label}
              </Typography>
            )}
            {title && (
              <Typography variant="h2" className="text-gray-900">
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body" className="mt-4 max-w-2xl">
                {subtitle}
              </Typography>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
