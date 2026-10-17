/**
 * Cenários exclusivamente demonstrativos do mock. Não representam ocupação real da arena.
 * Os deslocamentos contam a partir de hoje (fuso da arena) e também servem aos testes e2e.
 */
export const demoConfig = {
  horizonDays: 14,
  latencyMs: 450,
  /** Dia sem nenhum horário (estado vazio). */
  emptyDayOffset: 6,
  /** Dia em que a primeira consulta falha (estado de erro recuperável). */
  failingDayOffset: 12,
  /** Dia em que a primeira solicitação esbarra em outra reserva (conflito simulado); a seguinte passa. */
  conflictDayOffset: 2,
  /** A cada N horários, um aparece ocupado. */
  unavailableEvery: 4,
} as const;
