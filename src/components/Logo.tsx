/* eslint-disable @next/next/no-img-element */
/**
 * Logo : emblème + mot-symbole.
 * - desktop : emblème à gauche du texte
 * - mobile  : emblème AU-DESSUS du texte (compact => repasse sur une ligne pour garder un header fin au scroll)
 */
export default function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center transition-all duration-500 md:flex-row md:gap-3 ${
        compact ? "flex-row gap-2.5" : "flex-col items-start gap-1.5"
      } ${className}`}
    >
      <img
        src="/images/logo.webp"
        alt=""
        width={192}
        height={192}
        decoding="async"
        draggable={false}
        className={`shrink-0 object-contain transition-all duration-500 md:h-11 md:w-11 ${compact ? "h-9 w-9" : "h-12 w-12"}`}
      />
      <span className="inline-flex flex-col leading-none">
        <span className="font-serif text-[0.62em] italic tracking-[0.18em] text-saffron">Snack</span>
        <span className="font-serif font-medium uppercase tracking-[0.14em]">Abo Taha</span>
      </span>
    </span>
  );
}
