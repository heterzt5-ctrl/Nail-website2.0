"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "VN" | "EN" | "KR" | "CN" | "RU";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    VN: {
        portfolio: "Bộ sưu tập",
        booking: "Đặt lịch",
        insights: "Kiến thức",
        bookNow: "Đặt lịch ngay",
        heroTitle: "Lấp lánh",
        heroSubtitle: "Cá tính",
        heroDesc: "Thỏa sức sáng tạo với Màu sắc rực rỡ và Nghệ thuật 3D mang đậm dấu ấn cá nhân của bạn.",
        startBooking: "Đặt lịch ngay",
        seeTrends: "Xem xu hướng",
        stylistAI: "Stylist AI",
        analyzing: "Đang tìm 'Neon Mix' hoàn hảo...",
        servicesTitle: "Dịch vụ",
        servicesSubtitle: "Chuyên sâu",
        servicesDesc: "Trải nghiệm tiêu chuẩn Chuyên gia với công nghệ Nail mới nhất.",
        skinTone: "Màu da",
        handShape: "Dáng tay",
    },
    EN: {
        portfolio: "Portfolio",
        booking: "Booking",
        insights: "Insights",
        bookNow: "Book Now",
        heroTitle: "Sparkle",
        heroSubtitle: "Playful",
        heroDesc: "Unleash your energy with Vibrant Colors and 3D Art that speaks your language.",
        startBooking: "Get Lived Up",
        seeTrends: "See Trends",
        stylistAI: "Stylist AI",
        analyzing: "Finding your perfect 'Neon Mix'...",
        servicesTitle: "Signature",
        servicesSubtitle: "Treatments",
        servicesDesc: "Expert standards with the latest nail technology.",
        skinTone: "Skin Tone",
        handShape: "Hand Shape",
    },
    KR: {
        portfolio: "포트폴리오",
        booking: "예약",
        insights: "인사이트",
        bookNow: "지금 예약",
        heroTitle: "반짝임",
        heroSubtitle: "발랄한",
        heroDesc: "당신만의 언어로 말하는 생동감 넘치는 컬러와 3D 아트와 함께 에너지를 발산해보세요.",
        startBooking: "예약하기",
        seeTrends: "트렌드 보기",
        stylistAI: "스타일리스트 AI",
        analyzing: "당신에게 딱 맞는 '네온 믹스'를 찾는 중...",
        servicesTitle: "시그니처",
        servicesSubtitle: "트리트먼트",
        servicesDesc: "최신 네일 기술를 적용한 전문가용 표준입니다.",
        skinTone: "피부 톤",
        handShape: "손 모양",
    },
    CN: {
        portfolio: "作品集",
        booking: "预约",
        insights: "见解",
        bookNow: "立即预约",
        heroTitle: "闪耀",
        heroSubtitle: "俏皮",
        heroDesc: "通过充满活力的色彩和 3D 艺术释放您的能量，传达您的独特风格。",
        startBooking: "开始预约",
        seeTrends: "查看趋势",
        stylistAI: "AI 造型师",
        analyzing: "正在为您寻找完美的“霓虹混搭”...",
        servicesTitle: "特色",
        servicesSubtitle: "疗程",
        servicesDesc: "采用最新美甲技术的专家标准。",
        skinTone: "肤色",
        handShape: "手型",
    },
    RU: {
        portfolio: "Портфолио",
        booking: "Бронирование",
        insights: "Инсайты",
        bookNow: "Записаться",
        heroTitle: "Блеск",
        heroSubtitle: "Игривый",
        heroDesc: "Раскройте свою энергию с помощью ярких цветов и 3D-арта, который говорит на вашем языке.",
        startBooking: "Записаться",
        seeTrends: "Тренды",
        stylistAI: "AI Стилист",
        analyzing: "Ищем ваш идеальный 'Neon Mix'...",
        servicesTitle: "Фирменные",
        servicesSubtitle: "Услуги",
        servicesDesc: "Экспертные стандарты с использованием новейших технологий в маникюре.",
        skinTone: "Тон кожи",
        handShape: "Форма рук",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("VN");

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
