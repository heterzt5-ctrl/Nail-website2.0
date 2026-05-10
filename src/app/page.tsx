"use client";

import { useState, useEffect } from "react";
import Header from "@/components/shared/header";
import Hero from "@/components/shared/hero";
import BriefIntro from "@/components/shared/brief-intro";
import ServicesMenu from "@/components/shared/services-menu";
import VirtualConsultant from "@/components/gallery/virtual-consultant";
import BlogPreview from "@/components/blog/blog-preview";
import MapSection from "@/components/shared/map-section";
import Testimonials from "@/components/shared/testimonials";
import CTA from "@/components/shared/cta";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsBookingOpen(true);
    window.addEventListener("open-booking", handleOpen);
    return () => window.removeEventListener("open-booking", handleOpen);
  }, []);

  return (
    // ⚠️ overflow-x-hidden đã được chuyển vào div bên trong
    // KHÔNG đặt overflow bất kỳ giá trị nào trên <main> — sẽ trap position:fixed
    <main className="relative selection:bg-primary-container/30">
      <div className="overflow-x-hidden">
        <Header onOpenBooking={() => setIsBookingOpen(true)} />
        <Hero />
        <BriefIntro />
        <ServicesMenu />
        <VirtualConsultant />
        <BlogPreview />
        <MapSection />
        <Testimonials />
        <CTA onOpenBooking={() => setIsBookingOpen(true)} />
        <Footer />
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}