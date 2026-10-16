"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { menu, type MenuItem } from "@/data/menu";
import { useCart } from "@/components/CartProvider";
import { vars } from "@/lib/css";

export default function MenuSection() {
  const param = useSearchParams().get("c");
  const [active, setActive] = useState(menu.some((c) => c.id === param) ? (param as string) : menu[0].id);
  const [flash, setFlash] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { add } = useCart();
  const category = menu.find((c) => c.id === active) ?? menu[0];

  // Mobile : garde l'onglet actif parfaitement centré dans la barre horizontale
  const centerTab = useCallback((id: string, smooth = true) => {
    const bar = barRef.current;
    const tab = tabRefs.current[id];
    if (!bar || !tab || window.innerWidth >= 1024) return;
    const b = bar.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const left = bar.scrollLeft + (t.left - b.left) - (b.width - t.width) / 2;
    bar.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => centerTab(active, false), []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => centerTab(active), [active, centerTab]);
  useEffect(() => () => clearTimeout(flashTimer.current), []);

  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `/menu?c=${id}`);
    if (window.innerWidth < 1024) document.getElementById("menu-items")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Permet à d'autres composants de changer de catégorie : window.dispatchEvent(new CustomEvent("menu:select", { detail: "pizzas" }))
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (menu.some((c) => c.id === id)) setActive(id);
    };
    window.addEventListener("menu:select", onSelect);
    return () => window.removeEventListener("menu:select", onSelect);
  }, []);

  const addToCart = (key: string, name: string, price: number) => {
    add(name, price);
    setFlash(key);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 700);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(12);
  };

  const sizeButtons = (item: MenuItem, className: string) =>
    item.prices && (
      <div className={className}>
        {item.prices.map((p) => {
          const key = `${item.name}-${p.label}`;
          const done = flash === key;
          return (
            <button
              key={p.label}
              onClick={() => addToCart(key, `${item.name} (${p.label})`, p.value)}
              aria-label={`Ajouter ${item.name} ${p.label} au panier`}
              className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-all duration-200 active:scale-95 sm:min-h-0 sm:py-1.5 ${
                done
                  ? "border-saffron bg-saffron text-ink"
                  : "border-ink/15 bg-sand/30 text-olive-deep hover:border-saffron hover:bg-saffron hover:text-ink"
              }`}
            >
              <span className="text-[0.65rem] uppercase tracking-wider opacity-60">{done ? "✓" : p.label}</span>
              <span className="tabular-nums">{p.value}</span>
              <span className="text-[0.6rem] opacity-50 sm:hidden">DH</span>
            </button>
          );
        })}
      </div>
    );

  return (
    <section id="menu" className="min-h-[70vh] overflow-x-clip bg-paper px-5 pb-[clamp(7rem,11vw,10rem)] pt-[clamp(1.5rem,6vw,5rem)] md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-12 lg:gap-16">
          {/* Sélecteur : liste sticky sur desktop, barre de pastilles à snap sur mobile */}
          <div className="min-w-0 lg:col-span-4">
            <div
              ref={barRef}
              className="sticky top-[4.25rem] z-20 -mx-5 snap-x snap-proximity overflow-x-auto overscroll-x-contain border-b border-ink/10 bg-paper/95 px-5 py-3 backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-10 md:px-10 lg:top-28 lg:mx-0 lg:snap-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
            >
              <ul className="flex w-max gap-2 lg:w-auto lg:flex-col lg:gap-0" role="tablist" aria-label="Catégories du menu">
                {menu.map((c, i) => {
                  const on = c.id === active;
                  return (
                    <li key={c.id} className="shrink-0 snap-center lg:snap-align-none">
                      <button
                        ref={(el) => {
                          tabRefs.current[c.id] = el;
                        }}
                        role="tab"
                        aria-selected={on}
                        onClick={() => select(c.id)}
                        className={`group flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-all duration-300 active:scale-95 lg:w-full lg:items-baseline lg:gap-4 lg:rounded-none lg:border-0 lg:border-b lg:border-ink/10 lg:bg-transparent lg:px-0 lg:py-3 ${
                          on
                            ? "border-olive-deep bg-olive-deep text-ivory lg:text-harissa"
                            : "border-ink/15 bg-sand/30 text-ink/70 hover:border-olive-deep lg:text-ink/50 lg:hover:text-olive-deep"
                        }`}
                      >
                        <span className="hidden font-serif text-sm italic lg:inline">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-serif text-base transition-all duration-500 lg:text-3xl lg:font-light ${
                            on ? "lg:translate-x-3 lg:italic" : "lg:group-hover:translate-x-2"
                          }`}
                        >
                          {c.title}
                        </span>
                        <span
                          className={`rounded-full px-1.5 text-[0.65rem] tabular-nums lg:ml-auto lg:bg-transparent lg:px-0 lg:text-xs ${
                            on ? "bg-ivory/20" : "bg-ink/10"
                          }`}
                        >
                          {c.items.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Plats */}
          <div id="menu-items" className="min-w-0 scroll-mt-32 lg:col-span-8 lg:scroll-mt-36">
            <div key={active}>
              <div className="flex items-end justify-between gap-4 border-b-2 border-olive-deep pb-3 sm:pb-4">
                <h3 className="menu-title min-w-0 font-serif text-[clamp(2.2rem,6vw,5rem)] font-light leading-none text-olive-deep">
                  {category.title}
                </h3>
                <span className="shrink-0 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ink/50 sm:pb-2 sm:tracking-[0.3em]">
                  {category.items.length} plats
                </span>
              </div>
              {category.note && <p className="mt-3 text-sm italic text-ink/55">{category.note}</p>}

              <ul className="menu-list mt-2 sm:mt-4">
                {category.items.map((item, i) => {
                  const key = `${item.name}-single`;
                  const done = flash === key;
                  return (
                    <li key={item.name} className="menu-row border-b border-ink/10 py-4 sm:py-5" style={vars({ "--i": i })}>
                      <div className="flex items-start gap-3 sm:items-end sm:gap-0">
                        <div className="min-w-0 flex-1 sm:flex-none">
                          <p className="font-serif text-xl font-medium leading-snug text-ink md:text-2xl">
                            {item.name}
                            {item.signature && (
                              <span className="ml-2 inline-block -translate-y-0.5 rounded-full bg-saffron px-2 py-0.5 align-middle font-sans text-[0.55rem] font-bold uppercase tracking-[0.18em] text-ink sm:ml-3 sm:text-[0.6rem]">
                                Spécialité
                              </span>
                            )}
                          </p>
                        </div>

                        <span className="leader hidden sm:block" aria-hidden />

                        {item.price !== undefined && (
                          <div className="flex shrink-0 items-center gap-2.5">
                            <span className="font-serif text-2xl font-semibold leading-none text-harissa">
                              {item.price}
                              <small className="ml-1 font-sans text-xs font-semibold tracking-widest text-ink/50">DH</small>
                            </span>
                            <button
                              onClick={() => addToCart(key, item.name, item.price as number)}
                              aria-label={`Ajouter ${item.name} au panier`}
                              className={`add flex h-11 w-11 items-center justify-center rounded-full text-xl leading-none transition-colors active:scale-90 sm:h-8 sm:w-8 sm:text-lg ${
                                done ? "bg-saffron text-ink" : "bg-olive-deep text-ivory hover:bg-saffron hover:text-ink"
                              }`}
                            >
                              {done ? "✓" : "+"}
                            </button>
                          </div>
                        )}

                        {/* Tailles : sur la ligne à partir de sm */}
                        {sizeButtons(item, "hidden shrink-0 items-center gap-2 sm:flex")}
                      </div>

                      {item.description && (
                        <p className="mt-1.5 max-w-[34rem] text-[0.9rem] leading-relaxed text-ink/60 sm:text-sm sm:text-ink/55">
                          {item.description}
                        </p>
                      )}

                      {/* Tailles : grille pleine largeur sur mobile (cibles tactiles égales) */}
                      {sizeButtons(item, "mt-3 grid w-full grid-cols-3 gap-2 sm:hidden")}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.25em] text-ink/40 sm:text-left sm:text-xs sm:tracking-[0.3em]">
                Prix en dirhams (DH) · Touchez + pour ajouter au panier
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}