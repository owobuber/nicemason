"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RoomCard from "./RoomCard";
import type { Room } from "@/data/rooms";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("/api/rooms")
      .then((r) => r.json())
      .then(setRooms)
      .catch(() => {
        // Fallback: try to import static data
        import("@/data/rooms").then(() => {});
      });
  }, []);

  return (
    <section id="rooms" className="py-24 md:py-36 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#0d2b4e] font-black text-5xl md:text-6xl leading-tight"
          >
            Rooms & Suites
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto"
          >
            Five distinct accommodations, each a sanctuary. Select a date, choose your room,
            and book instantly via WhatsApp or email.
          </motion.p>
        </div>

        {/* Grid */}
        {rooms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-sm animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
