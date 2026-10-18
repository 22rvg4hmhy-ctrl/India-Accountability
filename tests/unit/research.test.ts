import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { loadResearch, json, root, csv } from "../../scripts/research";
import { ResearchSchema, type Observation } from "../../src/types/research";
import {
  annualWindows,
  compareEndpoints,
  historicalContext,
} from "../../src/lib/comparisons";
const data = loadResearch();
const old = readFileSync(
  new URL("archive/releases/v2.1/assets/js/index-1.js", root),
  "utf8",
);
const oldEconomy = JSON.parse(
  vm.runInNewContext(
    old.slice(old.indexOf("const ecoData ="), old.indexOf("const escapeEco")) +
      "JSON.stringify(ecoData)",
  ),
);
describe("migration preserves the supplied research", () => {
  it("matches every economy value, period, title, limitation, confidence and source", () => {
    expect(
      data.indicators.filter((i) => i.category === "economy"),
    ).toHaveLength(oldEconomy.metrics.length);
    for (const original of oldEconomy.metrics) {
      const current = data.indicators.find((i) => i.id === original.id)!;
      for (const key of [
        "title",
        "unit",
        "summary",
        "method",
        "confidence",
        "type",
        "sources",
      ] as const)
        expect(current[key]).toEqual(original[key]);
      expect(
        data.observations
          .filter((o) => o.indicatorId === original.id)
          .map((o) => [o.period, o.value]),
      ).toEqual(original.series);
    }
    expect(data.commitments).toEqual(oldEconomy.promises);
    for (const source of data.sources.filter((s) => oldEconomy.sources[s.id]))
      expect({
        name: source.name,
        url: source.url,
        ...(source.type ? { type: source.type } : {}),
      }).toEqual(oldEconomy.sources[source.id]);
  });
  it("matches every employment and democracy chart, including all pending subjects", () => {
    for (const category of ["employment", "democracy"]) {
      const original = json(
        `archive/releases/v2.1/data/${category}-research.json`,
      ) as {
        id: string;
        name: string;
        note?: string;
        metrics: {
          title: string;
          points: [string, number][];
          explain: string;
        }[];
      }[];
      expect(data.topics.filter((t) => t.category === category)).toHaveLength(
        original.length,
      );
      for (const topic of original) {
        expect(
          data.topics.find((t) => t.category === category && t.id === topic.id)
            ?.note,
        ).toEqual(topic.note);
        for (const metric of topic.metrics) {
          const current = data.indicators.find(
            (i) =>
              i.category === category &&
              i.topic === topic.id &&
              i.title === metric.title,
          )!;
          expect(current.summary).toBe(metric.explain);
          expect(
            data.observations
              .filter((o) => o.indicatorId === current.id)
              .map((o) => [o.period, o.value]),
          ).toEqual(metric.points);
        }
      }
    }
  });
  it("preserves the full manifesto register and expanded independent evidence", () => {
    const original = csv("archive/uploads/promise_database.csv");
    expect(data.promises).toHaveLength(original.length);
    for (const p of data.promises)
      for (const [key, value] of Object.entries(p))
        expect(value).toBe(original.find((row) => row.id === p.id)![key]);
    expect(data.independent).toEqual(
      csv("archive/uploads/independent_evidence_expanded.csv"),
    );
  });
});
describe("comparison rules", () => {
  it("reproduces both supplied reference calculations to four decimal places", () => {
    const reference = json(
      "archive/uploads/economy_derived_comparisons.json",
    ) as Record<
      string,
      {
        pre_2004_2013_mean: number;
        post_2014_2023_mean: number;
        difference_pp: number;
      }
    >;
    for (const [id, expected] of Object.entries(reference)) {
      const result = annualWindows(
        data.observations.filter((o) => o.indicatorId === id),
      )!;
      expect(Number(result.before.toFixed(4))).toBe(
        expected.pre_2004_2013_mean,
      );
      expect(Number(result.after.toFixed(4))).toBe(
        expected.post_2014_2023_mean,
      );
      expect(Number(result.difference.toFixed(4))).toBe(expected.difference_pp);
    }
  });
  it("refuses missing years, duplicates and financial-year substitutes", () => {
    const rows = data.observations.filter(
      (o) => o.indicatorId === "wdi-gdp-growth",
    );
    expect(annualWindows(rows.filter((o) => o.period !== "2008"))).toBeNull();
    expect(
      annualWindows([...rows, rows.find((o) => o.period === "2008")!]),
    ).toBeNull();
    expect(
      annualWindows(rows.map((o) => ({ ...o, period: `FY${o.period}` }))),
    ).toBeNull();
  });
  it("does not invent percentage changes from a zero denominator", () => {
    const original = data.observations[0];
    const rows: Observation[] = [
      { ...original, value: 0 },
      { ...original, period: "later", value: 3 },
    ];
    expect(compareEndpoints(rows)?.relativePercent).toBeNull();
    expect(compareEndpoints([rows[0]])).toBeNull();
  });
  it("does not calculate pre-2014 context for noncomparable research", () => {
    const i = data.indicators.find((i) => i.category === "democracy")!;
    expect(
      historicalContext(
        i,
        data.observations.filter((o) => o.indicatorId === i.id),
      ),
    ).toBeNull();
  });
});
describe("research schema rejects broken datasets", () => {
  it.each([
    "source",
    "duplicate",
    "unit",
    "unknown-indicator",
    "empty-series",
  ] as const)("%s", (kind) => {
    const copy = structuredClone(data);
    if (kind === "source") copy.indicators[0].sources = ["nonexistent"];
    if (kind === "duplicate") copy.observations.push(copy.observations[0]);
    if (kind === "unit") copy.observations[0].unit = "incompatible unit";
    if (kind === "unknown-indicator")
      copy.observations[0].indicatorId = "missing";
    if (kind === "empty-series")
      copy.observations = copy.observations.filter(
        (o) => o.indicatorId !== copy.indicators[0].id,
      );
    expect(ResearchSchema.safeParse(copy).success).toBe(false);
  });
});
