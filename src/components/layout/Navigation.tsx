'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'content', label: 'Content' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  // Only show when scrolled past hero on desktop
  if (!scrolled) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 items-center gap-1 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-full px-3 py-1.5 soft-shadow"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={cn(
              'relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-300',
              activeSection === item.id
                ? 'text-violet-600'
                : 'text-gray-400 hover:text-gray-700'
            )}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div
                layoutId="mini-nav"
                className="absolute inset-0 bg-violet-50 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.nav>

      {/* Mobile mini FAB nav */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={cn(
          'lg:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-violet-500 text-white shadow-lg shadow-violet-500/30 flex items-center justify-center transition-all',
          mobileOpen ? 'rotate-45' : ''
        )}
        aria-label="Navigation"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="lg:hidden fixed bottom-24 right-6 z-50 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl soft-shadow-lg p-3 min-w-[160px]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'text-violet-600 bg-violet-50'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
