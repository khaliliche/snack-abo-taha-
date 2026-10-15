import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import MenuSection from "@/components/MenuSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartProvider from "@/components/CartProvider";
import CartBar from "@/components/CartBar";
import OffersPopup from "@/components/OffersPopup";

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Showcase />
        <MenuSection />
        <Contact />
      </main>
      <Footer />
      <CartBar />
      <OffersPopup />
      <WhatsAppButton />
    </CartProvider>
  );
}
