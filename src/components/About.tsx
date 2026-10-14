import { site } from "@/data/site";

const points = [
  { icon: "🥙", title: "Fait maison", text: "Des recettes préparées chaque jour sur place." },
  { icon: "🌿", title: "Produits frais", text: "Des ingrédients choisis avec soin, sans compromis." },
  { icon: "⚡", title: "Service rapide", text: "Sur place, à emporter ou par WhatsApp." },
];

export default function About() {
  return (
    <section id="apropos" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Notre histoire</p>
        <h2 className="mt-3 font-serif text-4xl font-bold text-brand">À propos de nous</h2>
        <p className="mt-6 text-lg leading-relaxed text-neutral-700">{site.description}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">{p.icon}</div>
            <h3 className="mt-4 font-serif text-xl font-bold text-brand">{p.title}</h3>
            <p className="mt-2 text-neutral-600">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}