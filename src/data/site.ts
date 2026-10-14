export const site = {
  name: "Snack Abo Taha",
  tagline: "Tacos, pizzas, chawarma, sandwichs et bien plus encore",
  description:
    "Snack Abo Taha vous propose tacos, pizzas, burgers, chawarma, sandwichs, tajines, poulet et jus frais. Sur place, à emporter ou par WhatsApp.",
  phones: ["06 61 69 50 57", "06 97 05 84 29"],
  whatsapp: "212661695057", // À VÉRIFIER : numéro WhatsApp, format international sans + ni espaces
  email: "",
  address: "Votre adresse ici",
  hours: "Horaires à compléter",
  mapEmbed: "",
  mapLink: "https://maps.app.goo.gl/urGXkunJ7JrFHqZ7A?g_st=iw",
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};

export function whatsappLink(message = "Bonjour, je souhaite passer une commande.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}