'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glare?: boolean;
  as?: 'div' | 'a';
  href?: string;
}

export function Card({
  children,
  className,
  tilt = false,
  glare = false,
  as = 'div',
  href,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    x.set(deltaX * 10);
    y.set(-deltaY * 10);

    if (glare) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--glare-x', `${px}%`);
      ref.current.style.setProperty('--glare-y', `${py}%`);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.div;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl soft-shadow-lg transition-shadow duration-300 hover:shadow-xl',
        'bg-white/60 backdrop-blur-sm border border-white/60',
        className
      )}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.3), transparent 60%)',
          }}
        />
      )}
    </Component>
  );
}
