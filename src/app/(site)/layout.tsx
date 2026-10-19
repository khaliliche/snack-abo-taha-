import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartProvider from "@/components/CartProvider";
import CartBar from "@/components/CartBar";
import Loader from "@/components/Loader";

/** Exécuté avant le premier affichage : active le loader (1 fois par session, jamais en « réduire les animations »). */
const loaderBoot = `(function(){try{var d=document.documentElement;if(!sessionStorage.getItem("aboLoader")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("is-loading");setTimeout(function(){d.classList.remove("is-loading")},9000)}}catch(e){}})()`;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: loaderBoot }} />
      <Loader />
      <CartProvider>
        <Navbar />
        <main className="page-enter">{children}</main>
        <Footer />
        <CartBar />
        <WhatsAppButton />
      </CartProvider>
    </>
  );
}