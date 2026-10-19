export const site = {
  name: "Snack Abo Taha",
  tagline: "Tacos, pizzas, chawarma, sandwichs et bien plus encore",
  description:
    "Snack Abo Taha vous propose tacos, pizzas, burgers, chawarma, sandwichs, tajines, poulet et jus frais. Sur place, à emporter ou par WhatsApp.",
  phones: ["06 61 69 50 57", "06 97 05 84 29"],
  whatsapp: "212697058429",
  email: "",
  address: "Votre adresse ici",
  hours: "Tous les jours : 11h00 à minuit",
  /** Heure d'ouverture (0-23) ; fermeture à minuit. Sert au badge « Ouvert maintenant ». */
  openHour: 11,
  mapEmbed: "",
  mapLink: "https://maps.app.goo.gl/urGXkunJ7JrFHqZ7A?g_st=iw",
  socials: {
    facebook: "",
    instagram: "https://www.instagram.com/snack_abotaha",
    tiktok: "",
  },
};

export function whatsappLink(message = "Bonjour, je souhaite passer une commande.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** "06 61 69 50 57" -> "tel:+212661695057" */
export function telHref(phone: string) {
  return `tel:+212${phone.replace(/\D/g, "").replace(/^0/, "")}`;
}