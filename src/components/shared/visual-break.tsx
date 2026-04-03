"use client";

import { motion } from "framer-motion";

export default function VisualBreak() {
    return (
        <div className="bg-cloud-2 border-y border-cloud-3 overflow-hidden">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1fr] gap-[2px]">
                {/* Cell 1: Glass Nails */}
                <div className="relative aspect-[2/3] md:aspect-[2/3] bg-cloud-3 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-gold/6 z-10 pointer-events-none" />
                    
                    {/* Glass simulation */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        <Nail className="w-[38px] h-[52px]" />
                        <Nail className="w-[38px] h-[52px] translate-y-2 scale-[1.1]" />
                        <Nail className="w-[38px] h-[52px] -translate-y-1 scale-[0.9]" />
                    </div>

                    <img 
                        src="https://images.unsplash.com/photo-1632345031435-09506637dae6?auto=format&fit=crop&q=80&w=800" 
                        alt="Glass Nails"
                        className="w-full h-full object-cover saturate-[0.9] brightness-[1.03] group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-[1.05] transition-all duration-800 ease-out"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-ink/38 to-transparent z-20">
                        <div className="text-[11px] tracking-[4px] text-cloud/85 uppercase">Glass Nails</div>
                        <div className="font-serif italic text-base text-cloud/70 mt-1">Móng thủy tinh</div>
                    </div>
                </div>

                {/* Cell 2: Chrome Art */}
                <div className="relative aspect-[2/3] md:aspect-[3/4] bg-cloud-3 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-gold/6 z-10 pointer-events-none" />
                    
                    <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        <Nail className="w-[38px] h-[52px] bg-gradient-to-br from-white/70 via-silver/60 to-ink/30 border-silver-lt/80" isChrome />
                        <Nail className="w-[38px] h-[52px] translate-y-2.5 bg-gradient-to-br from-white/70 via-silver/60 to-ink/30 border-silver-lt/80" isChrome />
                    </div>

                    <img 
                        src="https://images.unsplash.com/photo-1604654894610-df490651e10c?auto=format&fit=crop&q=80&w=800" 
                        alt="Chrome Art"
                        className="w-full h-full object-cover saturate-[0.9] brightness-[1.03] group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-[1.05] transition-all duration-800 ease-out"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-ink/38 to-transparent z-20">
                        <div className="text-[11px] tracking-[4px] text-cloud/85 uppercase">Chrome Art</div>
                        <div className="font-serif italic text-base text-cloud/70 mt-1">Bạc kim loại</div>
                    </div>
                </div>

                {/* Cell 3: 3D Champagne */}
                <div className="relative aspect-[2/3] md:aspect-[2/3] bg-cloud-3 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-gold/6 z-10 pointer-events-none" />
                    
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        <Nail className="w-[38px] h-[52px] -translate-y-1.5 bg-gradient-to-br from-white/75 via-gold/50 to-gold-deep/25 border-gold-pale/75" isGold />
                        <Nail className="w-[38px] h-[52px] translate-y-1.5 scale-[1.15] bg-gradient-to-br from-white/75 via-gold/50 to-gold-deep/25 border-gold-pale/75" isGold />
                        <Nail className="w-[38px] h-[52px] translate-y-0.5 scale-[0.9] bg-gradient-to-br from-white/70 via-silver/60 to-ink/30 border-silver-lt/80" isChrome />
                    </div>

                    <img 
                        src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800" 
                        alt="3D Champagne"
                        className="w-full h-full object-cover saturate-[0.9] brightness-[1.03] group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-[1.05] transition-all duration-800 ease-out"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-ink/38 to-transparent z-20">
                        <div className="text-[11px] tracking-[4px] text-cloud/85 uppercase">3D · Champagne</div>
                        <div className="font-serif italic text-base text-cloud/70 mt-1">Vàng sâm panh</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Nail({ className, isChrome, isGold }: { className?: string, isChrome?: boolean, isGold?: boolean }) {
    let bgClass = "bg-gradient-to-br from-white/80 via-cloud-3/50 to-gold/15 border-white/75";
    
    if (isChrome) bgClass = "bg-gradient-to-br from-white/70 via-silver/60 to-ink/30 border-silver-lt/80";
    if (isGold) bgClass = "bg-gradient-to-br from-white/75 via-gold/50 to-gold-deep/25 border-gold-pale/75";

    return (
        <div className={`relative rounded-[45%/55%_55%_45%_/_58%_58%_42%_42%] border shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] ${bgClass} ${className}`}>
             <div className="absolute top-[10%] left-[18%] w-[28%] h-[32%] rounded-full bg-gradient-radial from-white/90 to-transparent" />
        </div>
    );
}
