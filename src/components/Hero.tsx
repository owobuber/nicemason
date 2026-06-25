"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BookingWidget from "./BookingWidget";
import { MapPin } from "lucide-react";

export default function Hero() {
  const scrollToRooms = () => {
    document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0">
        <Image
          src="/images/hotel-1.jpg"
          alt="Nice Mason Hotel exterior – Luxury hotel in Benin City, Nigeria"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2b4e]/75 via-[#0d2b4e]/55 to-[#0d2b4e]/80" />
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

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/70 text-lg md:text-2xl font-light tracking-wide mb-10 max-w-xl"
          >
            Where every detail whispers{" "}
            <span className="text-white font-semibold">luxury</span>.
          </motion.p>

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
