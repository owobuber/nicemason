/* =============================================================
   Nice Mason Hotel – Vanilla JS
   ============================================================= */

const WHATSAPP_NUMBER = "2347073874943";
const BOOKING_EMAIL = "contactInfo@nice-mason.com";

const rooms = [
  {
    id: "mason-luxury",
    name: "Mason Luxury",
    price: 80000,
    image: "images/mason-luxury-main.jpg",
    description: "An exquisite blend of contemporary design and timeless elegance. King-sized bed, premium linens, en-suite bathroom with rainfall shower, and a private balcony with panoramic city views.",
    amenities: ["King Bed", "Balcony", "Rainfall Shower", "Mini Bar", "Smart TV"]
  },
  {
    id: "vip-suite",
    name: "VIP Suite",
    price: 150000,
    image: "images/vip-suite-main.jpg",
    description: "Our crown jewel — a full suite experience with separate living room, dining area, and bedroom. Draped in rich fabrics and fine furnishings for the most discerning guests.",
    amenities: ["King Bed", "Living Room", "Dining Area", "Butler Service", "Smart TV"]
  },
  {
    id: "special-mason-luxury",
    name: "Special Mason Luxury",
    price: 100000,
    image: "images/special-mason-luxury-main.jpg",
    description: "A curated upgrade from our flagship — enhanced with premium finishes, expanded living space, and bespoke amenities for guests seeking that extra touch of distinction.",
    amenities: ["King Bed", "Premium Finishes", "Lounge Seating", "Smart TV", "Mini Bar"]
  },
  {
    id: "business-executive",
    name: "Business Executive",
    price: 65000,
    image: "images/business-executive-main.jpg",
    description: "Designed for the modern professional. A refined workspace, high-speed connectivity, and a restful bedroom — the perfect environment for productivity and recovery.",
    amenities: ["Queen Bed", "Work Desk", "High-Speed WiFi", "Smart TV", "En-Suite"]
  },
  {
    id: "mason-deluxe",
    name: "Mason Deluxe",
    price: 40000,
    image: "images/mason-deluxe-main.jpg",
    description: "Warm, inviting, and thoughtfully appointed. Genuine comfort at exceptional value — perfect for short stays or budget-conscious guests who refuse to compromise on quality.",
    amenities: ["Double Bed", "En-Suite", "Smart TV", "Air Conditioning", "Housekeeping"]
  }
];

const galleryImages = [
  { src: "images/hotel-2.jpg",  alt: "Elegant corridor" },
  { src: "images/hotel-3.jpg",  alt: "Reception area" },
  { src: "images/hotel-4.jpg",  alt: "Lounge" },
  { src: "images/hotel-6.jpg",  alt: "Dining hall" },
  { src: "images/hotel-7.jpg",  alt: "Pool area" },
  { src: "images/hotel-8.jpg",  alt: "Exterior view" },
  { src: "images/hotel-9.jpg",  alt: "Suite interior" },
  { src: "images/hotel-10.jpg", alt: "Bedroom" },
  { src: "images/hotel-11.jpg", alt: "Bathroom" },
  { src: "images/hotel-12.jpg", alt: "Balcony view" },
  { src: "images/hotel-13.jpg", alt: "Conference room" },
  { src: "images/hotel-14.jpg", alt: "Gym" },
  { src: "images/vip-suite-2.jpg", alt: "VIP Suite – sitting area" },
  { src: "images/mason-luxury-3.jpg", alt: "Mason Luxury – bedroom" },
  { src: "images/special-mason-luxury-2.jpg", alt: "Special Mason Luxury" }
];

/* ----- Helpers ----- */
function formatNaira(n) {
  return "₦" + n.toLocaleString("en-NG");
}
function waUrl(room) {
  const msg = `Hello Nice Mason, I'd like to book the ${room.name} (${formatNaira(room.price)}/night). Please confirm availability and provide more details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
function mailUrl(room) {
  const sub = `Booking Request – ${room.name} | Nice Mason Hotel`;
  const body = `Dear Nice Mason Team,\n\nI would like to book the following room:\n\nRoom: ${room.name}\nPrice: ${formatNaira(room.price)}/night\n\nPlease share availability and payment details.\n\nThank you.`;
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
}

/* ----- Render rooms ----- */
function renderRooms() {
  const grid = document.getElementById("roomsGrid");
  grid.innerHTML = rooms.map(r => `
    <article class="room-card reveal">
      <div class="room-image">
        <img src="${r.image}" alt="${r.name} room at Nice Mason Hotel" loading="lazy" />
        <div class="room-price">
          <span class="currency">${formatNaira(r.price)}</span><span class="per">/night</span>
        </div>
      </div>
      <div class="room-body">
        <h3>${r.name}</h3>
        <p>${r.description}</p>
        <div class="room-amenities">
          ${r.amenities.map(a => `<span>${a}</span>`).join("")}
        </div>
        <div class="room-actions">
          <a href="${waUrl(r)}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          <a href="${mailUrl(r)}" class="btn-mail">Email</a>
        </div>
      </div>
    </article>
  `).join("");
}

/* ----- Render gallery ----- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = galleryImages.map((g, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${g.src}" alt="${g.alt}" loading="lazy" />
    </div>
  `).join("");
}

/* ----- Lightbox ----- */
let lbIndex = 0;
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");

function openLightbox(i) {
  lbIndex = i;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function updateLightbox() {
  const g = galleryImages[lbIndex];
  lbImage.src = g.src;
  lbImage.alt = g.alt;
  lbCaption.textContent = `${g.alt} — ${lbIndex + 1} / ${galleryImages.length}`;
}
function lbPrev() {
  lbIndex = (lbIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox();
}
function lbNext() {
  lbIndex = (lbIndex + 1) % galleryImages.length;
  updateLightbox();
}

/* ----- Hero slider ----- */
let heroIndex = 0;
const heroSlides = document.querySelectorAll(".hero-slide");
const heroTaglines = document.querySelectorAll(".hero-tagline");
const heroDots = document.querySelectorAll(".dot-btn");
const heroProgress = document.getElementById("heroProgress");
const SLIDE_DURATION = 6000;
let heroTimer;
let progressStart;

function setHeroSlide(i) {
  heroIndex = i;
  heroSlides.forEach((s, idx) => s.classList.toggle("active", idx === i));
  heroTaglines.forEach((t, idx) => t.classList.toggle("active", idx === i));
  heroDots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  // reset progress bar
  heroProgress.style.transition = "none";
  heroProgress.style.width = "0%";
  void heroProgress.offsetWidth; // force reflow
  heroProgress.style.transition = `width ${SLIDE_DURATION}ms linear`;
  heroProgress.style.width = "100%";
}
function nextHeroSlide() {
  setHeroSlide((heroIndex + 1) % heroSlides.length);
}
function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, SLIDE_DURATION);
}

/* ----- Navbar scroll ----- */
function handleNavScroll() {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 60) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
}

/* ----- Scroll reveal ----- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
  els.forEach(el => io.observe(el));
}

/* ----- Mobile menu ----- */
function initMobileMenu() {
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    });
  });
}

/* ----- Init ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderRooms();
  renderGallery();
  initReveal();
  initMobileMenu();

  // Hero slider start
  setHeroSlide(0);
  startHeroTimer();

  // Hero dot click
  heroDots.forEach((d, i) => {
    d.addEventListener("click", () => {
      setHeroSlide(i);
      startHeroTimer();
    });
  });

  // Gallery click
  document.getElementById("galleryGrid").addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) openLightbox(parseInt(item.dataset.index, 10));
  });

  // Lightbox controls
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", (e) => { e.stopPropagation(); lbPrev(); });
  document.getElementById("lbNext").addEventListener("click", (e) => { e.stopPropagation(); lbNext(); });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lbPrev();
    if (e.key === "ArrowRight") lbNext();
  });

  // Navbar
  handleNavScroll();
  window.addEventListener("scroll", handleNavScroll, { passive: true });

  // Year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});
