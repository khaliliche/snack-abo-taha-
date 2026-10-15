import Link from "next/link";
import Reveal from "@/components/Reveal";
import { whatsappLink } from "@/data/site";

const steps = [
  { n: "01", t: "Choisissez", d: "Parcourez la carte ou touchez + sur nos coups de cœur." },
  { n: "02", t: "Composez", d: "Sur place, à emporter ou en livraison : indiquez simplement votre nom." },
  { n: "03", t: "Envoyez", d: "Votre commande arrive déjà rédigée sur WhatsApp. On s'occupe du reste." },
];

export default function HowItWorks() {
  return (
    <section id="commander" className="cv-auto relative overflow-hidden bg-olive-deep px-5 py-[clamp(4rem,8vw,7rem)] text-ivory md:px-10">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 70% at 85% 0%, rgba(227,167,47,.16), transparent 70%), radial-gradient(70% 60% at 0% 100%, rgba(89,96,64,.7), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-saffron">Commander</p>
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95]">
          Trois gestes, <em className="text-saffron">et c&apos;est parti.</em>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.12} className="border-t border-ivory/20 pt-6">
                <span className="font-serif text-7xl font-light italic text-saffron">{s.n}</span>
                <h3 className="mt-4 font-serif text-3xl font-medium">{s.t}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-ivory/70">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-14 flex flex-col gap-4 sm:flex-row">
          <Link href="/menu" className="btn btn-solid">
            Commencer ma commande <span className="arrow">→</span>
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Écrire sur WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
