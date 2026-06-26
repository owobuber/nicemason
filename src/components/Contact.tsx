"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Mail, MapPin, Phone, Clock } from "lucide-react";
import { WHATSAPP_NUMBER, CONTACT_PHONE, BOOKING_EMAIL } from "@/data/rooms";
import BookingWidget from "./BookingWidget";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["Benin City, Edo State", "Nigeria"],
  },
  {
    icon: Phone,
    title: "Contact Phone",
    lines: [CONTACT_PHONE],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Booking",
    lines: ["+234 707 387 4943"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [BOOKING_EMAIL],
  },
  {
    icon: Clock,
    title: "Check-in / Check-out",
    lines: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nice Mason, I'd like to make a booking enquiry.")}`;

  return (
    <section id="contact" className="py-24 md:py-36 bg-white" ref={ref}>
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
              Get In Touch
            </span>
            <span className="w-12 h-px bg-[#c49a6c]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#0d2b4e] font-black text-5xl md:text-6xl leading-tight"
          >
            Reserve Your
            <br />
            <span className="text-[#7c4f2a]">Stay</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: booking widget + quick actions */}
          <motion.div
            initial={{ opacity: 1, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Booking widget */}
            <div className="bg-[#0d2b4e] rounded-sm p-1 mb-8">
              <BookingWidget />
            </div>

            {/* Quick book buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#1ebe5c] text-white font-bold py-4 px-6 rounded-sm transition-colors duration-300"
              >
                <MessageCircle size={20} />
                <div>
                  <p className="text-sm font-bold">WhatsApp</p>
                  <p className="text-xs font-normal opacity-80">Chat with us</p>
                </div>
              </a>
              <a
                href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent("Booking Enquiry – Nice Mason Hotel")}`}
                className="flex items-center justify-center gap-3 bg-[#0d2b4e] hover:bg-[#1a4a7a] text-white font-bold py-4 px-6 rounded-sm transition-colors duration-300"
              >
                <Mail size={20} />
                <div>
                  <p className="text-sm font-bold">Email Us</p>
                  <p className="text-xs font-normal opacity-80">Fast response</p>
                </div>
              </a>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 1, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="p-4 border border-gray-100 rounded-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <info.icon size={14} className="text-[#c49a6c]" />
                    <span className="text-[#0d2b4e] text-xs font-bold uppercase tracking-wide">
                      {info.title}
                    </span>
                  </div>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: map embed */}
          <motion.div
            initial={{ opacity: 1, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-sm overflow-hidden shadow-lg"
          >
            <div className="bg-[#0d2b4e] px-6 py-4">
              <h3 className="text-white font-bold tracking-wide">Find Us in Benin City</h3>
              <p className="text-white/50 text-sm">Benin City, Edo State, Nigeria</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63441.83434098!2d5.5892!3d6.3350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d2a0b3c6f3c9%3A0x5d53e3c62bd4f7b2!2sBenin%20City%2C%20Edo%20State%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nice Mason Hotel location – Benin City, Nigeria"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
