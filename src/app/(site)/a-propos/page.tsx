import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";

export const metadata: Metadata = { title: "À propos" };

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre histoire"
        title="À propos"
        sub="Une cuisine de rue généreuse, préparée chaque jour sur place."
        foods={[
          { kind: "burger", left: "68%", top: "18%", size: "clamp(150px,24vw,340px)", m: { left: "58%", top: "8%", size: "42vw" }, rot: 10, fromX: 60, fromY: 20, scale: 0.8, delay: 0.3, depth: 22, float: 5 },
        ]}
      />
      <About />
    </>
  );
}
