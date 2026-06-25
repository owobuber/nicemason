"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Mail, ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { Room } from "@/data/rooms";
import { formatPrice, buildWhatsAppUrl, buildEmailUrl } from "@/data/rooms";
import BookingWidget from "./BookingWidget";

interface RoomCardProps {
  room: Room;
  index: number;
}

export default function RoomCard({ room, index }: RoomCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDates, setBookingDates] = useState({ checkIn: "TBD", checkOut: "TBD", guests: 1 });

  const prev = () => setImgIdx((i) => (i - 1 + room.images.length) % room.images.length);
  const next = () => setImgIdx((i) => (i + 1) % room.images.length);

  const handleBook = (checkIn: string, checkOut: string, guests: number) => {
    setBookingDates({ checkIn, checkOut, guests });
    setShowBooking(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Image carousel */}
      <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
        {room.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${room.name} – image ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${i === imgIdx ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2 && i === 0}
          />
        ))}

        {/* Carousel controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {room.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-white" : "bg-white/40"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-[#0d2b4e] text-white px-3 py-1.5 rounded-sm">
          <span className="text-[#c49a6c] font-black text-base">{formatPrice(room.price)}</span>
          <span className="text-white/60 text-xs ml-1">/night</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-[#0d2b4e] font-black text-xl mb-2 tracking-tight">
          {room.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{room.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-5">
          {room.amenities.map((a) => (
            <span
              key={a}
              className="flex items-center gap-1 text-xs text-[#7c4f2a] bg-[#7c4f2a]/10 px-2.5 py-1 rounded-sm font-medium"
            >
              <Check size={10} />
              {a}
            </span>
          ))}
        </div>

        {/* Booking dates summary */}
        {(bookingDates.checkIn !== "TBD" || bookingDates.checkOut !== "TBD") && (
          <div className="mb-4 p-3 bg-[#0d2b4e]/5 rounded-sm text-xs text-gray-600 flex flex-wrap gap-3">
            <span><strong>Check-in:</strong> {bookingDates.checkIn}</span>
            <span><strong>Check-out:</strong> {bookingDates.checkOut}</span>
            <span><strong>Guests:</strong> {bookingDates.guests}</span>
            <button onClick={() => setShowBooking(true)} className="text-[#7c4f2a] font-semibold underline">
              Change
            </button>
          </div>
        )}

        {/* Date selector toggle */}
        {showBooking && (
          <div className="mb-4 bg-[#0d2b4e] rounded-sm p-4">
            <BookingWidget compact onBook={handleBook} />
            <button
              onClick={() => setShowBooking(false)}
              className="mt-2 text-white/50 text-xs hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}

        {!showBooking && bookingDates.checkIn === "TBD" && (
          <button
            onClick={() => setShowBooking(true)}
            className="w-full mb-3 py-2 border border-dashed border-[#c49a6c]/60 text-[#7c4f2a] text-xs font-semibold rounded-sm hover:border-[#c49a6c] transition-colors"
          >
            + Select Dates & Guests
          </button>
        )}

        {/* Book buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={buildWhatsAppUrl(room, bookingDates.checkIn, bookingDates.checkOut, bookingDates.guests)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5c] text-white text-xs font-bold py-3 px-3 rounded-sm transition-colors duration-300"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <a
            href={buildEmailUrl(room, bookingDates.checkIn, bookingDates.checkOut, bookingDates.guests)}
            className="flex items-center justify-center gap-2 bg-[#0d2b4e] hover:bg-[#1a4a7a] text-white text-xs font-bold py-3 px-3 rounded-sm transition-colors duration-300"
          >
            <Mail size={14} />
            Email
          </a>
        </div>
      </div>
    </motion.article>
  );
}
