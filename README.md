# Nice Mason Hotel — Website

A modern, awards-style luxury hotel website built with Next.js 15, Tailwind CSS, and Framer Motion.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Configuration

### 1. WhatsApp Number

Open `src/data/rooms.ts` and update:

```ts
export const WHATSAPP_NUMBER = "2347012345678"; // ← replace with real number (no +, no spaces)
```

Format: country code + number, e.g. `2348012345678` for a Nigerian number starting with 080.

### 2. Booking Email

In the same file:

```ts
export const BOOKING_EMAIL = "bookings@nicemason.com"; // ← replace with real email
```

---

## Editing Room Prices & Details

### Option A — Direct file edit (simplest)

Edit `data/rooms.json`:

```json
[
  { "id": "mason-luxury", "name": "Mason Luxury", "price": 80000, ... }
]
```

Change `price` (number in Naira, no commas), `name`, or `description`. Restart the server after saving.

### Option B — Admin page (browser UI)

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Password: **`nicemason2024`**
3. Edit fields and click **Save All Changes**

> To change the admin password: update `"nicemason2024"` in `src/app/api/rooms/route.ts`, or set `ADMIN_PASSWORD=yourpassword` in `.env.local`.

---

## Project Structure

```
├── data/rooms.json          ← Admin-editable room data
├── public/images/           ← Hotel & room images
├── src/app/
│   ├── layout.tsx           ← SEO metadata, fonts, JSON-LD
│   ├── page.tsx             ← Main page
│   ├── admin/page.tsx       ← Admin UI
│   └── api/rooms/route.ts   ← Read/write rooms.json
└── src/components/          ← All UI components
```

---

## Deployment Note

On **Vercel** (serverless), admin file writes are ephemeral. For persistent admin edits on Vercel, replace file I/O in `api/rooms/route.ts` with a database (Vercel KV, Supabase, etc.). On a **VPS** with `npm start`, filesystem writes persist normally.

---

## Original Next.js Docs

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
