"use client";

import { motion } from "framer-motion";

interface CTAProps {
    onOpenBooking: () => void;
}

export default function CTA({ onOpenBooking }: CTAProps) {
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
                    Your Muse Awaits.
                </h2>
                <p className="font-serif text-secondary text-lg mb-16 max-w-md mx-auto font-light leading-relaxed">
                    Limited appointments available for the upcoming season at our downtown atelier.
                </p>
                <button 
                    onClick={onOpenBooking}
                    className="w-full md:w-auto px-16 py-6 shimmer-gold text-white font-serif uppercase tracking-[0.3em] text-sm rounded-xs hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
                >
                    Reserve Appointment
                </button>
            </motion.div>
        </section>
    );
}

