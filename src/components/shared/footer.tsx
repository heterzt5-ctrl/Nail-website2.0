"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-surface-variant/20 dark:bg-ink w-full border-t border-gold-pale/15">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-20 py-12 w-full mt-24 max-w-[1920px] mx-auto">
                <div className="font-serif text-lg tracking-[0.2em] text-ink uppercase mb-8 md:mb-0">
                    REMY MUSE
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
                    {['Privacy', 'Terms', 'Atelier Locations', 'Contact'].map((link) => (
                        <Link 
                            key={link}
                            href={`/${link.toLowerCase().replace(' ', '-')}`}
                            className="font-sans text-[0.75rem] tracking-[0.1rem] uppercase text-secondary hover:text-primary transition-colors decoration-primary/30 underline-offset-4 hover:underline"
                        >
                            {link}
                        </Link>
                    ))}
                </div>

                <div className="font-serif text-[0.75rem] tracking-[0.1rem] uppercase text-primary text-center md:text-right">
                    © 2026 REMY MUSE. <span className="opacity-60">ALL ARTISTRY RESERVED.</span>
                </div>
            </div>
        </footer>
    );
}
