'use client';

import { useEffect, useRef } from 'react';

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (centerY - viewportCenter) * speed;
      el.style.transform = `translateY(${-offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
