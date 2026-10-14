import { site } from "@/data/site";

export default function Footer() {
  const socials = [
    { label: "Facebook", href: site.socials.facebook },
    { label: "Instagram", href: site.socials.instagram },
    { label: "TikTok", href: site.socials.tiktok },
  ].filter((s) => s.href);

  return (
    <footer className="overflow-hidden bg-ink px-5 pb-8 pt-20 text-ivory/70 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <p className="max-w-xs font-serif text-2xl font-light italic text-ivory">
            Tacos, pizzas, chawarma &amp; jus frais — à savourer sur place ou à emporter.
          </p>
          <div className="flex gap-16 text-sm">
            <ul className="space-y-2">
              {["Accueil:#accueil", "À propos:#apropos", "Menu:#menu", "Contact:#contact"].map((l) => {
                const [label, href] = l.split(":");
                return (
                  <li key={href}>
                    <a href={href} className="link-u transition-colors hover:text-saffron">
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
            {socials.length > 0 && (
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u transition-colors hover:text-saffron">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p
          className="wordmark mt-16 select-none whitespace-nowrap text-center font-serif text-[clamp(3rem,16.5vw,17rem)] font-light uppercase leading-[0.85] tracking-[0.02em]"
          aria-hidden
        >
          Abo Taha
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row">
          <p>© 2026 {site.name}. Tous droits réservés.</p>
          <p>{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
