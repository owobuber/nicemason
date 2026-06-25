export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  amenities: string[];
}

// Centralized room data — edit data/rooms.json or use the /admin page
// to update pricing and descriptions without touching components.

export const WHATSAPP_NUMBER = "2347012345678"; // Replace with actual number
export const BOOKING_EMAIL = "bookings@nicemason.com"; // Replace with actual email
export const ADMIN_PASSWORD = "nicemason2024"; // Change this!

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-NG")}`;
}

export function buildWhatsAppUrl(
  room: Room,
  checkIn: string,
  checkOut: string,
  guests: number
): string {
  const message = `Hello Nice Mason, I'd like to book the ${room.name} (${formatPrice(room.price)}/night) from ${checkIn} to ${checkOut} for ${guests} guest${guests > 1 ? "s" : ""}. Please confirm availability.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildEmailUrl(
  room: Room,
  checkIn: string,
  checkOut: string,
  guests: number
): string {
  const subject = `Booking Request – ${room.name} | Nice Mason Hotel`;
  const body = `Dear Nice Mason Team,\n\nI would like to book the following room:\n\nRoom: ${room.name}\nPrice: ${formatPrice(room.price)}/night\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\n\nPlease confirm availability and provide payment details.\n\nThank you.`;
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
