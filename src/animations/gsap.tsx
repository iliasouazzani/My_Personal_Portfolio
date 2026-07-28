'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Reusable Scroll-Reveal Hook ─────────────────────────────────────────

interface ScrollRevealOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  toggleActions?: string;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const el = ref.current;

    const {
      start = 'top 85%',
      end = 'bottom 20%',
      toggleActions = 'play none none reverse',
      y = 40,
      x = 0,
      opacity = 0,
      scale = 1,
      duration = 1,
      stagger = 0,
      ease = 'power3.out',
      scrub = false,
    } = options;

    const vars: gsap.TweenVars = {
      y,
      x,
      opacity,
      scale,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        toggleActions,
        scrub: scrub || false,
        invalidateOnRefresh: true,
      },
    };

    // If stagger and scrub, use timeline
    if (stagger && (options.stagger ?? 0) > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          toggleActions,
          scrub: scrub || false,
          invalidateOnRefresh: true,
        },
      });
      tl.from(el.querySelectorAll('[data-reveal]'), {
        y,
        opacity: 0,
        duration,
        stagger,
        ease,
      });
      animationRef.current = tl;
    } else {
      fromTo(el);
    }

    function fromTo(target: HTMLElement) {
      gsap.fromTo(target, { y, opacity: 0, scale }, { y: 0, opacity: 1, scale: 1, ...vars });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [reducedMotion]);

  return ref;
}

// ─── Scroll Reveal Component ────────────────────────────────────────────

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'span' | 'p' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav';
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  as: _as = 'div',
  y = 40,
  duration = 1,
  delay = 0,
  stagger = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const el = ref.current;

    const trigger: ScrollTrigger.Vars = {
      trigger: el,
      start: 'top 85%',
      toggleActions: once ? 'play none none none' : 'play none none reverse',
      invalidateOnRefresh: true,
    };

    gsap.fromTo(
      el.querySelectorAll('[data-reveal]').length ? el.querySelectorAll('[data-reveal]') : el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: trigger,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [reducedMotion, y, duration, delay, stagger, once]);

  return React.createElement(_as, { ref: ref as any, className }, children);
}

// ─── Text Reveal Component ──────────────────────────────────────────────

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

const TAG_MAP = {
  h1: 'h1' as const,
  h2: 'h2' as const,
  h3: 'h3' as const,
  h4: 'h4' as const,
  p: 'p' as const,
  span: 'span' as const,
};

export function TextReveal({
  text,
  className,
  as: _as = 'p',
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
  y = 60,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const Tag = TAG_MAP[_as] || 'p';

  const words = text.split(' ');

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const els = containerRef.current.querySelectorAll('[data-reveal]');

    const trigger: ScrollTrigger.Vars = {
      trigger: containerRef.current,
      start: 'top 90%',
      toggleActions: once ? 'play none none none' : 'play none none reverse',
    };

    gsap.fromTo(
      els,
      { y, opacity: 0, rotateX: -15 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: trigger,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [reducedMotion, y, duration, delay, stagger, once]);

  if (reducedMotion) {
    return React.createElement(Tag, { className }, text);
  }

  return React.createElement(
    Tag,
    { ref: containerRef as any, className },
    React.createElement(
      'span',
      { className: 'inline-flex flex-wrap' },
      words.map((word, i) =>
        React.createElement(
          'span',
          {
            key: i,
            'data-reveal': true,
            className: 'inline-block mr-[0.3em]',
            style: { perspective: '800px' },
          },
          word
        )
      )
    )
  );
}

// ─── Parallax Layer ─────────────────────────────────────────────────────

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const el = ref.current;

    gsap.to(el, {
      y: () => (typeof speed === 'number' ? speed * 200 : 0),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [reducedMotion, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
