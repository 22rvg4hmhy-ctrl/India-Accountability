import type { Indicator, Observation } from "../types/research";
export function mean(values: number[]): number | null {
  return values.length && values.every(Number.isFinite)
    ? values.reduce((a, b) => a + b, 0) / values.length
    : null;
}
export function compareEndpoints(rows: Observation[]) {
  if (rows.length < 2) return null;
  const first = rows[0],
    last = rows.at(-1)!;
  const difference = last.value - first.value;
  return {
    first,
    last,
    difference,
    relativePercent:
      first.value === 0 ? null : (difference / Math.abs(first.value)) * 100,
  };
}
export function annualWindows(rows: Observation[]) {
  // Require every year exactly once. Fiscal years and missing years are not interchangeable.
  const window = (start: number) =>
    Array.from({ length: 10 }, (_, i) =>
      rows.filter((r) => r.period === String(start + i)),
    );
  const pre = window(2004),
    post = window(2014);
  if ([...pre, ...post].some((matches) => matches.length !== 1)) return null;
  const before = mean(pre.map(([r]) => r.value))!,
    after = mean(post.map(([r]) => r.value))!;
  return { before, after, difference: after - before };
}
export function historicalContext(indicator: Indicator, rows: Observation[]) {
  if (indicator.comparison === "annual-windows") {
    const result = annualWindows(rows);
    return result ? { kind: "annual" as const, ...result } : null;
  }
  if (indicator.comparison !== "reference-point") return null;
  // Same documented reference-point selection as the previous dashboard, explicitly not averages.
  const historical = (period: string) =>
    /2011|2012|2013|FY1[1-3][–-]/.test(period);
  const first = rows.find((r) => historical(r.period));
  const last = rows
    .slice()
    .reverse()
    .find((r) => !historical(r.period));
  if (!first || !last || rows.indexOf(last) <= rows.indexOf(first)) return null;
  return {
    kind: "reference" as const,
    first,
    last,
    difference: last.value - first.value,
  };
}
export function formatValue(value: number, maximumFractionDigits = 3) {
  return value.toLocaleString("en-IN", { maximumFractionDigits });
}
