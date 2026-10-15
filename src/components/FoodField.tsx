"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import FoodArt, { type FoodKind } from "@/components/Food";

export type FoodItem = {
  kind: FoodKind;
  /** Desktop box (left/top relative to the field, size = CSS width) */
  left: string;
  top: string;
  size: string;
  /** Mobile composition. `false` hides the item below 768px */
  m?: { left: string; top: string; size: string } | false;
  /** Final designed rotation (deg) */
  rot: number;
  /** Entrance start offset (px) */
  fromX: number;
  fromY: number;
  /** Entrance start scale (0.72–0.9) */
  scale?: number;
  /** Stagger delay (s) */
  delay: number;
  /** Parallax strength (px) */
  depth?: number;
  /** Idle float duration (s) */
  float?: number;
};

type Props = {
  foods: FoodItem[];
  /** Play on mount instead of when scrolled into view */
  immediate?: boolean;
  /** Pointer parallax (fine pointers only) */
  pointer?: boolean;
  /** Element that receives .is-in (defaults to this field); lets a parent row react too */
  className?: string;
};

/**
 * Decorative, data-driven floating food. Entrance fires once at ~25% visibility.
 * Scroll parallax is desktop-only and only runs while the field is near the viewport.
 * Respects prefers-reduced-motion (final state, no motion).
 */
export default function FoodField({ foods, immediate = false, pointer = false, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.closest<HTMLElement>("[data-food-host]") ?? el;
    const targets = host === el ? [el] : [el, host];
    const reveal = () => targets.forEach((t) => t.classList.add("is-in"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      reveal();
      return;
    }

    const touch = window.matchMedia("(hover: none)").matches;

    let io: IntersectionObserver | undefined;
    let timer = 0;
    if (immediate) {
      timer = window.setTimeout(reveal, 250);
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            io?.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(host);
    }

    let visible = true;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty("--py", String(Math.max(-1, Math.min(1, p))));
    };
    const onScroll = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(update);
    };

    // Pause idle float + parallax while the field is far from the viewport
    const vio = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        el.classList.toggle("is-off", !visible);
        if (visible && !touch) update();
      },
      { rootMargin: "120px 0px" }
    );
    vio.observe(host);

    if (!touch) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    // Pointer parallax (desktop only)
    let onMove: ((e: PointerEvent) => void) | undefined;
    if (pointer && window.matchMedia("(pointer: fine)").matches) {
      let mraf = 0;
      onMove = (e) => {
        if (mraf) return;
        mraf = requestAnimationFrame(() => {
          mraf = 0;
          el.style.setProperty("--mx", String((e.clientX / window.innerWidth - 0.5) * 2));
          el.style.setProperty("--my", String((e.clientY / window.innerHeight - 0.5) * 2));
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      io?.disconnect();
      vio.disconnect();
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (onMove) window.removeEventListener("pointermove", onMove);
    };
  }, [immediate, pointer]);

  return (
    <div ref={ref} className={`food-field ${className}`} aria-hidden="true">
      {foods.map((f, i) => {
        const style = {
          "--l": f.left,
          "--t": f.top,
          "--w": f.size,
          "--ml": f.m ? f.m.left : undefined,
          "--mt": f.m ? f.m.top : undefined,
          "--mw": f.m ? f.m.size : undefined,
          "--r": `${f.rot}deg`,
          "--fx": `${f.fromX}px`,
          "--fy": `${f.fromY}px`,
          "--fs": f.scale ?? 0.8,
          "--d": `${f.delay}s`,
          "--depth": f.depth ?? 14,
          "--fd": `${f.float ?? 4.2 + (i % 3) * 0.7}s`,
        } as CSSProperties;
        return (
          <div key={`${f.kind}-${i}`} className={`food ${f.m === false ? "food--nm" : ""}`} style={style}>
            <div className="food__in">
              <div className="food__art">
                <FoodArt kind={f.kind} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}