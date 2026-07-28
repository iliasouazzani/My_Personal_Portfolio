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

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
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
  }, [reducedMotion, isVisible, cursorX, cursorY]);

  if (reducedMotion || typeof window === 'undefined') return null;

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: springX.get() ? springX.get() - 16 : 0,
          top: springY.get() ? springY.get() - 16 : 0,
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
              : 'rgba(109, 74, 255, 0.2)',
            backgroundColor: isHovering
              ? 'rgba(109, 74, 255, 0.04)'
              : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="rounded-full border"
          style={{
            borderWidth: isHovering ? 1.5 : 1,
          }}
        />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: cursorX.get() ? cursorX.get() - 3 : 0,
          top: cursorY.get() ? cursorY.get() - 3 : 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 4 : isHovering ? 6 : 6,
            height: isClicking ? 4 : isHovering ? 6 : 6,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering
              ? 'rgba(109, 74, 255, 0.8)'
              : 'rgba(109, 74, 255, 0.6)',
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}
