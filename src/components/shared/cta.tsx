"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface CTAProps {
    onOpenBooking: () => void;
}

export default function CTA({ onOpenBooking }: CTAProps) {
    const { language } = useLanguage();
    return (
        <section className="py-40 px-8 md:px-20 text-center relative overflow-hidden bg-cloud">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-2xl mx-auto"
            >
                <h2 className="font-serif text-5xl md:text-7xl mb-12 tracking-tight text-ink italic italic">
                    {language === "VN" ? "Đặt lịch hẹn." : "Book your appointment."}
                </h2>
                <p className="font-serif text-secondary text-lg mb-16 max-w-md mx-auto font-light leading-relaxed">
                    {language === "VN" ? "Số lượng lịch hẹn giới hạn trong mùa này tại studio trung tâm của chúng tôi." : "Limited appointments available for the upcoming season at our downtown studio."}
                </p>
                <button 
                    onClick={onOpenBooking}
                    className="w-full md:w-auto px-16 py-6 shimmer-gold text-white font-serif uppercase tracking-[0.3em] text-sm rounded-xs hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
                >
                    {language === "VN" ? "Đặt Lịch Ngay" : "Reserve Appointment"}
                </button>
            </motion.div>
        </section>
    );
}

