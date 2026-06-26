"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RoomCard from "./RoomCard";
import roomsData from "../../data/rooms.json";
import type { Room } from "@/data/rooms";

const rooms = roomsData as Room[];

export default function Rooms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rooms" className="py-24 md:py-36 bg-white" ref={ref}>
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
              Accommodations
            </span>
            <span className="w-12 h-px bg-[#c49a6c]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#0d2b4e] font-black text-5xl md:text-6xl leading-tight"
          >
            Rooms & Suites
          </motion.h2>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto"
          >
            Five distinct accommodations, each a sanctuary. Select a date, choose your room,
            and book instantly via WhatsApp or email.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
