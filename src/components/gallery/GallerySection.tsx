'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import { cn } from '@/lib/utils';

type GalleryCategory = 'tech' | 'volunteering';

interface GalleryPhoto {
  src: string;
  alt: string;
}

const galleryData: Record<GalleryCategory, GalleryPhoto[]> = {
  tech: [
    { src: '/gallery/tech/tech-1.jpeg', alt: 'Presenting OpenClaw to the team' },
    { src: '/gallery/tech/tech-2.jpeg', alt: 'Coding session with the team' },
    { src: '/gallery/tech/tech-3.jpeg', alt: 'Presenting an open-model demo' },
    { src: '/gallery/tech/tech-4.jpeg', alt: 'Walking through the OpenClaw quickstart' },
  ],
  volunteering: [
    { src: '/gallery/volunteering/volunteering-1.jpeg', alt: 'Volunteering at Prince Moulay Abdellah Stadium' },
    { src: '/gallery/volunteering/volunteering-2.jpeg', alt: 'Pitchside at the stadium during AFCON' },
    { src: '/gallery/volunteering/volunteering-3.jpeg', alt: 'With the group at the stadium' },
    { src: '/gallery/volunteering/volunteering-4.jpeg', alt: 'Stadium volunteer accreditation' },
  ],
};

const categories: { id: GalleryCategory; label: string }[] = [
  { id: 'tech', label: 'Tech' },
  { id: 'volunteering', label: 'Volunteering' },
];

export function GallerySection() {
  const [active, setActive] = useState<GalleryCategory>('tech');
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  return (
    <Section
      id="gallery"
      label="Gallery"
      title="Behind the Scenes"
      subtitle="A look at the tech work and volunteering moments behind this portfolio."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={fadeInUp} className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                active === cat.id
                  ? 'bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/20'
                  : 'bg-white/70 text-gray-600 border-gray-200 hover:border-violet-200 hover:text-violet-600'
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {galleryData[active].map((photo) => (
              <button
                key={photo.src}
                onClick={() => setLightbox(photo)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 soft-shadow"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-violet-900/0 transition-colors group-hover:bg-violet-900/10" />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-black/80 p-4"
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
