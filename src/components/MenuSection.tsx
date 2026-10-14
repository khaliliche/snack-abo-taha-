"use client";

import { useState } from "react";
import { menu } from "@/data/menu";

export default function MenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const category = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <section id="menu" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Notre carte</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-brand">Le menu</h2>
        </div>

        <div className="-mx-5 mt-10 overflow-x-auto px-5">
          <div className="flex gap-2 pb-2 md:flex-wrap md:justify-center">
            {menu.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
                  c.id === active
                    ? "bg-brand text-white"
                    : "bg-cream text-brand hover:bg-brand/10"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <h3 className="border-b-2 border-gold pb-2 font-serif text-3xl font-bold text-brand">
            {category.title}
          </h3>
          {category.note && <p className="mt-2 text-sm text-neutral-500">{category.note}</p>}

          <ul className="mt-6 grid gap-x-12 gap-y-5 md:grid-cols-2">
            {category.items.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    {item.name}
                    {item.signature && (
                      <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-brand-dark">
                        ⭐ Spécialité
                      </span>
                    )}
                  </p>
                  {item.description && (
                    <p className="text-sm text-neutral-500">{item.description}</p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap justify-end gap-1.5 text-right">
                  {item.price !== undefined && (
                    <span className="whitespace-nowrap font-semibold text-brand">
                      {item.price} DH
                    </span>
                  )}
                  {item.prices?.map((p) => (
                    <span
                      key={p.label}
                      className="whitespace-nowrap rounded-full bg-cream px-2.5 py-0.5 text-sm font-semibold text-brand"
                    >
                      {p.label} {p.value}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-neutral-400">Prix en dirhams (DH)</p>
        </div>
      </div>
    </section>
  );
}