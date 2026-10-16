import Link from "next/link";
import { site, whatsappLink } from "@/data/site";
import FoodField from "@/components/FoodField";
import OpenNow from "@/components/OpenNow";
import { heroFoods } from "@/data/showcase";
import { vars } from "@/lib/css";

export default function Hero() {
  return (
    <section
      id="accueil"
      data-food-host
      className="relative flex min-h-[100svh] items-center justify-center overflow-x-clip bg-olive-deep px-5 pb-44 pt-[17.5rem] text-center md:pb-28 md:pt-28 text-ivory"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(227,167,47,.20), transparent 70%), radial-gradient(90% 70% at 10% 100%, rgba(89,96,64,.9), transparent 60%), radial-gradient(80% 60% at 100% 0%, rgba(89,96,64,.7), transparent 60%)",
        }}
      />
      <FoodField foods={heroFoods} immediate pointer />

      <div className="relative z-10 max-w-5xl">
        <p className="fade-up text-[0.7rem] font-medium uppercase tracking-[0.5em] text-saffron" style={vars({ "--rd": "0.2s" })}>
          Bienvenue chez
        </p>
        <h1 className="mt-5 font-serif font-light leading-[0.88]">
          <span className="mask text-[clamp(1.6rem,4vw,3rem)] italic text-saffron" style={vars({ "--rd": "0.3s" })}>
            <span>Snack</span>
          </span>
          <span className="mask text-[clamp(3.2rem,15vw,13.5rem)] uppercase tracking-[0.03em]" style={vars({ "--rd": "0.45s" })}>
            <span>Abo Taha</span>
          </span>
        </h1>
        <p className="fade-up mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg" style={vars({ "--rd": "1s" })}>
          {site.tagline}.
        </p>
        <div className="fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={vars({ "--rd": "1.2s" })}>
          <Link href="/menu" className="btn btn-solid">
            Explorer le menu <span className="arrow">→</span>
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Commander sur WhatsApp
          </a>
        </div>
        <div
          className="fade-up mt-9 flex flex-col items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.25em] text-ivory/70"
          style={vars({ "--rd": "1.4s" })}
        >
          <OpenNow />
          <p>
            Sur place <span className="mx-2 text-saffron">✦</span> À emporter <span className="mx-2 text-saffron">✦</span> Livraison
          </p>
        </div>
      </div>

      <a
        href="#specialites"
        aria-label="Défiler vers la suite"
        className="fade-up absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-ivory/60"
        style={vars({ "--rd": "1.6s" })}
      >
        Défiler
        <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease)_infinite] bg-saffron" />
        </span>
      </a>
    </section>
  );
}