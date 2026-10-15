import type { ArenaProfile, OpeningHours } from "../domain/arena";

// Source: docs/PRODUCT.md. Pending data is intentionally not usable as contact/hours.
export const arena: ArenaProfile = {
  name: "Prime Padel",
  city: "Lages, Santa Catarina",
  address: "Avenida Belisario Ramos, 4241, Sao Cristovao, Lages - SC, CEP 88501-065, Brasil",
  latitude: -27.811353,
  longitude: -50.317361,
  instagram: "@primepadellages",
  whatsapp: { status: "pending" },
  store: {
    name: "West Padel Store",
    description: "raquetes, roupas, calcados, bolsas, raqueteiras e outros produtos para padel.",
    instagram: "@westpadelstore",
  },
  events: ["Open Prime Padel", "Prime Cup"],
};
export const openingHours: readonly OpeningHours[] = [
  { weekday: 0, status: "confirmed", opens: "09:00", closes: "20:00" },
  { weekday: 1, status: "confirmed", opens: "06:00", closes: "23:00" },
  { weekday: 2, status: "confirmed", opens: "06:00", closes: "23:00" },
  { weekday: 3, status: "pending" },
  { weekday: 4, status: "confirmed", opens: "06:00", closes: "23:00" },
  { weekday: 5, status: "confirmed", opens: "06:00", closes: "23:00" },
  { weekday: 6, status: "confirmed", opens: "09:00", closes: "23:00" },
];
