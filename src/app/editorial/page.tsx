"use client";

import { useState } from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export default function EditorialPage() {
    const { language } = useLanguage();
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const categories = {
        VN: ["Tất cả", "Nghệ thuật", "Chăm sóc", "Xu hướng", "Góc nhìn Atelier"],
        EN: ["All", "Artistry", "Care", "Trends", "Atelier View"],
        KR: ["전체", "예술", "케어", "트렌드", "아틀리에 뷰"],
        CN: ["全部", "艺术", "护理", "趋势", "工作室视角"],
        RU: ["Все", "Искусство", "Уход", "Тренды", "Вид Ателье"]
    };

    const content = {
        VN: {
            title: "Editorial Intelligence",
            subtitle: "Luxury Insights",
            description: "Tạp chí Nghệ thuật & Chăm sóc - Khám phá thế giới nghệ thuật móng tay cao cấp, xu hướng thẩm mỹ tinh tế và triết lý chăm sóc chuyên sâu từ REMY MUSE.",
            featuredLabel: "Bài viết nổi bật — Nghệ thuật",
            featuredTitle: "Nghệ thuật Móng Thủy tinh: Đạt đến Sự Hoàn hảo Xuyên thấu",
            featuredDesc: "Khám phá kỹ thuật phức tạp đằng sau xu hướng móng tay thủy tinh rực rỡ. Từ việc lựa chọn gel xây dựng đến kỹ thuật định hình để tạo ra ảo ảnh quang học về chiều sâu và độ trong suốt hoàn hảo.",
            readMore: "Đọc tiếp"
        },
        EN: {
            title: "Editorial Intelligence",
            subtitle: "Luxury Insights",
            description: "Art & Care Journal - Explore the world of high-end nail art, refined aesthetic trends and intensive care philosophies from REMY MUSE.",
            featuredLabel: "Featured Article — Artistry",
            featuredTitle: "The Art of Glass Nails: Achieving Translucent Perfection",
            featuredDesc: "Discover the intricate techniques behind the radiant glass nail trend. From builder gel selection to shaping techniques that create the optical illusion of perfect depth and transparency.",
            readMore: "Read More"
        }
    };

    const articles = [
        {
            category: { VN: "Chăm sóc", EN: "Care" },
            title: { VN: "Biotin & Phục hồi Móng chuyên sâu", EN: "Biotin & Intensive Nail Recovery" },
            desc: { VN: "Sự thật về các chất bổ sung và liệu pháp phục hồi. Cách tiếp cận khoa học để củng cố nền tảng móng tự nhiên sau quá trình làm móng liên tục.", EN: "The truth about supplements and recovery therapies. A scientific approach to strengthening the natural nail foundation after continuous nail treatments." },
            image: "https://lh3.googleusercontent.com/aida/ADBb0ugRisHf9y6BZ27ptVu5VFATtcXR4kutlnyjvCdqNye3CY7aLlXvyhrT6_Zj9NDmD9o0zNsnuNE8i5fZi7pZOydatKAm8kulc3wn5AzZi9e2gjisc0mhKQI6IFpfJP5w7I2kxNTL9g3r2NztbmAif6c4RRoGYbUzqY1z9Ihn7-N2Whia9yumAewQeobaKCQpQn-ISoJ9TyjSTYA4HDjbwgqkc-CyBrX4j8DoTAsR31a4UgaQ71rD3NCMrjJQ"
        },
        {
            category: { VN: "Góc nhìn Atelier", EN: "Atelier View" },
            title: { VN: "Triết lý Tĩnh lặng Thị giác", EN: "Visual Silence Philosophy" },
            desc: { VN: "Cách chúng tôi thiết kế không gian REMY MUSE để xoa dịu tâm trí, tạo ra một trải nghiệm thư giãn vượt qua khái niệm làm đẹp thông thường.", EN: "How we design the REMY MUSE space to soothe the mind, creating a relaxing experience that transcends the conventional concept of beauty." },
            quote: { VN: "Thẩm mỹ không chỉ là những gì bạn nhìn thấy, mà là cảm giác tinh tế đọng lại trên từng đầu ngón tay.", EN: "Aesthetics is not just what you see, but the subtle feeling that lingers on every fingertip." }
        },
        {
            category: { VN: "Xu hướng", EN: "Trends" },
            title: { VN: "Xu hướng Mùa xuân: Sự Lãng mạn Huyền bí", EN: "Spring Trends: Dark Romanticism" },
            desc: { VN: "Bỏ qua những gam màu pastel truyền thống, mùa xuân này đánh dấu sự lên ngôi của những sắc thái đậm, kết cấu nhung và sự quyến rũ mang hơi hướng Gothic hiện đại.", EN: "Bypassing traditional pastels, this spring marks the rise of bold shades, velvet textures, and modern Gothic-inspired glamour." },
            image: "https://lh3.googleusercontent.com/aida/ADBb0ujqcrNJG6t1PvETrRuz3O477hOIR7Du1N9xYcZDYP29Ob3ZNTD2tL3_j2-hLKq1k0dm3KGCNQi7qqjyDGlXlpAlpNL0-HZE8QGE--wJbO9S2yTJHi0jhT1ACq_1FdeV-8lG87l4ajSOKKVIxxHUxA1m-lYZcT3MsXd1YF7X3jM1rIxeDEdZAPLcyQIbdJHtmy6XM7fV6cWPGuO_UPHwpaWuPh0JI91bs0luaoHTkNyqcGhVjN0gzS-fXUI"
        }
    ];

    const currentContent = content[language === "VN" ? "VN" : "EN"];

    return (
        <main className="relative bg-cloud min-h-screen selection:bg-primary-container/30">
            <Header onOpenBooking={() => setIsBookingOpen(true)} />

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 md:px-20 max-w-[1440px] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-8 min-h-[50vh] bg-surface-container-low p-12 relative overflow-hidden"
                    style={{ 
                        backgroundImage: "linear-gradient(to bottom, rgba(245, 243, 238, 0.8), rgba(245, 243, 238, 0.9)), url('https://lh3.googleusercontent.com/aida/ADBb0ujqcrNJG6t1PvETrRuz3O477hOIR7Du1N9xYcZDYP29Ob3ZNTD2tL3_j2-hLKq1k0dm3KGCNQi7qqjyDGlXlpAlpNL0-HZE8QGE--wJbO9S2yTJHi0jhT1ACq_1FdeV-8lG87l4ajSOKKVIxxHUxA1m-lYZcT3MsXd1YF7X3jM1rIxeDEdZAPLcyQIbdJHtmy6XM7fV6cWPGuO_UPHwpaWuPh0JI91bs0luaoHTkNyqcGhVjN0gzS-fXUI')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary">
                        {currentContent.title}
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tight text-ink">
                        {currentContent.subtitle}
                    </h1>
                    <p className="font-serif italic text-base md:text-lg leading-relaxed text-secondary max-w-2xl">
                        {currentContent.description}
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16 border-b border-gold-pale/20 pb-8">
                    {(categories[language] || categories.EN).map((cat, i) => (
                        <button 
                            key={i}
                            className={`font-sans text-[10px] uppercase tracking-[0.15em] transition-all duration-500 pb-1 ${i === 0 ? 'text-ink border-b border-primary font-bold' : 'text-ink-light hover:text-primary'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Article */}
            <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/40 backdrop-blur-sm p-8 md:p-12 border border-gold-pale/10">
                    <div className="col-span-1 lg:col-span-7 aspect-[16/9] bg-cloud-3 overflow-hidden">
                        <img 
                            alt="Featured Article" 
                            className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-1000" 
                            src="https://lh3.googleusercontent.com/aida/ADBb0ujqcrNJG6t1PvETrRuz3O477hOIR7Du1N9xYcZDYP29Ob3ZNTD2tL3_j2-hLKq1k0dm3KGCNQi7qqjyDGlXlpAlpNL0-HZE8QGE--wJbO9S2yTJHi0jhT1ACq_1FdeV-8lG87l4ajSOKKVIxxHUxA1m-lYZcT3MsXd1YF7X3jM1rIxeDEdZAPLcyQIbdJHtmy6XM7fV6cWPGuO_UPHwpaWuPh0JI91bs0luaoHTkNyqcGhVjN0gzS-fXUI"
                        />
                    </div>
                    <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-8">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                            {currentContent.featuredLabel}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl leading-tight text-ink font-light italic">
                            {currentContent.featuredTitle}
                        </h2>
                        <p className="font-serif text-sm md:text-base leading-relaxed text-secondary italic">
                            {currentContent.featuredDesc}
                        </p>
                        <button className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary hover:underline decoration-primary underline-offset-8 self-start transition-all">
                            {currentContent.readMore}
                        </button>
                    </div>
                </div>
            </section>

            {/* Article Grid */}
            <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
                    {articles.map((article, idx) => (
                        <motion.article 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col space-y-8 group cursor-pointer"
                        >
                            <div className="aspect-[4/5] bg-cloud-3 overflow-hidden relative">
                                {article.image ? (
                                    <img 
                                        src={article.image} 
                                        alt={article.title[language === "VN" ? "VN" : "EN"]} 
                                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-cloud-2 flex items-center justify-center p-10 text-center border-l-4 border-primary/40">
                                        <p className="font-serif text-2xl italic text-ink-mid leading-relaxed">
                                            "{article.quote[language === "VN" ? "VN" : "EN"]}"
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-light">
                                    {article.category[language === "VN" ? "VN" : "EN"]}
                                </span>
                                <h3 className="font-serif text-2xl text-ink group-hover:text-primary transition-colors duration-500 leading-tight">
                                    {article.title[language === "VN" ? "VN" : "EN"]}
                                </h3>
                                <p className="font-serif text-sm leading-relaxed text-secondary italic line-clamp-3">
                                    {article.desc[language === "VN" ? "VN" : "EN"]}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <Footer />
        </main>
    );
}
