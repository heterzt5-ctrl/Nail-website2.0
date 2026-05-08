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
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwHWljhPRPnn8J6PEzrVy2pMhx-R9BhsodLyoU8eBxp6vgahduOimEkR2d5NxPo9vdGvKBtj1mjqDnGZ7EokXvOuH0OKjrvD6SNON-0onq-7ZswFlc5aX9UZEJQpeTZdY3nj6eXF_NqEjMkEVp50mACftCgAmtMgOFQm2wqi1Stp3TbKTV8vdT2FbMtbflzKSzfLOjYIxL3U9PoWu4N8ezsP8gG_S6e1sPrijqGWVC6vUWIspypiyXB5C0gXoCzAs-vglX7MbnKHYR",
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
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWSreoz9vio0SMdrwcQyuLn_Ak4zTPzF-96OOTLpozXBGf1UrWQcwBpiz_AYnb_XgrcjL0PIqCG-40PKFoDaAkMMjBmTn0fQghqKsXWnbcz4kJzhMLYqv5Zc9BR6J3DMLbOQuOHH0vAMCUI23TuSyOUNHe1y6G0JDPdpOVOH-6DBM0m2FYGIuBtpEDD4wgyy3MyIoR1UOA8NVB_qF9f61Jk2LgeCNzDqR6pBF6ODjpqw_I4eNhF7l5vede7chF5tcPi6jN0IZ0zucN",
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
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWSreoz9vio0SMdrwcQyuLn_Ak4zTPzF-96OOTLpozXBGf1UrWQcwBpiz_AYnb_XgrcjL0PIqCG-40PKFoDaAkMMjBmTn0fQghqKsXWnbcz4kJzhMLYqv5Zc9BR6J3DMLbOQuOHH0vAMCUI23TuSyOUNHe1y6G0JDPdpOVOH-6DBM0m2FYGIuBtpEDD4wgyy3MyIoR1UOA8NVB_qF9f61Jk2LgeCNzDqR6pBF6ODjpqw_I4eNhF7l5vede7chF5tcPi6jN0IZ0zucN",
            price: "",
            services: [
                { id: 'bespoke-items', name: t('n-bespoke-items'), price: t('p-on-request') }
            ]
        },
        {
            id: "ritual",
            title: language === "VN" ? "Gội đầu & Thư giãn" : "Hair shampoo & Relaxation",
            subtitle: language === "VN" ? "Spa Phục Hồi" : "Restorative Spa",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnfaeYd_saXJAzAUxMrlG2BxsGP9fZ_f0rsW3Fih4-YCHNT04OcomxzYdRXeuGLizDdGFW6sww9CmqpeO6qWs8lDfv7FiWKhgQCuKJRPD1-_ema4C5m-hdZ-4S2XPkvJyXhe7OiYF3-A94A8poqOcP-_l6zZG8ZUj_tf2bRERZ-qWMaI_AmeDM8sFfuj3pf8kI73Tz0ITawRr1VWit5i5JCJ6-MKLv4tzAWdZZIWkvGCL1t1w6gBLBTJLbrPrH4DhCZSNHFEi-JB-7",
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
                <p className="font-sans text-secondary mt-4 md:mt-0 tracking-widest uppercase text-xs">{language === "VN" ? "Dịch Vụ" : "Our Services"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32 max-w-[1400px] mx-auto">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`group cursor-pointer ${section.asymmetric ? 'md:mt-40' : ''}`}
                    >
                        <div className="aspect-video bg-surface-variant overflow-hidden mb-8 relative">
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                            />
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
