"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function BriefIntro() {
    const { language } = useLanguage();

    const text: Record<string, string> = {
        VN: "REMY MUSE là một không gian nghệ thuật làm móng hiện đại. Chăm chút trong từng chi tiết. Dành riêng cho bạn.",
        EN: "REMY MUSE is a modern nail studio. Crafted with intention. Designed for you.",
        KR: "REMY MUSE는 현대적인 네일 아틀리에입니다. 모든 디테일은 섬세하게 완성됩니다. 당신을 위해 디자인됩니다.",
        CN: "REMY MUSE 是一家现代美甲沙龙。匠心雕琢每一处细节，只为你而设计。",
        RU: "REMY MUSE — современное нейл-ателье. Продумано до каждой детали. Создано для вас."
    };

    return (
        <section id="philosophy" className="py-32 px-8 md:px-20 bg-surface-variant/20 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto text-center"
            >
                <span className="font-serif uppercase tracking-[0.3em] text-primary text-xs mb-8 block">Est. 2026</span>
                <h2 className="font-serif text-3xl md:text-4xl leading-relaxed text-ink font-light italic">
                    {text[language] || text.EN}
                </h2>
            </motion.div>
        </section>
    );
}
