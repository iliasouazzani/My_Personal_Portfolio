'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { InteractiveCursor } from '@/components/ui/InteractiveCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Navigation } from '@/components/layout/Navigation';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const minTime = new Promise<void>((resolve) => setTimeout(resolve, 800));
    const pageReady =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true });
          });

    Promise.all([minTime, pageReady]).then(() => setLoading(false));
  }, []);

  return (
    <>
      <InteractiveCursor />
      <AnimatedBackground>
        <SmoothScroll>
          <PageLoader loading={loading}>
            <div className="relative z-10">
              {children}
              {mounted && <Navigation />}
            </div>
          </PageLoader>
        </SmoothScroll>
      </AnimatedBackground>
    </>
  );
}

function PageLoader({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf8f5]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Animated logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="relative h-14 w-14"
              >
                <motion.div className="absolute inset-0 rounded-full border-2 border-violet-200 border-t-violet-500" />
                <motion.div
                  className="absolute inset-2 rounded-full border border-violet-100 border-t-violet-400"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>

              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400"
                >
                  Loading
                </motion.p>
                <motion.div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
