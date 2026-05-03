"use client";

import { useState } from "react";
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

  return (
    <main className="relative overflow-x-hidden selection:bg-primary-container/30">
      <Header onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero />
      <BriefIntro />
      <ServicesMenu />
      <VirtualConsultant />
      <BlogPreview />

      <MapSection />
      <Testimonials />
      <CTA onOpenBooking={() => setIsBookingOpen(true)} />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      
      <Footer />
    </main>
  );
}
