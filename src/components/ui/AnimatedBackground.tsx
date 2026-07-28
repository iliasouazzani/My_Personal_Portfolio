'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Base cream background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#faf8f5]" />

      {/* Mesh gradient blobs that follow mouse */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Blob 1 - Violet/Purple - top left */}
        <motion.div
          className="absolute -top-[15%] -left-[10%] h-[55%] w-[40%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(109,74,255,0.15) 0%, transparent 65%)',
            x: springX.get() !== null ? springX.get() * -60 : 0,
            y: springY.get() !== null ? springY.get() * -40 : 0,
          }}
        />

        {/* Blob 2 - Soft Lavender - right side */}
        <motion.div
          className="absolute top-[20%] right-[-5%] h-[50%] w-[35%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(200,180,255,0.18) 0%, transparent 65%)',
            x: springX.get() !== null ? springX.get() * 70 : 0,
            y: springY.get() !== null ? springY.get() * -50 : 0,
          }}
        />

        {/* Blob 3 - Warm Peach/Cream - bottom left */}
        <motion.div
          className="absolute bottom-[-10%] left-[15%] h-[45%] w-[35%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,215,180,0.12) 0%, transparent 65%)',
            x: springX.get() !== null ? springX.get() * -40 : 0,
            y: springY.get() !== null ? springY.get() * 60 : 0,
          }}
        />

        {/* Blob 4 - Light Blue - center */}
        <motion.div
          className="absolute top-[40%] left-[35%] h-[35%] w-[25%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(180,210,255,0.1) 0%, transparent 65%)',
            x: springX.get() !== null ? springX.get() * 50 : 0,
            y: springY.get() !== null ? springY.get() * 50 : 0,
          }}
        />
      </div>

      {/* Grain/noise overlay - kept subtle */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtle vignette - draws focus to center */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(250,248,245,0.5) 100%)',
        }}
      />

      {children}
    </div>
  );
}
