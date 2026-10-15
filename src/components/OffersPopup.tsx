"use client";

import { useEffect, useState } from "react";
import { offers, type Offer } from "@/data/offers";
import { useCart } from "@/components/CartProvider";

const SEEN_KEY = "offers-seen";

export default function OffersPopup() {
  const { add, setOpen: openCart } = useCart();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Offer | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  function close() {
    setShow(false);
    setSelected(null);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }

  function order(o: Offer) {
    add(`Offre : ${o.title}`, o.price);
    close();
    openCart(true);
  }

  if (!show) return null;

  return (
    <div
      className="offers-fade fixed inset-0 z-[70] flex items-end justify-center bg-black/75 backdrop-blur-md md:items-center md:p-6"
      onClick={close}
    >
      <style>{`
        @keyframes offers-fade{from{opacity:0}to{opacity:1}}
        @keyframes offers-pop{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:none}}
        @keyframes offers-pulse{0%,100%{box-shadow:0 0 0 0 rgba(227,167,47,.55)}50%{box-shadow:0 0 0 14px rgba(227,167,47,0)}}
        @keyframes offers-wiggle{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(-3deg) scale(1.06)}}
        @keyframes offers-shine{0%{transform:translateX(-120%) skewX(-20deg)}60%,100%{transform:translateX(260%) skewX(-20deg)}}
        .offers-fade{animation:offers-fade .35s ease both}
        .offers-box{animation:offers-pop .6s cubic-bezier(.16,1,.3,1) both}
        .offers-card{animation:offers-pop .7s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(.15s + var(--i)*.12s)}
        .offers-badge{animation:offers-wiggle 2.4s ease-in-out infinite}
        .offers-cta{animation:offers-pulse 2s infinite}
        .offers-shine::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);animation:offers-shine 3.2s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.offers-box,.offers-card,.offers-badge,.offers-cta,.offers-shine::after,.offers-fade{animation:none}}
      `}</style>

      <div
        role="dialog"
        aria-label="Offres spéciales"
        onClick={(e) => e.stopPropagation()}
        className="offers-box relative max-h-[94svh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-gradient-to-b from-moss to-olive-deep p-5 text-ivory ring-1 ring-saffron/40 md:rounded-[2rem] md:p-9"
      >
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-20 h-10 w-10 rounded-full bg-ivory/10 text-2xl leading-none text-ivory backdrop-blur transition hover:bg-harissa"
        >
          ×
        </button>

        {!selected ? (
          <>
            <div className="text-center">
              <p className="inline-block rounded-full bg-harissa px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-ivory">
                🔥 Offres du moment
              </p>
              <h2 className="mt-3 font-serif text-5xl font-light leading-none md:text-6xl">
                Nos <em className="font-semibold text-saffron">offres</em> spéciales
              </h2>
              <p className="mt-2 text-sm text-ivory/70">Touchez une offre pour voir le détail et commander</p>
            </div>

            <ul className="mt-7 grid gap-5 md:grid-cols-3">
              {offers.map((o, i) => (
                <li key={o.id} className="offers-card" style={{ ["--i" as string]: i }}>
                  <button
                    onClick={() => setSelected(o)}
                    className="group block w-full overflow-hidden rounded-3xl bg-black text-left ring-1 ring-saffron/30 transition duration-300 hover:-translate-y-2 hover:ring-saffron hover:shadow-[0_20px_40px_-12px_rgba(227,167,47,.45)]"
                  >
                    <span className="offers-shine relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={o.image}
                        alt={o.imageAlt}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="flex items-center justify-between gap-2 border-t border-saffron/30 bg-olive-deep px-4 py-3">
                      <span className="min-w-0">
                        <span className="block truncate font-serif text-lg font-semibold leading-tight">{o.title}</span>
                        <span className="font-serif text-2xl font-bold text-saffron">{o.price} DH</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-saffron px-3 py-1.5 text-xs font-bold text-ink transition group-hover:bg-ivory">
                        Voir →
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button onClick={close} className="mx-auto mt-6 block text-xs uppercase tracking-[0.25em] text-ivory/50 hover:text-ivory">
              Continuer vers le site
            </button>
          </>
        ) : (
          <div className="offers-card" style={{ ["--i" as string]: 0 }}>
            <button
              onClick={() => setSelected(null)}
              className="rounded-full bg-ivory/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-ivory/20"
            >
              ← Toutes les offres
            </button>
            <div className="mt-5 grid items-center gap-7 md:grid-cols-2">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  className="max-h-[62svh] w-full rounded-3xl bg-black object-contain ring-1 ring-saffron/40"
                />
                <span className="offers-badge absolute -right-2 -top-3 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-saffron text-ink shadow-xl">
                  <span className="font-serif text-3xl font-bold leading-none">{selected.price}</span>
                  <span className="text-xs font-bold">DH</span>
                </span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-saffron">Offre spéciale</p>
                <h3 className="mt-1 font-serif text-5xl font-light leading-none">{selected.title}</h3>
                <p className="mt-3 text-ivory/75">{selected.tagline}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {selected.includes.map((i) => (
                    <li key={i} className="rounded-full bg-ivory/10 px-3 py-1.5 text-sm font-medium ring-1 ring-ivory/15">
                      <span className="text-saffron">✓</span> {i}
                    </li>
                  ))}
                </ul>
                {selected.note && <p className="mt-4 text-xs text-ivory/60">⏰ {selected.note}</p>}

                <p className="mt-6 font-serif text-6xl font-semibold text-saffron">
                  {selected.price} <span className="text-3xl">DH</span>
                </p>
                <button
                  onClick={() => order(selected)}
                  className="offers-cta mt-5 w-full rounded-full bg-saffron px-6 py-4 text-base font-bold text-ink transition hover:bg-ivory"
                >
                  Ajouter au panier →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

