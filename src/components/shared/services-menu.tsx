"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ServicesMenu() {
    const { t, language } = useLanguage();

    interface Service {
        id: string;
        nameVi: string;
        nameEn: string;
        langs: string;
        desc?: string;
        price: string;
        perUnit?: string;
        isBadge?: boolean;
        steps?: string;
        stepsLabel?: string;
    }

    interface Group {
        label?: string;
        note?: string;
        services: Service[];
    }

    interface Section {
        id: string;
        num: string;
        title: string;
        subtitle: string;
        groups: Group[];
    }

    const sections: Section[] = [
        {
            id: "nail",
            num: "01",
            title: t('s1-title'),
            subtitle: t('s1-sub'),
            groups: [
                {
                    label: t('g-manicure'),
                    services: [
                        { id: 'classic', nameVi: t('n-classic-vi'), nameEn: 'Classic Manicure', langs: "클래식 매니큐어 · 经典美甲 · Классический маникюр", desc: t('d-classic'), price: "70.000₫" },
                        { id: 'deluxe', nameVi: t('n-deluxemani-vi'), nameEn: 'Deluxe Manicure', langs: "디럭스 매니큐어 · 豪华美甲 · Делюкс маникюр", desc: t('d-deluxemani'), price: "200.000₫" },
                        { id: 'regpol', nameVi: t('n-regpol-vi'), nameEn: 'Regular Polish Manicure', langs: "일반 폴리시 · 普通指甲油 · Обычный лак", price: "150.000₫" },
                        { id: 'gelpol', nameVi: t('n-gelpol-vi'), nameEn: 'Gel Polish Manicure', langs: "젤 폴리시 · 凝胶指甲油 · Гель-лак", price: "170.000₫" },
                    ]
                },
                {
                    label: t('g-enhance'),
                    services: [
                        { id: 'gelx', nameVi: t('n-gelx-vi'), nameEn: 'Gel-X Full Set', langs: "젤-X 풀세트 · Gel-X全套 · Гель-Х", price: "250.000₫" },
                        { id: 'builder', nameVi: t('n-buildergel-vi'), nameEn: 'Builder Gel Full Set', langs: "빌더 젤 풀세트 · 构建凝胶全套 · Билдер-гель", price: "350.000₫" },
                        { id: 'acrylic', nameVi: t('n-acrylic-vi'), nameEn: 'Acrylic Full Set', langs: "아크릴 풀세트 · 丙烯酸全套 · Акрил", price: "400.000₫" },
                        { id: 'refill', nameVi: t('n-refill-vi'), nameEn: 'Acrylic / Builder Gel Refill', langs: "리필 · 补充 · Рефил", price: "250.000₫" },
                        { id: 'dual', nameVi: t('n-dual-vi'), nameEn: 'Dual Form Full Set', langs: "듀얼 폼 풀세트 · 双模具全套 · Дуал форм", price: "350.000₫" },
                        { id: 'biab', nameVi: t('n-biab-vi'), nameEn: 'BIAB Overlay', langs: "BIAB 오버레이 · BIAB覆盖 · BIAB оверлей", price: "250.000₫" },
                    ]
                },
                {
                    label: t('g-art'),
                    note: t('art-note'),
                    services: [
                        { id: 'french', nameVi: t('n-french-vi'), nameEn: 'French Tip', langs: "프렌치 팁 · 法式美甲 · Французский", price: "150.000₫" },
                        { id: 'ombre', nameVi: t('n-ombre-vi'), nameEn: 'Ombre', langs: "옴브레 · 渐变色 · Омбре", price: "150.000₫" },
                        { id: 'chrome', nameVi: t('n-chrome-vi'), nameEn: 'Chrome Powder', langs: "크롬 · 镭射粉 · Хром", price: "150.000₫" },
                        { id: 'cateye', nameVi: t('n-cateye-vi'), nameEn: 'Cat Eye', langs: "캣아이 · 猫眼 · Кошачий глаз", price: "150.000₫" },
                        { id: 'minimal', nameVi: t('n-minimal-vi'), nameEn: 'Minimal Nail Art', langs: "미니멀 아트 · 简约美甲 · Минимализм", price: "15k–30k₫", perUnit: t('pu1') },
                        { id: '3d', nameVi: t('n-3d-vi'), nameEn: '3D Art / Rhinestone / Charm', langs: "3D아트/라인스톤 · 3D艺术/水钻 · 3D-арт", price: "50.000₫", perUnit: t('pu2') },
                        { id: 'custom', nameVi: t('n-custom-vi'), nameEn: 'Custom / Hand-Painted Design', langs: "커스텀 아트 · 手绘設計 · Роспись", price: "50k–100k₫", perUnit: t('pu3') },
                    ]
                }
            ]
        },
        {
            id: "pedicure",
            num: "02",
            title: t('s2-title'),
            subtitle: t('s2-sub'),
            groups: [
                {
                    services: [
                        { id: 'cl-pedi', nameVi: t('n-classpedi-vi'), nameEn: 'Classic Pedicure', langs: "클래식 페디큐어 · 经典足部护理 · Классический педикюр", desc: t('d-classpedi'), price: "200.000₫" },
                        { id: 'dl-pedi', nameVi: t('n-deluxepedi-vi'), nameEn: 'Deluxe Pedicure', langs: "디럭스 페디큐어 · 豪华足部护理 · Делюкс педикюр", desc: t('d-deluxepedi'), price: "350.000₫" },
                    ]
                }
            ]
        },
        {
            id: "addon",
            num: "03",
            title: t('s3-title'),
            subtitle: t('s3-sub'),
            groups: [
                {
                    services: [
                        { id: 'gel-add', nameVi: t('n-gelcolor-vi'), nameEn: 'Gel Color', langs: "젤 컬러 · 凝胶颜色 · Гель-цвет", price: "120.000₫", isBadge: true },
                        { id: 'reg-add', nameVi: t('n-regcolor-vi'), nameEn: 'Regular Color', langs: "일반 컬러 · 普通颜色 · Обычный цвет", price: "100.000₫", isBadge: true },
                        { id: 'rem-acc', nameVi: t('n-remacrylic-vi'), nameEn: 'Acrylic / Gel-X Removal', langs: "아크릴/젤-X 제거 · 卸除 · Снятие", price: "50.000₫" },
                        { id: 'rem-gel', nameVi: t('n-remgel-vi'), nameEn: 'Gel Color Removal', langs: "젤 컬러 제거 · 卸除凝胶 · Снятие гель-лака", price: "40.000₫" },
                    ]
                }
            ]
        },
        {
            id: "shampoo",
            num: "04",
            title: t('s4-title'),
            subtitle: t('s4-sub'),
            groups: [
                {
                    services: [
                        { id: 'cl-sham', nameVi: t('n-classic30-vi'), nameEn: 'Classic Shampoo · 30 min', langs: "클래식 샴푸 · 经典洗发 · Классический", desc: t('d-classic30'), price: "110.000₫" },
                        { id: 'dl-sham', nameVi: t('n-deluxe70-vi'), nameEn: 'Deluxe Shampoo · 70 min', langs: "디럭스 샴푸 · 豪华洗发 · Делюкс", price: "250.000₫", steps: t('steps-d70'), stepsLabel: t('sum-d70-txt') },
                        { id: 'lx-sham', nameVi: t('n-luxury90-vi'), nameEn: 'Luxury Shampoo · 90 min', langs: "럭셔리 샴푸 · 奢华洗发 · Люкс", price: "350.000₫", steps: t('steps-l90'), stepsLabel: t('sum-l90-txt') },
                    ]
                }
            ]
        }
    ];

    return (
        <section className="bg-cloud">
            {sections.map((section) => (
                <div key={section.id} className="border-b border-cloud-3 last:border-b-0">
                    <div className="max-w-[900px] mx-auto px-7 md:px-20 py-20 md:py-[140px]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            className="grid grid-cols-[auto_1fr_auto] items-center gap-7 mb-24"
                        >
                            <span className="font-serif italic text-sm text-gold-pale tracking-[2px] leading-none">{section.num}</span>
                            <div>
                                <h2 className="font-serif font-light text-[44px] tracking-[0.06em] text-ink leading-none">{section.title}</h2>
                                <div className="text-[11px] tracking-[4px] text-ink-ghost uppercase mt-2">{section.subtitle}</div>
                            </div>
                            <div className="h-px bg-gradient-to-r from-cloud-4 to-cloud-2 flex-1 w-full" />
                        </motion.div>

                        {section.groups.map((group, gIdx) => (
                            <div key={gIdx} className="mb-14 last:mb-0">
                                {group.label && (
                                    <div className="flex items-center gap-4 mb-4 mt-14">
                                        <span className="text-[11px] tracking-[4px] text-gold uppercase whitespace-nowrap">{group.label}</span>
                                        <div className="flex-1 h-px bg-gradient-to-r from-gold-pale to-transparent" />
                                    </div>
                                )}
                                {group.note && (
                                    <p className="text-[12px] tracking-[2px] text-ink-ghost mb-2 uppercase">{group.note}</p>
                                )}
                                <div className="space-y-0">
                                    {group.services.map((service) => (
                                        <ServiceRow key={service.id} service={service} language={language} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

interface ServiceRowProps {
    service: {
        id: string;
        nameVi: string;
        nameEn: string;
        langs: string;
        desc?: string;
        price: string;
        perUnit?: string;
        isBadge?: boolean;
        steps?: string;
        stepsLabel?: string;
    };
    language: string;
}

function ServiceRow({ service, language }: ServiceRowProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_130px] items-start gap-4 md:gap-10 py-6 border-b border-ink/5 last:border-b-0 hover:bg-white/55 hover:px-5 hover:-mx-5 transition-all duration-300 ease-in-out group">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-serif font-normal text-[22px] text-ink tracking-[0.02em] leading-tight">
                        {service.nameVi}
                    </h3>
                    {service.isBadge && (
                        <span className="border border-gold-pale text-gold px-2.5 py-0.5 text-[10px] tracking-[2px] uppercase">Add-on</span>
                    )}
                </div>
                <div className="text-[11px] tracking-[3px] text-gold uppercase">{service.nameEn}</div>
                {language === 'VN' && (
                    <div className="text-[12px] text-ink-ghost tracking-[0.2px]">{service.langs}</div>
                )}
                {service.desc && (
                    <p className="text-[13px] text-ink-light leading-[1.75] max-w-[440px] mt-2 italic">{service.desc}</p>
                )}
                {service.steps && (
                    <div className="mt-2">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2.5 text-[11px] tracking-[2.5px] text-silver-deep uppercase cursor-pointer select-none"
                        >
                            <span className={`text-[12px] text-gold transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>›</span>
                            <span>{service.stepsLabel}</span>
                        </button>
                        {isOpen && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 p-4 md:p-5 bg-white/50 border-l border-gold-pale text-[13px] text-ink-mid leading-[1.9] max-w-[500px]"
                            >
                                {service.steps}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
            <div className="md:text-right pt-1">
                <div className="font-serif font-light text-[22px] text-ink tracking-[0.03em] whitespace-nowrap">
                    {service.price}
                </div>
                {service.perUnit && (
                    <div className="text-[11px] tracking-[2px] text-ink-ghost mt-1 uppercase">{service.perUnit}</div>
                )}
            </div>
        </div>
    );
}


