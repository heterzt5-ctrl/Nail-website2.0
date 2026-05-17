export const NAIL_DESIGNS = [
    {
        id: "1",
        title: { VN: "Signature Glass", EN: "Signature Glass" },
        imageUrl: "/gallery/RemyMuse-nail1.jpeg",
        tags: { VN: ["Kính", "Xu hướng"], EN: ["Glass", "Trendy"] },
        skinTone: "Fair",
        handShape: "Almond",
        isTrending: true,
        span: "tall",
    },
    {
        id: "2",
        title: { VN: "Hoa Tráng Gương 3D", EN: "3D Chrome Flowers" },
        imageUrl: "/gallery/RemyMuse-nail2.jpeg",
        tags: { VN: ["Nghệ thuật 3D", "Chrome"], EN: ["3D Art", "Chrome"] },
        skinTone: "Tan",
        handShape: "Square",
        isTrending: true,
        span: "short",
    },
    {
        id: "3",
        title: { VN: "Hồng Phấn Tối Giản", EN: "Soft Blush Minimal" },
        imageUrl: "/gallery/RemyMuse-nail3.jpeg",
        tags: { VN: ["Tối giản", "Dịu dàng"], EN: ["Minimal", "Soft"] },
        skinTone: "Deep",
        handShape: "Round",
        isTrending: false,
        span: "short",
    },
    {
        id: "4",
        title: { VN: "Ánh Sáng Aurora", EN: "Aurora Borealis" },
        imageUrl: "/gallery/RemyMuse-nail4.jpeg",
        tags: { VN: ["Kính", "Aurora"], EN: ["Glass", "Aurora"] },
        skinTone: "Fair",
        handShape: "Almond",
        isTrending: true,
        span: "tall",
    },
    {
        id: "5",
        title: { VN: "Hồng Vàng Nhung", EN: "Velvet Rose Gold" },
        imageUrl: "/gallery/RemyMuse-nail5.jpeg",
        tags: { VN: ["Chrome", "Hồng"], EN: ["Chrome", "Rose"] },
        skinTone: "Tan",
        handShape: "Almond",
        isTrending: false,
        span: "tall",
    },
    {
        id: "6",
        title: { VN: "Thạch Anh Đen", EN: "Midnight Onyx" },
        imageUrl: "/gallery/RemyMuse-nail6.jpeg",
        tags: { VN: ["Tối giản", "Màu tối"], EN: ["Minimal", "Dark"] },
        skinTone: "Deep",
        handShape: "Square",
        isTrending: true,
        span: "short",
    },
];

export const SERVICES = [
    // Manicure & Pedicure
    {
        id: "s1",
        name: "Classic Manicure",
        name_vn: "Chăm sóc móng cơ bản",
        description: "Essential nail care, cuticle work, and shaping.",
        description_vn: "Chăm sóc móng thiết yếu, nhặt da và tạo form.",
        price: 70000,
        duration: 45,
        category: "s-muse-title"
    },
    {
        id: "s2",
        name: "Regular Polish",
        name_vn: "Sơn thường",
        description: "Standard nail polish application.",
        description_vn: "Sơn móng tay cơ bản.",
        price: 150000,
        duration: 30,
        category: "s-muse-title"
    },
    {
        id: "s3",
        name: "Gel Polish",
        name_vn: "Sơn Gel",
        description: "Long-lasting gel polish.",
        description_vn: "Sơn gel giữ màu lâu phai.",
        price: 180000,
        duration: 45,
        category: "s-muse-title"
    },
    {
        id: "s4",
        name: "Cat Eye",
        name_vn: "Sơn mắt mèo",
        description: "Magnetic cat eye gel effect.",
        description_vn: "Hiệu ứng sơn gel mắt mèo từ tính.",
        price: 220000,
        duration: 60,
        category: "s-muse-title"
    },

    // Basic Designs
    {
        id: "s5",
        name: "Full French Tip",
        name_vn: "French toàn bộ",
        description: "Classic or modern French tips on all nails.",
        description_vn: "Viền móng French cổ điển hoặc hiện đại.",
        price: 150000,
        duration: 60,
        category: "s-essential-title"
    },
    {
        id: "s6",
        name: "Full Ombre",
        name_vn: "Ombre toàn bộ",
        description: "Smooth gradient color transition.",
        description_vn: "Chuyển màu gradient mượt mà.",
        price: 150000,
        duration: 75,
        category: "s-essential-title"
    },
    {
        id: "s7",
        name: "Full Chrome",
        name_vn: "Tráng gương toàn bộ",
        description: "Metallic chrome finish.",
        description_vn: "Hiệu ứng tráng gương toàn bộ móng.",
        price: 150000,
        duration: 75,
        category: "s-essential-title"
    },
    {
        id: "s8",
        name: "Full Cat Eye",
        name_vn: "Mắt mèo toàn bộ",
        description: "Intense magnetic cat eye on all nails.",
        description_vn: "Sơn mắt mèo toàn bộ các ngón.",
        price: 150000,
        duration: 75,
        category: "s-essential-title"
    },

    // Bespoke
    {
        id: "s-bespoke",
        name: "Bespoke Artistry",
        name_vn: "Thiết kế riêng",
        description: "Custom, hand-painted sets tailored to your vision.",
        description_vn: "Mẫu vẽ tay, thiết kế riêng theo yêu cầu.",
        price: 0,
        duration: 120,
        category: "s-bespoke-title"
    },

    // Hair Wash & Relaxation
    {
        id: "s9",
        name: "Classic Shampoo",
        name_vn: "Gội đầu cơ bản",
        description: "Standard relaxing hair wash.",
        description_vn: "Gội đầu thư giãn cơ bản.",
        price: 60000,
        duration: 30,
        category: "s-ritual-title"
    },
    {
        id: "s10",
        name: "Deluxe Shampoo",
        name_vn: "Gội đầu dưỡng sinh",
        description: "Deep scalp massage and hair nourishment.",
        description_vn: "Gội đầu kết hợp massage da đầu.",
        price: 150000,
        duration: 45,
        category: "s-ritual-title"
    },
    {
        id: "s11",
        name: "Luxury Shampoo",
        name_vn: "Gội đầu hoàng gia",
        description: "Ultimate relaxation with neck and shoulder massage.",
        description_vn: "Gội đầu thư giãn hoàng gia kết hợp massage cổ vai gáy.",
        price: 250000,
        duration: 60,
        category: "s-ritual-title"
    }
];

export const BLOG_POSTS = [
    {
        id: "b1",
        title: { VN: "An Toàn Trong Làm Móng: Tại Sao TPO Lại Quan Trọng?", EN: "Understanding TPO: Why Safety Matters in 2026" },
        slug: "safety-tpo-regulations",
        excerpt: { VN: "Các quy định an toàn mới nhất tại EU và tầm ảnh hưởng đến các loại gel yêu thích của bạn.", EN: "The latest safety regulations in the EU and how it affects your favorite gels." },
        body: {
            VN: "Trong những năm gần đây, EU đã ban hành các quy định nghiêm ngặt hơn về các hóa chất được phép sử dụng trong sản phẩm làm móng, đặc biệt là nhóm hợp chất TPO (Diphenyl(2,4,6-trimethylbenzoyl)phosphine oxide). Những thay đổi này không chỉ ảnh hưởng đến nhà sản xuất mà còn trực tiếp tác động đến những dòng gel pha lê, gel builder mà bạn đang sử dụng hàng ngày.\n\nTại REMY MUSE, chúng tôi luôn cập nhật danh sách sản phẩm theo các tiêu chuẩn an toàn mới nhất, đảm bảo mỗi dịch vụ đều an toàn cho cả kỹ thuật viên và khách hàng. Hãy yên tâm — vẻ đẹp không bao giờ phải đánh đổi bằng sức khỏe.",
            EN: "In recent years, the EU has introduced stricter regulations on chemicals permitted in nail products, particularly around the compound TPO (Diphenyl(2,4,6-trimethylbenzoyl)phosphine oxide). These changes affect not just manufacturers but the very gel products you use daily — from crystal gels to builder systems.\n\nAt REMY MUSE, we stay current with all safety certifications, ensuring every service is safe for both our technicians and our clients. Beauty should never come at the cost of health."
        },
        date: { VN: "5 Tháng 3, 2026", EN: "March 5, 2026" },
        author: "Expert Maria",
        category: { VN: "Chăm sóc", EN: "Care" },
        coverImage: "/gallery/RemyMuse-nail3.jpeg",
        readTime: { VN: "4 phút", EN: "4 min read" },
        isTrending: false,
    },
    {
        id: "b2",
        title: { VN: "Móng Gương vs Móng Thạch: Đâu Là Phong Cách Của Bạn?", EN: "Glass Nails vs Jelly Nails: Which is your vibe?" },
        slug: "glass-vs-jelly-nails",
        excerpt: { VN: "Mọi điều bạn cần biết về xu hướng móng trong suốt mới nhất.", EN: "Everything you need to know about the latest transparency trends." },
        body: {
            VN: "Hai xu hướng nổi bật nhất mùa này — móng gương (glass nails) và móng thạch (jelly nails) — đều mang vẻ đẹp trong suốt huyền ảo nhưng được tạo ra theo cách hoàn toàn khác nhau.\n\nMóng gương sử dụng kỹ thuật builder gel nhiều lớp, kết hợp với các sắc tố phản chiếu để tạo ra ảo giác chiều sâu và độ bóng tuyệt đối. Móng thạch, ngược lại, đạt được hiệu ứng trong suốt tự nhiên thông qua việc pha trộn gel màu với tỷ lệ thấp, mang lại cảm giác mềm mại, nhẹ nhàng như thạch.\n\nTại REMY MUSE, cả hai đều có thể được tùy chỉnh theo tông da và hình dạng móng của bạn.",
            EN: "Two of this season's most prominent trends — glass nails and jelly nails — both deliver that covetable translucency, but are achieved in entirely different ways.\n\nGlass nails use multi-layer builder gel techniques combined with reflective pigments to create the illusion of depth and absolute shine. Jelly nails, by contrast, achieve their natural transparency through low-concentration pigment blending, resulting in a softer, more organic look.\n\nAt REMY MUSE, both styles can be fully customized to your skin tone and nail shape."
        },
        date: { VN: "28 Tháng 2, 2026", EN: "Feb 28, 2026" },
        author: "Stylist Chloe",
        category: { VN: "Xu hướng", EN: "Trends" },
        coverImage: "/gallery/RemyMuse-nail1.jpeg",
        readTime: { VN: "5 phút", EN: "5 min read" },
        isTrending: true,  // ← BÀI TRENDING (được chọn bởi editorial)
    },
    {
        id: "b3",
        title: { VN: "Kiến Trúc Của Dáng Móng Hạnh Nhân", EN: "The Architecture of the Almond Shape" },
        slug: "almond-shape-guide",
        excerpt: { VN: "Tìm hiểu sâu về lý do tại sao dáng móng hạnh nhân vẫn là lựa chọn hàng đầu cho khách hàng cao cấp.", EN: "A deep-dive into why the almond nail shape remains the most sought-after silhouette for luxury clients." },
        body: {
            VN: "Dáng móng hạnh nhân — với đường cong từ từ hội tụ về phía đỉnh nhọn — không chỉ là một lựa chọn thẩm mỹ. Đây là một quyết định có tính toán về mặt hình học. Dáng này kéo dài thị giác của ngón tay, tạo ra tỷ lệ thanh thoát tự nhiên mà không cần phần nối dài quá mức.\n\nTrong không gian cao cấp, dáng hạnh nhân được ưa chuộng vì tính linh hoạt của nó — phù hợp với mọi kiểu thiết kế, từ French tip tinh tế đến các họa tiết 3D phức tạp. Đây cũng là dáng duy nhất tạo ra hiệu ứng thị giác đối xứng hoàn hảo khi các ngón tay khép lại.",
            EN: "The almond nail shape — with its gradual taper converging at a soft point — is not simply an aesthetic choice. It is a calculated geometric decision. This silhouette visually elongates the finger, creating a naturally slender proportion without excessive length.\n\nIn the luxury space, almond is prized for its versatility — it complements every design style, from refined French tips to intricate 3D florals. It is also the only shape that creates a visually perfect symmetry when the fingers are pressed together."
        },
        date: { VN: "15 Tháng 2, 2026", EN: "Feb 15, 2026" },
        author: "Architect Lee",
        category: { VN: "Nghệ thuật", EN: "Artistry" },
        coverImage: "/gallery/RemyMuse-nail2.jpeg",
        readTime: { VN: "6 phút", EN: "6 min read" },
        isTrending: false,
    }
];
