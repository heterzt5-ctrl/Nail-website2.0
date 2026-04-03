"use client";

import { useLanguage } from "@/lib/language-context";

export default function Header() {
    const { language, setLanguage } = useLanguage();

    const langs: { id: typeof language, label: string }[] = [
        { id: "VN", label: "VI" },
        { id: "EN", label: "EN" },
        { id: "KR", label: "한국어" },
        { id: "CN", label: "中文" },
        { id: "RU", label: "RU" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[200] h-12 bg-cloud/92 backdrop-blur-xl border-b border-cloud-3 flex items-center justify-end px-6 md:px-14 gap-1">
            <span className="text-[11px] tracking-[3px] text-ink-ghost uppercase mr-4">Lang</span>
            {langs.map((l) => (
                <button
                    key={l.id}
                    onClick={() => setLanguage(l.id)}
                    className={`bg-none border-none outline-none font-sans font-light text-[11px] tracking-[2px] uppercase px-3.5 py-1.5 cursor-pointer border-b transition-all duration-250 ease-linear ${
                        language === l.id 
                        ? "text-gold-deep border-gold" 
                        : "text-ink-light border-transparent hover:text-gold-deep"
                    }`}
                >
                    {l.label}
                </button>
            ))}
        </nav>
    );
}

