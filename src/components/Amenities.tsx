"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wifi, Waves, UtensilsCrossed, Car, Tv, Wind,
  Coffee, Shield, BedDouble, Phone, Shirt, Dumbbell,
} from "lucide-react";

const amenities = [
  { icon: Wifi, title: "High-Speed WiFi", desc: "Seamless connectivity throughout the hotel" },
  { icon: Waves, title: "Swimming Pool", desc: "Temperature-controlled outdoor pool" },
  { icon: UtensilsCrossed, title: "Restaurant & Bar", desc: "Fine dining with local and international cuisine" },
  { icon: Car, title: "Secure Parking", desc: "24/7 guarded parking for all guests" },
  { icon: Tv, title: "Smart TVs", desc: "Premium channels & streaming in every room" },
  { icon: Wind, title: "Air Conditioning", desc: "Climate-controlled rooms for your comfort" },
  { icon: Coffee, title: "Room Service", desc: "In-room dining available round the clock" },
  { icon: Shield, title: "24/7 Security", desc: "Trained security personnel on all grounds" },
  { icon: BedDouble, title: "Premium Bedding", desc: "Egyptian cotton linens and pillow-top mattresses" },
  { icon: Phone, title: "Concierge", desc: "Dedicated concierge for all your needs" },
  { icon: Shirt, title: "Laundry Service", desc: "Express laundry and dry-cleaning available" },
  { icon: Dumbbell, title: "Fitness Center", desc: "Fully equipped gym with modern equipment" },
];

export default function Amenities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="amenities" className="py-24 md:py-36 bg-[#0d2b4e]" ref={ref}>
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
            <span className="text-[#c49a6c] text-xs font-bold tracking-[5px] uppercase">
              Hotel Features
            </span>
            <span className="w-12 h-px bg-[#c49a6c]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white font-black text-5xl md:text-6xl leading-tight"
          >
            World-Class
            <br />
            <span className="text-[#c49a6c]">Amenities</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {amenities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 1, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group flex flex-col items-center text-center p-6 border border-white/10 rounded-sm hover:border-[#c49a6c]/50 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-[#c49a6c]/15 flex items-center justify-center mb-4 group-hover:bg-[#c49a6c]/25 transition-colors">
                <item.icon size={24} className="text-[#c49a6c]" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1.5">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
