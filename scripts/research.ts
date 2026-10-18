import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import { ResearchSchema, type Observation } from "../src/types/research";
export const root = new URL("../", import.meta.url);
export function json(path: string): unknown {
  return JSON.parse(readFileSync(new URL(path, root), "utf8"));
}
export function csv(path: string): Record<string, string>[] {
  return parse(readFileSync(new URL(path, root), "utf8"), {
    columns: true,
    bom: true,
    skip_empty_lines: true,
  });
}
export function loadResearch() {
  const indicators = ResearchSchema.shape.indicators.parse(
    json("data/indicators.json"),
  );
  const observations: Observation[] = csv("data/observations/economy.csv").map(
    (row) => ({
      indicatorId: row.metric_id,
      period: row.period,
      value: Number(row.value),
      unit: row.unit,
      sourceIds: row.source_ids
        .split(";")
        .map((x) => x.trim())
        .filter(Boolean),
      vintage: row.research_vintage || null,
    }),
  );
  for (const category of ["employment", "democracy"]) {
    for (const row of csv(`data/observations/${category}.csv`)) {
      const indicator = indicators.find(
        (i) => i.category === category && i.title === row.indicator,
      );
      if (!indicator) throw new Error(`Unmapped observation: ${row.indicator}`);
      observations.push({
        indicatorId: indicator.id,
        period: row.period,
        value: Number(row.value),
        unit: row.unit,
        sourceIds: indicator.sources,
        vintage: null,
      });
    }
  }
  // Reject blank values before Number('') could turn them into an invented zero.
  for (const category of ["economy", "employment", "democracy"]) {
    for (const row of csv(`data/observations/${category}.csv`))
      if (!row.value.trim())
        throw new Error(`Missing numeric value in ${category}`);
  }
  return ResearchSchema.parse({
    metadata: json("data/metadata.json"),
    categories: json("data/categories.json"),
    topics: json("data/topics.json"),
    indicators,
    sources: json("data/sources.json"),
    observations,
    promises: csv("data/promises.csv"),
    commitments: json("data/economy-commitments.json"),
    independent: csv("data/independent-evidence.csv"),
  });
}
