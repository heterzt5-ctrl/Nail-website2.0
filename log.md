# Project Log: Website 2.0

> This file tracks the evolution, design decisions, and implementation milestones of the Website 2.0 project.

---

## 📅 March 07, 2026 - Phase 1 & 2: Infrastructure & Vibrant Overhaul

### 🏗️ 1. Core Infrastructure
- **Tech Stack**: Next.js (App Router), Tailwind CSS v4, Framer Motion, Lucide React.
- **Database Architecture**: 
  - Defined `schema.prisma` with models for `User`, `Client`, `Service`, `Appointment`, `GalleryItem`, and `BlogPost`.
  - Integrated Supabase & Prisma Client.
- **Project Structure**: Organized components into `shared`, `gallery`, `booking`, and `blog` modules.

### 🎨 2. Vibrant & Energetic UI Overhaul
- **Design Philosophy**: Shifted from minimalist to a "Vibrant Energetic Lively" aesthetic using Pink (#EC4899), Orange (#F97316), and Purple (#8B5CF6).
- **Global Styles (`globals.css`)**:
  - Implemented `gradient-mesh` and `glass-vibrant` utility classes.
  - Added Design Tokens for the new color palette.
- **Typography**: Integrated `Noto Sans KR` via `layout.tsx` for a clean, professional beauty-tech look.

### 🧩 3. Component Deep-Dive
- **Header (`header.tsx`)**:
  - Rebranded with vibrant accents and modern navigation.
  - Integrated `LanguageSwitcher` into the primary identity slot.
- **Hero (`hero.tsx`)**:
  - Added pulsing background shapes and bold, high-contrast typography.
  - Implemented multi-language translation support.
- **Virtual Consultant (`virtual-consultant.tsx`)**:
  - Revamped gallery with animated cards and vibrant tabbed filters for Skin Tone & Hand Shape.
- **Services Menu (`services-menu.tsx`)**:
  - NEW: Energetic pricing cards for Glass Nails, 3D Art, and Recovery Rituals.
- **Booking Flow (`booking-modal.tsx`)**:
  - **Strategy Shift**: Removed mandatory deposit to increase conversion.
  - **Owner Notification**: Created a high-fidelity iPhone mockup simulation showing instant "New Appointment" push notifications for the salon owner.
- **Map Section (`map-section.tsx`)**:
  - Built a stylized mockup of a Google Map centered in District 1, Saigon.
- **Footer (`footer.tsx`)**:
  - NEW: Comprehensive multi-column footer with social links, newsletter, and full navigation.

### 🌐 4. Internationalization (i18n)
- **Languages supported**: 🇻🇳 VN (Default), 🇺🇸 EN, 🇰🇷 KR, 🇨🇳 CN, 🇷🇺 RU.
- **Engine**: Implemented `language-context.tsx` and a custom `LanguageSwitcher` UI.
- **Integration**: Fully translated Header, Hero, Services, and Filter controls across all 5 languages.

---

## 📅 April 24, 2026 - Phase 3: The Digital Atelier & Stitch Integration

### 💎 1. Luxury Design System Pivot
- **Creative North Star**: Shifted from "Vibrant Energetic" to **"The Digital Atelier"** focusing on **"Visual Silence"**.
- **Stitch Synchronization**: Successfully connected and synchronized the design system via **Stitch MCP**.
- **Palette Update**: 
  - REMOVED: Pink, Orange, and Purple vibrant theme.
  - ADOPTED: **Champagne Gold (#735C00)**, **Cloud Dancer (#FBF9F4)**, and **Metallic Silver (#5D5E5F)**.
- **Typography**: Transitioned to **Noto Serif** for headlines (Editorial/Luxury feel) and **Inter** for body text.

### 📐 2. Editorial Layout Implementation
- **Layout Philosophy**: Adopted the **"No-Line" Rule**—removing 1px borders in favor of tonal layering for sectioning.
- **Asymmetry**: Implemented intentional asymmetric grids for the Portfolio/Gallery to mimic high-end fashion editorials.
- **Glassmorphism Refinement**: Updated floating elements with 80% opacity and 20px backdrop-blur using the new `surface_container_lowest` (#ffffff).

### 🧩 3. Component Refactoring
- **Buttons**: Updated to gradient metallic gold fills and "Ghost Borders" for secondary actions.
- **Inputs**: Refined to a minimalist "underline-only" style with Gold focus states.
- **Hero Section**: Redesigned with extreme white space and oversized serif typography for a premium first impression.

### 🌐 4. i18n & Content
- Verified translation support for the new design system across all 5 languages (VN, EN, KR, CN, RU).

---

## 🛠️ Assets & Design System (Stitch)
- Design Tokens synced from Stitch Project: `REMY MUSE`.
- New Ambient Shadows: 5% opacity shadows tinted with `#1B1C19` for organic depth.

## 📅 May 12, 2026 - Phase 4: Dynamic Systems & Luxury Refinement

### 🚀 1. Advanced Backend Integrations
- **Telegram Booking Notifications**: Implemented real-time alerts for the salon owner. Includes a robust fallback mechanism to ensure notifications are sent even if the primary database connection is unstable.
- **Prisma Stability**: Resolved Vercel deployment issues by implementing lazy Prisma client initialization, preventing crashes during Next.js build-time data collection.
- **Supabase Gallery**: Integrated Supabase Storage and database policies for a secure, dynamic media management system. Transitioned from static assets to a database-driven gallery.

### 🎭 2. Editorial & Interactive Excellence
- **Luxury Hero Evolution**: Enhanced the hero section with editorial-grade staggered animations and asymmetric grid layouts, aligning with the "Visual Silence" design system.
- **Interactive Portfolio**: Updated the gallery masonry grid to use real brand assets (`RemyMuse-nail1.jpeg` to `12.jpeg`) and added dynamic loading states.
- **Virtual Consultant Refinement**: Polished the animated filters for Skin Tone and Hand Shape, ensuring smooth transitions and high-fidelity visuals.

### 📅 3. Service & Booking Optimization
- **Category Reorganization**: Modernized the booking catalog into three clear pillars:
  - Manicure & Pedicure
  - Basic Designs
  - Hair Wash & Relaxation
- **UI/UX Polish**: Improved the booking modal with accordion-style layouts for better service selection and a cleaner mobile experience.

### 🛠️ 4. Stability & Quality Assurance
- **TypeScript Optimization**: Performed a comprehensive sweep to resolve type errors in `prisma.config.ts`, API routes, and client-side components.
- **Map Section**: Refined the stylized map integration in District 1, Saigon, for better brand alignment.

---

## 📅 May 16, 2026 - Phase 5: Editorial System & Supabase Migration

### 🗞️ 1. Editorial Content System (Supabase-backed)
- **Architecture**: Built a full editorial pipeline — `PostsTable` (Supabase) → `editorial/page.tsx` (list) → `editorial/[slug]/page.tsx` (article).
- **Dynamic Fetching**: `EditorialPage`, `EditorialArticlePage`, and `BlogPreview` all fetch live data from the `posts` table instead of mock data.
- **Schema Sync**: Aligned frontend data structures with the Supabase schema — handled multilingual content fields (`title_vn`, `title_en`, etc.) and image URL resolution.
- **Admin Portal**: Created `/admin/editorial` portal for content management, with `/admin/login` auth gate.
- **Static Data Layer**: Added `src/lib/data/` for structured local fallback content while Supabase is being populated.

### 🖼️ 2. Editorial Article UX — Premium Reading Experience
- **Layout**: Transitioned from standard two-column to single-column reading at 860px max-width.
- **Hero Image**: Full-bleed "cinematic breakout" between metadata and body — uses `padding-bottom` ratio hack + `object-contain` to prevent layout shifts.
- **Lightbox Modal**: Built scroll-triggered image zoom lightbox with zoom controls relocated to the top bar, translucency panel, and responsive layout.
- **Stability**: `max-w-[75vw]` constraint on hero images prevents viewport overflow.

### 🐛 3. Compilation Error Resolution
- Fixed Framer Motion type errors (`ease: number[]` → proper `Easing` types) across `article-client.tsx`.
- Removed stale `@ts-expect-error` directives in `gallery/page.tsx`.
- Consolidated multilingual data access to match current Supabase schema (removed legacy VN/EN ternary pattern).

### 🌐 4. Localization Engine Upgrade
- Migrated all legacy `language === 'VN' ? ... : ...` conditional code into the centralized `LanguageContext` `t()` engine.
- Completed Korean (KR) and Chinese (CN) translation keys for Booking Modal and Gallery interface.
- Synchronized English keys across all 5 language files (VN, EN, KR, CN, RU).

### 🗺️ 5. Map Section Asset Update
- Replaced placeholder map image in `map-section.tsx` with local `Location.webp` for brand-aligned location discovery experience.

---

## 📅 May 17, 2026 - Phase 6: Services Menu & Typography Polish

### 📖 1. Editorial Typography Refinement (`article-client.tsx`)
- **Line Height**: Reduced body paragraph `leading` from `leading-[2]` (double-spaced) to **`leading-[1.6]`** — tighter, more premium editorial rhythm.
- **Paragraph Spacing**: Reduced `space-y-8` (32px) → **`space-y-4` (16px)** on the body paragraph container for unified text flow.
- **Empty Line Elements**: Reduced empty line `<div>` height from `h-8` to **`h-2` (8px)** — eliminating the "air pocket" effect that diluted reading continuity.
- **Result**: Consecutive paragraphs are 16px apart; blank-line separators now 40px total (vs. previous ~96px).

### 🖼️ 2. Services Menu — Image Migration (`services-menu.tsx`)
- **Before**: 4 external Google CDN placeholder URLs (unreliable, slow, external dependency).
- **After**: 4 local high-quality JPGs from `public/images/menu03/`:

| Section | ID | Asset |
|---|---|---|
| Muse / Nail | `nail` | `/images/menu03/menu-01.JPG` |
| Art Essential | `art-essential` | `/images/menu03/menu-02.JPG` |
| Art Bespoke | `art-bespoke` | `/images/menu03/menu-03.JPG` |
| Ritual | `ritual` | `/images/menu03/menu-04.JPG` |

- **Next.js Config**: Images served via `/images/menu03/` from `public/` directory — no additional domain config required.
- **Display**: `object-cover` with `object-center` focus point maintained on `aspect-video` (16:9) container.

### ✨ 3. Services Menu — Scroll-Reveal Color Wash Effect (`services-menu.tsx`)
- **Removed**: `grayscale` CSS filter approach (expensive GPU composite layer, conflicts with hover state).
- **Implemented**: Option A — Scroll-triggered **color wash overlay** using Framer Motion `motion.div`:
  - Initial overlay: `bg-cloud/80` at `opacity: 0.75`
  - On scroll into view (`amount: 0.5`): fades to `opacity: 0` over `1.2s easeOut`
  - Hover shimmer (`bg-ink/10`) operates independently without state conflict
- **Performance wins**: GPU-only `opacity` property vs. `filter: grayscale()` — no layout recalculation.
- **Viewport config**: Updated from `{ once: true }` to `{ once: true, amount: 0.3 }` on parent card for more reliable scroll triggering.

---

## 📌 Current Status — May 17, 2026

| Area | Status | Notes |
|---|---|---|
| **UI/UX Design** | ✅ 98% | Typography, spacing, animations all refined |
| **Editorial System** | ✅ 95% | Supabase-backed, admin portal live |
| **Services Menu** | ✅ 100% | Local assets, color wash scroll effect |
| **i18n (5 languages)** | ✅ 95% | All keys migrated to `t()` engine |
| **Backend / API** | ✅ 90% | Telegram notifications, Supabase bookings |
| **Deployment** | ✅ Stable | Vercel — Prisma lazy init, build errors resolved |

### 📁 Key Assets
- `public/images/menu03/` — 4 menu section JPGs (menu-01 to menu-04)
- `public/images/catalog/` — 9 catalog pages (01.jpg to 09.jpg)
- `public/Location.webp` — Map section brand image
- `public/images/hero-main.jpeg` — Hero section

### ⚠️ Known Pre-existing Issues (not introduced this session)
- `src/app/editorial/[slug]/article-client copy.tsx` — Legacy backup file with Framer Motion type errors (`ease: number[]`). **Not used in production** — safe to delete when confirmed.
- `src/app/gallery/page.tsx` — Stale `@ts-expect-error` directive (unused). Minor cleanup needed.

---
*Log updated: May 17, 2026 @ 11:52 ICT*

