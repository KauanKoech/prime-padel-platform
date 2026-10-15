import { expect, test } from "@playwright/test";
import { getArenaDate, getDateWindow, isFutureSlot } from "../../src/domain/arena-time";
import { formatArenaDate, formatArenaTime, formatPrice } from "../../src/domain/format";

test("calendario usa Sao Paulo", () => {
  expect(getArenaDate(new Date("2026-10-16T02:30:00Z"))).toBe("2026-10-15");
  const dates = getDateWindow(new Date("2026-10-15T12:00:00Z"));
  expect(dates).toHaveLength(14);
  expect(dates[0]).toBe("2026-10-15");
  expect(dates.at(-1)).toBe("2026-10-28");
  expect(getDateWindow(new Date("2026-12-31T12:00:00Z")).at(-1)).toBe("2027-01-13");
  expect(getDateWindow(new Date("2028-02-28T12:00:00Z")).slice(0, 3))
    .toEqual(["2028-02-28", "2028-02-29", "2028-03-01"]);
});

test("apresenta instantes e datas no calendario da arena", () => {
  expect(formatArenaTime("2026-10-16T02:30:00Z")).toBe("23:30");
  expect(formatArenaDate("2026-10-16")).toBe("sexta-feira, 16 de outubro de 2026");
  expect(formatPrice(19000)).toBe("R$ 190");
  const slot = {
    id: "antidoto-60|2026-10-16|09:00", offerId: "antidoto-60", date: "2026-10-16",
    startsAt: "2026-10-16T09:00:00-03:00", endsAt: "2026-10-16T10:00:00-03:00", available: true,
  };
  expect(isFutureSlot(slot, new Date("2026-10-16T11:59:59Z"))).toBe(true);
  expect(isFutureSlot(slot, new Date("2026-10-16T12:00:00Z"))).toBe(false);
  expect(isFutureSlot(slot, new Date("2026-10-16T12:00:01Z"))).toBe(false);
});
