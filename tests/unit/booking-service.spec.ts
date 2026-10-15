import { expect, test } from "@playwright/test";
import { createMockBookingService } from "../../src/services/mock/booking-service";
import type { MockScenario } from "../../src/services/mock/scenarios";
import type { BookingRequest } from "../../src/domain/booking";

const fixedNow = () => new Date("2026-10-15T12:00:00Z");
const input = { date: "2026-10-16", offerId: "antidoto-60" };
const request: BookingRequest = {
  attemptId: "attempt-1", offerId: "antidoto-60",
  slotId: "antidoto-60|2026-10-16|09:00", fictitiousName: " Jogador de teste ",
};
function service(scenario: MockScenario = "normal") {
  return createMockBookingService({ now: fixedNow, scenario, queryDelayMs: 0, submitDelayMs: 0 });
}

test("quarta fica pendente", async () => {
  expect(await service().getAvailability({ date: "2026-10-21", offerId: "antidoto-60" }))
    .toEqual({ kind: "hours-pending" });
});

for (const [date, offerId, lastStart, end] of [
  ["2026-10-18", "antidoto-90", "18:30", "20:00"],
  ["2026-10-18", "antidoto-60", "19:00", "20:00"],
  ["2026-10-15", "antidoto-90", "21:30", "23:00"],
  ["2026-10-15", "antidoto-60", "22:00", "23:00"],
]) {
  test(`respeita fechamento e passado: ${date} ${offerId}`, async () => {
    const result = await service().getAvailability({ date, offerId });
    expect(result.kind).toBe("ready");
    if (result.kind !== "ready") throw new Error("Expected ready");
    expect(result.slots.at(-1)?.startsAt).toBe(`${date}T${lastStart}:00-03:00`);
    expect(result.slots.at(-1)?.endsAt).toBe(`${date}T${end}:00-03:00`);
    expect(result.slots.every(slot => Date.parse(slot.startsAt) > fixedNow().getTime())).toBe(true);
    expect(result.slots.some(slot => slot.startsAt === "2026-10-15T09:00:00-03:00")).toBe(false);
  });
}

for (const invalid of [
  { date: "2026-10-14", offerId: "antidoto-60" },
  { date: "2026-10-29", offerId: "antidoto-60" },
  { date: "2026-02-30", offerId: "antidoto-60" },
  { date: "2026-10-16", offerId: "unknown" },
]) {
  test(`rejeita consulta invalida ${invalid.date} ${invalid.offerId}`, async () => {
    expect(await service().getAvailability(invalid)).toEqual({ kind: "error", reason: "invalid" });
  });
}

test("ocupacao deterministica usa indice antes de remover passado", async () => {
  const result = await service().getAvailability({ date: "2026-10-15", offerId: "antidoto-60" });
  if (result.kind !== "ready") throw new Error("Expected ready");
  expect(result.slots.slice(0, 3).map(slot => [slot.startsAt, slot.available])).toEqual([
    ["2026-10-15T09:30:00-03:00", false],
    ["2026-10-15T10:00:00-03:00", true],
    ["2026-10-15T10:30:00-03:00", true],
  ]);
});

for (const scenario of ["empty", "all-unavailable"] as const) {
  test(`consulta ${scenario} nao oferece horario selecionavel`, async () => {
    const instance = service(scenario);
    const result = await instance.getAvailability(input);
    expect(result.kind).toBe("ready");
    if (result.kind !== "ready") throw new Error("Expected ready");
    expect(result.slots.filter(slot => slot.available)).toEqual([]);
    expect(result.slots.length === 0).toBe(scenario === "empty");
    expect((await instance.submit(request)).kind).toBe("conflict");
  });
}

test("erro de consulta permite nova tentativa", async () => {
  const instance = service("query-error-once");
  expect(await instance.getAvailability(input)).toEqual({ kind: "error", reason: "unavailable" });
  expect((await instance.getAvailability(input)).kind).toBe("ready");
});

test("erro de envio permite repetir mesmo ID", async () => {
  const instance = service("submit-error-once");
  expect(await instance.submit(request)).toEqual({ kind: "error", reason: "unavailable" });
  expect((await instance.submit(request)).kind).toBe("success");
});

test("conflito bloqueia horario e preserva outra escolha", async () => {
  const instance = service("conflict-once");
  expect(await instance.submit(request)).toEqual({ kind: "conflict" });
  const result = await instance.getAvailability(input);
  if (result.kind !== "ready") throw new Error("Expected ready");
  expect(result.slots.find(slot => slot.id === request.slotId)?.available).toBe(false);
  expect(await instance.submit({ ...request, attemptId: "attempt-2" })).toEqual({ kind: "conflict" });
  expect((await instance.submit({ ...request, attemptId: "attempt-3",
    slotId: "antidoto-60|2026-10-16|10:00" })).kind).toBe("success");
});

test("revalida e deduplica tentativa", async () => {
  const instance = service();
  const [first, second] = await Promise.all([instance.submit(request), instance.submit(request)]);
  expect(first.kind).toBe("success");
  expect(second).toBe(first);
  expect(await instance.submit(request)).toBe(first);
  if (first.kind !== "success") throw new Error("Expected success");
  expect(first.confirmation.fictitiousName).toBe("Jogador de teste");
  expect(first.confirmation.simulated).toBe(true);
  expect(first.confirmation.offer.priceCents).toBe(14000);
  expect(first.confirmation.slot.endsAt).toBe("2026-10-16T10:00:00-03:00");
  expect(await instance.submit({ ...request, fictitiousName: "Outra pessoa fictícia" }))
    .toEqual({ kind: "error", reason: "invalid" });
});

test("revalida inicio apos consulta e durante envio", async () => {
  let now = fixedNow();
  const instance = createMockBookingService({ now: () => now, queryDelayMs: 0, submitDelayMs: 20 });
  expect((await instance.getAvailability(input)).kind).toBe("ready");
  const pending = instance.submit(request);
  now = new Date("2026-10-16T12:00:00Z");
  expect(await pending).toEqual({ kind: "expired" });
  expect(await instance.submit({ ...request, attemptId: "attempt-2" })).toEqual({ kind: "expired" });
});

for (const patch of [
  { fictitiousName: "   " }, { attemptId: "" },
  { offerId: "eqi-dgi-90" }, { slotId: "antidoto-60|2026-10-16|09:15" },
  { slotId: "antidoto-60|2026-10-21|09:00" }, { slotId: "antidoto-60|2026-10-29|09:00" },
  { slotId: "antidoto-60|2026-02-30|09:00" }, { slotId: "antidoto-60|2026-10-16|22:30" },
]) {
  test(`rejeita envio invalido ${JSON.stringify(patch)}`, async () => {
    expect(await service().submit({ ...request, ...patch })).toEqual({ kind: "error", reason: "invalid" });
  });
}

test("oferta de noventa minutos mantem tarifa de R$ 180", async () => {
  const result = await service().submit({ ...request, offerId: "antidoto-90",
    slotId: "antidoto-90|2026-10-16|09:00" });
  if (result.kind !== "success") throw new Error("Expected success");
  expect(result.confirmation.offer.priceCents).toBe(18000);
  expect(result.confirmation.slot.endsAt).toBe("2026-10-16T10:30:00-03:00");
});

for (const scenario of ["query-timeout", "submit-timeout"] as const) {
  test(`timeout recuperavel ${scenario}`, async () => {
    const instance = service(scenario);
    const start = Date.now();
    const result = await (scenario === "query-timeout"
      ? instance.getAvailability(input) : instance.submit(request));
    expect(result).toEqual({ kind: "error", reason: "timeout" });
    expect(Date.now() - start).toBeGreaterThanOrEqual(7900);
    expect(Date.now() - start).toBeLessThan(9000);
  });
}

test("atraso maior que limite nao confirma depois de expirar", async () => {
  const instance = createMockBookingService({ now: fixedNow, submitDelayMs: 8100 });
  let completions = 0;
  const result = await instance.submit(request).then(value => { completions++; return value; });
  expect(result).toEqual({ kind: "error", reason: "timeout" });
  await new Promise(resolve => setTimeout(resolve, 200));
  expect(completions).toBe(1);
  expect(await instance.submit({ ...request, fictitiousName: "Outro nome" }))
    .toEqual({ kind: "error", reason: "invalid" });
});

test("abortamento cancela consulta e envio sem ocupar tentativa", async () => {
  const instance = createMockBookingService({ now: fixedNow, queryDelayMs: 50, submitDelayMs: 50 });
  const controller = new AbortController();
  const query = instance.getAvailability(input, controller.signal);
  const submit = instance.submit(request, controller.signal);
  const expectations = Promise.all([
    expect(query).rejects.toMatchObject({ name: "AbortError" }),
    expect(submit).rejects.toMatchObject({ name: "AbortError" }),
  ]);
  controller.abort();
  await expectations;
  expect((await instance.submit(request)).kind).toBe("success");
});
