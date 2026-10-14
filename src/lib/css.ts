import type { CSSProperties } from "react";

/** Typed helper for CSS custom properties: style={vars({ "--rd": "0.3s" })} */
export const vars = (v: Record<string, string | number>) => v as unknown as CSSProperties;
