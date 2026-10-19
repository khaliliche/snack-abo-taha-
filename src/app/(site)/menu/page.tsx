import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MenuSection from "@/components/MenuSection";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="La carte"
        title="Notre menu"
        sub="Tacos, pizzas, chawarma, tajines et jus frais — touchez + pour composer votre commande."
        foods={[
          { kind: "pizza", left: "72%", top: "10%", size: "clamp(150px,24vw,340px)", m: { left: "60%", top: "6%", size: "42vw" }, rot: 14, fromX: 60, fromY: -20, scale: 0.8, delay: 0.3, depth: 22 },
          { kind: "tacos", left: "56%", top: "52%", size: "clamp(110px,15vw,220px)", m: false, rot: -10, fromX: 40, fromY: 30, scale: 0.8, delay: 0.45, depth: 16, float: 5 },
        ]}
      />
      {/* useSearchParams (MenuSection) exige un <Suspense> pour le rendu statique */}
      <Suspense fallback={<div className="min-h-[70vh] bg-paper" />}>
        <MenuSection />
      </Suspense>
    </>
  );
}