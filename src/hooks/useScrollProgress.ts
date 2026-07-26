'use client';

import { useEffect, useRef } from 'react';

export function useScrollProgress(): number {
  const progressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progressRef.current;
}
