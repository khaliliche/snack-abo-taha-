"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { whatsappLink } from "@/data/site";

const MODES = ["À emporter", "Sur place", "Livraison"];

export default function CartBar() {
  const { lines, count, total, open, setOpen, inc, dec, clear } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState(MODES[0]);
  const [address, setAddress] = useState("");

  if (count === 0) return null;

  const needsAddress = mode === "Livraison";
  const ready = name.trim() !== "" && (!needsAddress || address.trim() !== "");

  const message = [
    "Bonjour, je souhaite commander :",
    ...lines.map((l) => `- ${l.qty}x ${l.name} — ${l.qty * l.price} DH`),
    `Total : ${total} DH`,
    `Nom : ${name.trim()}`,
    `Mode : ${mode}`,
    ...(needsAddress ? [`Adresse : ${address.trim()}`] : []),
  ].join("\n");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 right-24 z-50 flex items-center justify-between rounded-full bg-olive-deep px-6 py-4 text-ivory shadow-[0_12px_30px_-8px_rgba(0,0,0,.5)] md:left-1/2 md:right-auto md:w-[26rem] md:-translate-x-1/2"
        aria-label="Ouvrir le panier"
      >
        <span className="text-sm font-semibold">Mon panier ({count})</span>
        <span className="font-serif text-xl font-semibold text-saffron">{total} DH</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 backdrop-blur-sm md:items-center" onClick={() => setOpen(false)}>
          <div
            className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-paper p-7 text-ink md:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-4xl font-light text-olive-deep">Mon panier</h2>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="h-10 w-10 text-2xl">×</button>
            </div>

            <ul className="mt-5 divide-y divide-ink/10">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3 py-3">
                  <p className="flex-1 font-serif text-lg font-medium">{l.name}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => dec(l.key)} aria-label="Retirer un" className="h-8 w-8 rounded-full border border-ink/20">−</button>
                    <span className="w-5 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                    <button onClick={() => inc(l.key)} aria-label="Ajouter un" className="h-8 w-8 rounded-full border border-ink/20">+</button>
                  </div>
                  <span className="w-16 text-right font-serif text-lg font-semibold text-harissa">{l.qty * l.price} DH</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 flex justify-between border-t-2 border-olive-deep pt-4 font-serif text-2xl font-semibold">
              <span>Total</span>
              <span className="text-harissa">{total} DH</span>
            </p>

            <div className="mt-6 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-base"
              />
              <div className="flex gap-2">
                {MODES.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-full border px-3 py-2.5 text-sm font-semibold ${
                      mode === m ? "border-olive-deep bg-olive-deep text-ivory" : "border-ink/20 text-ink/70"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {needsAddress && (
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Adresse de livraison"
                  className="w-full rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-base"
                />
              )}
            </div>

            {ready ? (
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(clear, 300)}
                className="btn btn-solid mt-6 w-full justify-center"
              >
                Envoyer sur WhatsApp →
              </a>
            ) : (
              <button disabled className="btn btn-solid mt-6 w-full justify-center opacity-40">
                {name.trim() === "" ? "Entrez votre nom" : "Entrez l'adresse"}
              </button>
            )}
            <button onClick={clear} className="mt-3 w-full text-center text-xs uppercase tracking-[0.25em] text-ink/50">
              Vider le panier
            </button>
          </div>
        </div>
      )}
    </>
  );
}