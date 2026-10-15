"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { menu } from "@/data/menu";
import { useCart } from "@/components/CartProvider";
import { vars } from "@/lib/css";

export default function MenuSection() {
  const param = useSearchParams().get("c");
  const [active, setActive] = useState(menu.some((c) => c.id === param) ? (param as string) : menu[0].id);
  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `/menu?c=${id}`);
    if (window.innerWidth < 1024) document.getElementById("menu-items")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const category = menu.find((c) => c.id === active) ?? menu[0];
  const { add } = useCart();

  // Permet à d'autres composants de changer de catégorie : window.dispatchEvent(new CustomEvent("menu:select", { detail: "pizzas" }))
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (menu.some((c) => c.id === id)) setActive(id);
    };
    window.addEventListener("menu:select", onSelect);
    return () => window.removeEventListener("menu:select", onSelect);
  }, []);

  return (
    <section id="menu" className="min-h-[70vh] bg-paper px-5 pb-[clamp(6rem,11vw,10rem)] pt-[clamp(3rem,6vw,5rem)] md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Category selector: sticky list on desktop, scrolling pills on mobile */}
          <div className="lg:col-span-4">
            <div className="sticky top-[4.25rem] z-20 -mx-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-paper/90 px-5 py-3 backdrop-blur lg:top-28 lg:mx-0 lg:overflow-visible lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <ul className="flex gap-2 lg:flex-col lg:gap-0" role="tablist" aria-label="Catégories du menu">
                {menu.map((c, i) => {
                  const on = c.id === active;
                  return (
                    <li key={c.id} className="shrink-0">
                      <button
                        role="tab"
                        aria-selected={on}
                        onClick={() => select(c.id)}
                        className={`group flex items-baseline gap-4 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-500 lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-ink/10 lg:bg-transparent lg:px-0 lg:py-3 ${
                          on
                            ? "border-olive-deep bg-olive-deep text-ivory lg:text-harissa"
                            : "border-ink/15 text-ink/70 hover:border-olive-deep lg:text-ink/50 lg:hover:text-olive-deep"
                        }`}
                      >
                        <span className="hidden font-serif text-sm italic lg:inline">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-serif transition-all duration-500 lg:text-3xl lg:font-light ${
                            on ? "lg:translate-x-3 lg:italic" : "lg:group-hover:translate-x-2"
                          } text-base`}
                        >
                          {c.title}
                        </span>
                        <span className="ml-auto hidden text-xs tabular-nums lg:inline">{c.items.length}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Items */}
          <div id="menu-items" className="scroll-mt-36 lg:col-span-8">
            <div key={active}>
              <div className="flex items-end justify-between gap-4 border-b-2 border-olive-deep pb-4">
                <h3 className="menu-title font-serif text-[clamp(2.6rem,6vw,5rem)] font-light leading-none text-olive-deep">
                  {category.title}
                </h3>
                <span className="pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-ink/50">
                  {category.items.length} plats
                </span>
              </div>
              {category.note && <p className="mt-3 text-sm italic text-ink/55">{category.note}</p>}

              <ul className="menu-list mt-4">
                {category.items.map((item, i) => (
                  <li
                    key={item.name}
                    className="menu-row border-b border-ink/10 py-5"
                    style={vars({ "--i": i })}
                  >
                    <div className="flex flex-wrap items-end gap-y-2">
                      <p className="font-serif text-xl font-medium text-ink md:text-2xl">{item.name}</p>
                      {item.signature && (
                        <span className="mb-1 ml-3 rounded-full bg-saffron px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink">
                          Spécialité
                        </span>
                      )}
                      <span className="leader hidden sm:block" aria-hidden />
                      <div className="ml-auto flex shrink-0 items-center gap-2">
                        {item.price !== undefined && (
                          <>
                            <span className="font-serif text-2xl font-semibold text-harissa">
                              {item.price}
                              <small className="ml-1 text-xs font-sans font-semibold tracking-widest text-ink/50">DH</small>
                            </span>
                            <button
                              onClick={() => add(item.name, item.price as number)}
                              aria-label={`Ajouter ${item.name} au panier`}
                              className="add ml-1 flex h-11 w-11 items-center justify-center sm:h-8 sm:w-8 rounded-full bg-olive-deep text-lg leading-none text-ivory hover:bg-saffron hover:text-ink"
                            >
                              +
                            </button>
                          </>
                        )}
                        {item.prices?.map((p) => (
                          <button
                            key={p.label}
                            onClick={() => add(`${item.name} (${p.label})`, p.value)}
                            aria-label={`Ajouter ${item.name} ${p.label} au panier`}
                            className="min-h-11 rounded-full border border-ink/15 px-3 py-1.5 text-sm font-semibold md:min-h-0 text-olive-deep transition-colors hover:border-saffron hover:bg-saffron hover:text-ink"
                          >
                            <span className="mr-1 text-[0.65rem] uppercase tracking-wider text-ink/45">{p.label}</span>
                            {p.value}
                          </button>
                        ))}
                      </div>
                    </div>
                    {item.description && (
                      <p className="mt-1.5 max-w-[34rem] text-sm leading-relaxed text-ink/55">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-ink/40">Prix en dirhams (DH) · Touchez + pour ajouter au panier</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}