export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col font-extrabold uppercase leading-none ${className}`}>
      <span className="text-[0.55em] tracking-[0.35em] text-gold">Snack</span>
      <span className="tracking-wide">Abo Taha</span>
    </span>
  );
}