'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/constants/portfolio';
import { Typography } from '@/components/ui/Typography';
import { staggerContainer, fadeInUp } from '@/animations/variants';

const navItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'content', label: 'Content' },
  { id: 'skills', label: 'Skills' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export function Sidebar() {
  const { name, tagline, summary, contact, links, languages } = portfolioData;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full rounded-2xl bg-white border border-gray-100 soft-shadow-lg overflow-hidden"
    >
      {/* Profile header */}
      <div className="relative px-6 pt-8 pb-6 text-center">
        <Typography variant="h4" className="text-gray-900 mb-1">
          {name}
        </Typography>
        <Typography variant="body" className="text-violet-600 text-sm font-medium mb-3">
          {tagline}
        </Typography>
        <Typography variant="caption" className="block text-gray-500 leading-relaxed">
          {summary}
        </Typography>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Contact quick info */}
      <div className="px-6 py-5 space-y-3">
        <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-violet-600 transition-colors group">
          <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-500">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </span>
          <span className="truncate">{contact.email}</span>
        </a>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-500">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <span>{contact.phone}</span>
        </div>

        {/* Social links */}
        <div className="flex gap-2 pt-2">
          {links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-all"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Languages */}
      <div className="px-6 py-5">
        <Typography variant="caption" className="block mb-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">
          Languages
        </Typography>
        <div className="space-y-2.5">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{lang.name}</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-600">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Section navigation */}
      <nav className="px-6 py-5">
        <Typography variant="caption" className="block mb-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">
          On This Page
        </Typography>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left text-sm text-gray-500 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-lg transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </motion.div>
  );
}
