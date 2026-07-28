'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function InteractiveCursor() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      setIsHovering(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, cursorX, cursorY]);

  if (reducedMotion || typeof window === 'undefined') return null;

  return (
    <>
      {/* Main cursor ring — only x/y transform, no left/top conflict */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 20 : isHovering ? 48 : 32,
            height: isClicking ? 20 : isHovering ? 48 : 32,
            borderColor: isHovering
              ? 'rgba(109, 74, 255, 0.4)'
              : 'rgba(109, 74, 255, 0.25)',
            backgroundColor: isHovering
              ? 'rgba(109, 74, 255, 0.06)'
              : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="rounded-full border"
          style={{ borderWidth: isHovering ? 1.5 : 1 }}
        />
      </motion.div>

      {/* Cursor dot — same fix */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 4 : isHovering ? 6 : 5,
            height: isClicking ? 4 : isHovering ? 6 : 5,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering
              ? 'rgba(109, 74, 255, 0.9)'
              : 'rgba(109, 74, 255, 0.7)',
          }}
          transition={{ duration: 0.1 }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}
