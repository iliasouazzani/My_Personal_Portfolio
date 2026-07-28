'use client';

import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: unknown;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: number;
  height?: number;
}

export function LottieAnimation({
  animationData,
  className,
  loop = true,
  autoplay = true,
  speed = 1,
  width,
  height,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
    });

    if (speed !== 1) {
      animationRef.current.setSpeed(speed);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop, autoplay, speed]);

  useEffect(() => {
    if (animationRef.current && speed !== 1) {
      animationRef.current.setSpeed(speed);
    }
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: width || '100%', height: height || '100%' }}
    />
  );
}
