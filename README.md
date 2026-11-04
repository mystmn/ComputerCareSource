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
  - Concierge Gold (`#C59B27`) for primary CTAs ("Book a House Call"), pricing highlights, and trust badges
  - Support Teal (`#2C7A7B`) for secondary links, checkmarks, service icons, and hover states

---

## 🏛️ Domain-Driven Architecture

```text
src/
├── domains/
│   ├── brand/
│   │   └── components/
│   │       └── BrandLogo.tsx         # Official brand identity in sm, md, and lg responsive variants
│   ├── navigation/
│   │   └── components/
│   │       └── Navbar.tsx            # Sticky Deep Trust Navy nav, (614) 382-2874 hotline & gold CTA
│   ├── hero/
│   │   └── components/
│   │       └── HeroSection.tsx       # Core pitch, rate badge & 3-column trust ribbon
│   ├── services/
│   │   ├── types/                    # ServiceItem interface
│   │   ├── data/                     # 4 Core Concierge Services data
│   │   └── components/
│   │       ├── ServiceCard.tsx       # Multi-plane elevated 2x2 cards with teal icons & gold badges
│   │       └── ServicesSection.tsx
│   ├── credentials/
│   │   └── components/
│   │       └── CredentialsSection.tsx# 21 years medical & financial experience + CompTIA A+ certification
│   ├── pricing/
│   │   └── components/
│   │       └── PricingSection.tsx    # Gold-bordered spotlight card ($140/hr + $119/hr)
│   ├── how-it-works/
│   │   └── components/
│   │       └── HowItWorksSection.tsx # 3-step numbered progression with recessed watermarks
│   ├── booking/
│   │   ├── types/                    # BookingFormData & BookingSubmissionResult
│   │   ├── services/
│   │   │   └── bookingService.ts     # FormSubmit.co integration + LocalStorage audit trail
│   │   └── components/
│   │       └── BookingSection.tsx    # Lead capture form with instant reference confirmation
│   └── footer/
│       └── components/
│           └── Footer.tsx            # Deep Trust Navy footer with phone, copyright, and Evergreen Strategy credit
├── App.tsx                           # Root orchestrator with smooth scrolling
├── index.css                         # Tailwind CSS v4 @theme color token & spatial depth utilities
└── main.tsx                          # React 19 entry point
```

---

## 📬 FormSubmit.co Integration

The booking form is wired directly to **[FormSubmit.co](https://formsubmit.co)** via clean asynchronous AJAX (`fetch`):

1. **Zero Redirects:** Customers stay on your page and immediately see their confirmed **`Ref #CCS-XXXXXX`** receipt screen.
2. **Setup Your Destination Email:**
   - In `.env`, set:
     ```bash
     VITE_FORMSUBMIT_EMAIL=your-real-email@example.com
     ```
   - On the very first form submission, FormSubmit sends an activation email to that address. Click the link once to activate instant inbox alerts for all future submissions!
3. **Double Redundancy:** All leads are simultaneously backed up in the browser's `localStorage` (`ccs_local_leads`) so no customer inquiry is ever lost.

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

### 4. Deploy to Firebase Hosting
```bash
npm run build
npx firebase deploy --only hosting
```
