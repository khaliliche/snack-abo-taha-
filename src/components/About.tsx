import { site } from "@/data/site";
import { menu } from "@/data/menu";
import Reveal from "@/components/Reveal";
import { vars } from "@/lib/css";
import Counter from "@/components/Counter";
import FoodArt, { type FoodKind } from "@/components/Food";

const points: { kind: FoodKind; title: string; text: string }[] = [
  { kind: "burger", title: "Fait maison", text: "Des recettes préparées chaque jour sur place, du pain aux sauces." },
  { kind: "juice", title: "Produits frais", text: "Des ingrédients choisis avec soin, sans compromis sur le goût." },
  { kind: "tacos", title: "Service rapide", text: "Sur place, à emporter ou par WhatsApp — votre faim n'attend pas." },
];

export default function About() {
  const dishes = menu.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="apropos" className="relative bg-paper px-5 py-[clamp(4rem,8vw,7rem)] md:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-harissa">Qui sommes-nous</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] text-olive-deep">
              Une cuisine de rue,
              <br />
              <em className="text-harissa">faite maison.</em>
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col justify-end lg:col-span-5">
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-ink/75">{site.description}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex gap-12 border-t border-ink/15 pt-8">
            <div>
              <p className="font-serif text-6xl font-light text-olive-deep">
                <Counter to={dishes} suffix="+" />
              </p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-ink/55">Plats à la carte</p>
            </div>
            <div>
              <p className="font-serif text-6xl font-light text-olive-deep">
                <Counter to={menu.length} />
              </p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-ink/55">Univers gourmands</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-5 md:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.12}>
            <article className="group relative h-full overflow-hidden rounded-[2rem] border border-ink/10 bg-sand/50 p-9 transition-colors duration-700 hover:bg-olive-deep hover:text-ivory">
              <span className="font-serif text-sm italic text-harissa transition-colors duration-700 group-hover:text-saffron">0{i + 1}</span>
              <div className="my-6 h-40 w-40 transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:-translate-y-2 group-hover:rotate-[-8deg] group-hover:scale-110">
                <div className="float-img h-full w-full" style={vars({ "--fd": `${4.2 + i * 0.7}s`, "--fdl": `${i * -0.9}s` })}>
                  <FoodArt kind={p.kind} sizes="160px" />
                </div>
              </div>
              <h3 className="font-serif text-3xl font-medium">{p.title}</h3>
              <p className="mt-3 leading-relaxed opacity-70">{p.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}