import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmsans.variable}`} suppressHydrationWarning>
      <head>
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
      <body>{children}</body>
    </html>
  );
}