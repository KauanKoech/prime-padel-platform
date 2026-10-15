export type CourtId = "eqi-dgi" | "ademicom" | "o-boticario" | "antidoto" | "rrtur";

export type Court = { id: CourtId; name: string };
export type CourtOffer = {
  id: string;
  courtId: CourtId;
  durationMinutes: 60 | 90;
  priceCents: number;
};
export type OpeningHours = { weekday: number } & (
  | { status: "confirmed"; opens: string; closes: string }
  | { status: "pending" }
);
export type ArenaProfile = {
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  instagram: string;
  whatsapp: { status: "pending" };
  store: { name: string; description: string; instagram: string };
  events: readonly string[];
};
