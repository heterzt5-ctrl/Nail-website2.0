"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function Testimonials() {
    const { t } = useLanguage();
    const reviews = [
        {
            name: "Lan Anh",
            role: t('review-role'),
            quote: t('review-1-quote'),
            offset: "0"
        },
        {
            name: "Minh Thư",
            role: t('review-role'),
            quote: t('review-2-quote'),
            offset: "md:mt-24"
        },
        {
            name: "Ngọc Bích",
            role: t('review-role'),
            quote: t('review-3-quote'),
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
                                {rev.quote}
                            </p>
                            <div>
                                <span className="block font-serif uppercase tracking-widest text-[10px] text-primary">{rev.name}</span>
                                <span className="block font-serif text-[10px] text-secondary/70">{rev.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
