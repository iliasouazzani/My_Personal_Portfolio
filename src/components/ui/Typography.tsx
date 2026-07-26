'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface TypographyProps {
  as?: HeadingLevel | 'p' | 'span';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  gradient?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Typography({
  as,
  variant = 'body',
  gradient = false,
  className,
  children,
}: TypographyProps) {
  const variantStyles: Record<string, string> = {
    h1: 'text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight',
    h2: 'text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
    h4: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg leading-relaxed text-gray-700',
    caption: 'text-sm text-gray-500',
    label: 'text-xs uppercase tracking-widest font-medium text-gray-400',
  };

  const Tag = as || (variant.startsWith('h') ? (variant as HeadingLevel) : 'p');

  return (
    <Tag
      className={cn(
        variantStyles[variant],
        gradient && 'text-gradient',
        className
      )}
    >
      {children}
    </Tag>
  );
}
