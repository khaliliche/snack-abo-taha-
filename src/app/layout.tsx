import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartProvider from "@/components/CartProvider";
import CartBar from "@/components/CartBar";
import Loader from "@/components/Loader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} – ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#2b3121",
  viewportFit: "cover",
};

/** Exécuté avant le premier affichage : active le loader (1 fois par session, jamais en « réduire les animations »). */
const loaderBoot = `(function(){try{var d=document.documentElement;if(!sessionStorage.getItem("aboLoader")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("is-loading");setTimeout(function(){d.classList.remove("is-loading")},9000)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmsans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBoot }} />

        <noscript>
          <style>{`.reveal,.food__in{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'setTimeout(function(){if(!window.__hydrated)document.documentElement.classList.add("reveal-all")},4000)',
          }}
        />
      </head>
      
      <body>
        <Loader />
        <CartProvider>
          <Navbar />
          <main className="page-enter">{children}</main>
          <Footer />
          <CartBar />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}