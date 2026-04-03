import Header from "@/components/shared/header";
import Hero from "@/components/shared/hero";
import ServicesMenu from "@/components/shared/services-menu";
import Footer from "@/components/shared/footer";
import VisualBreak from "@/components/shared/visual-break";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden selection:bg-gold/20 selection:text-ink">
      <Header />
      <Hero />
      <VisualBreak />
      <ServicesMenu />
      <div id="booking" />
      <Footer />
    </main>
  );
}

