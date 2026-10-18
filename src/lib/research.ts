import dataset from "../generated/research.json";
import type { Research } from "../types/research";
// Validated with the shared runtime schema before every dev server and production build.
export const research: Research = dataset as Research;
export const sourceById = new Map(
  research.sources.map((source) => [source.id, source]),
);
export const observationsFor = (id: string) =>
  research.observations.filter((row) => row.indicatorId === id);
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
