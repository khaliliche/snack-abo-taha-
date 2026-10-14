import { site } from "@/data/site";

export default function Footer() {
  const socials = [
    { label: "Facebook", href: site.socials.facebook },
    { label: "Instagram", href: site.socials.instagram },
    { label: "TikTok", href: site.socials.tiktok },
  ].filter((s) => s.href);

  return (
    <footer className="bg-brand-dark py-10 text-center text-white/80">
      <p className="font-serif text-xl font-bold text-white">{site.name}</p>
      <p className="mt-2 text-sm">{site.hours}</p>
      {socials.length > 0 && (
        <div className="mt-4 flex justify-center gap-6 text-sm">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              {s.label}
            </a>
          ))}
        </div>
      )}
      <p className="mt-6 text-xs text-white/50">
        © 2026 {site.name}. Tous droits réservés.
      </p>
    </footer>
  );
}
