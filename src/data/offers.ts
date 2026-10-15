export type Offer = {
  id: string;
  title: string;
  tagline: string;
  price: number;
  image: string;
  imageAlt: string;
  includes: string[];
  note?: string;
};

export const offers: Offer[] = [
  {
    id: "poulet-mahmar",
    title: "Poulet mahmar",
    tagline: "Poulet entier mahmar, braisé au charbon, mariné à notre façon.",
    price: 100,
    image: "/images/offers/poulet.webp",
    imageAlt: "Offre spéciale poulet mahmar à 100 DH",
    includes: ["Poulet mahmar entier", "Frites", "Pain", "Sauce"],
    note: "Offre valable tous les jours de 12h00 à minuit.",
  },
  {
    id: "pizza-burger",
    title: "Pizza + Burger",
    tagline: "Pizza viande hachée + burger simple.",
    price: 40,
    image: "/images/offers/pizza-burger.webp",
    imageAlt: "Offre spéciale pizza viande hachée et burger simple à 40 DH",
    includes: ["Pizza viande hachée", "Burger simple"],
  },
  {
    id: "tacos-mixte",
    title: "Tacos mixte + Coca",
    tagline: "Tacos mixte, viande de qualité, sauces maison, canette Coca-Cola gratuite.",
    price: 35,
    image: "/images/offers/tacos-offer.webp",
    imageAlt: "Offre tacos mixte à 35 DH avec canette Coca-Cola gratuite",
    includes: ["Tacos mixte", "Canette Coca-Cola gratuite"],
  },
];
