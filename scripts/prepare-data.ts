import {
  mkdirSync,
  writeFileSync,
  copyFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { loadResearch, root } from "./research";
import { annualWindows } from "../src/lib/comparisons";
const data = loadResearch();
const generated = new URL("src/generated/", root),
  downloads = new URL("public/data/", root);
mkdirSync(generated, { recursive: true });
rmSync(downloads, { recursive: true, force: true });
mkdirSync(downloads, { recursive: true });
const write = (dir: URL, name: string, value: unknown) =>
  writeFileSync(new URL(name, dir), JSON.stringify(value, null, 2) + "\n");
write(generated, "research.json", data);
write(downloads, "research.json", data);
for (const [category, file] of [
  ["economy", "economy_extended_observations.csv"],
  ["employment", "employment-indicators.csv"],
  ["democracy", "democracy-indicators.csv"],
])
  copyFileSync(
    new URL(`data/observations/${category}.csv`, root),
    new URL(file, downloads),
  );
for (const file of ["promise_database.csv", "promises.csv"])
  copyFileSync(new URL("data/promises.csv", root), new URL(file, downloads));
copyFileSync(
  new URL("data/independent-evidence.csv", root),
  new URL("independent_evidence_expanded.csv", downloads),
);
for (const name of readdirSync(new URL("data/research/", root)))
  copyFileSync(
    new URL(`data/research/${name}`, root),
    new URL(name, downloads),
  );
for (const category of ["economy", "employment", "democracy"])
  write(downloads, `${category}-research.json`, {
    topics: data.topics.filter((t) => t.category === category),
    indicators: data.indicators.filter((i) => i.category === category),
    observations: data.observations.filter((o) =>
      data.indicators.some(
        (i) => i.id === o.indicatorId && i.category === category,
      ),
    ),
    sources: data.sources,
  });
const derived = Object.fromEntries(
  ["wdi-gdp-growth", "wdi-inflation-annual"].map((id) => {
    const result = annualWindows(
      data.observations.filter((o) => o.indicatorId === id),
    );
    if (!result) throw new Error(`Missing annual comparison inputs for ${id}`);
    return [
      id,
      {
        pre_2004_2013_mean: Number(result.before.toFixed(4)),
        post_2014_2023_mean: Number(result.after.toFixed(4)),
        difference_pp: Number(result.difference.toFixed(4)),
        method:
          "unweighted arithmetic mean of annual World Bank reported rates; descriptive not causal",
      },
    ];
  }),
);
write(downloads, "economy_derived_comparisons.json", derived);
console.log(
  `Prepared ${data.indicators.length} indicators, ${data.observations.length} observations and ${data.promises.length} promises from validated canonical inputs.`,
);
