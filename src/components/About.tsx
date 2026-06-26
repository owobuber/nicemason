"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Award, Star, Shield } from "lucide-react";

const stats = [
  { value: "5★", label: "Star Experience" },
  { value: "100+", label: "Rooms & Suites" },
  { value: "24/7", label: "Concierge Service" },
  { value: "5+", label: "Years of Luxury" },
];

const pillars = [
  { icon: Award, title: "Award-Worthy Design", desc: "Every corner of Nice Mason has been crafted with intention — from curated artwork to bespoke furnishings." },
  { icon: Star, title: "Uncompromising Quality", desc: "Premium linens, chef-driven cuisine, and personalised service define the Nice Mason standard." },
  { icon: Shield, title: "Trusted by Dignitaries", desc: "The preferred choice of executives, dignitaries, and discerning travelers visiting Benin City." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-36 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="w-12 h-px bg-[#c49a6c]" />
          <span className="text-[#7c4f2a] text-xs font-bold tracking-[5px] uppercase">
            Our Story
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 1, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[#0d2b4e] font-black text-5xl md:text-6xl leading-tight mb-8"
            >
              A New Era of
              <br />
              <span className="text-[#7c4f2a]">Nigerian Luxury</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 1, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              Nice Mason Hotel stands as Benin City&apos;s premier destination for luxury accommodation.
              Nestled in the heart of the city, we have redefined what hospitality means in the ancient
              Kingdom of Benin — blending contemporary elegance with the warmth of authentic Nigerian culture.
            </motion.p>

            <motion.p
              initial={{ opacity: 1, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-600 text-lg leading-relaxed mb-10"
            >
              Whether you arrive for business or leisure, our rooms, suites, and bespoke services
              are designed to exceed every expectation — because at Nice Mason, excellence is not
              the goal. It is the standard.
            </motion.p>

            {/* Pillars */}
            <div className="space-y-5">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 1, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-[#0d2b4e] flex items-center justify-center">
                    <p.icon size={18} className="text-[#c49a6c]" />
                  </div>
                  <div>
                    <p className="text-[#0d2b4e] font-bold text-sm mb-0.5">{p.title}</p>
                    <p className="text-gray-500 text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image + stats */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 1, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative h-[500px] md:h-[620px] rounded-sm overflow-hidden"
            >
              <Image
                src="/images/hotel-5.jpg"
                alt="Nice Mason Hotel interior – elegant lobby and lounge area"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b4e]/40 to-transparent" />
            </motion.div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#c49a6c]/20 rounded-sm -z-10" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#0d2b4e]/10 rounded-sm -z-10" />

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 1, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -bottom-10 left-4 right-4 md:-bottom-6 md:left-8 md:right-8 bg-[#0d2b4e] px-6 py-5 rounded-sm grid grid-cols-4 gap-2"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-[#c49a6c] font-black text-xl md:text-2xl">{s.value}</p>
                  <p className="text-white/60 text-[10px] font-medium tracking-wide uppercase leading-tight mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
