"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

type State = { open: boolean; label: string } | null;

function moroccoHour(): number {
  // formatToParts : pas de texte parasite (en fr-FR, format() renvoie « 21 h », ce qui donnait NaN)
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hour: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const h = parseInt(parts.find((p) => p.type === "hour")?.value ?? "", 10);
  return Number.isNaN(h) ? new Date().getHours() : h % 24;
}

function compute(): State {
  const h = moroccoHour();
  if (h >= site.openHour) return { open: true, label: h === 23 ? "Ouvert · ferme à minuit" : "Ouvert maintenant · jusqu'à minuit" };
  return { open: false, label: `Fermé · ouvre à ${site.openHour}h` };
}

/** Badge d'ouverture. Calculé côté client après le montage (pas de décalage d'hydratation). */
export default function OpenNow({ className = "" }: { className?: string }) {
  const [s, setS] = useState<State>(null);

  useEffect(() => {
    setS(compute());
    const id = window.setInterval(() => setS(compute()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex min-h-[1.5rem] items-center gap-2.5 ${className}`} aria-live="polite">
      {s && (
        <>
          <span className={`h-2 w-2 rounded-full ${s.open ? "bg-[#4cd17a]" : "bg-harissa"}`} aria-hidden />
          <span>{s.label}</span>
        </>
      )}
    </span>
  );
}