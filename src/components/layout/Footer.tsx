'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';

export function Footer() {
  return (
    <footer className="relative border-t border-gray-100 bg-white/40 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-white text-sm font-bold">
              IO
            </span>
            <div>
              <Typography variant="body" className="text-sm font-medium text-gray-900">
                {portfolioData.name}
              </Typography>
              <Typography variant="caption">
                {portfolioData.tagline}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="text-sm text-gray-500 hover:text-violet-500 transition-colors"
            >
              Email
            </a>
            <a
              href={portfolioData.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-violet-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.links[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-violet-500 transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="caption">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </Typography>
          <Typography variant="caption">
            Built with Next.js, Three.js & Framer Motion
          </Typography>
        </div>
      </div>
    </footer>
  );
}
