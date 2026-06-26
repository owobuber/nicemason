"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "/images/hotel-2.jpg", alt: "Nice Mason Hotel – elegant corridor" },
  { src: "/images/hotel-3.jpg", alt: "Nice Mason Hotel – reception area" },
  { src: "/images/hotel-4.jpg", alt: "Nice Mason Hotel – lounge" },
  { src: "/images/hotel-6.jpg", alt: "Nice Mason Hotel – dining hall" },
  { src: "/images/hotel-7.jpg", alt: "Nice Mason Hotel – pool area" },
  { src: "/images/hotel-8.jpg", alt: "Nice Mason Hotel – exterior view" },
  { src: "/images/hotel-9.jpg", alt: "Nice Mason Hotel – suite interior" },
  { src: "/images/hotel-10.jpg", alt: "Nice Mason Hotel – bedroom" },
  { src: "/images/hotel-11.jpg", alt: "Nice Mason Hotel – bathroom" },
  { src: "/images/hotel-12.jpg", alt: "Nice Mason Hotel – balcony view" },
  { src: "/images/hotel-13.jpg", alt: "Nice Mason Hotel – conference room" },
  { src: "/images/hotel-14.jpg", alt: "Nice Mason Hotel – gym" },
  { src: "/images/vip-suite-2.jpg", alt: "VIP Suite – sitting area" },
  { src: "/images/mason-luxury-3.jpg", alt: "Mason Luxury – bedroom" },
  { src: "/images/special-mason-luxury-2.jpg", alt: "Special Mason Luxury – interior" },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() =>
    setSelected((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), []);
  const next = useCallback(() =>
    setSelected((i) => i !== null ? (i + 1) % galleryImages.length : null), []);

  return (
    <section id="gallery" className="py-24 md:py-36 bg-[#faf8f5]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="w-12 h-px bg-[#c49a6c]" />
            <span className="text-[#7c4f2a] text-xs font-bold tracking-[5px] uppercase">
              Visual Story
            </span>
            <span className="w-12 h-px bg-[#c49a6c]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#0d2b4e] font-black text-5xl md:text-6xl"
          >
            Hotel Gallery
          </motion.h2>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 1, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              onClick={() => setSelected(i)}
              className="relative overflow-hidden rounded-sm cursor-pointer group break-inside-avoid"
              style={{ height: i % 3 === 0 ? 260 : i % 3 === 1 ? 200 : 320 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0d2b4e]/0 group-hover:bg-[#0d2b4e]/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center lightbox-overlay"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white/60 hover:text-white p-2"
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>
            <motion.div
              key={selected}
              initial={{ opacity: 1, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl max-h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative" style={{ height: "min(85vh, 700px)" }}>
                <Image
                  src={galleryImages[selected].src}
                  alt={galleryImages[selected].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <p className="text-center text-white/50 text-sm mt-3">
                {galleryImages[selected].alt} — {selected + 1}/{galleryImages.length}
              </p>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white/60 hover:text-white p-2"
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
