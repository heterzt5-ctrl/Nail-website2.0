"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, Bell, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

interface Service {
    id: string;
    name: string;
    name_vn: string | null;
    description: string | null;
    description_vn: string | null;
    price: number;
    duration: number;
    category: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const { language } = useLanguage();
    const [step, setStep] = useState(1);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    const steps = ["Experience", "Schedule", "Contact"];

    useEffect(() => {
        if (isOpen) {
            fetchServices();
        }
    }, [isOpen]);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            if (!selectedDate || !selectedTime) return;
            
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const bookingDateTime = new Date(selectedDate);
            bookingDateTime.setHours(hours, minutes, 0, 0);
            
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceId: selectedServiceId,
                    startTime: bookingDateTime.toISOString(),
                    clientName,
                    clientPhone,
                }),
            });

            if (res.ok) {
                setIsConfirmed(true);
            } else {
                const err = await res.json();
                alert(err.error || "Failed to create booking");
            }
        } catch (error) {
            console.error("Booking failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setIsConfirmed(false);
        setSelectedServiceId("");
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setCurrentMonth(new Date());
        setClientName("");
        setClientPhone("");
        onClose();
    };

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();

        const days = [];
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isPast = date < new Date(new Date().setHours(0,0,0,0));

            days.push(
                <button 
                    key={i} 
                    onClick={() => !isPast && setSelectedDate(date)}
                    disabled={isPast}
                    className={`aspect-square flex items-center justify-center text-[10px] font-sans font-bold transition-all ${
                        isSelected 
                            ? 'bg-ink text-white shadow-lg' 
                            : isPast 
                                ? 'text-ink-ghost/30 cursor-not-allowed'
                                : 'hover:bg-primary/10 hover:text-primary text-ink-ghost'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-ink/40 backdrop-blur-xl"
                        onClick={handleClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-5xl bg-cloud rounded-xs shadow-2xl overflow-hidden border border-gold-pale/20"
                    >
                        <div className="flex flex-col md:flex-row h-full min-h-[650px]">
                            {/* Left Side: Editorial Context */}
                            <div className="md:w-1/3 p-12 bg-white/50 border-r border-gold-pale/10 flex flex-col justify-between">
                                <div className="space-y-16">
                                    <div className="space-y-6">
                                        <div className="w-10 h-10 bg-ink flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-gold-pale" />
                                        </div>
                                        <h3 className="text-4xl font-serif font-light tracking-tight text-ink leading-tight">
                                            Reserve <br /><span className="italic text-primary">Your Session</span>
                                        </h3>
                                        <p className="font-serif text-sm text-ink-light italic leading-relaxed">
                                            A curated encounter with stillness. No deposit required at this stage.
                                        </p>
                                    </div>

                                    {!isConfirmed && (
                                        <nav className="space-y-10 relative">
                                            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gold-pale/20" />
                                            {steps.map((text, i) => (
                                                <div key={text} className="flex items-center gap-6 relative">
                                                    <div className={`w-4 h-4 rounded-full z-10 border-2 transition-all duration-700 ${step > i ? 'bg-primary border-primary' : step === i + 1 ? 'bg-white border-primary' : 'bg-transparent border-gold-pale/30'}`} />
                                                    <div className="space-y-1">
                                                        <p className={`font-sans text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${step === i + 1 ? 'text-primary' : 'text-ink-ghost'}`}>Phase 0{i + 1}</p>
                                                        <span className={`font-serif text-xs uppercase tracking-widest transition-colors ${step === i + 1 ? 'text-ink' : 'text-ink-ghost'}`}>{text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </nav>
                                    )}
                                </div>

                                <div className="pt-12 border-t border-gold-pale/10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Bell className="w-4 h-4 text-primary" />
                                        <span className="font-sans text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Instant Notification</span>
                                    </div>
                                    <p className="font-serif text-[11px] italic text-ink-light leading-relaxed">The atelier management is notified immediately upon your selection.</p>
                                </div>
                            </div>

                            {/* Right Side: Form Interaction */}
                            <div className="flex-1 p-12 sm:p-20 relative bg-cloud">
                                <button onClick={handleClose} className="absolute top-10 right-10 w-10 h-10 flex items-center justify-center text-ink-ghost hover:text-primary transition-colors">
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="h-full flex flex-col pt-8">
                                    {!isConfirmed ? (
                                        <>
                                            {step === 1 && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                                    <div className="space-y-3">
                                                        <h4 className="text-3xl font-serif font-light tracking-tight text-ink">Select <span className="italic text-primary">Artistry</span></h4>
                                                        <p className="font-sans text-[10px] text-ink-ghost uppercase tracking-[0.4em]">Choose your signature experience.</p>
                                                    </div>
                                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                                        {isLoading ? (
                                                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                                <p className="font-serif text-sm italic text-ink-ghost">Preparing the catalog...</p>
                                                            </div>
                                                        ) : (
                                                            services.map((s) => (
                                                                <button
                                                                    key={s.id}
                                                                    onClick={() => {
                                                                        setSelectedServiceId(s.id);
                                                                        setSelectedService(s);
                                                                    }}
                                                                    className={`w-full p-8 text-left border transition-all flex items-center justify-between group ${selectedServiceId === s.id ? 'border-primary bg-white shadow-xl' : 'border-gold-pale/20 hover:border-primary/40'}`}
                                                                >
                                                                    <div className="space-y-1">
                                                                        <span className="font-serif text-lg text-ink tracking-tight">
                                                                            {language === "VN" ? s.name_vn || s.name : s.name}
                                                                        </span>
                                                                        <p className="font-serif text-xs text-ink-ghost italic">
                                                                            {language === "VN" ? s.description_vn : s.description}
                                                                        </p>
                                                                    </div>
                                                                    <CheckCircle2 className={`w-5 h-5 transition-all flex-shrink-0 ${selectedServiceId === s.id ? 'text-primary scale-110' : 'text-gold-pale/20'}`} />
                                                                </button>
                                                            ))
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                                    <div className="space-y-3">
                                                        <h4 className="text-3xl font-serif font-light tracking-tight text-ink">The <span className="italic text-primary">Timeline</span></h4>
                                                        <p className="font-sans text-[10px] text-ink-ghost uppercase tracking-[0.4em]">Reserve your preferred arrival window.</p>
                                                    </div>
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                        <div className="bg-white/50 p-6 sm:p-10 border border-gold-pale/10">
                                                            <div className="flex items-center justify-between mb-8">
                                                                <button onClick={handlePrevMonth} className="p-2 hover:bg-gold-pale/10 rounded-full transition-colors text-ink-ghost hover:text-primary">
                                                                    <ChevronLeft className="w-5 h-5" />
                                                                </button>
                                                                <div className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink">
                                                                    {currentMonth.toLocaleDateString(language === "VN" ? 'vi-VN' : 'en-US', { month: 'long', year: 'numeric' })}
                                                                </div>
                                                                <button onClick={handleNextMonth} className="p-2 hover:bg-gold-pale/10 rounded-full transition-colors text-ink-ghost hover:text-primary">
                                                                    <ChevronRight className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-7 gap-2 sm:gap-4 text-center">
                                                                {(language === "VN" ? ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]).map((d, i) => <span key={`${d}-${i}`} className="font-sans text-[9px] font-bold text-primary/40 uppercase tracking-[0.3em] mb-4">{d}</span>)}
                                                                {renderCalendar()}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-8">
                                                            <div className="space-y-3">
                                                                <label className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-primary block">Select Time Window</label>
                                                                <div className="grid grid-cols-3 gap-3">
                                                                    {["09:30", "11:00", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"].map((time) => (
                                                                        <button
                                                                            key={time}
                                                                            onClick={() => setSelectedTime(time)}
                                                                            className={`py-4 text-[11px] font-sans font-bold border transition-all ${selectedTime === time ? 'bg-ink text-white border-ink shadow-lg' : 'border-gold-pale/20 text-ink-ghost hover:border-primary/40'}`}
                                                                        >
                                                                            {time}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            
                                                            {selectedDate && selectedTime && (
                                                                <div className="p-6 bg-primary/5 border border-primary/10 rounded-xs">
                                                                    <p className="font-serif text-[11px] text-primary italic leading-relaxed">
                                                                        You have selected <span className="font-bold">{selectedDate.toLocaleDateString(language === "VN" ? 'vi-VN' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span> at <span className="font-bold">{selectedTime}</span>.
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                                    <div className="space-y-3">
                                                        <h4 className="text-3xl font-serif font-light tracking-tight text-ink">Personal <span className="italic text-primary">Identifier</span></h4>
                                                        <p className="font-sans text-[10px] text-ink-ghost uppercase tracking-[0.4em]">Finalize your reservation details.</p>
                                                    </div>

                                                    <div className="space-y-8">
                                                        <div className="space-y-3">
                                                            <label htmlFor="client-name" className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-primary block">Your Name</label>
                                                            <input
                                                                id="client-name"
                                                                type="text"
                                                                value={clientName}
                                                                onChange={(e) => setClientName(e.target.value)}
                                                                placeholder="Enter full name"
                                                                className="w-full p-6 bg-white border border-gold-pale/20 focus:border-primary outline-none font-serif text-ink tracking-wide transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <label htmlFor="client-phone" className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-primary block">Phone Number</label>
                                                            <input
                                                                id="client-phone"
                                                                type="tel"
                                                                value={clientPhone}
                                                                onChange={(e) => setClientPhone(e.target.value)}
                                                                placeholder="+84 ..."
                                                                className="w-full p-6 bg-white border border-gold-pale/20 focus:border-primary outline-none font-serif text-ink tracking-wide transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleConfirm}
                                                        disabled={!clientName || !clientPhone || isSubmitting}
                                                        className="w-full shimmer-gold text-white py-6 font-serif uppercase tracking-[0.4em] text-xs rounded-xs shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-30"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                Finalizing Reservation...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Confirm Atelier Reservation
                                                                <ArrowRight className="w-4 h-4" />
                                                            </>
                                                        )}
                                                    </button>
                                                </motion.div>
                                            )}

                                            <div className="mt-auto pt-16 flex items-center justify-between border-t border-gold-pale/10">
                                                {step > 1 ? (
                                                    <button onClick={() => setStep(step - 1)} className="font-sans text-[9px] font-bold tracking-[0.4em] uppercase text-ink-ghost hover:text-primary transition-all cursor-pointer">Previous Phase</button>
                                                ) : <div />}

                                                {step < 3 && (
                                                    <button
                                                        onClick={() => setStep(step + 1)}
                                                        disabled={(step === 1 && !selectedServiceId) || (step === 2 && (!selectedDate || !selectedTime))}
                                                        className="px-12 py-5 bg-ink text-white text-[10px] font-sans font-bold tracking-[0.3em] uppercase hover:bg-primary transition-all flex items-center gap-4 disabled:opacity-20 cursor-pointer"
                                                    >
                                                        Next Phase
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center h-full text-center space-y-10"
                                        >
                                            <div className="w-20 h-20 bg-white border border-gold-pale/20 flex items-center justify-center mb-4">
                                                <CheckCircle2 className="w-10 h-10 text-primary" />
                                            </div>
                                            <div className="space-y-6">
                                                <h4 className="text-4xl font-serif font-light tracking-tight text-ink">Success.</h4>
                                                <p className="font-serif text-lg text-ink-light italic max-w-sm mx-auto leading-relaxed">
                                                    Your request for **{language === "VN" ? selectedService?.name_vn || selectedService?.name : selectedService?.name}** on {selectedDate?.toLocaleDateString(language === "VN" ? 'vi-VN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime} has been recorded.
                                                </p>
                                                <div className="pt-8 flex justify-center">
                                                    <button
                                                        onClick={handleClose}
                                                        className="px-14 py-6 border border-ink text-ink font-serif uppercase tracking-[0.4em] text-xs hover:bg-ink hover:text-white transition-all duration-700"
                                                    >
                                                        Finalize Experience
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
