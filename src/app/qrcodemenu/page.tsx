import type { Metadata } from "next";
import { menu, type MenuCategory, type MenuItem } from "@/data/menu";
import { site, telHref, whatsappLink } from "@/data/site";
import QrNav from "@/components/QrNav";
import OpenNow from "@/components/OpenNow";

export const metadata: Metadata = {
  title: "Menu",
  description: `Le menu complet de ${site.name}, tous les prix en DH.`,
  robots: { index: false },
};

/** Ordre d'affichage : les plats les plus demandés d'abord. Une catégorie absente de cette liste est ajoutée à la fin. */
const ORDER = [
  "tacos", "tacos-xl", "pizzas", "burgers", "chawarma", "sandwichs", "panini",
  "bakito", "cosamia", "poutine", "spaghetti", "plats", "tajines", "poulet", "salades", "jus",
];

/** Photo de chaque catégorie (fichiers de /public/images/food, sans extension). Pas de photo = bandeau simple. */
const PHOTO: Record<string, string> = {
  tacos: "/images/food/tacos",
  "tacos-xl": "/images/food/tacos",
  pizzas: "/images/food/pizza",
  burgers: "/images/food/burger",
  chawarma: "/images/food/shawarma",
  sandwichs: "/images/food/shawarma",
  poutine: "/images/food/frites",
  tajines: "/images/food/tajine",
  salades: "/images/food/leaf",
  jus: "/images/food/juice",
};

const HEADER_PHOTOS = ["tacos", "pizza", "burger", "juice"];

const categories: MenuCategory[] = [
  ...ORDER.map((id) => menu.find((c) => c.id === id)).filter((c): c is MenuCategory => Boolean(c)),
  ...menu.filter((c) => !ORDER.includes(c.id)),
];

function Photo({ base, className, sizes, eager = false }: { base: string; className: string; sizes: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}.webp`}
      srcSet={`${base}-360.webp 360w, ${base}-540.webp 540w, ${base}.webp 720w`}
      sizes={sizes}
      alt=""
      aria-hidden
      width={720}
      height={720}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`object-contain ${className}`}
    />
  );
}

function Dh() {
  return <small className="ml-1 text-sm font-bold text-ink/60">DH</small>;
}

function Prices({ item }: { item: MenuItem }) {
  if (item.prices) {
    return (
      <div className="flex w-full gap-2 sm:w-auto">
        {item.prices.map((p) => (
          <div
            key={p.label}
            className="flex-1 rounded-xl border-2 border-olive-deep/25 bg-paper px-3 py-1.5 text-center sm:flex-none sm:px-4"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-ink/70">{p.label}</p>
            <p className="text-2xl font-extrabold leading-tight tabular-nums text-harissa">
              {p.value}
              <Dh />
            </p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <p className="shrink-0 text-3xl font-extrabold tabular-nums text-harissa">
      {item.price}
      <Dh />
    </p>
  );
}

export default function QrCodeMenuPage() {
  return (
    <div className="min-h-dvh bg-paper pb-32 text-ink">
      <header className="bg-olive-deep px-5 pb-6 pt-10 text-center text-ivory">
        <p className="text-xl font-bold uppercase tracking-[0.3em] text-saffron sm:text-2xl">Notre menu</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold leading-none sm:text-6xl">{site.name}</h1>
        <p className="mt-4 text-base font-semibold text-ivory/90">Tous les prix sont en dirhams (DH)</p>
        <OpenNow className="mt-3 text-sm font-semibold text-ivory" />
        <p className="mt-1 text-sm text-ivory/80">{site.hours}</p>
        <div className="mt-6 flex items-end justify-center gap-1 sm:gap-4" aria-hidden>
          {HEADER_PHOTOS.map((p) => (
            <Photo
              key={p}
              base={`/images/food/${p}`}
              eager
              sizes="(max-width: 640px) 80px, 112px"
              className="h-20 w-20 drop-shadow-[0_8px_8px_rgba(0,0,0,.35)] sm:h-28 sm:w-28"
            />
          ))}
        </div>
      </header>

      <QrNav items={categories.map((c) => ({ id: c.id, title: c.title }))} />

      <main className="mx-auto max-w-3xl px-4">
        {categories.map((c) => {
          const photo = PHOTO[c.id];
          return (
            <div key={c.id} id={c.id} className="scroll-mt-20 pt-8">
              <div
                className={`relative flex items-center rounded-2xl bg-olive-deep px-5 py-4 ${
                  photo ? "min-h-24 pr-32 sm:min-h-28 sm:pr-40" : ""
                }`}
              >
                <h2 className="font-serif text-3xl font-semibold leading-tight text-ivory sm:text-5xl">{c.title}</h2>
                {photo && (
                  <Photo
                    base={photo}
                    sizes="(max-width: 640px) 112px, 128px"
                    className="pointer-events-none absolute -top-6 right-2 h-28 w-28 drop-shadow-[0_8px_8px_rgba(0,0,0,.35)] sm:-top-5 sm:right-4 sm:h-32 sm:w-32"
                  />
                )}
              </div>
              {c.note && (
                <p className="mt-3 rounded-xl bg-saffron/25 px-4 py-2 text-base font-semibold">{c.note}</p>
              )}

              <ul className="mt-3 rounded-2xl bg-white px-4 shadow-sm">
                {c.items.map((item) => (
                  <li key={item.name} className="border-b border-ink/15 py-4 last:border-0">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                      <div className="min-w-0 flex-1 basis-48">
                        <p className="text-xl font-bold leading-snug">
                          {item.name}
                          {item.signature && (
                            <span className="ml-2 inline-block rounded-full bg-saffron px-2.5 py-0.5 align-middle text-xs font-bold uppercase tracking-wider">
                              Spécialité
                            </span>
                          )}
                        </p>
                        {item.description && (
                          <p className="mt-1 text-base leading-snug text-ink/75">{item.description}</p>
                        )}
                      </div>
                      <Prices item={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="mt-10 rounded-2xl bg-olive-deep px-5 py-6 text-center text-ivory">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Téléphone</p>
          <div className="mt-2 flex flex-col">
            {site.phones.map((p) => (
              <a key={p} href={telHref(p)} className="py-1 text-3xl font-bold tabular-nums">
                {p}
              </a>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-olive-deep bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex min-h-14 max-w-3xl items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-ink"
        >
          Commander sur WhatsApp
        </a>
      </div>
    </div>
  );
}