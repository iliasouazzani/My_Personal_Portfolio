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
    <section id={id} className={cn('relative py-12 md:py-16', className)}>
      <div className={cn(!fullWidth && 'mx-auto max-w-5xl')}>
        {(label || title) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            className="mb-8 md:mb-10"
          >
            {label && (
              <Typography variant="label" className="mb-3 block text-violet-500 text-xs">
                {label}
              </Typography>
            )}
            {title && (
              <Typography variant="h2" className="text-gray-900 text-2xl md:text-3xl">
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body" className="mt-2 max-w-2xl text-sm">
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
