import FoodField, { type FoodItem } from "@/components/FoodField";
import { vars } from "@/lib/css";

type Props = { eyebrow: string; title: string; accent?: string; sub?: string; foods?: FoodItem[] };

/** En-tête commun des pages internes : fond olive (la navbar reste lisible) + photos flottantes. */
export default function PageHero({ eyebrow, title, accent, sub, foods = [] }: Props) {
  return (
    <section
      data-food-host
      className="relative overflow-x-clip bg-olive-deep px-5 pb-[clamp(4rem,8vw,7rem)] pt-[clamp(8.5rem,15vw,12rem)] text-ivory md:px-10"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 70% at 85% 30%, rgba(227,167,47,.18), transparent 70%), radial-gradient(70% 60% at 0% 100%, rgba(89,96,64,.8), transparent 60%)" }}
      />
      {foods.length > 0 && <FoodField foods={foods} immediate pointer />}
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="fade-up text-[0.7rem] font-medium uppercase tracking-[0.5em] text-saffron" style={vars({ "--rd": "0.1s" })}>
          {eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-[clamp(3.4rem,11vw,9.5rem)] font-light leading-[0.92]">
          <span className="mask"><span style={vars({ "--rd": "0.2s" })}>{title}</span></span>
          {accent && (
            <span className="mask"><em className="block text-saffron" style={vars({ "--rd": "0.32s" })}>{accent}</em></span>
          )}
        </h1>
        {sub && (
          <p className="fade-up mt-6 max-w-lg text-base leading-relaxed text-ivory/75 md:text-lg" style={vars({ "--rd": "0.6s" })}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
