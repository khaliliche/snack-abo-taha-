import Reveal from "@/components/Reveal";
import { reviews } from "@/data/reviews";

/** Section « Avis » : n'apparaît que si data/reviews.ts contient de vrais avis. */
export default function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section id="avis" className="cv-auto bg-sand/60 px-5 py-[clamp(4rem,8vw,7rem)] md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-harissa">Ils en parlent</p>
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-5 font-serif text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] text-olive-deep">
          Ce que disent <em className="text-harissa">nos clients.</em>
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.name + i}>
              <Reveal delay={i * 0.1} className="h-full">
                <figure className="flex h-full flex-col justify-between rounded-[2rem] border border-ink/10 bg-paper p-8">
                  <blockquote className="font-serif text-2xl font-light leading-snug text-ink">« {r.text} »</blockquote>
                  <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-ink/55">
                    {r.name}
                    {r.source ? ` · ${r.source}` : ""}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
