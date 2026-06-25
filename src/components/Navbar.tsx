"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d2b4e]/95 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex flex-col leading-none group"
          >
            <span className="text-white font-black text-xl tracking-widest uppercase group-hover:text-[#c49a6c] transition-colors duration-300">
              Nice Mason
            </span>
            <span className="text-[#c49a6c] text-[10px] font-medium tracking-[4px] uppercase">
              Luxury Hotel
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-white/80 text-sm font-medium tracking-widest uppercase hover:text-[#c49a6c] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c49a6c] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="ml-4 px-6 py-2.5 bg-[#c49a6c] text-white text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#a0673a] transition-colors duration-300"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0d2b4e] flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-white text-2xl font-bold tracking-widest uppercase hover:text-[#c49a6c] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06 }}
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="mt-4 px-10 py-3 bg-[#c49a6c] text-white text-lg font-bold tracking-widest uppercase rounded-sm"
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
