import Link from "next/link";
import OpenNow from "@/components/OpenNow";
import Reveal from "@/components/Reveal";
import { site, telHref, whatsappLink } from "@/data/site";

export default function FinalCta() {
  const hasAddress = site.address && !site.address.startsWith("Votre");
  return (
    <section id="contact-rapide" className="cv-auto relative overflow-hidden bg-saffron px-5 py-[clamp(4.5rem,10vw,9rem)] text-center text-ink md:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-ink/70">Une petite faim ?</p>
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-6 font-serif text-[clamp(3rem,10vw,8.5rem)] font-light leading-[0.92]">
          Commandez,
          <br />
          <em>on s&apos;occupe du reste.</em>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
            Commander sur WhatsApp <span className="arrow">→</span>
          </a>
          <a href={telHref(site.phones[0])} className="btn btn-dark">
            Appeler {site.phones[0]}
          </a>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-2 text-sm text-ink/75">
          <OpenNow className="font-semibold" />
          <p>{site.hours}</p>
          {hasAddress && <p>{site.address}</p>}
          <p className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {site.phones.map((p) => (
              <a key={p} href={telHref(p)} className="link-u">
                {p}
              </a>
            ))}
            {site.mapLink && (
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="link-u">
                Voir sur la carte
              </a>
            )}
            <Link href="/menu" className="link-u">
              Voir le menu
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
