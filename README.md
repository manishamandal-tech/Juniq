# JG University — Modern Landing Page




---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework, routing, font optimization |
| TypeScript | Type-safe components |
| Tailwind CSS | Utility-first responsive styling |
| Lucide React | Clean SVG icons |
| CSS Animations | Scroll reveals, marquee, shimmer |

---

## 📁 Project Structure

```
jguni-landing/
├── app/
│   ├── globals.css         ← Global styles, animations, utilities
│   ├── layout.tsx          ← Root layout, fonts (Playfair Display + DM Sans), metadata
│   └── page.tsx            ← Main page — assembles all 10 sections
│
├── components/
│   ├── Navbar.tsx          ← Sticky glassmorphism navbar + mobile hamburger
│   ├── Hero.tsx            ← Bold split hero with count-up stats
│   ├── About.tsx           ← Two-column about with animated numbers
│   ├── Programmes.tsx      ← Tabbed programme cards (UG/PG/PhD/Cert)
│   ├── Strengths.tsx       ← 8 strength cards with hover effects
│   ├── Partners.tsx        ← Infinite marquee + placement stats
│   ├── Testimonials.tsx    ← Auto-rotating carousel with controls
│   ├── FAQ.tsx             ← Accordion with sticky left panel
│   ├── CTA.tsx             ← Shimmer banner + apply CTA
│   └── Footer.tsx          ← 4-column footer with newsletter
│
├── package.json
├── tailwind.config.ts      ← Custom colors, fonts, animations
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## ⚙️ Setup Instructions

### Step 1 — Install Node.js
Download and install Node.js (v18 or above) from:
👉 https://nodejs.org/

### Step 2 — Open Terminal / Command Prompt
Navigate to the project folder:
```bash
cd jguni-landing
```

### Step 3 — Install Dependencies
```bash
npm install
```
This installs Next.js, Tailwind CSS, Lucide React and all other packages.

### Step 4 — Run Development Server
```bash
npm run dev
```
Open your browser and go to: **http://localhost:3000**

### Step 5 — Build for Production
```bash
npm run build
npm start
```

---

## 🎨 Design System

### Colors
| Variable | Hex | Usage |
|---|---|---|
| `jg-navy` | `#0a0a14` | Primary background |
| `jg-navy-2` | `#0d1b3e` | Section backgrounds |
| `jg-gold` | `#d4af37` | Primary accent, CTA |
| `jg-gold-light` | `#f0d060` | Gradient highlights |
| `jg-gold-dark` | `#b8941f` | Button gradients |

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body**: DM Sans (clean, modern)

---

## 📱 Responsive Breakpoints

| Breakpoint | Size | Device |
|---|---|---|
| Default | 0px+ | Mobile phones |
| `sm:` | 640px+ | Large phones |
| `md:` | 768px+ | Tablets |
| `lg:` | 1024px+ | Laptops |
| `xl:` | 1280px+ | Desktops |
| `2xl:` | 1536px+ | Large monitors |

---

## ✨ Features

- ✅ **10 complete sections**: Navbar, Hero, About, Programmes, Strengths, Partners, Testimonials, FAQ, CTA, Footer
- ✅ **Fully responsive** — works on all screen sizes
- ✅ **Sticky glassmorphism Navbar** with mobile hamburger menu
- ✅ **Animated count-up numbers** triggered on scroll
- ✅ **Tabbed Programmes section** — UG / PG / Doctoral / Certificate
- ✅ **Infinite auto-scrolling marquee** for partners
- ✅ **Auto-rotating testimonials carousel** with pause on hover
- ✅ **Smooth accordion FAQ** with sticky info panel
- ✅ **Shimmer CTA banner** with gradient animation
- ✅ **Scroll-reveal animations** on all sections
- ✅ **Custom scrollbar** styled in gold
- ✅ **Dark theme** throughout with gold accent system
- ✅ **Clean TypeScript code** — no any types

---

## 🌐 Sections Overview

1. **Navbar** — Logo, nav links, Apply Now CTA, mobile hamburger
2. **Hero** — Headline, subtext, CTA buttons, animated stat grid
3. **About** — Split layout, floating badges, count-up mini stats
4. **Programmes** — Tab switcher with 6 cards per category
5. **Strengths** — 8 colored icon cards with hover animations
6. **Partners** — Dual marquee rows + placement statistics
7. **Testimonials** — 6 real alumni, carousel with dot controls
8. **FAQ** — 8 questions, accordion, sticky contact panel
9. **CTA** — Full-width shimmer banner, 3 action buttons
10. **Footer** — Brand, Programmes, Quick Links, Newsletter

---

## 📝 Assignment Details

- **Course**: MCA Semester II
- **Subject**: Web Technologies / Frontend Development
- **Inspiration**: jguni.in (JG University)
- **Stack**: Next.js + Tailwind CSS + TypeScript

---

*Built with ❤️ — JG University Redesign Project*
