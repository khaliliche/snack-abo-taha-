export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-serif text-[0.62em] italic tracking-[0.18em] text-saffron">Snack</span>
      <span className="font-serif font-medium uppercase tracking-[0.14em]">Abo Taha</span>
    </span>
  );
}
