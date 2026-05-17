# Editorial Dynamic System Implementation Plan

## 🎯 Mục Tiêu (Objective)
Chuyển đổi hệ thống tin tức (Editorial/Blog) từ dạng mock-data (dữ liệu cứng) sang dạng động (dynamic). Xây dựng trang Admin quản lý bài viết có tích hợp bảo mật (Supabase Auth) và hệ thống lưu trữ ảnh (Supabase Storage). Giữ nguyên cấu trúc dữ liệu đa ngôn ngữ hiện tại (`body: { VN: "...", EN: "..." }`).

---

## 🏗️ Kiến Trúc Cơ Sở Dữ Liệu (Database Architecture - Supabase)

### 1. Bảng `posts` (Bài Viết)
- `id` (uuid, primary key)
- `created_at` (timestampz, default now)
- `slug` (text, unique) - Dùng làm URL (VD: `safety-tpo-regulations`)
- `title_vn` (text)
- `title_en` (text)
- `excerpt_vn` (text)
- `excerpt_en` (text)
- `body_vn` (text) - Giữ nguyên format nhập liệu như mock data
- `body_en` (text) - Giữ nguyên format nhập liệu như mock data
- `category_vn` (text)
- `category_en` (text)
- `read_time_vn` (text)
- `read_time_en` (text)
- `author` (text)
- `cover_image_url` (text) - Đường dẫn ảnh từ Storage
- `is_trending` (boolean) - Để lọc bài "Editor's Pick"
- `published_date` (timestampz)

### 2. Supabase Storage Bucket
- Tạo bucket: `editorial_images` (Public bucket).

### 3. Supabase Auth
- Sử dụng authentication email/password có sẵn của Supabase cho đường dẫn `/admin`.
- Thiết lập RLS (Row Level Security) cho bảng `posts`:
  - `SELECT`: Public (ai cũng có thể đọc).
  - `INSERT`, `UPDATE`, `DELETE`: Authenticated (chỉ user đã login mới được quyền sửa/xóa).

---

## 🛠️ Các Bước Thực Hiện (Phases)

### Giai Đoạn 1: Setup Cơ Sở Dữ Liệu & Storage (Database & Storage Setup)
1. Chạy các lệnh SQL trên Supabase (thông qua Supabase Dashboard hoặc lệnh SQL tool) để tạo bảng `posts`.
2. Tạo bucket `editorial_images` cho Supabase Storage.
3. Thiết lập chính sách RLS (Row Level Security) cho bảng và bucket.
4. Cập nhật các type definitions trong TypeScript để khớp với schema mới.

### Giai Đoạn 2: Xây Dựng Trang Admin (Admin UI & Auth Guard)
1. **Auth Guard**: Tạo middleware hoặc component bọc lại route `/admin/editorial` để kiểm tra session của Supabase Auth. Nếu chưa login, redirect về trang `/admin/login`.
2. **Admin Layout**: Xây dựng UI danh sách bài viết trong `/admin/editorial`.
3. **Trang Tạo/Sửa Bài Viết**:
   - Form nhập liệu cho tất cả các field song ngữ (Title, Excerpt, Body, Category, Read Time, v.v...).
   - Checkbox cho field `isTrending`.
4. **Tích Hợp Upload Ảnh**: Component upload file ảnh lên bucket `editorial_images`, lấy public URL lưu vào trường `cover_image_url`.

### Giai Đoạn 3: Tích Hợp Frontend Cộng Đồng (Public UI Integration)
1. Tạo một file truy xuất dữ liệu: `src/lib/data/editorial.ts` (hoặc tương tự) chứa các hàm fetch `getPosts()`, `getPostBySlug()`, `getTrendingPost()`.
2. **`src/app/editorial/page.tsx`**: Đổi từ client-side mock-data filter sang Server Component fetch dữ liệu từ Supabase.
3. **`src/app/editorial/[slug]/page.tsx`**: Cập nhật logic `generateMetadata` và Server Component để fetch dữ liệu chi tiết bằng slug từ Supabase. Cập nhật `article-client.tsx` để render dữ liệu thật.
4. **`src/components/blog/blog-preview.tsx`**: Đổi component sang fetch dữ liệu (hoặc pass prop từ Server Component) để hiển thị 3 bài viết mới nhất/trending lên trang chủ.

### Giai Đoạn 4: Testing & Tinh Chỉnh (QA & Polish)
1. Đảm bảo form admin hỗ trợ việc nhập xuống dòng (`\n`) cho phần nội dung (`body`), và khi render ngoài trang chủ sẽ giữ đúng các thẻ `<br/>` hoặc đoạn văn.
2. Kiểm tra tính năng đa ngôn ngữ (VN/EN) sau khi data đổ về từ Supabase xem `LanguageContext` hoạt động chính xác không.
3. Kiểm tra responsive của bảng admin và tính năng upload ảnh.

---

## ✅ Trạng Thái (Status)
- [x] Giai đoạn 1: Database & Storage Setup
- [x] Giai đoạn 2: Admin UI & Auth Guard
- [x] Giai đoạn 3: Public UI Integration
- [x] Giai đoạn 4: Testing & Tinh Chỉnh
