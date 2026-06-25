"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Calendar, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";

interface BookingWidgetProps {
  onBook?: (checkIn: string, checkOut: string, guests: number) => void;
  compact?: boolean;
}

export default function BookingWidget({ onBook, compact = false }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  const fmtDate = (d: Date | undefined) =>
    d ? format(d, "MMM d, yyyy") : "Select date";

  const handleBook = () => {
    const ci = checkIn ? format(checkIn, "MMM d, yyyy") : "TBD";
    const co = checkOut ? format(checkOut, "MMM d, yyyy") : "TBD";
    if (onBook) {
      onBook(ci, co, guests);
    } else {
      const el = document.querySelector("#rooms");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`${compact ? "p-4" : "p-6 md:p-8"} bg-white/10 backdrop-blur-md border border-white/20 rounded-lg`}
    >
      <h3 className="text-white font-bold text-lg tracking-widest uppercase mb-4">
        Check Availability
      </h3>

      <div className={`grid ${compact ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-3 gap-4"}`}>
        {/* Check-in */}
        <div className="relative">
          <label className="text-white/60 text-xs font-semibold tracking-widest uppercase block mb-1">
            Check-in
          </label>
          <button
            onClick={() => { setShowCheckIn(!showCheckIn); setShowCheckOut(false); setShowGuests(false); }}
            className="w-full flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-3 rounded text-sm font-medium hover:border-[#c49a6c] transition-colors"
          >
            <Calendar size={16} className="text-[#c49a6c]" />
            {fmtDate(checkIn)}
          </button>
          {showCheckIn && (
            <div className="absolute top-full mt-2 z-50 bg-white rounded-lg shadow-2xl p-2">
              <DayPicker
                mode="single"
                selected={checkIn}
                onSelect={(d) => { setCheckIn(d); setShowCheckIn(false); }}
                disabled={{ before: new Date() }}
                startMonth={new Date()}
              />
            </div>
          )}
        </div>

        {/* Check-out */}
        <div className="relative">
          <label className="text-white/60 text-xs font-semibold tracking-widest uppercase block mb-1">
            Check-out
          </label>
          <button
            onClick={() => { setShowCheckOut(!showCheckOut); setShowCheckIn(false); setShowGuests(false); }}
            className="w-full flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-3 rounded text-sm font-medium hover:border-[#c49a6c] transition-colors"
          >
            <Calendar size={16} className="text-[#c49a6c]" />
            {fmtDate(checkOut)}
          </button>
          {showCheckOut && (
            <div className="absolute top-full mt-2 z-50 bg-white rounded-lg shadow-2xl p-2">
              <DayPicker
                mode="single"
                selected={checkOut}
                onSelect={(d) => { setCheckOut(d); setShowCheckOut(false); }}
                disabled={{ before: checkIn || new Date() }}
                startMonth={checkIn || new Date()}
              />
            </div>
          )}
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="text-white/60 text-xs font-semibold tracking-widest uppercase block mb-1">
            Guests
          </label>
          <button
            onClick={() => { setShowGuests(!showGuests); setShowCheckIn(false); setShowCheckOut(false); }}
            className="w-full flex items-center justify-between gap-2 bg-white/10 border border-white/30 text-white px-4 py-3 rounded text-sm font-medium hover:border-[#c49a6c] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Users size={16} className="text-[#c49a6c]" />
              {guests} Guest{guests > 1 ? "s" : ""}
            </span>
            <ChevronDown size={14} />
          </button>
          {showGuests && (
            <div className="absolute top-full mt-2 z-50 bg-white rounded-lg shadow-2xl p-3 w-full">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-700 font-medium text-sm">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border-2 border-[#0d2b4e] text-[#0d2b4e] font-bold hover:bg-[#0d2b4e] hover:text-white transition-colors"
                  >
                    –
                  </button>
                  <span className="text-[#0d2b4e] font-bold w-4 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="w-8 h-8 rounded-full border-2 border-[#0d2b4e] text-[#0d2b4e] font-bold hover:bg-[#0d2b4e] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowGuests(false)}
                className="mt-3 w-full text-center text-sm text-[#0d2b4e] font-semibold py-1.5 border border-[#0d2b4e] rounded hover:bg-[#0d2b4e] hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleBook}
        className="mt-4 w-full bg-[#c49a6c] hover:bg-[#a0673a] text-white font-bold py-3.5 rounded text-sm tracking-widest uppercase transition-colors duration-300"
      >
        Check Rooms
      </button>
    </div>
  );
}

export { BookingWidget };
export type { BookingWidgetProps };
