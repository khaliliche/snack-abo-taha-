import { menu } from "@/data/menu";

export default function Marquee() {
  const words = menu.map((c) => c.title);
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {words.map((w, i) => (
        <span key={`${key}${w}${i}`} className="flex items-center">
          <span className="px-7 font-serif text-3xl font-light italic md:text-5xl">{w}</span>
          <span className="text-xl text-olive-deep/60">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-ink/20 bg-saffron py-5 text-ink" role="presentation">
      <div className="marquee">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
