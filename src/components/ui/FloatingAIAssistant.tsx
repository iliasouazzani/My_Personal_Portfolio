'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const greetings = [
  "Hey there! 👋",
  "Need help navigating?",
  "Want to collaborate?",
  "Check out my projects!",
  "Let's connect!",
];

const responses = [
  "I'm Ilias — an AI systems builder and content creator. This portfolio showcases my work across AI development, video editing, and event volunteering. Feel free to explore! 🚀",
  "You can browse through my experience timeline, check out project demos, view my content stats, or reach out directly. Everything is organized in the sidebar!",
  "I'm always open to interesting opportunities in AI, content creation, or community roles. Click the 'Get in Touch' button to send me an email!",
  "Built with Next.js, Three.js, and Framer Motion — this portfolio is designed to be an interactive experience. The 3D scene in the background reacts to your presence.",
];

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState(greetings[0]);
  const [response, setResponse] = useState(responses[0]);
  const [dismissed, setDismissed] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const reducedMotion = useReducedMotion();

  // Cycle greetings when closed
  useEffect(() => {
    if (isOpen || dismissed) return;
    const interval = setInterval(() => {
      setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, [isOpen, dismissed]);

  // Auto-show hint after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss hint if interacting with page
  useEffect(() => {
    const handleClick = () => setShowHint(false);
    window.addEventListener('click', handleClick, { once: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      setResponse(responses[Math.floor(Math.random() * responses.length)]);
    }
    setIsOpen(!isOpen);
    setShowHint(false);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setIsOpen(false);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-72 md:w-80"
          >
            <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-violet-100 soft-shadow-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
                <div className="flex-1">
                  <Typography
                    variant="body"
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    {response}
                  </Typography>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        setResponse(
                          responses[
                            Math.floor(Math.random() * responses.length)
                          ]
                        )
                      }
                      className="text-xs text-violet-500 hover:text-violet-700 font-medium transition-colors"
                    >
                      Another tip
                    </button>
                    <span className="text-gray-300">·</span>
                    <button
                      onClick={handleDismiss}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-500 shadow-sm"
          >
            Need help? 👋
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/30 flex items-center justify-center transition-shadow hover:shadow-violet-500/40"
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        {isOpen ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
