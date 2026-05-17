"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { CatalogTrigger, AtelierCatalogModal } from "@/components/shared/atelier-catalog-modal";

export default function ServicesMenu() {
    const { t, language } = useLanguage();
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    const sections = [
        {
            id: "nail",
            title: t('s-muse-title'),
            subtitle: t('s-muse-sub'),
            image: "/images/menu03/menu-01.JPG",
            price: "",
            services: [
                { id: 'classic', name: t('n-classic-vi'), price: "70k" },
                { id: 'regpol', name: t('n-regpol-vi'), price: "150k" },
                { id: 'gelpol', name: t('n-gelpol-vi'), price: "180k" },
                { id: 'cateye', name: t('n-cateye-vi'), price: "220k" }
            ]
        },
        {
            id: "art-essential",
            title: t('s-essential-title'),
            subtitle: t('s-essential-sub'),
            image: "/images/menu03/menu-02.JPG",
            price: "",
            asymmetric: true,
            services: [
                { id: 'essential-french', name: t('n-full-french'), price: "150k" },
                { id: 'essential-ombre', name: t('n-full-ombre'), price: "150k" },
                { id: 'essential-chrome', name: t('n-full-chrome'), price: "150k" },
                { id: 'essential-cateye', name: t('n-full-cateye'), price: "150k" }
            ]
        },
        {
            id: "art-bespoke",
            title: t('s-bespoke-title'),
            subtitle: t('s-bespoke-sub'),
            image: "/images/menu03/menu-03.JPG",
            price: "",
            services: [
                { id: 'bespoke-items', name: t('n-bespoke-items'), price: t('p-on-request') }
            ]
        },
        {
            id: "ritual",
            title: t('s-ritual-title'),
            subtitle: t('s-ritual-sub'),
            image: "/images/menu03/menu-04.JPG",
            price: "",
            asymmetric: true,
            services: [
                { id: 'sham-cl', name: t('n-classic30-vi'), price: "60k" },
                { id: 'sham-dl', name: t('n-deluxe70-vi'), price: "150k" },
                { id: 'sham-lx', name: t('n-luxury90-vi'), price: "250k" }
            ]
        }
    ];

    return (
        <section id="services" className="py-32 px-8 md:px-20 bg-cloud">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 max-w-[1400px] mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-ink">The Menu</h2>
                <p className="font-sans text-secondary mt-4 md:mt-0 tracking-widest uppercase text-xs">{t('s-menu-label')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32 max-w-[1400px] mx-auto">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`group cursor-pointer ${section.asymmetric ? 'md:mt-40' : ''}`}
                    >
                        <div className="aspect-video bg-surface-variant overflow-hidden mb-8 relative">
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                            />
                            {/* Color wash overlay — fades out as card enters viewport */}
                            <motion.div
                                initial={{ opacity: 0.75 }}
                                whileInView={{ opacity: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="absolute inset-0 bg-cloud/80 pointer-events-none"
                            />
                            {/* Hover shimmer overlay — independent of scroll state */}
                            <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="flex justify-between items-start mb-6">
                            <div className="max-w-[70%]">
                                <h3 className="font-serif text-3xl mb-2 group-hover:text-primary transition-colors tracking-tight">
                                    {section.title}
                                </h3>
                                <p className="font-sans text-primary text-[10px] tracking-[0.3em] uppercase mb-4">
                                    {section.subtitle}
                                </p>
                            </div>
                            <span className="font-serif text-primary font-medium text-xl">{section.price}</span>
                        </div>

                        <div className="space-y-4 border-t border-gold-pale/20 pt-6">
                            {section.services.map((s) => (
                                <div key={s.id} className="flex justify-between items-center text-sm">
                                    <span className="font-serif text-ink-mid group-hover:text-ink transition-colors">{s.name}</span>
                                    <span className="font-sans text-gold-deep/60 text-[11px] tracking-widest">{s.price}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Catalog Trigger ── */}
            <CatalogTrigger onOpen={() => setIsCatalogOpen(true)} />

            {/* ── Fullscreen Catalog Modal ── */}
            <AtelierCatalogModal
                isOpen={isCatalogOpen}
                onClose={() => setIsCatalogOpen(false)}
            />
        </section>
    );
}
