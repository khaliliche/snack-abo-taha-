"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { whatsappLink } from "@/data/site";
import { useScrollLock } from "@/lib/scrollLock";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const bar = document.getElementById("progress");
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useScrollLock(open);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 text-ivory transition-all duration-700 ${
        scrolled || open ? "bg-olive-deep/85 py-3 backdrop-blur-md" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="Snack Abo Taha" className="relative z-50 text-2xl" onClick={() => setOpen(false)}>
          <Logo compact={scrolled || open} />
        </Link>

        <ul className="hidden items-center gap-10 text-[0.7rem] font-medium uppercase tracking-[0.25em] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className="link-u transition-colors hover:text-saffron">
                {l.label}
              </Link>
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

      

      <div id="progress" className="absolute inset-x-0 bottom-0 h-px origin-left bg-saffron" style={{ transform: "scaleX(0)" }} />
    </header>

      {/* Mobile menu: outside <header> so its backdrop-blur cannot trap the fixed overlay */}
      <div
        className={`fixed inset-0 z-[39] flex text-ivory flex-col justify-center bg-olive-deep px-8 transition-[clip-path] duration-700 md:hidden ${
          open ? "[clip-path:circle(150%_at_90%_5%)]" : "[clip-path:circle(0%_at_90%_5%)]"
        }`}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block font-serif text-6xl font-light uppercase tracking-wide transition-all duration-700 hover:text-saffron ${isActive(l.href) ? "text-saffron" : ""}`}
                style={{
                  transform: open ? "none" : "translateY(110%)",
                  transitionDelay: open ? `${200 + i * 80}ms` : "0ms",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-solid mt-10 self-start">
          Commander sur WhatsApp <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
}