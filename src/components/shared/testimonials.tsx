"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function Testimonials() {
    const { language } = useLanguage();
    const reviews = [
        {
            name: "Lan Anh",
            role: { VN: "Khách hàng", EN: "Client" },
            quote: { 
                VN: "\"Làm rất kỹ và sạch. Mình rất hài lòng với bộ móng mới.\"",
                EN: "\"Meticulous and clean work. I am very satisfied with my new nails.\""
            },
            offset: "0"
        },
        {
            name: "Minh Thư",
            role: { VN: "Khách hàng", EN: "Client" },
            quote: { 
                VN: "\"Nhân viên nhẹ nhàng, dễ chịu. Không gian rất thư giãn.\"",
                EN: "\"Gentle and pleasant staff. The atmosphere is very relaxing.\""
            },
            offset: "md:mt-24"
        },
        {
            name: "Ngọc Bích",
            role: { VN: "Khách hàng", EN: "Client" },
            quote: { 
                VN: "\"Dịch vụ chu đáo, tư vấn nhiệt tình. Sẽ quay lại ủng hộ tiếp.\"",
                EN: "\"Attentive service, enthusiastic consultation. I will definitely come back.\""
            },
            offset: "md:mt-48"
        }
    ];

    return (
        <section className="py-32 bg-surface-variant/10 px-8 md:px-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative px-10">
                <div className="text-[12rem] font-serif text-gold-pale/10 absolute -top-24 -left-12 pointer-events-none select-none">
                    “
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                    {reviews.map((rev, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className={`flex flex-col space-y-8 ${rev.offset}`}
                        >
                            <p className="font-serif text-xl italic leading-relaxed text-ink/80">
                                {language === "VN" ? rev.quote.VN : rev.quote.EN}
                            </p>
                            <div>
                                <span className="block font-serif uppercase tracking-widest text-[10px] text-primary">{rev.name}</span>
                                <span className="block font-serif text-[10px] text-secondary/70">{language === "VN" ? rev.role.VN : rev.role.EN}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
