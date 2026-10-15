"use client";

import Link from "next/link";
import { useState } from "react";
import FoodArt, { type FoodKind } from "@/components/Food";
import Reveal from "@/components/Reveal";
import { useCart } from "@/components/CartProvider";
import { featured } from "@/data/featured";
import { findItem } from "@/lib/menu";

const cards = featured.flatMap((f) => {
  const item = findItem(f.category, f.name);
  return item ? [{ ...f, item }] : [];
});

/** Vraie photo si elle existe, sinon illustration (pas d'image cassée). */
function Pic({ kind, src, sizes }: { kind: FoodKind; src?: string; sizes: string }) {
  const [broken, setBroken] = useState(false);
  if (src && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={720}
        height={720}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setBroken(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  }
  return <FoodArt kind={kind} sizes={sizes} />;
}

function Card({ c, big }: { c: (typeof cards)[number]; big: boolean }) {
  const { add } = useCart();
  const [done, setDone] = useState<string | null>(null);
  const { item } = c;

  const hit = (label: string, price: number, key: string) => {
    add(label, price);
    setDone(key);
    window.setTimeout(() => setDone((d) => (d === key ? null : d)), 1400);
  };

  return (
    <article
      className={`group relative flex h-full w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] p-6 sm:w-[46%] md:w-auto md:p-8 ${
        big ? "bg-olive-deep text-ivory lg:row-span-2" : "border border-ink/10 bg-paper"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-3/5"
        style={{ background: `radial-gradient(50% 60% at 50% 45%, rgba(227,167,47,${big ? 0.28 : 0.2}), transparent 70%)` }}
      />
      <div className="relative">
        {c.tag && (
          <span className="absolute left-0 top-0 z-10 rounded-full bg-saffron px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink">
            {c.tag}
          </span>
        )}
        <div
          className={`mx-auto aspect-square transition-transform duration-700 [filter:drop-shadow(0_18px_18px_rgba(18,22,10,.28))] [transition-timing-function:var(--ease)] group-hover:-translate-y-2 group-hover:rotate-[-6deg] group-hover:scale-105 ${
            big ? "w-[min(100%,22rem)]" : "w-[min(100%,12rem)]"
          }`}
        >
          <Pic kind={c.kind} src={c.photo} sizes={big ? "352px" : "192px"} />
        </div>
      </div>

      <h3 className={`relative mt-4 font-serif font-medium leading-tight ${big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>{item.name}</h3>
      <p className="relative mt-2 max-w-sm text-sm leading-relaxed opacity-70">{c.pitch}</p>
      {c.ingredients && c.ingredients.length > 0 && (
        <ul className="relative mt-4 flex flex-wrap gap-2" aria-label="Ingrédients">
          {c.ingredients.map((g) => (
            <li
              key={g.label}
              className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-[0.72rem] font-medium ${
                big ? "border-ivory/20 bg-ivory/5" : "border-ink/10 bg-sand/50"
              }`}
            >
              <span className="h-7 w-7 shrink-0 rounded-full bg-ivory/90 p-1">
                <FoodArt kind={g.kind} sizes="28px" />
              </span>
              {g.label}
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
        {item.prices?.map((p) => {
          const key = p.label;
          const on = done === key;
          return (
            <button
              key={p.label}
              onClick={() => hit(`${item.name} (${p.label})`, p.value, key)}
              aria-label={`Ajouter ${item.name} ${p.label} au panier`}
              className={`h-11 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 ${
                on
                  ? "border-saffron bg-saffron text-ink"
                  : big
                    ? "border-ivory/30 hover:border-saffron hover:bg-saffron hover:text-ink"
                    : "border-ink/20 hover:border-saffron hover:bg-saffron"
              }`}
            >
              {on ? (
                "✓ Ajouté"
              ) : (
                <>
                  <span className="mr-1.5 text-[0.65rem] uppercase tracking-wider opacity-60">{p.label}</span>
                  {p.value} DH
                </>
              )}
            </button>
          );
        })}
        {item.price !== undefined && (
          <button
            onClick={() => hit(item.name, item.price as number, "one")}
            aria-label={`Ajouter ${item.name} au panier`}
            className="btn btn-solid"
          >
            {done === "one" ? "✓ Ajouté" : `Ajouter · ${item.price} DH`}
          </button>
        )}
      </div>
    </article>
  );
}

export default function Favorites() {
  if (cards.length === 0) return null;
  return (
    <section id="favoris" className="bg-sand/60 px-5 py-[clamp(4rem,8vw,7rem)] md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-harissa">Coups de cœur</p>
            </Reveal>
            <Reveal as="h2" delay={0.1} className="mt-5 font-serif text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] text-olive-deep">
              Une envie ?
              <br />
              <em className="text-harissa">Ajoutez-la d&apos;un geste.</em>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink/70">
              Touchez un prix : le plat rejoint votre panier. Il ne reste qu&apos;à l&apos;envoyer sur WhatsApp.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:p-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {cards.map((c, i) => (
              <Card key={c.name} c={c} big={i === 0} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link href="/menu" className="btn btn-dark">
            Voir toute la carte <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}