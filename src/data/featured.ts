import type { FoodKind } from "@/components/Food";

/**
 * Coups de cœur de l'accueil. Les prix viennent de data/menu.ts (une seule source de vérité) :
 * `category` = id de la catégorie, `name` = nom EXACT du plat. Si un nom ne correspond plus, la carte est simplement ignorée.
 * Le premier élément s'affiche en grand.
 */
export type Ingredient = { kind: FoodKind; label: string };
export type FeaturedDef = {
  category: string;
  name: string;
  kind: FoodKind;
  pitch: string;
  tag?: string;
  /** Pastilles d'ingrédients affichées sur la carte — À ADAPTER à vos vraies recettes. */
  ingredients?: Ingredient[];
  /** VRAIE photo du plat (WebP détouré 720x720 dans /public/images/food/). Si le fichier est absent, l'illustration prend le relais. */
  photo?: string;
};

export const featured: FeaturedDef[] = [
  { category: "tacos", name: "Tacos Abo Taha", kind: "tacos", tag: "La signature", pitch: "La recette signature de la maison, en version normale ou XL.",
    ingredients: [{ kind: "cheese", label: "Fromage" }, { kind: "chili", label: "Piment" }, { kind: "onion", label: "Oignon" }] },
  { category: "pizzas", name: "Quatre fromages", kind: "pizza", pitch: "Fromagère et généreuse, en petite, moyenne ou grande.",
    ingredients: [{ kind: "cheese", label: "4 fromages" }, { kind: "tomato", label: "Tomate" }, { kind: "olive", label: "Olives" }] },
  { category: "burgers", name: "Cheeseburger royal", kind: "burger", pitch: "Le cheeseburger dans sa version royale.",
    ingredients: [{ kind: "cheese", label: "Fromage" }, { kind: "tomato", label: "Tomate" }, { kind: "leaf", label: "Salade" }, { kind: "onion", label: "Oignon" }] },
  { category: "tajines", name: "Tajine viande hachée omelette fromages", kind: "tajine", pitch: "Un tajine copieux, viande hachée, omelette et fromages.",
    ingredients: [{ kind: "egg", label: "Omelette" }, { kind: "cheese", label: "Fromages" }, { kind: "onion", label: "Oignon" }] },
  { category: "jus", name: "Jus d'avocat", kind: "avocado", pitch: "Onctueux, servi bien frais.",
    ingredients: [{ kind: "avocado", label: "Avocat" }] },
];