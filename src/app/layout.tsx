import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nice Mason Hotel – Luxury Accommodation in Benin City, Nigeria",
  description:
    "Experience unmatched luxury at Nice Mason Hotel in Benin City, Nigeria. Premium rooms, world-class amenities, and impeccable service. Book your stay today.",
  keywords: [
    "hotel in Benin City",
    "Nice Mason hotel",
    "luxury hotel Nigeria",
    "accommodation Benin City",
    "Nice Mason luxury",
    "hotel Edo State",
    "VIP suite Benin",
    "luxury accommodation Nigeria",
  ],
  metadataBase: new URL("https://nicemason.com"),
  authors: [{ name: "Nice Mason Hotel" }],
  openGraph: {
    title: "Nice Mason Hotel – Luxury in Benin City, Nigeria",
    description:
      "Premium rooms, exceptional service. Book your stay at Nice Mason Hotel.",
    url: "https://nicemason.com",
    siteName: "Nice Mason Hotel",
    images: [
      {
        url: "/images/hotel-1.jpg",
        width: 1200,
        height: 630,
        alt: "Nice Mason Hotel – Luxury in Benin City",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nice Mason Hotel – Luxury in Benin City, Nigeria",
    description:
      "Premium rooms, exceptional service. Book your stay at Nice Mason Hotel.",
    images: ["/images/hotel-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Nice Mason Hotel",
  description:
    "Luxury hotel in Benin City, Nigeria offering premium rooms and world-class amenities.",
  url: "https://nicemason.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Benin City",
    addressLocality: "Benin City",
    addressRegion: "Edo State",
    addressCountry: "NG",
  },
  priceRange: "₦₦₦",
  hasRoomType: [
    { "@type": "HotelRoom", name: "Mason Luxury", description: "₦80,000/night" },
    { "@type": "HotelRoom", name: "VIP Suite", description: "₦150,000/night" },
    { "@type": "HotelRoom", name: "Special Mason Luxury", description: "₦100,000/night" },
    { "@type": "HotelRoom", name: "Business Executive", description: "₦65,000/night" },
    { "@type": "HotelRoom", name: "Mason Deluxe", description: "₦40,000/night" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
