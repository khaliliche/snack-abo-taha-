/**
 * Avis clients (preuve sociale). Ajoutez ici de VRAIS avis (Google Maps, WhatsApp…) avec l'accord des clients :
 * la section « Avis » de l'accueil n'apparaît que si ce tableau n'est pas vide.
 * Exemple : { name: "Prénom N.", text: "Texte exact de l'avis.", source: "Google" }
 */
export type Review = { name: string; text: string; source?: string };
export const reviews: Review[] = [];
