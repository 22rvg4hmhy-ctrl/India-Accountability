import { useState } from "react";
import { research, asset } from "../lib/research";
import { AppLink } from "../lib/navigation";
import { IndicatorExplorer } from "../components/IndicatorExplorer";
import { IndependentEvidence } from "../components/IndependentEvidence";
export function Evidence() {
  const [search, setSearch] = useState(""),
    [topic, setTopic] = useState("all");
  const indicators = research.indicators.filter(
    (i) =>
      i.category === "economy" &&
      (topic === "all" || i.topic === topic) &&
      `${i.title} ${i.summary}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <header className="page-heading">
        <span className="eyebrow">Economy / Full evidence explorer</span>
        <h1>Look closer at the numbers.</h1>
        <p>
          Every available Economy indicator, with the same observations,
          calculations and source limitations used in the dashboard.
        </p>
        <AppLink href={asset("?view=economy")}>← Economy dashboard</AppLink>
      </header>
      <div className="filter-bar">
        <label>
          Search indicators
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="GDP, prices, poverty…"
          />
        </label>
        <label>
          Subject
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="all">All Economy subjects</option>
            {research.topics
              .filter((t) => t.category === "economy")
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <p role="status">{indicators.length} indicators match</p>
      {indicators.length === 0 && (
        <p className="empty">No indicators match these filters.</p>
      )}
      {indicators.map((i) => (
        <details className="panel evidence-record" key={i.id}>
          <summary>
            <span>
              <strong>{i.title}</strong>
              <small>
                {i.unit} · {i.type}
              </small>
            </span>
            <span>Explore +</span>
          </summary>
          <IndicatorExplorer indicator={i} />
        </details>
      ))}
      <IndependentEvidence category="economy" />
    </>
  );
}
