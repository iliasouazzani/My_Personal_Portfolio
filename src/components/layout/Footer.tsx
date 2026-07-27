'use client';

import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { portfolioData } from '@/constants/portfolio';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-100 bg-white/40 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Typography variant="caption" className="text-gray-400 text-xs">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </Typography>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="text-xs text-gray-400 hover:text-violet-500 transition-colors"
            >
              Email
            </a>
            {portfolioData.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-violet-500 transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
