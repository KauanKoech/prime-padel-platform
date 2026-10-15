export type MockScenario =
  | "normal" | "empty" | "all-unavailable"
  | "query-error-once" | "submit-error-once" | "conflict-once"
  | "query-timeout" | "submit-timeout";

export type TestControls = {
  scenario?: MockScenario;
  queryDelayMs?: number;
  submitDelayMs?: number;
  queryDelaysMs?: number[];
};
