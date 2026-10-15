
"use client";

import { useEffect, useRef, useState } from "react";
import { photos } from "@/components/Food";
import { heroFoods, showcase } from "@/data/showcase";
import { vars } from "@/lib/css";

const MIN_MS = 1700; // durée minimale (le loader ne « clignote » jamais)
const MAX_MS = 5500; // durée maximale (réseau lent : on ouvre quand même)
const TAGS = ["Tacos", "Pizzas", "Chawarma", "Jus frais"];

/**
 * Loader d'entrée : visible une fois par session (voir script du layout).
 * Attend : polices, événement `load`, et le décodage des photos du hero + de la 1re section.
 * Puis le rideau se lève et SEULEMENT là les animations du hero démarrent.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains("is-loading")) {
      setGone(true);
      return;
    }

    const srcs =
      window.location.pathname === "/"
        ? Array.from(new Set([...heroFoods, ...showcase[0].foods].map((f) => photos[f.kind]).filter(Boolean) as string[]))
        : [];

    let done = 0;
    const total = 2 + srcs.length;
    const tick = () => {
      done += 1;
    };

    (document.fonts?.ready ?? Promise.resolve()).then(tick, tick);
    if (document.readyState === "complete") tick();
    else window.addEventListener("load", tick, { once: true });
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      (img.decode ? img.decode() : Promise.resolve()).then(tick, tick);
    });

    const t0 = performance.now();
    let shown = 0;
    let raf = 0;
    let finished = false;
    const timers: number[] = [];

    const loop = (now: number) => {
      const elapsed = now - t0;
      const target = elapsed >= MAX_MS ? 1 : Math.min(done / total, elapsed / MIN_MS);
      shown += (target - shown) * 0.1;
      if (target - shown < 0.004) shown = target;
      if (count.current) count.current.textContent = String(Math.round(shown * 100));
      if (bar.current) bar.current.style.transform = `scaleX(${shown})`;

      if (shown >= 1 && !finished) {
        finished = true;
        timers.push(
          window.setTimeout(() => {
            el.classList.add("is-out"); // le rideau se lève
            timers.push(
              window.setTimeout(() => {
                html.classList.remove("is-loading"); // le hero démarre sous le rideau
                try {
                  sessionStorage.setItem("aboLoader", "1");
                } catch {}
              }, 150),
              window.setTimeout(() => setGone(true), 1100)
            );
          }, 300)
        );
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", tick);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="loader bg-olive-deep text-ivory" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 45%, rgba(227,167,47,.22), transparent 70%), radial-gradient(80% 60% at 0% 100%, rgba(89,96,64,.8), transparent 60%)",
        }}
      />

      <div className="loader-inner relative flex flex-1 flex-col items-center justify-center px-5 text-center">
        <span className="loader-star text-3xl text-saffron">✦</span>
        <div className="mt-6 font-serif leading-[0.9]">
          <span className="loader-word block overflow-hidden pb-[0.08em] text-[clamp(1.4rem,4vw,2.4rem)] italic text-saffron">
            <span style={vars({ "--rd": "0.1s" })}>Snack</span>
          </span>
          <span className="loader-word block overflow-hidden pb-[0.08em] text-[clamp(3.2rem,14vw,10rem)] font-light uppercase tracking-[0.04em]">
            <span style={vars({ "--rd": "0.25s" })}>Abo Taha</span>
          </span>
        </div>
        <div className="relative mt-8 h-5 w-64 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-ivory/60">
          {TAGS.map((t, i) => (
            <span key={t} className="loader-tag" style={vars({ "--i": i })}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="loader-inner relative flex items-end justify-between px-5 pb-8 md:px-10">
        <p className="font-serif text-[clamp(3.5rem,12vw,8rem)] font-light leading-none tabular-nums">
          <span ref={count}>0</span>
          <span className="ml-1 text-[0.35em] text-saffron">%</span>
        </p>
        <p className="pb-2 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-ivory/60">Préparation…</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ivory/10">
        <div ref={bar} className="h-full origin-left bg-saffron" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
