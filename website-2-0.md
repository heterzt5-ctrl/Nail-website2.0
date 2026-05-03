# Website 2.0 - REMY MUSE Digital Atelier

> **Mô tả:** Hệ sinh thái kỹ thuật số toàn diện dành cho Salon, kết hợp giữa "Thương hiệu chuyên gia" và "Trải nghiệm thị giác xa xỉ" (The Digital Atelier).

---

## 📋 Tổng quan dự án (Project Overview)

- **Mục tiêu**: Chuyển đổi người xem thành lịch hẹn thực tế thông qua trải nghiệm "Visual Silence" (Sự im lặng thị giác) và phong cách Editorial cao cấp.
- **Phong cách**: Minimalist Luxury, Editorial, Visual Silence, Tonal Layering.
- **Hệ thống thiết kế**: Được đồng bộ hóa trực tiếp qua **Stitch MCP**.
- **Dự án**: WEB (Next.js 15+ App Router).

---

## 🎯 Tiêu chí thành công (Success Criteria)

1. **Visual Silence**: Giao diện tối giản, tập trung vào khoảng trống (white space) và nghệ thuật sắp đặt.
2. **Hệ thống đặt lịch (Smart Booking)**: Quy trình tinh gọn, tích hợp thông báo tự động.
3. **Bộ lọc Tư vấn ảo (Virtual Consultant)**: Tìm mẫu nail theo dáng tay, màu da, xu hướng với giao diện Gallery cao cấp.
4. **Editorial Content**: Blog chuyên gia với bố cục tạp chí thời trang.
5. **Mobile-First & SEO**: Điểm Lighthouse > 95, tối ưu SEO Local hạng #1.

---

## 🛠️ Công nghệ (Tech Stack)

| Thành phần | Công nghệ | Lý do lựa chọn |
| :--- | :--- | :--- |
| **Design Engine** | `Stitch MCP` | Đồng bộ hóa Design Tokens và UI trực tiếp từ hệ thống thiết kế. |
| **Frontend Framework** | `Next.js (App Router)` | Tối ưu SEO, Web Vitals, Server Components mạnh mẽ. |
| **Styling** | `Tailwind CSS v4` | CSS-first configuration, hiệu năng cao, linh hoạt thiết kế. |
| **Database** | `Supabase (PostgreSQL)` | Auth, Storage và Real-time sẵn có, kết hợp Prisma ORM. |
| **Animations** | `Framer Motion` | Micro-animations "weighted" tạo cảm giác đắt tiền. |
| **Typography** | `Noto Serif` & `Inter` | Sự kết hợp giữa nét cổ điển sang trọng và hiện đại sắc nét. |

---

## 🎨 Design Tokens (Stitch)

- **Primary**: `#735C00` (Champagne Gold) - Metallic shimmer accents.
- **Surface**: `#FBF9F4` (Cloud Dancer) - Soft linen base.
- **Secondary**: `#5D5E5F` (Metallic Silver) - Muted utility info.
- **Rules**: 
  - **No-Line Rule**: Phân chia vùng bằng sắc độ màu (Tonal Layering), không dùng border 1px.
  - **Editorial Flow**: Bố cục bất đối xứng, hình ảnh tràn viền hoặc đặt lệch tâm.

---

## 🏗️ Cấu trúc thư mục (File Structure)

```plaintext
Website-2.0/
├── app/                  # Next.js App Router
├── components/           # UI Components (Editorial Style)
│   ├── booking/          # Logic đặt lịch tinh gọn
│   ├── gallery/          # Portfolio Visual Silence
│   └── shared/           # Header/Footer, Layouts
├── design-system/        # Stitch design tokens & documentation
├── lib/                  # Utils, API clients (Supabase, Prisma)
├── content/              # Blog posts (Markdown/Mdx)
└── tailwind.config.ts    # Tailwind v4 configuration
```

---

## 📝 Phân chia nhiệm vụ (Task Breakdown)

### P0: Nền tảng & Stitch Integration
- **TID-001: Kết nối Stitch MCP & Áp dụng Design Tokens**
  - **Agent**: `orchestrator`
  - **Skill**: `app-builder`
  - **VERIFY**: Các biến CSS màu Champagne Gold và font Noto Serif hoạt động.
- **TID-002: Refactor Layout sang phong cách Editorial**
  - **Agent**: `frontend-specialist`
  - **VERIFY**: Loại bỏ toàn bộ border 1px, áp dụng Tonal Layering.

### P1: Giao diện & Trải nghiệm (Luxury Experience)
- **TID-003: Xây dựng Hero Section (Visual Silence)**
  - **VERIFY**: Khoảng trống lớn, typography Display Serif nổi bật.
- **TID-004: Portfolio "Tư vấn ảo" (Asymmetric Grid)**
  - **VERIFY**: Bố cục lưới không đối xứng, hiệu ứng hover mượt mà.

---

## ✅ PHASE X: VERIFICATION

- [ ] **Stitch Sync**: Đảm bảo UI khớp 100% với Stitch Design.
- [ ] **Contrast Check**: Đảm bảo khả năng truy cập (WCAG AA).
- [ ] **Lighthouse Performance**: Web Vitals > 95.
- [ ] **Mobile-First**: Tối ưu hiển thị trên iPhone/Android với cảm giác Premium.
