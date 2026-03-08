# Website 2.0 - Nail Salon Digital Ecosystem

> **Mô tả:** Hệ sinh thái kỹ thuật số toàn diện dành cho Salon, kết hợp giữa "Thương hiệu chuyên gia" và "Trải nghiệm khách hàng tối ưu" (Clean Girl Aesthetic).

---

## 📋 Tổng quan dự án (Project Overview)

- **Mục tiêu**: Chuyển đổi người xem thành lịch hẹn thực tế thông qua hệ thống đặt lịch thông minh và trải nghiệm thị giác cao cấp.
- **Phong cách**: Minimalist, Aesthetic, Glassmorphism (trong veo như mặt kính), hiện đại và sạch sẽ.
- **Dự án**: WEB (Next.js 15+ App Router).

---

## 🎯 Tiêu chí thành công (Success Criteria)

1. **Hệ thống đặt lịch (Smart Booking)**: Hỗ trợ đặt cọc, thông báo tự động (vía SMS/Email/WhatsApp).
2. **Bộ lọc Tư vấn ảo (Virtual Consultant)**: Tìm mẫu nail theo dáng tay, màu da, xu hướng.
3. **Blog Chuyên gia**: CMS quản lý bài viết về kỹ thuật và kiến thức an toàn salon.
4. **Mobile-First & SEO**: Điểm Lighthouse > 95, tối ưu SEO Local hạng #1.

---

## 🛠️ Công nghệ (Tech Stack)

| Thành phần | Công nghệ | Lý do lựa chọn |
| :--- | :--- | :--- |
| **Frontend Framework** | `Next.js (App Router)` | Tối ưu SEO, Web Vitals, Server Components mạnh mẽ. |
| **Styling** | `Tailwind CSS v4` | CSS-first configuration, hiệu năng cao, linh hoạt thiết kế. |
| **Database (Free)** | **Supabase (PostgreSQL)** | Free Tier cực tốt, hỗ trợ Auth, Storage và Real-time sẵn có. |
| **Animations** | `Framer Motion` | Micro-animations mượt mà cho cảm giác Premium. |
| **Icons & Font** | `Lucide React` & `Google Fonts` | Sans-serif hiện đại, tối giản. |

---

## 🏗️ Cấu trúc thư mục (File Structure)

```plaintext
Website-2.0/
├── app/                  # Next.js App Router
├── components/           # UI Components (Glassmorphism)
│   ├── booking/          # Logic đặt lịch
│   ├── gallery/          # Portfolio tư vấn ảo
│   └── shared/           # Header/Footer, Layouts
├── lib/                  # Utils, API clients (Supabase)
├── types/                # TypeScript interfaces
├── content/              # Blog posts (Markdown/Mdx)
├── public/               # Videos, high-res images
└── tailwind.config.ts    # Tailwind v4 configuration
```

---

## 📝 Phân chia nhiệm vụ (Task Breakdown)

### P0: Nền tảng & Cơ sở dữ liệu (Foundation & DB)
- **TID-001: Khởi tạo dự án Next.js 15+ & Tailwind v4**
  - **Agent**: `orchestrator`
  - **Skill**: `app-builder`
  - **INPUT→OUTPUT→VERIFY**: `Empty Dir` → `Base project` → `npm run dev` success.
- **TID-002: Thiết kế Schema Database trên Supabase**
  - **Agent**: `database-architect`
  - **Skill**: `database-design`
  - **INPUT→OUTPUT→VERIFY**: `Requirements` → `SQL Schema (users, appointments, gallery, blog)` → `Schema validation`.

### P1: Giao diện & Trải nghiệm (UI/UX - Clean Girl Aesthetic)
- **TID-003: Xây dựng Design System (Glassmorphism & Typography)**
  - **Agent**: `frontend-specialist`
  - **Skill**: `frontend-design`
  - **INPUT→OUTPUT→VERIFY**: `Styles` → `Global CSS & Color Tokens` → `UI Layout audit`.
- **TID-004: Portfolio "Tư vấn ảo" (Advanced Filtering)**
  - **Agent**: `frontend-specialist`
  - **Skill**: `ui-ux-pro-max`
  - **INPUT→OUTPUT→VERIFY**: `Gallery Assets` → `Filtered Grid` → `Filter logic correctness`.

### P2: Logic nghiệp vụ (Business Logic)
- **TID-005: Logic Đặt lịch & Tích hợp Thanh toán (Stripe/PayOS/Manual)**
  - **Agent**: `backend-specialist`
  - **Skill**: `api-patterns`
  - **INPUT→OUTPUT→VERIFY**: `Booking flow` → `API routes` → `Mock payment success`.
- **TID-006: CMS Blog Chuyên gia**
  - **Agent**: `backend-specialist`
  - **Skill**: `documentation-templates`
  - **INPUT→OUTPUT→VERIFY**: `Blog content` → `MDX Dynamic Routes` → `Lighthouse SEO Score`.

### P3: Tối ưu hóa & Bảo mật (Optimization & Security)
- **TID-007: Kiểm thử bảo mật & Phân quyền (Supabase RLS)**
  - **Agent**: `security-auditor`
  - **Skill**: `vulnerability-scanner`
  - **INPUT→OUTPUT→VERIFY**: `Code` → `RLS Policies` → `Auth test pass`.
- **TID-008: Local SEO & Performance Audit**
  - **Agent**: `seo-specialist`
  - **Skill**: `seo-fundamentals`
  - **INPUT→OUTPUT→VERIFY**: `Metatags` → `Sitemap/JSON-LD` → `Rank analysis`.

---

## ✅ PHASE X: VERIFICATION (Kiểm định cuối cùng)

- [ ] **Lint & Type Check**: `npm run lint` & `tsc --noEmit`
- [ ] **Security Scan**: `python .agent/scripts/security_scan.py .`
- [ ] **UX Audit**: `python .agent/scripts/ux_audit.py .` (Aesthetic & Glassmorphism)
- [ ] **Lighthouse Performance**: Web Vitals > 90
- [ ] **Mobile-First Check**: Viewport responsiveness on iOS/Android simulators.

---

## ✅ PHASE X COMPLETE
- Lint: ⚪ Pending
- Security: ⚪ Pending
- Build: ⚪ Pending
- Date: 2026-03-07
