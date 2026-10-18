import { z } from "zod";

export const CategoryId = z.enum([
  "economy",
  "employment",
  "democracy",
  "education",
  "digital",
]);
const Id = z.string().min(1);
const SourceSchema = z.object({
  id: Id,
  name: z.string().min(1),
  url: z.url(),
  type: z.string().optional(),
});
const CategorySchema = z.object({
  id: CategoryId,
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  status: z.string(),
});
const TopicSchema = z.object({
  id: Id,
  category: CategoryId,
  name: z.string(),
  icon: z.string(),
  question: z.string(),
  description: z.string(),
  note: z.string().optional(),
});
const IndicatorSchema = z.object({
  id: Id,
  category: CategoryId,
  topic: Id,
  title: z.string(),
  unit: z.string().min(1),
  summary: z.string(),
  method: z.string(),
  sources: z.array(Id).min(1),
  confidence: z.string(),
  type: z.string(),
  comparison: z.enum(["annual-windows", "reference-point", "none"]),
  indicator_id: z.string().optional(),
});
const ObservationSchema = z.object({
  indicatorId: Id,
  period: z.string().min(1),
  value: z.number().finite(),
  unit: z.string().min(1),
  sourceIds: z.array(Id).min(1),
  vintage: z.string().nullable(),
});
const PromiseSchema = z.object({
  id: Id,
  manifesto_year: z.string(),
  source_type: z.string(),
  document_id: z.string(),
  pdf_page: z.string(),
  commitment_type: z.string(),
  category: z.string(),
  title: z.string(),
  source_url: z.url(),
  assessment: z.string(),
  research_stage: z.string(),
  confidence: z.string(),
  finding: z.string(),
  original_deadline: z.string(),
  quote_status: z.string(),
  last_reviewed: z.string(),
  scope_note: z.string(),
  evidence_ids: z.string(),
  assessment_rule: z.string(),
});
const CommitmentSchema = z.object({
  id: Id,
  title: z.string(),
  sourceClass: z.string(),
  deadline: z.string(),
  topic: Id,
  status: z.string(),
  grade: z.string(),
  verified: z.boolean(),
  analysis: z.string(),
  caveat: z.string(),
  sources: z.array(Id),
  metric: z.string().nullable(),
});
const IndependentSchema = z.object({
  id: Id,
  category: z.string(),
  topic: z.string(),
  title: z.string(),
  source: z.string(),
  kind: z.string(),
  url: z.url(),
  finding: z.string(),
  official: z.string(),
  reconciliation: z.string(),
  status: z.string(),
});
export const ResearchSchema = z
  .object({
    metadata: z.object({
      asOf: z.string(),
      scope: z.string(),
      migrationVersion: z.string(),
    }),
    categories: z.array(CategorySchema),
    topics: z.array(TopicSchema),
    indicators: z.array(IndicatorSchema),
    sources: z.array(SourceSchema),
    observations: z.array(ObservationSchema),
    promises: z.array(PromiseSchema),
    commitments: z.array(CommitmentSchema),
    independent: z.array(IndependentSchema),
  })
  .superRefine((data, ctx) => {
    const fail = (message: string) => ctx.addIssue({ code: "custom", message });
    for (const key of [
      "categories",
      "topics",
      "indicators",
      "sources",
      "promises",
      "commitments",
      "independent",
    ] as const) {
      const ids = data[key].map((row) =>
        key === "topics"
          ? `${"category" in row ? row.category : ""}:${row.id}`
          : row.id,
      );
      if (new Set(ids).size !== ids.length) fail(`Duplicate ${key} IDs`);
    }
    const sources = new Set(data.sources.map((s) => s.id));
    const categories = new Set(data.categories.map((c) => c.id));
    const topics = new Set(data.topics.map((t) => `${t.category}:${t.id}`));
    const indicators = new Map(data.indicators.map((i) => [i.id, i]));
    for (const topic of data.topics)
      if (!categories.has(topic.category))
        fail(`Unknown category for ${topic.id}`);
    for (const indicator of data.indicators) {
      if (!topics.has(`${indicator.category}:${indicator.topic}`))
        fail(`Unknown topic for ${indicator.id}`);
      for (const id of indicator.sources)
        if (!sources.has(id)) fail(`Unknown source ${id}`);
      if (!data.observations.some((o) => o.indicatorId === indicator.id))
        fail(`Missing observations: ${indicator.id}`);
    }
    const seen = new Set<string>();
    for (const observation of data.observations) {
      const key = `${observation.indicatorId}:${observation.period}`;
      if (seen.has(key)) fail(`Duplicate observation ${key}`);
      seen.add(key);
      const indicator = indicators.get(observation.indicatorId);
      if (!indicator) fail(`Unknown indicator ${observation.indicatorId}`);
      if (indicator && observation.unit !== indicator.unit)
        fail(`Unit mismatch ${key}`);
      for (const id of observation.sourceIds)
        if (!sources.has(id)) fail(`Unknown observation source ${id}`);
    }
    for (const commitment of data.commitments) {
      if (!topics.has(`economy:${commitment.topic}`))
        fail(`Unknown commitment topic ${commitment.id}`);
      for (const id of commitment.sources)
        if (!sources.has(id)) fail(`Unknown commitment source ${id}`);
      if (commitment.metric && !indicators.has(commitment.metric))
        fail(`Unknown commitment indicator ${commitment.metric}`);
    }
  });
export type Research = z.infer<typeof ResearchSchema>;
export type Category = Research["categories"][number];
export type Topic = Research["topics"][number];
export type Indicator = Research["indicators"][number];
export type Observation = Research["observations"][number];
export type Source = Research["sources"][number];
export type PromiseRecord = Research["promises"][number];
