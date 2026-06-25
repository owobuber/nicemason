"use client";

import { MessageCircle, Mail, MapPin, Share2, ThumbsUp, AtSign } from "lucide-react";
import { WHATSAPP_NUMBER, BOOKING_EMAIL } from "@/data/rooms";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Share2, label: "Instagram", href: "#" },
  { icon: ThumbsUp, label: "Facebook", href: "#" },
  { icon: AtSign, label: "Twitter / X", href: "#" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#07192e] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <p className="font-black text-2xl tracking-widest uppercase">Nice Mason</p>
            <p className="text-[#c49a6c] text-[10px] tracking-[4px] uppercase font-medium">
              Luxury Hotel
            </p>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            The finest luxury hotel experience in Benin City, Nigeria. Where comfort meets culture.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center hover:border-[#c49a6c] hover:text-[#c49a6c] transition-colors"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-[#c49a6c] text-xs font-bold tracking-[4px] uppercase mb-5">
            Quick Links
          </p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[#c49a6c] text-xs font-bold tracking-[4px] uppercase mb-5">
            Contact
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-[#c49a6c] mt-0.5 flex-shrink-0" />
              <span className="text-white/50 text-sm">Benin City, Edo State, Nigeria</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={14} className="text-[#c49a6c] mt-0.5 flex-shrink-0" />
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="text-white/50 text-sm hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} className="text-[#c49a6c] mt-0.5 flex-shrink-0" />
              <a
                href={`mailto:${BOOKING_EMAIL}`}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {BOOKING_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {/* Admin */}
        <div>
          <p className="text-[#c49a6c] text-xs font-bold tracking-[4px] uppercase mb-5">
            Management
          </p>
          <p className="text-white/40 text-sm mb-4">
            Hotel administration and pricing management.
          </p>
          <a
            href="/admin"
            className="inline-block px-5 py-2.5 border border-[#c49a6c]/40 text-[#c49a6c] text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#c49a6c] hover:text-white transition-colors duration-300"
          >
            Admin Login
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Nice Mason Hotel. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Luxury Hospitality · Benin City, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
