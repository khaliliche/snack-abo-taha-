import Link from "next/link";
import FoodField from "@/components/FoodField";
import Reveal from "@/components/Reveal";
import { showcase } from "@/data/showcase";
import { vars } from "@/lib/css";
import { categoryFrom } from "@/lib/menu";

/** Titre découpé en lettres (effet de survol défini dans globals.css : .row-title .ch). */
function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((c, i) => (
        <span key={i} className="ch" aria-hidden style={vars({ "--i": i })}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </>
  );
}

export default function Showcase() {
  return (
    <section id="specialites">
      {showcase.map((row, i) => (
        <article
          key={row.id}
          data-food-host
          className={`showcase-row relative flex min-h-[clamp(34rem,62vw,46rem)] items-center justify-center overflow-x-clip px-5 py-[clamp(4rem,8vw,7rem)] text-center md:px-10 ${
            i % 2 === 0 ? "bg-paper" : "bg-sand/60"
          }`}
        >
          <FoodField foods={row.foods} />

          <div className="relative z-10 mx-auto max-w-3xl">
            <Reveal>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-harissa">
                {row.n} — {row.eyebrow}
              </p>
            </Reveal>
            <Reveal as="h2" delay={0.1} className="row-title mt-5 font-serif text-[clamp(3rem,13vw,11rem)] font-light leading-[0.9] text-olive-deep">
              <span className="sr-only">{row.title}</span>
              <Letters text={row.title} />
            </Reveal>
            <div className="rule mx-auto mt-8 h-px w-40 bg-ink/30" aria-hidden />
            <Reveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">{row.sub}</p>
              {(() => {
                const from = row.id === "jus" ? categoryFrom("jus", (it) => it.name.startsWith("Jus")) : categoryFrom(row.target);
                return from ? (
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-harissa">À partir de {from} DH</p>
                ) : null;
              })()}
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <Link href={`/menu?c=${row.target}`} className="btn btn-dark">
                {row.cta} <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>
        </article>
      ))}
    </section>
  );
}