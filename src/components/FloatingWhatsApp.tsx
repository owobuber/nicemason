"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/rooms";

export default function FloatingWhatsApp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nice Mason, I'd like to make a booking enquiry.")}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nice Mason Hotel on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-2xl"
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25d366]"
        animate={{ scale: [1, 1.4, 1.4], opacity: [0.7, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
      />
      <MessageCircle size={26} className="text-white relative z-10 fill-white" />
    </motion.a>
  );
}
