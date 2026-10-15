import { expect, test } from "@playwright/test";
import { arena, openingHours } from "../../src/content/arena";
import { courts, offers } from "../../src/content/courts";
import { formatDuration, formatPrice } from "../../src/domain/format";

test("catalogo preserva seis ofertas", () => {
  expect(courts.map(court => court.name)).toEqual([
    "EQI / DGI INVESTIMENTOS", "ADEMICOM", "O BOTICARIO", "ANTIDOTO", "RRTUR",
  ]);
  expect(offers.map(offer => [offer.id, offer.priceCents])).toEqual([
    ["eqi-dgi-90", 19000], ["ademicom-90", 18000], ["o-boticario-90", 18000],
    ["antidoto-60", 14000], ["antidoto-90", 18000], ["rrtur-90", 18000],
  ]);
  expect(offers.filter(offer => offer.courtId === "antidoto").map(offer =>
    [formatDuration(offer.durationMinutes), formatPrice(offer.priceCents)]
  )).toEqual([["1h", "R$ 140"], ["1h30", "R$ 180"]]);
  for (const offer of offers) {
    expect(courts.some(court => court.id === offer.courtId)).toBe(true);
  }
});

test("conteudo conserva canais e funcionamento pendentes", () => {
  expect(arena.whatsapp).toEqual({ status: "pending" });
  expect(openingHours.find(day => day.weekday === 3)).toEqual({ weekday: 3, status: "pending" });
  expect(arena.instagram).toBe("@primepadellages");
  expect(arena.store.instagram).toBe("@westpadelstore");
  expect(arena.address).toBe("Avenida Belisario Ramos, 4241, Sao Cristovao, Lages - SC, CEP 88501-065, Brasil");
  expect(arena.events).toEqual(["Open Prime Padel", "Prime Cup"]);
});
