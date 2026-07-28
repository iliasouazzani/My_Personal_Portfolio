'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
}

export function GlassCard({ children, className, hover3D = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !hover3D) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
    const rotateX = (y - 50) * 0.06;
    const rotateY = (x - 50) * 0.06;
    ref.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    setGlow({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 transition-all duration-200',
        'bg-white/30 backdrop-blur-md border border-white/50',
        'soft-shadow-lg',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(109,74,255,0.1), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
