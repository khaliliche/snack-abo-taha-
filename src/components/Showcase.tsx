"use client";

import FoodField from "@/components/FoodField";
import Reveal from "@/components/Reveal";
import { vars } from "@/lib/css";
import { showcase } from "@/data/showcase";

/** Tell the menu which category to open, then scroll to it. */
function openCategory(id: string) {
  window.dispatchEvent(new CustomEvent("menu:select", { detail: id }));
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Showcase() {
  return (
    <section id="specialites" className="relative overflow-x-clip bg-olive text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 50% 0%, rgba(243,234,210,.10), transparent 70%), radial-gradient(60% 40% at 50% 100%, rgba(43,49,33,.55), transparent 70%)",
        }}
      />

      <div className="relative px-5 pb-6 pt-[clamp(6rem,11vw,10rem)] text-center">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-saffron">Nos spécialités</p>
        </Reveal>
      </div>

      {showcase.map((row) => (
        <article key={row.id} data-food-host className="showcase-row relative">
          <div className="rule absolute inset-x-0 top-0 mx-auto h-px max-w-[1100px] bg-ivory/25" />
          <FoodField foods={row.foods} />

          <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-[clamp(7.5rem,13vw,11rem)] text-center">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.45em] text-ivory/60">
              {row.n} — {row.eyebrow}
            </p>
            <h3
              className="row-title mt-5 font-serif text-[clamp(3.4rem,12.5vw,10.5rem)] font-light uppercase leading-[0.95] tracking-[0.06em]"
              aria-label={row.title}
            >
              {Array.from(row.title).map((c, i) => (
                <span key={i} aria-hidden className="ch" style={vars({ "--i": i })}>
                  {c === " " ? "\u00a0" : c}
                </span>
              ))}
            </h3>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/75 md:text-base">{row.sub}</p>
            <button onClick={() => openCategory(row.target)} className="btn btn-ghost mt-8">
              {row.cta} <span className="arrow">→</span>
            </button>
          </div>
        </article>
      ))}

      <div className="relative mx-auto h-px max-w-[1100px] bg-ivory/25" />
      <div className="h-[clamp(4rem,8vw,7rem)]" />
    </section>
  );
}
