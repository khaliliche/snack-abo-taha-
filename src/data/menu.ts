export type Price = { label: string; value: number };
export type MenuItem = {
  name: string;
  description?: string;
  price?: number;
  prices?: Price[];
  signature?: boolean;
};
export type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

const sizes = (p: number, m: number, g: number): Price[] => [
  { label: "P", value: p },
  { label: "M", value: m },
  { label: "G", value: g },
];

export const menu: MenuCategory[] = [
  {
    id: "salades",
    title: "Salades",
    items: [
      { name: "Salade marocaine", description: "Salade verte, tomate, oignons, concombre, olives noires", price: 15 },
      { name: "Salade niçoise", description: "Salade verte, tomate, betterave, carotte, pomme de terre, concombre, riz, oeuf dur, thon, maïs", price: 20 },
      { name: "Salade thon", description: "Thon, tomate, oignons, carotte, olives noires", price: 25 },
      { name: "Salade mexicaine", description: "Riz, thon, tomate, oeuf, poivre, fromage râpé", price: 25 },
      { name: "Salade buéno", description: "Salade verte, avocat, poulet, fromage, tomate, algue marinée", price: 25 }, // À VÉRIFIER : "algue marinée"
      { name: "Salade césar", description: "Salade verte, pain grillé, fromage, poulet, tomate, maïs, oeuf", price: 25 },
      { name: "Salade Abo Taha", description: "Salade verte, riz, pomme de terre, carotte, concombre, calmar, maïs, crevette, surimi, oeuf, fruits de saison", price: 35, signature: true },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    items: [
      { name: "Simple burger", price: 20 },
      { name: "Cheeseburger", price: 22 },
      { name: "Burger royal", price: 30 },
      { name: "Cheeseburger royal", price: 35 },
    ],
  },
  {
    id: "chawarma",
    title: "Chawarma",
    items: [
      { name: "Chawarma fromages", price: 24 },
      { name: "Chawarma arabe", price: 30 },
      { name: "Chawarma double", price: 35 },
      { name: "Plat chawarma", price: 35 },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    note: "P = petite · M = moyenne · G = grande",
    items: [
      { name: "Margherita", prices: sizes(20, 30, 40) },
      { name: "Thon", prices: sizes(25, 35, 45) },
      { name: "Poulet", prices: sizes(25, 35, 45) },
      { name: "Quatre fromages", prices: sizes(30, 40, 55) },
      { name: "Charcuterie", prices: sizes(25, 35, 45) },
      { name: "Viande hachée", prices: sizes(30, 40, 50) },
      { name: "Quatre saisons", prices: sizes(30, 40, 55) },
      { name: "Fruits de mer", prices: sizes(30, 40, 50) },
      { name: "Mixte", prices: sizes(35, 45, 55) },
      { name: "Végétarienne", prices: sizes(25, 35, 45) },
      { name: "Carbonara", prices: sizes(30, 40, 50) },
    ],
  },
  {
    id: "panini",
    title: "Panini",
    items: [
      { name: "Panini omelette", price: 15 },
      { name: "Panini fromages", price: 15 },
      { name: "Panini thon", price: 18 },
      { name: "Panini hot dog", price: 20 },
      { name: "Panini viande hachée", price: 22 },
      { name: "Panini saucisse", price: 22 },
      { name: "Panini poulet", price: 22 },
      { name: "Panini dinde", price: 22 },
      { name: "Panini mixte", price: 25 },
      { name: "Panini crevette", price: 30 },
    ],
  },
  {
    id: "sandwichs",
    title: "Sandwichs",
    items: [
      { name: "Sandwich omelette", price: 13 },
      { name: "Sandwich thon", price: 15 },
      { name: "Sandwich hot dog", price: 18 },
      { name: "Sandwich dinde", price: 20 },
      { name: "Sandwich poulet", price: 20 },
      { name: "Sandwich chawarma", price: 20 },
      { name: "Sandwich saucisse", price: 20 },
      { name: "Sandwich viande hachée", price: 20 },
      { name: "Sandwich nugget", price: 20 },
      { name: "Sandwich poulet crispy", price: 25 },
      { name: "Sandwich mixte", price: 25 },
      { name: "Sandwich de foie", price: 25 },
      { name: "Sandwich fruits de mer", price: 25 },
      { name: "Sandwich crevette", price: 25 },
    ],
  },
  {
    id: "tajines",
    title: "Tajines",
    items: [
      { name: "Tajine viande hachée", price: 30 },
      { name: "Tajine viande hachée omelette", price: 35 },
      { name: "Tajine crevette", price: 35 },
      { name: "Tajine viande hachée omelette fromages", price: 40 },
    ],
  },
  {
    id: "poulet",
    title: "Poulet",
    items: [
      { name: "1/4 poulet", price: 30 },
      { name: "1/2 poulet", price: 60 },
      { name: "Poulet complet", price: 120 },
    ],
  },
  {
    id: "tacos",
    title: "Tacos",
    items: [
      { name: "Tacos poulet", price: 30 },
      { name: "Tacos viande hachée", price: 30 },
      { name: "Tacos nugget", price: 30 },
      { name: "Tacos chawarma", price: 30 },
      { name: "Tacos saucisse", price: 30 },
      { name: "Tacos mixte", price: 35 },
      { name: "Tacos cordon bleu", price: 35 },
      { name: "Tacos fruits de mer", price: 40 },
      {
        name: "Tacos Abo Taha",
        prices: [
          { label: "Normal", value: 40 },
          { label: "XL", value: 50 },
        ],
        signature: true,
      },
    ],
  },
  {
    id: "tacos-xl",
    title: "Tacos XL",
    items: [
      { name: "Tacos XL poulet", price: 45 },
      { name: "Tacos XL viande hachée", price: 45 },
      { name: "Tacos XL nugget", price: 45 },
      { name: "Tacos XL mixte", price: 50 },
    ],
  },
  {
    id: "bakito",
    title: "Bakito",
    items: [
      { name: "Bakito viande hachée", price: 30 },
      { name: "Bakito poulet", price: 30 },
      { name: "Bakito mixte", price: 35 },
    ],
  },
  {
    id: "cosamia",
    title: "Cosamia",
    items: [
      { name: "Cosamia poulet", price: 30 },
      { name: "Cosamia viande hachée", price: 30 },
      { name: "Cosamia jambon", price: 30 },
      { name: "Cosamia mixte", price: 35 },
      { name: "Cosamia fruits de mer", price: 40 },
    ],
  },
  {
    id: "poutine",
    title: "Poutine",
    items: [
      { name: "Poutine poulet", price: 30 },
      { name: "Poutine viande hachée", price: 30 },
      { name: "Poutine jambon", price: 35 },
      { name: "Poutine mixte", price: 35 },
      { name: "Poutine fruits de mer", price: 40 },
    ],
  },
  {
    // À VÉRIFIER : cette section était coupée sur les photos
    id: "spaghetti",
    title: "Spaghetti",
    items: [
      { name: "Spaghetti thon", price: 25 },
      { name: "Spaghetti poulet", price: 25 },
      { name: "Spaghetti sauce tomate", price: 20 },
      { name: "Spaghetti bolognaise", price: 30 },
      { name: "Spaghetti fruits de mer", price: 35 },
      { name: "Tagliatelle fruits de mer", price: 35 },
      { name: "Tagliatelle carbonara", price: 35 },
    ],
  },
  {
    // À VÉRIFIER : noms partiellement coupés sur les photos
    id: "plats",
    title: "Plats",
    items: [
      { name: "Plat viande hachée", price: 30 },
      { name: "Plat dinde", price: 30 },
      { name: "Plat saucisse", price: 30 },
      { name: "Plat nugget", price: 35 },
      { name: "Plat mixte", price: 35 },
      { name: "Plat émincé poulet", price: 35 },
      { name: "Plat escalope dinde", price: 35 },
      { name: "Plat crispy", price: 40 },
      { name: "Plat émincé viande", price: 45 },
    ],
  },
  {
    id: "jus",
    title: "Jus & boissons",
    items: [
      { name: "Jus d'orange", price: 12 },
      { name: "Jus de banane", price: 10 },
      { name: "Jus de pomme", price: 10 },
      { name: "Jus d'avocat", price: 20 },
      { name: "Panaché", price: 20 },
      { name: "Jus de pêche", price: 15 },
      { name: "Jus de citron", price: 10 },
      { name: "Canette diverses", price: 6 },
      { name: "Eau minérale", price: 6 },
      { name: "Eau minérale 1,5L", price: 10 },
    ],
  },
];