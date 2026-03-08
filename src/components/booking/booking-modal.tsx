"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Sparkles, Heart, CheckCircle2, Phone, ArrowRight, Bell, Smartphone } from "lucide-react";
import { useState } from "react";
import GlassCard from "../shared/glass-card";

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
        // Mocking the notification trigger to owner
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
                        className="fixed inset-0 bg-brand-pink/10 backdrop-blur-[32px]"
                        onClick={handleClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-4xl bg-white/90 rounded-[50px] shadow-[0_50px_100px_-20px_rgba(236,72,153,0.2)] overflow-hidden border border-white"
                    >
                        <div className="flex flex-col md:flex-row h-full min-h-[600px]">
                            {/* Left Side: Progress */}
                            <div className="md:w-1/3 p-12 bg-gradient-to-br from-brand-pink/10 to-brand-orange/10 border-r border-brand-pink/5 flex flex-col justify-between">
                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center shadow-lg shadow-brand-pink/30">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-4xl font-display font-black tracking-tight text-brand-900">Book <br /><span className="text-brand-pink">Session</span></h3>
                                        <p className="text-sm text-brand-900/40 font-bold leading-relaxed">No deposit required. Pay at the salon.</p>
                                    </div>

                                    {!isConfirmed && (
                                        <nav className="space-y-10 relative">
                                            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-brand-pink/10" />
                                            {steps.map((text, i) => (
                                                <div key={text} className="flex items-center gap-6 relative group">
                                                    <div className={`w-5 h-5 rounded-full z-10 ring-4 ring-white transition-all duration-500 ${step > i ? 'bg-brand-pink scale-110 shadow-lg shadow-brand-pink/40' : step === i + 1 ? 'bg-brand-orange scale-110 shadow-lg shadow-brand-orange/40' : 'bg-brand-pink/20'}`} />
                                                    <div className="space-y-1">
                                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${step === i + 1 ? 'text-brand-orange' : 'text-brand-900/30'}`}>Step 0{i + 1}</p>
                                                        <span className={`text-xs font-black tracking-wider uppercase transition-colors ${step === i + 1 ? 'text-brand-900' : 'text-brand-900/30'}`}>{text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </nav>
                                    )}
                                </div>

                                <div className="space-y-4 pt-12">
                                    <GlassCard className="p-6 border-brand-pink/20 glass-vibrant bg-white shadow-xl shadow-brand-pink/5">
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-5 h-5 text-brand-pink animate-swing" />
                                            <p className="text-[10px] font-black text-brand-pink uppercase tracking-widest">Instant Sync</p>
                                        </div>
                                        <p className="text-xs font-bold mt-3 leading-relaxed text-brand-900/70">Owner is notified immediately via push notification upon booking.</p>
                                    </GlassCard>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex-1 p-12 sm:p-16 relative bg-white">
                                <button onClick={handleClose} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="h-full flex flex-col pt-8">
                                    {!isConfirmed ? (
                                        <>
                                            {step === 1 && (
                                                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                                    <div className="space-y-2">
                                                        <h4 className="text-3xl font-display font-black tracking-tight text-brand-900">Choose your <span className="text-brand-pink">Experience</span></h4>
                                                        <p className="text-brand-900/40 font-bold">Pick your signature style.</p>
                                                    </div>
                                                    <div className="space-y-5">
                                                        {["Glass Nails Signature", "3D Art Sculpture", "Biotin Recovery Ritual"].map((s, i) => (
                                                            <button
                                                                key={s}
                                                                onClick={() => setSelectedService(s)}
                                                                className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${selectedService === s ? 'border-brand-pink bg-brand-pink/5 scale-[1.02] shadow-xl' : 'border-brand-900/5'}`}
                                                            >
                                                                <span className="text-lg font-black text-brand-900 tracking-tight">{s}</span>
                                                                <CheckCircle2 className={`w-6 h-6 ${selectedService === s ? 'text-brand-pink' : 'text-brand-900/10'}`} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                                    <div className="space-y-2">
                                                        <h4 className="text-3xl font-display font-black tracking-tight text-brand-900">Select <span className="text-brand-orange">Timeline</span></h4>
                                                        <p className="text-brand-900/40 font-bold">Choose a date for your visit.</p>
                                                    </div>
                                                    <div className="bg-brand-pink/5 p-8 rounded-[40px] border border-brand-pink/10">
                                                        <div className="grid grid-cols-7 gap-2 text-center mb-6">
                                                            {["S", "M", "T", "W", "T", "F", "S"].map(d => <span key={d} className="text-[10px] font-black text-brand-pink/40 uppercase tracking-widest">{d}</span>)}
                                                            {Array.from({ length: 31 }, (_, i) => (
                                                                <button key={i} className={`aspect-square flex items-center justify-center rounded-2xl text-xs font-black ${i === 15 ? 'bg-brand-orange text-white shadow-lg' : 'hover:bg-brand-pink/20 hover:text-brand-pink'}`}>
                                                                    {i + 1}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                                    <div className="space-y-2">
                                                        <h4 className="text-3xl font-display font-black tracking-tight text-brand-900">Your <span className="text-brand-pink">Contact</span></h4>
                                                        <p className="text-brand-900/40 font-bold">We will notify the owner of your arrival.</p>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Full Name</label>
                                                            <input
                                                                type="text"
                                                                value={clientName}
                                                                onChange={(e) => setClientName(e.target.value)}
                                                                placeholder="Type your name..."
                                                                className="w-full p-5 rounded-2xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-pink outline-none font-bold text-brand-900 transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Phone Number</label>
                                                            <input
                                                                type="tel"
                                                                value={clientPhone}
                                                                onChange={(e) => setClientPhone(e.target.value)}
                                                                placeholder="We will contact you here..."
                                                                className="w-full p-5 rounded-2xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-pink outline-none font-bold text-brand-900 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleConfirm}
                                                        disabled={!clientName || !clientPhone}
                                                        className="w-full bg-brand-900 text-white py-6 rounded-[30px] font-black text-xl shadow-xl hover:bg-brand-pink transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:grayscale"
                                                    >
                                                        Confirm Appointment
                                                        <ArrowRight className="w-6 h-6" />
                                                    </button>
                                                </motion.div>
                                            )}

                                            <div className="mt-auto pt-12 flex items-center justify-between">
                                                {step > 1 ? (
                                                    <button onClick={() => setStep(step - 1)} className="text-[10px] font-black tracking-[0.3em] uppercase text-brand-900/40 hover:text-brand-pink transition-all">Back</button>
                                                ) : <div />}

                                                {step < 3 && (
                                                    <button
                                                        onClick={() => setStep(step + 1)}
                                                        disabled={step === 1 && !selectedService}
                                                        className="bg-brand-pink text-white px-12 py-5 rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 transition-all flex items-center gap-4 disabled:opacity-50"
                                                    >
                                                        Next
                                                        <ArrowRight className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center h-full text-center space-y-12"
                                        >
                                            {/* OWNER NOTIFICATION MOCKUP */}
                                            <div className="relative">
                                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl animate-bounce">
                                                    New Notification Sent!
                                                </div>
                                                <div className="w-72 h-[480px] bg-brand-900 rounded-[40px] border-8 border-brand-900 shadow-2xl overflow-hidden relative">
                                                    <div className="absolute top-0 inset-x-0 h-6 bg-brand-900 flex justify-center items-center">
                                                        <div className="w-20 h-4 bg-black rounded-full" />
                                                    </div>
                                                    <div className="p-4 pt-10 h-full bg-[#1a1a1a]">
                                                        {/* iPhone Style Notification */}
                                                        <motion.div
                                                            initial={{ y: -50, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 1, type: "spring" }}
                                                            className="w-full bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-start gap-3"
                                                        >
                                                            <div className="w-10 h-10 bg-brand-pink rounded-lg flex items-center justify-center shadow-lg shadow-brand-pink/30">
                                                                <Sparkles className="w-5 h-5 text-white" />
                                                            </div>
                                                            <div className="text-left flex-1">
                                                                <div className="flex justify-between items-center">
                                                                    <p className="text-[10px] font-black text-brand-pink uppercase tracking-widest">Website 2.0</p>
                                                                    <p className="text-[8px] text-white/40">now</p>
                                                                </div>
                                                                <p className="text-xs font-black text-white mt-1">New Appointment ✨</p>
                                                                <p className="text-[10px] text-white/60 leading-tight mt-1">
                                                                    {clientName} vừa đặt {selectedService}. Hãy kiểm tra lịch ngay!
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                        <div className="mt-8 flex flex-col items-center space-y-4">
                                                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Owner Device Simulation</p>
                                                            <div className="w-full h-px bg-white/5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h4 className="text-4xl font-display font-black tracking-tight text-brand-900">Success!</h4>
                                                <p className="text-brand-900/60 font-bold max-w-xs mx-auto leading-relaxed">
                                                    Cảm ơn **{clientName}**! Lịch hẹn của bạn đã được gửi trực tiếp đến quản lý tiệm. Hẹn gặp bạn tại salon!
                                                </p>
                                                <button
                                                    onClick={handleClose}
                                                    className="px-12 py-5 rounded-full bg-brand-900 text-white font-black text-lg hover:bg-brand-orange hover:scale-105 transition-all shadow-xl"
                                                >
                                                    Perfect, see you!
                                                </button>
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
