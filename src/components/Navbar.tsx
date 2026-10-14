"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { whatsappLink } from "@/data/site";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#menu", label: "Menu" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#accueil");

  useEffect(() => {
    const bar = document.getElementById("progress");
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const s = document.querySelector(l.href);
      if (s) io.observe(s);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-ivory transition-all duration-700 ${
        scrolled || open ? "bg-olive-deep/85 py-3 backdrop-blur-md" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#accueil" aria-label="Snack Abo Taha" className="relative z-50 text-2xl" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-10 text-[0.7rem] font-medium uppercase tracking-[0.25em] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={active === l.href} className="link-u transition-colors hover:text-saffron">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-5 !py-2.5">
              Commander <span className="arrow">→</span>
            </a>
          </li>
        </ul>

        <button
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span className={`h-px w-7 bg-ivory transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-ivory transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-olive-deep px-8 transition-[clip-path] duration-700 md:hidden ${
          open ? "[clip-path:circle(150%_at_90%_5%)]" : "[clip-path:circle(0%_at_90%_5%)]"
        }`}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block font-serif text-6xl font-light uppercase tracking-wide transition-all duration-700 hover:text-saffron"
                style={{
                  transform: open ? "none" : "translateY(110%)",
                  transitionDelay: open ? `${200 + i * 80}ms` : "0ms",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          className="btn btn-solid mt-10 self-start"
        >
          Commander sur WhatsApp <span className="arrow">→</span>
        </a>
      </div>

      <div
        id="progress"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-saffron"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
}
