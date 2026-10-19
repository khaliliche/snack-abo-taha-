"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; title: string };

export default function QrNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-120px 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const b = bar.current;
    const t = b?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!b || !t) return;
    b.scrollTo({ left: t.offsetLeft - (b.clientWidth - t.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Catégories" className="sticky top-0 z-30 border-b-2 border-olive-deep bg-paper">
      <div
        ref={bar}
        className="relative flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((i) => {
          const on = i.id === active;
          return (
            <a
              key={i.id}
              data-id={i.id}
              href={`#${i.id}`}
              onClick={() => setActive(i.id)}
              className={`flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border-2 px-4 text-base font-bold ${
                on
                  ? "border-olive-deep bg-olive-deep text-ivory"
                  : "border-olive-deep/30 bg-white text-ink"
              }`}
            >
              {i.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}