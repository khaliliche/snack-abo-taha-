import Link from "next/link";
import Reveal from "@/components/Reveal";
import { menu } from "@/data/menu";
import { categoryFrom } from "@/lib/menu";

/** Toute la carte d'un coup d'œil : chaque catégorie ouvre directement le bon onglet du menu. */
export default function MenuExplorer() {
  return (
    <section id="carte" className="cv-auto bg-paper px-5 py-[clamp(4rem,8vw,7rem)] md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-harissa">La carte</p>
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] text-olive-deep">
          Toute la carte, <em className="text-harissa">en un coup d&apos;œil.</em>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {menu.map((c) => {
              const from = categoryFrom(c.id);
              return (
                <li key={c.id}>
                  <Link
                    href={`/menu?c=${c.id}`}
                    prefetch={false}
                    className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-ink/10 bg-sand/40 p-5 transition-colors duration-500 hover:border-olive-deep hover:bg-olive-deep hover:text-ivory md:p-6"
                  >
                    <span className="font-serif text-2xl font-medium leading-tight md:text-3xl">{c.title}</span>
                    <span className="flex items-end justify-between gap-2 text-xs">
                      <span className="opacity-60">
                        {c.items.length} plats{from ? ` · dès ${from} DH` : ""}
                      </span>
                      <span className="text-base text-harissa transition-transform duration-500 group-hover:translate-x-1 group-hover:text-saffron" aria-hidden>
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
