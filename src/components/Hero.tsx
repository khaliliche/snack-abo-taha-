import { site, whatsappLink } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand to-brand-dark px-5 pt-16 text-center text-white"
    >
      <div className="max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">Bienvenue</p>
        <h1 className="font-serif text-5xl font-bold md:text-7xl">{site.name}</h1>
        <p className="mt-6 text-lg text-white/85">{site.tagline}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#menu"
            className="rounded-full bg-gold px-8 py-3 font-semibold text-brand-dark transition hover:brightness-110"
          >
            Explorer le menu
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/70 px-8 py-3 font-semibold transition hover:bg-white hover:text-brand-dark"
          >
            Commander sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}