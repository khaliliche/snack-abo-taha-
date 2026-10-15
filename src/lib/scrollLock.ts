"use client";

import { useEffect } from "react";

let locks = 0;
let prevBody = "";
let prevHtml = "";

/** Ref-counted body scroll lock: several overlays can lock without unlocking each other. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (locks === 0) {
      prevBody = document.body.style.overflow;
      prevHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    locks++;
    return () => {
      locks--;
      if (locks === 0) {
        document.body.style.overflow = prevBody;
        document.documentElement.style.overflow = prevHtml;
      }
    };
  }, [active]);
}