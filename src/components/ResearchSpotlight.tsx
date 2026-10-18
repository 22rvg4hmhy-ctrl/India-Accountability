import { useState } from "react";
import { research, observationsFor, asset } from "../lib/research";
import { AppLink } from "../lib/navigation";
import { TrendChart } from "./TrendChart";
import { ExternalArrow } from "./ResearchIcon";
export function ResearchSpotlight() {
  const [categoryId, setCategoryId] = useState("economy");
  const category = research.categories.find((c) => c.id === categoryId)!;
  const indicators = research.indicators.filter(
    (i) => i.category === categoryId,
  );
  const featured = indicators[0];
  return (
    <section className="research-spotlight" aria-label="Research spotlight">
      <div className="spotlight-topline">
        <span className="live-dot" aria-hidden="true" />
        <span className="section-label">Inside the research</span>
        <span className="snapshot-date">
          Snapshot · {research.metadata.asOf}
        </span>
      </div>
      <div
        className="spotlight-tabs"
        role="group"
        aria-label="Spotlight policy area"
      >
        {research.categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCategoryId(c.id)}
            aria-pressed={categoryId === c.id}
          >
            {["Economy", "Employment", "Democracy", "Education", "Digital"][i]}
          </button>
        ))}
      </div>
      <div className="spotlight-content" key={categoryId}>
        <div className="spotlight-title">
          <div>
            <span className="section-label">{category.name}</span>
            <h2>{featured?.title || "Research takes care."}</h2>
          </div>
          <span className="coverage-tag">{indicators.length} indicators</span>
        </div>
        {featured ? (
          <>
            <TrendChart
              key={featured.id}
              rows={observationsFor(featured.id)}
              title={featured.title}
              unit={featured.unit}
            />
            <p className="spotlight-caveat">{featured.summary}</p>
            <AppLink
              className="primary-button"
              href={asset(
                `?view=${categoryId}&topic=${featured.topic}&indicator=${featured.id}`,
              )}
            >
              Explore this evidence <ExternalArrow />
            </AppLink>
          </>
        ) : (
          <div className="spotlight-pending">
            <span className="pending-symbol" aria-hidden="true">
              —
            </span>
            <h3>Evidence review pending</h3>
            <p>
              This area has no published indicator series yet. Historical
              research and the promise register remain available.
            </p>
            <AppLink
              className="primary-button"
              href={asset(`?view=${categoryId}`)}
            >
              View research status <ExternalArrow />
            </AppLink>
          </div>
        )}
      </div>
      <p className="spotlight-footnote">
        A research snapshot, not a live feed or a government score.
      </p>
    </section>
  );
}
