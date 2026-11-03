# Computer Care Source (`computercaresource.com`)

> **"Your personal IT department, at home."**

A complete, high-converting, responsive landing page and web application built with **Vite**, **React 19**, **TypeScript**, and **Tailwind CSS v4** following a **Domain-Driven Design (DDD)** structure.

---

## 🎨 Design System & Color Tokens (60-30-10 Rule)

- **60% Primary Backgrounds:**
  - Crisp Off-White / Ice (`#F7FAFC`) for page sections
  - Pure White (`#FFFFFF`) for elevated cards
- **30% Structural & Typography:**
  - Deep Trust Navy (`#1B365D`) for top navigation bar, headings, hero banners, and footer
  - Modern Steel / Slate Gray (`#4A5568`) for body copy, subheadings, and subtle borders
- **10% Accents & CTAs:**
  - Concierge Gold (`#C59B27`) for primary CTAs ("Schedule In-Home Visit", "Book a House Call"), pricing highlights, and trust badges
  - Support Teal (`#2C7A7B`) for secondary links, checkmarks, service icons, and hover states

---

## 🏛️ Domain-Driven Architecture

```text
src/
├── domains/
│   ├── brand/
│   │   └── components/
│   │       └── BrandLogo.tsx         # House enclosing laptop + gold shield checkmark
│   ├── navigation/
│   │   └── components/
│   │       └── Navbar.tsx            # Sticky Deep Trust Navy nav, hotline & gold CTA
│   ├── hero/
│   │   └── components/
│   │       └── HeroSection.tsx       # Headline, Subheadline, Gold CTA, Pricing pill & live dispatch card
│   ├── services/
│   │   ├── types/                    # ServiceItem interface
│   │   ├── data/                     # 4 Core Concierge Services data
│   │   └── components/
│   │       ├── ServiceCard.tsx       # Elevated 2x2 cards with teal icons & gold badges
│   │       └── ServicesSection.tsx
│   ├── why-us/
│   │   └── components/
│   │       └── WhyUsSection.tsx      # Concierge Difference (Heavy Lifting, Confidentiality, Plain English)
│   ├── pricing/
│   │   └── components/
│   │       └── PricingSection.tsx    # Gold-bordered spotlight card ($140/hr + $119/hr) + interactive estimator
│   ├── how-it-works/
│   │   └── components/
│   │       └── HowItWorksSection.tsx # 3-step numbered progression
│   ├── service-area/
│   │   └── components/
│   │       └── ServiceAreaSection.tsx# Interactive Zip Code coverage checker & territory map
│   ├── testimonials/
│   │   └── components/
│   │       └── TestimonialsSection.tsx# 5-star residential client reviews & social proof
│   ├── faq/
│   │   └── components/
│   │       └── FaqSection.tsx        # Accordion addressing privacy, travel fees, Mac/PC, parts
│   ├── booking/
│   │   ├── types/                    # BookingFormData & BookingSubmissionResult
│   │   ├── services/
│   │   │   └── bookingService.ts     # Lead dispatch service (Webhook + LocalStorage backup)
│   │   └── components/
│   │       ├── BookingSection.tsx    # Lead capture form with instant reference receipt
│   │       └── BookingModal.tsx      # Accessible modal triggered from anywhere
│   └── footer/
│       └── components/
│           └── Footer.tsx            # Deep Trust Navy footer with hours, links, and guarantee
├── shared/
│   └── components/
│       └── MobileQuickBar.tsx        # Sticky mobile call & booking action bar
├── App.tsx                           # Root orchestrator with smooth scrolling & modal state
├── index.css                         # Tailwind CSS v4 @theme color token definitions
└── main.tsx                          # React 19 entry point
```

---

## ⚡ Key Features Added

1. **Instant Zip Code Coverage Checker:** Real-time lookup for customers to verify zero travel fees in their area.
2. **Interactive Pricing Calculator:** Live estimator for 1h, 1.5h, 2h, and 3h appointments highlighting the transparent $140 1st hour / $119 additional hours rate.
3. **Resilient Lead Capture & Webhook Ready:**
   - Automatically saves all booking inquiries to browser `localStorage` as a safety net.
   - Optional webhook forwarding via `VITE_BOOKING_WEBHOOK_URL` in `.env` (compatible with Zapier, Make, Formspree, Slack, or any API endpoint).
4. **Mobile Conversion Bar:** Fixed bottom bar on small viewports with quick 1-tap phone dispatch and booking.
5. **Verified Client Testimonials:** Highlighting privacy, elderly parent assistance, and zero tech jargon.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Build for Production
```bash
npm run build
```
The production bundle will be generated in `dist/`.
