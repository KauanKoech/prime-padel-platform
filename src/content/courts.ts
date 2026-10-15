import type { Court, CourtOffer } from "../domain/arena";

// Source: docs/PRODUCT.md. Prices are totals per court and duration.
export const courts: readonly Court[] = [
  { id: "eqi-dgi", name: "EQI / DGI INVESTIMENTOS" },
  { id: "ademicom", name: "ADEMICOM" },
  { id: "o-boticario", name: "O BOTICARIO" },
  { id: "antidoto", name: "ANTIDOTO" },
  { id: "rrtur", name: "RRTUR" },
];
export const offers: readonly CourtOffer[] = [
  { id: "eqi-dgi-90", courtId: "eqi-dgi", durationMinutes: 90, priceCents: 19000 },
  { id: "ademicom-90", courtId: "ademicom", durationMinutes: 90, priceCents: 18000 },
  { id: "o-boticario-90", courtId: "o-boticario", durationMinutes: 90, priceCents: 18000 },
  { id: "antidoto-60", courtId: "antidoto", durationMinutes: 60, priceCents: 14000 },
  { id: "antidoto-90", courtId: "antidoto", durationMinutes: 90, priceCents: 18000 },
  { id: "rrtur-90", courtId: "rrtur", durationMinutes: 90, priceCents: 18000 },
];
