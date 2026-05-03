"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, Bell } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    const steps = ["Experience", "Schedule", "Contact"];

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    const handleClose = () => {
        setStep(1);
        setIsConfirmed(false);
        setSelectedService("");
        setClientName("");
        setClientPhone("");
        onClose();
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
                                                    <div className="space-y-4">
                                                        {["The Muse Sculpt (Glass Nails)", "Lineal Artistry (3D Sculpture)", "The Ritual (Recovery Spa)"].map((s) => (
                                                            <button
                                                                key={s}
                                                                onClick={() => setSelectedService(s)}
                                                                className={`w-full p-8 text-left border transition-all flex items-center justify-between group ${selectedService === s ? 'border-primary bg-white shadow-xl' : 'border-gold-pale/20 hover:border-primary/40'}`}
                                                            >
                                                                <span className="font-serif text-lg text-ink tracking-tight">{s}</span>
                                                                <CheckCircle2 className={`w-5 h-5 transition-all ${selectedService === s ? 'text-primary scale-110' : 'text-gold-pale/20'}`} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                                    <div className="space-y-3">
                                                        <h4 className="text-3xl font-serif font-light tracking-tight text-ink">The <span className="italic text-primary">Timeline</span></h4>
                                                        <p className="font-sans text-[10px] text-ink-ghost uppercase tracking-[0.4em]">Reserve your preferred arrival window.</p>
                                                    </div>
                                                    <div className="bg-white/50 p-10 border border-gold-pale/10">
                                                        <div className="grid grid-cols-7 gap-4 text-center">
                                                            {["S", "M", "T", "W", "T", "F", "S"].map(d => <span key={d} className="font-sans text-[9px] font-bold text-primary/40 uppercase tracking-[0.3em] mb-4">{d}</span>)}
                                                            {Array.from({ length: 31 }, (_, i) => (
                                                                <button key={i} className={`aspect-square flex items-center justify-center text-[10px] font-sans font-bold transition-all ${i === 15 ? 'bg-ink text-white shadow-lg' : 'hover:bg-primary/10 hover:text-primary'}`}>
                                                                    {i + 1}
                                                                </button>
                                                            ))}
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
                                                        disabled={!clientName || !clientPhone}
                                                        className="w-full shimmer-gold text-white py-6 font-serif uppercase tracking-[0.4em] text-xs rounded-xs shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-30"
                                                    >
                                                        Confirm Atelier Reservation
                                                        <ArrowRight className="w-4 h-4" />
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
                                                        disabled={step === 1 && !selectedService}
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
                                                    Your request for **{selectedService}** has been recorded. The atelier is awaiting your arrival.
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
