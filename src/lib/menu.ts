import { menu, type MenuItem } from "@/data/menu";

/** Prix de départ d'un plat (le plus petit prix s'il existe plusieurs formats). */
export const itemFrom = (i: MenuItem): number =>
  i.prices?.length ? Math.min(...i.prices.map((p) => p.value)) : i.price ?? 0;

/** « À partir de » d'une catégorie (optionnellement filtrée). */
export function categoryFrom(id: string, pick: (item: MenuItem) => boolean = () => true): number | null {
  const c = menu.find((x) => x.id === id);
  const values = (c?.items.filter(pick).map(itemFrom) ?? []).filter((n) => n > 0);
  return values.length ? Math.min(...values) : null;
}

export function findItem(categoryId: string, name: string): MenuItem | undefined {
  return menu.find((c) => c.id === categoryId)?.items.find((i) => i.name === name);
}
