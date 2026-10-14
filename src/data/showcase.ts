import type { FoodItem } from "@/components/FoodField";

export type ShowcaseRow = {
  id: string;
  n: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  /** id of the menu category opened by the CTA (see data/menu.ts) */
  target: string;
  foods: FoodItem[];
};

/**
 * Art-directed, deterministic layouts: each row has its own asymmetric composition.
 * Positions are % of the row; sizes use clamp(). `m` = simplified mobile composition.
 */
export const showcase: ShowcaseRow[] = [
  {
    id: "tacos",
    n: "01",
    eyebrow: "Nos incontournables",
    title: "Tacos",
    sub: "Tacos, burgers & chawarma — roulés, grillés et garnis à la commande.",
    cta: "Voir les tacos",
    target: "tacos",
    foods: [
      { kind: "tacos", left: "3%", top: "8%", size: "clamp(150px,25vw,350px)", m: { left: "-9%", top: "1%", size: "46vw" }, rot: -12, fromX: -60, fromY: 30, scale: 0.78, delay: 0, depth: 22 },
      { kind: "burger", left: "73%", top: "26%", size: "clamp(120px,19vw,270px)", m: { left: "66%", top: "68%", size: "36vw" }, rot: 8, fromX: 50, fromY: 24, scale: 0.82, delay: 0.1, depth: 16, float: 5.2 },
      { kind: "fries", left: "24%", top: "68%", size: "clamp(70px,10vw,150px)", m: false, rot: -6, fromX: -30, fromY: 40, scale: 0.85, delay: 0.2, depth: 10, float: 3.8 },
      { kind: "chili", left: "62%", top: "3%", size: "clamp(50px,7vw,100px)", m: { left: "72%", top: "4%", size: "20vw" }, rot: 24, fromX: 30, fromY: -30, scale: 0.8, delay: 0.3, depth: 28, float: 4.4 },
    ],
  },
  {
    id: "pizzas",
    n: "02",
    eyebrow: "Au feu de la pâte",
    title: "Pizzas",
    sub: "Pizzas, pâtes & tajines — du simple margherita aux fruits de mer.",
    cta: "Voir les pizzas",
    target: "pizzas",
    foods: [
      { kind: "pizza", left: "70%", top: "0%", size: "clamp(170px,28vw,390px)", m: { left: "56%", top: "1%", size: "52vw" }, rot: 14, fromX: 64, fromY: -24, scale: 0.76, delay: 0.05, depth: 24 },
      { kind: "tajine", left: "3%", top: "46%", size: "clamp(120px,18vw,260px)", m: { left: "-7%", top: "66%", size: "42vw" }, rot: -4, fromX: -48, fromY: 34, scale: 0.82, delay: 0.15, depth: 14, float: 5 },
      { kind: "leaf", left: "26%", top: "6%", size: "clamp(60px,9vw,130px)", m: false, rot: 30, fromX: -20, fromY: -30, scale: 0.8, delay: 0.28, depth: 26, float: 3.9 },
      { kind: "leaf", left: "82%", top: "70%", size: "clamp(50px,7vw,100px)", m: { left: "80%", top: "70%", size: "18vw" }, rot: -40, fromX: 30, fromY: 30, scale: 0.8, delay: 0.36, depth: 18, float: 4.6 },
    ],
  },
  {
    id: "jus",
    n: "03",
    eyebrow: "Pressés minute",
    title: "Jus frais",
    sub: "Orange, avocat, banane, panaché — des jus onctueux, servis bien frais.",
    cta: "Voir les boissons",
    target: "jus",
    foods: [
      { kind: "juice", left: "5%", top: "10%", size: "clamp(120px,17vw,250px)", m: { left: "-2%", top: "3%", size: "36vw" }, rot: -8, fromX: -50, fromY: 28, scale: 0.8, delay: 0, depth: 20 },
      { kind: "avocado", left: "68%", top: "5%", size: "clamp(90px,12vw,180px)", m: { left: "70%", top: "3%", size: "30vw" }, rot: -18, fromX: 40, fromY: -26, scale: 0.78, delay: 0.12, depth: 26, float: 4.9 },
      { kind: "orange", left: "76%", top: "52%", size: "clamp(110px,16vw,230px)", m: { left: "66%", top: "68%", size: "36vw" }, rot: 20, fromX: 52, fromY: 30, scale: 0.8, delay: 0.22, depth: 16, float: 5.4 },
      { kind: "leaf", left: "22%", top: "74%", size: "clamp(60px,8vw,120px)", m: false, rot: 18, fromX: -26, fromY: 34, scale: 0.8, delay: 0.32, depth: 12, float: 4 },
    ],
  },
];

export const heroFoods: FoodItem[] = [
  { kind: "tacos", left: "4%", top: "20%", size: "clamp(150px,22vw,330px)", m: { left: "-8%", top: "13%", size: "44vw" }, rot: -12, fromX: -80, fromY: 40, scale: 0.75, delay: 0.5, depth: 26 },
  { kind: "pizza", left: "75%", top: "13%", size: "clamp(170px,25vw,370px)", m: { left: "58%", top: "10%", size: "46vw" }, rot: 14, fromX: 80, fromY: -30, scale: 0.75, delay: 0.62, depth: 22 },
  { kind: "burger", left: "14%", top: "66%", size: "clamp(120px,16vw,240px)", m: { left: "-4%", top: "72%", size: "38vw" }, rot: -6, fromX: -50, fromY: 50, scale: 0.8, delay: 0.76, depth: 30, float: 5.2 },
  { kind: "juice", left: "78%", top: "62%", size: "clamp(110px,15vw,220px)", m: { left: "68%", top: "74%", size: "30vw" }, rot: 9, fromX: 50, fromY: 50, scale: 0.8, delay: 0.88, depth: 18, float: 4.8 },
  { kind: "chili", left: "30%", top: "10%", size: "clamp(44px,6vw,90px)", m: false, rot: -28, fromX: -20, fromY: -40, scale: 0.8, delay: 1, depth: 34, float: 3.9 },
  { kind: "leaf", left: "62%", top: "78%", size: "clamp(50px,7vw,110px)", m: false, rot: 24, fromX: 20, fromY: 40, scale: 0.8, delay: 1.1, depth: 34, float: 4.5 },
];
