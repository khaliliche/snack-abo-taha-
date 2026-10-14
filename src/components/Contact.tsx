import { site, whatsappLink } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Nous trouver</p>
        <h2 className="mt-3 font-serif text-4xl font-bold text-brand">Contactez-nous</h2>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand">Téléphone</h3>
            <div className="flex flex-col">
              {site.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="text-neutral-700 hover:text-brand"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
          {site.email && (
            <div>
              <h3 className="font-serif text-lg font-bold text-brand">Email</h3>
              <a href={`mailto:${site.email}`} className="text-neutral-700 hover:text-brand">
                {site.email}
              </a>
            </div>
          )}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand">Adresse</h3>
            <p className="text-neutral-700">{site.address}</p>
            {site.mapLink && (
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-semibold text-brand underline hover:text-brand-dark"
              >
                Voir sur Google Maps
              </a>
            )}
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-brand">Horaires d’ouverture</h3>
            <p className="text-neutral-700">{site.hours}</p>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            Commander sur WhatsApp
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {site.mapEmbed ? (
            <iframe
              src={site.mapEmbed}
              title="Localisation"
              className="h-full min-h-80 w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full min-h-80 flex-col items-center justify-center gap-4 p-8 text-center">
              <span className="text-5xl">📍</span>
              <p className="font-serif text-xl font-bold text-brand">Retrouvez-nous sur la carte</p>
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-8 py-3 font-semibold text-brand-dark transition hover:brightness-110"
              >
                Ouvrir Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}