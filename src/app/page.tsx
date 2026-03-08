import Header from "@/components/shared/header";
import Hero from "@/components/shared/hero";
import VirtualConsultant from "@/components/gallery/virtual-consultant";
import ServicesMenu from "@/components/shared/services-menu";
import BlogPreview from "@/components/blog/blog-preview";
import MapSection from "@/components/shared/map-section";
import VibrantFooter from "@/components/shared/footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <VirtualConsultant />
      <ServicesMenu />
      <div id="booking" />
      <MapSection />
      <BlogPreview />
      <VibrantFooter />
    </main>
  );
}
