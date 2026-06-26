# Nice Mason Hotel — Website

A modern, awards-style luxury hotel website built with Next.js 15, Tailwind CSS, and Framer Motion.
Configured for **static export** so it can be deployed to any shared host (Truehost, cPanel, Hostinger, Namecheap, etc.).

---

## 🚀 Deploying to Truehost (or any cPanel host)

The site builds into a self-contained `out/` folder of static HTML, CSS, JS, and images. **No Node.js server needed on the host.**

### Step-by-step

**1. Build the site (on your computer):**

```bash
npm install
npm run build
```

This produces an `out/` folder (already zipped for you as `nicemason-truehost.zip`).

**2. Log into your Truehost cPanel** — usually at `https://yourdomain.com:2083` or via the link in your Truehost welcome email.

**3. Open File Manager** → navigate to `public_html/`.

**4. Upload `nicemason-truehost.zip`** (using the *Upload* button).

**5. Right-click the uploaded zip → *Extract*.** All files will be extracted into `public_html/`.

**6. Delete the zip file.**

**7. Visit your domain** — the site is live! 🎉

### Folder structure on the server

```
public_html/
├── index.html          ← homepage
├── admin/index.html    ← admin page
├── images/             ← all hotel photos
├── _next/              ← compiled CSS & JS
├── .htaccess           ← clean URLs, gzip, caching
├── robots.txt
└── sitemap.xml
```

### Updating prices later

Since this is a static site, the **admin page can't save changes directly to the server** (Truehost doesn't run Node.js). To update prices:

1. Edit `data/rooms.json` on your computer
2. Run `npm run build`
3. Re-upload `out/` to `public_html/` (overwrite existing files)

### Enable HTTPS

After uploading, go to cPanel → **SSL/TLS Status** → click *Run AutoSSL*. Once SSL is active, uncomment the HTTPS redirect block in `public/.htaccess` and rebuild.

---

## 🛠 Local Development

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
