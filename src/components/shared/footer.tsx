"use client";

import { useLanguage } from "@/lib/language-context";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-cloud border-t border-cloud-3 pt-16 md:pt-32 pb-16 px-7 md:px-20">
            <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-10 items-center">
                <div className="space-y-2">
                    <div className="font-serif font-light text-[26px] tracking-[0.1em] text-ink uppercase">
                        Remy <span className="italic text-gold-deep font-normal">Muse</span>
                    </div>
                    <div className="text-[11px] tracking-[4px] text-ink-ghost uppercase">
                        {t('ft-tagline')}
                    </div>
                </div>
                
                <div className="hidden md:block w-px h-[60px] bg-cloud-3 self-center" />
                
                <div 
                    className="text-[12px] tracking-[1.5px] text-ink-ghost leading-[2] uppercase md:text-right"
                    dangerouslySetInnerHTML={{ __html: t('ft-note') }}
                />
            </div>
        </footer>
    );
}

