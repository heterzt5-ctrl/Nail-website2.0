# Danh sách Hình ảnh Cần Thay thế cho REMY MUSE Nail Studio

Dưới đây là tổng hợp tất cả các hình ảnh placeholder (hình minh hoạ tạm thời) đang được sử dụng trong dự án website của bạn. Để thay thế bằng hình ảnh thực tế của tiệm, hãy chuẩn bị các file ảnh theo đúng yêu cầu về kích thước và tỷ lệ (aspect ratio) để đảm bảo giao diện hiển thị đẹp nhất.

---

## 1. Hình ảnh Trang chủ (Homepage)

### 1.1 Hero Section (Phần đầu tiên khi vào web)
Đây là phần quan trọng nhất, tạo ấn tượng đầu tiên cho khách hàng.
- **Vị trí trong code**: `src/components/shared/hero.tsx`
- **Số lượng**: 2 ảnh (hiện đang dùng link Google lh3).
- **Yêu cầu**:
  - **Ảnh 1 (Main)**: Nên là ảnh chụp người mẫu làm nail hoặc không gian tiệm cực kỳ sắc nét.
    - **Tỷ lệ**: Khuyên dùng 3:4 (Portrait/Dọc) hoặc 4:5 để hiển thị tốt trên cả mobile.
    - **Chất lượng**: Độ phân giải cao (tối thiểu 1200x1600px).
  - **Ảnh 2 (Secondary)**: Ảnh nhỏ hơn trôi nổi bên cạnh.
    - **Tỷ lệ**: 1:1 (Vuông) hoặc 4:5.
    - **Gợi ý nội dung**: Cận cảnh (macro) một bộ móng xuất sắc hoặc dụng cụ làm nail cao cấp.

### 1.2 Visual Break / Moodboard Section
Phần ba bức ảnh xếp cạnh nhau tạo cảm giác tạp chí (editorial).
- **Vị trí trong code**: `src/components/shared/visual-break.tsx`
- **Số lượng**: 3 ảnh.
- **Yêu cầu**:
  - **Tỷ lệ**: Nên chuẩn bị 2 ảnh dọc (Portrait 3:4 hoặc 4:5) và 1 ảnh ngang (Landscape 16:9).
  - **Gợi ý nội dung**: Ảnh không gian tiệm, góc chill, hoặc ảnh chi tiết quá trình làm móng. Cần cùng một tone màu sắc (ví dụ: tone ấm, beige) để tạo sự đồng bộ.

### 1.3 Map & Location Section
Hình ảnh minh hoạ cho địa chỉ của tiệm.
- **Vị trí trong code**: `src/components/shared/map-section.tsx`
- **Số lượng**: 1 ảnh.
- **Yêu cầu**:
  - **Tỷ lệ**: Ngang (Landscape 16:9 hoặc 3:2).
  - **Gợi ý nội dung**: Ảnh mặt tiền của tiệm (Storefront) hoặc không gian sảnh chờ (Lobby). Độ phân giải tối thiểu 1600x900px.

---

## 2. Trang Thư viện (Gallery Page)

### 2.1 Masonry Grid & Virtual Consultant
Các hình ảnh hiển thị trong lưới thư viện lộn xộn (Masonry) và công cụ tư vấn ảo.
- **Vị trí trong code**: `src/app/gallery/page.tsx` và `src/lib/mock-data.ts`
- **Số lượng**: Khoảng 8 ảnh (hiện đang dùng link Unsplash và `/gallery/nail-*.png`).
- **Yêu cầu**:
  - **Tỷ lệ**: Vì là layout Masonry (các thẻ có chiều cao khác nhau), bạn cần đa dạng tỷ lệ ảnh:
    - 40% ảnh dọc (Portrait 3:4 hoặc 4:5) - Dùng cho các mẫu nail dài, chi tiết.
    - 30% ảnh vuông (Square 1:1) - Dùng cho các mẫu nail cơ bản.
    - 30% ảnh ngang (Landscape 4:3 hoặc 3:2) - Dùng cho ảnh chụp cả 2 bàn tay.
  - **Gợi ý nội dung**: Đảm bảo ánh sáng đồng đều. Nếu có nền, nên dùng màu nền trung tính (trắng, be, xám) để làm nổi bật bộ nail.

### 2.2 AR Try-On Experience
Phần tính năng thử móng ảo.
- **Vị trí trong code**: `src/components/ar-experience/ar-try-on.tsx`
- **Số lượng**: 1 ảnh.
- **Yêu cầu**:
  - **Tỷ lệ**: Dọc (Portrait 4:5 hoặc 9:16).
  - **Gợi ý nội dung**: Cực kỳ quan trọng: Đây phải là **ảnh chụp bàn tay khách hàng đặt trên mặt phẳng, xòe đều các ngón tay**, ánh sáng sáng rõ, không đổ bóng quá gắt để UI có thể ghép móng giả lên trên một cách tự nhiên.

### 2.3 Vortex AI Ecosystem (Ma trận cuộn xoay 3D)
Hiệu ứng 24 bức ảnh bay lơ lửng trong không gian 3D.
- **Vị trí trong code**: `public/gallery/vortex/nail_01.jpg` đến `nail_24.jpg` (khai báo tại `src/components/gallery/vortex/types.ts`)
- **Số lượng**: Đúng 24 ảnh.
- **Yêu cầu Kỹ thuật (Rất quan trọng)**:
  - **Tỷ lệ bắt buộc**: **4:5 (Portrait)** (Kích thước gốc mà Engine đang tối ưu là 256x320px). Mọi ảnh không đúng tỷ lệ 4:5 sẽ bị class WebGL tự động xử lý, có thể gây mất chi tiết hoặc tạo khoảng trống đen.
  - **Độ phân giải**: Không cần quá cao để tránh lag hệ thống 3D. Khuyến nghị mỗi ảnh khoảng `512x640px` đến `800x1000px`, dung lượng dưới 200KB/ảnh.
  - **Format**: `.jpg` hoặc `.webp` để tối ưu tốc độ tải.
  - **Tên file**: Hãy đặt tên chuẩn `nail_01.jpg` đến `nail_24.jpg` rồi dán vào thư mục `public/gallery/vortex/` để ghi đè (hoặc cập nhật đường dẫn trong `types.ts`).

---

## Tóm tắt Quy trình Thay ảnh:

1. **Chuẩn bị file**: Cắt và nén toàn bộ hình ảnh theo danh sách trên.
2. **Xóa Placeholder cũ**: Xóa các file mẫu trong thư mục `public/gallery/` và `public/gallery/vortex/`.
3. **Thêm Ảnh mới**: Đưa các ảnh mới của Remy Muse vào thư mục tương ứng trong `public/`.
4. **Cập nhật URL**: Mở các file code đã ghi chú (như `mock-data.ts`, `hero.tsx`, v.v.) và đổi đường dẫn URL Unsplash/Google sang đường dẫn local mới (ví dụ: `/images/home/hero-main.jpg`).
