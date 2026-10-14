import { site, whatsappLink } from "@/data/site";
import FoodField from "@/components/FoodField";
import Reveal from "@/components/Reveal";

const foods = [
  { kind: "chili" as const, left: "84%", top: "6%", size: "clamp(60px,9vw,130px)", m: { left: "76%", top: "2%", size: "22vw" }, rot: 28, fromX: 30, fromY: -30, scale: 0.8, delay: 0.1, depth: 24 },
  { kind: "leaf" as const, left: "2%", top: "78%", size: "clamp(70px,10vw,150px)", m: false as const, rot: -20, fromX: -30, fromY: 30, scale: 0.8, delay: 0.25, depth: 18 },
];

export default function Contact() {
  return (
    <section id="contact" data-food-host className="relative overflow-x-clip bg-olive-deep px-5 py-[clamp(6rem,11vw,10rem)] text-ivory md:px-10">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 85% 20%, rgba(227,167,47,.14), transparent 70%)" }}
      />
      <FoodField foods={foods} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-saffron">03 — Nous trouver</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-serif text-[clamp(3rem,9vw,8.5rem)] font-light leading-[0.92]">
            Passez <em className="text-saffron">commande</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-[2rem] border border-ivory/15 bg-ivory/[0.04] p-8 backdrop-blur-sm md:p-12">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-ivory/50">Téléphone</p>
              <div className="mt-3 flex flex-col">
                {site.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="link-u w-fit font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.1] transition-colors hover:text-saffron"
                  >
                    {p}
                  </a>
                ))}
              </div>

              <div className="mt-10 grid gap-8 border-t border-ivory/15 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-ivory/50">Adresse</p>
                  <p className="mt-2 text-lg">{site.address}</p>
                  {site.mapLink && (
                    <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="link-u mt-2 text-sm text-saffron">
                      Voir sur Google Maps →
                    </a>
                  )}
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-ivory/50">Horaires d’ouverture</p>
                  <p className="mt-2 text-lg">{site.hours}</p>
                  {site.email && (
                    <a href={`mailto:${site.email}`} className="link-u mt-2 text-sm text-saffron">
                      {site.email}
                    </a>
                  )}
                </div>
              </div>

              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-10">
                Commander sur WhatsApp <span className="arrow">→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="group relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] border border-ivory/15 bg-olive">
              {site.mapEmbed ? (
                <iframe src={site.mapEmbed} title="Localisation" className="absolute inset-0 h-full w-full border-0 grayscale-[.4] transition duration-700 group-hover:grayscale-0" loading="lazy" />
              ) : (
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
                >
                  <svg viewBox="0 0 48 48" className="h-16 w-16 text-saffron transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M24 44s14-12.5 14-24a14 14 0 1 0-28 0c0 11.5 14 24 14 24z" />
                    <circle cx="24" cy="20" r="5" />
                  </svg>
                  <span className="font-serif text-3xl font-light">Retrouvez-nous sur la carte</span>
                  <span className="btn btn-ghost pointer-events-none">
                    Ouvrir Google Maps <span className="arrow">→</span>
                  </span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
