"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function BriefIntro() {
    const { t } = useLanguage();

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
                    {t('intro-text')}
                </h2>
            </motion.div>
        </section>
    );
}
