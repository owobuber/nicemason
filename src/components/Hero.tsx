"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import BookingWidget from "./BookingWidget";
import { MapPin } from "lucide-react";

const slides = [
  {
    src: "/images/hotel-1.jpg",
    alt: "Nice Mason Hotel exterior – Luxury hotel in Benin City, Nigeria",
    tagline: "Where every detail whispers",
    highlight: "luxury",
  },
  {
    src: "/images/hotel-3.jpg",
    alt: "Nice Mason Hotel – elegant reception and lobby",
    tagline: "Crafted for those who expect",
    highlight: "the finest",
  },
  {
    src: "/images/hotel-6.jpg",
    alt: "Nice Mason Hotel – premium dining and lounge",
    tagline: "A sanctuary of comfort and",
    highlight: "refinement",
  },
  {
    src: "/images/mason-luxury-main.jpg",
    alt: "Nice Mason Hotel – Mason Luxury room interior",
    tagline: "Five star living in the heart of",
    highlight: "Benin City",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const scrollToRooms = () => {
    document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Sliding backgrounds */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2b4e]/75 via-[#0d2b4e]/55 to-[#0d2b4e]/80" />
      </div>

      {/* Slide dots */}
      <div className="absolute top-28 right-8 md:right-12 z-20 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1.5 rounded-full transition-all duration-500 ${
              i === current ? "h-8 bg-[#c49a6c]" : "h-3 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5.5, ease: "linear" }}
          className="h-full bg-[#c49a6c]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <MapPin size={16} className="text-[#c49a6c]" />
            <span className="text-[#c49a6c] text-sm font-semibold tracking-[4px] uppercase">
              Benin City, Nigeria
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white font-black text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-4"
          >
            Nice
            <br />
            <span className="text-[#c49a6c]">Mason</span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-white/70 text-lg md:text-2xl font-light tracking-wide mb-10 max-w-xl"
            >
              {slides[current].tagline}{" "}
              <span className="text-white font-semibold">{slides[current].highlight}</span>.
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-10 py-4 bg-[#c49a6c] hover:bg-[#a0673a] text-white font-bold text-sm tracking-widest uppercase rounded-sm transition-colors duration-300"
            >
              Book Now
            </button>
            <button
              onClick={scrollToRooms}
              className="px-10 py-4 border border-white/40 hover:border-[#c49a6c] text-white text-sm font-medium tracking-widest uppercase rounded-sm transition-colors duration-300"
            >
              View Rooms
            </button>
          </motion.div>

          {/* Booking widget */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl"
          >
            <BookingWidget />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
