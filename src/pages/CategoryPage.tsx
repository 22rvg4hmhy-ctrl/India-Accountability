import { useState, useEffect, useRef } from "react";
import { ResearchIcon } from "../components/ResearchIcon";
import { ExternalArrow } from "../components/ResearchIcon";
import type { Category } from "../types/research";
import { research, asset } from "../lib/research";
import { AppLink, navigate } from "../lib/navigation";
import { IndicatorExplorer } from "../components/IndicatorExplorer";
import { IndependentEvidence } from "../components/IndependentEvidence";
import { SourceLinks } from "../components/SourceLinks";
export function CategoryPage({
  category,
  params,
}: {
  category: Category;
  params: URLSearchParams;
}) {
  const [search, setSearch] = useState("");
  const [withData, setWithData] = useState(false);
  const workspaceRef = useRef<HTMLElement>(null);
  const selectedTopicId = params.get("topic");
  useEffect(() => {
    if (selectedTopicId)
      workspaceRef.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, [selectedTopicId]);
  const topics = research.topics.filter((t) => t.category === category.id);
  const visibleTopics = topics.filter(
    (t) =>
      (!withData ||
        research.indicators.some(
          (i) => i.category === category.id && i.topic === t.id,
        )) &&
      `${t.name} ${t.description}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const topic = topics.find((t) => t.id === params.get("topic"));
  const indicators = topic
    ? research.indicators.filter(
        (i) => i.category === category.id && i.topic === topic.id,
      )
    : [];
  const indicator =
    indicators.find((i) => i.id === params.get("indicator")) || indicators[0];
  const href = (topicId?: string, indicatorId?: string) =>
    asset(
      `?${new URLSearchParams({ view: category.id, ...(topicId ? { topic: topicId } : {}), ...(indicatorId ? { indicator: indicatorId } : {}) })}`,
    );
  const commitments = research.commitments.filter(
    (p) => category.id === "economy" && p.topic === topic?.id,
  );
  const csvFile =
    category.id === "economy"
      ? "economy_extended_observations.csv"
      : `${category.id}-indicators.csv`;
  return (
    <>
      <AppLink className="back" href={asset("?view=home")}>
        ← Dashboard
      </AppLink>
      <header className="page-heading">
        <span className="eyebrow">{category.name}</span>
        <h1>
          {category.id === "economy"
            ? "What changed for India’s economy?"
            : category.id === "employment"
              ? "What is changing in India’s working lives?"
              : category.id === "democracy"
                ? "How are rights and institutions evolving?"
                : category.name}
        </h1>
        <p>
          {topics.length
            ? "Choose a subject to explore observations, promises, sources and their limitations."
            : `${category.description}. This category’s full systematic evidence review has not yet been completed.`}
        </p>
        <span className="status-label">
          {category.status} · No overall verdict
        </span>
      </header>
      {topics.length ? (
        <>
          <div className="subject-toolbar">
            <label className="subject-search">
              Find a subject
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search research subjects…"
              />
            </label>
            <button
              className="filter-toggle"
              aria-pressed={withData}
              onClick={() => setWithData((v) => !v)}
            >
              With published data
            </button>
            <span role="status">
              {visibleTopics.length} of {topics.length} subjects
            </span>
            {(search || withData) && (
              <button
                className="text-button"
                onClick={() => {
                  setSearch("");
                  setWithData(false);
                }}
              >
                Reset filters
              </button>
            )}
          </div>
          {visibleTopics.length === 0 && (
            <p className="selection-prompt">
              No subjects match these filters. Try a different search or reset
              the filters.
            </p>
          )}
          <section className="topic-grid" aria-label="Research subjects">
            {visibleTopics.map((t) => (
              <AppLink
                key={t.id}
                className={`topic-card ${topic?.id === t.id ? "selected" : ""}`}
                href={href(t.id)}
                aria-current={topic?.id === t.id ? "true" : undefined}
              >
                <span className="card-number">0{topics.indexOf(t) + 1}</span>
                <span className="topic-icon">
                  <ResearchIcon category={category.id} />
                </span>
                <strong>{t.name}</strong>
                <span className="topic-availability">
                  {research.indicators.filter(
                    (i) => i.category === category.id && i.topic === t.id,
                  ).length || "No"}{" "}
                  published series
                </span>
                <span className="card-action">Explore →</span>
              </AppLink>
            ))}
          </section>
          {!topic && (
            <p className="selection-prompt">
              ↑ Select a subject to open its evidence explorer.
            </p>
          )}
          {topic && (
            <section
              ref={workspaceRef}
              className="workspace"
              aria-label={`${topic.name} research`}
            >
              <div className="workspace-heading">
                <div>
                  <span className="eyebrow">
                    {topic.name} / Evidence explorer
                  </span>
                  <h2>{topic.question}</h2>
                  <p>{topic.description}</p>
                </div>
                <AppLink className="back" href={href()}>
                  Close ✕
                </AppLink>
              </div>
              {indicators.length ? (
                <>
                  <div className="indicator-picker">
                    <label htmlFor="indicator">Select indicator</label>
                    <select
                      id="indicator"
                      value={indicator.id}
                      onChange={(e) => navigate(href(topic.id, e.target.value))}
                    >
                      {indicators.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <IndicatorExplorer key={indicator.id} indicator={indicator} />
                </>
              ) : (
                <div className="panel">
                  <h3>Evidence review in progress</h3>
                  <p>
                    {topic.note ||
                      "Comparable observations and definitions are still undergoing review. No numerical verdict is published."}
                  </p>
                  <AppLink href={asset("?view=audit")}>
                    Browse the promise register <ExternalArrow />
                  </AppLink>
                </div>
              )}
              {commitments.length > 0 && (
                <section className="panel">
                  <div className="section-label">
                    Related commitments · provisional research
                  </div>
                  <h3>Promises and their evidence</h3>
                  <p className="muted">
                    These thematic research notes are separate from the
                    manifesto register; review labels are preserved.
                  </p>
                  {commitments.map((p) => (
                    <details className="commitment" key={p.id}>
                      <summary>
                        <span>
                          {p.title}
                          <small>
                            {p.sourceClass} · Deadline: {p.deadline}
                          </small>
                        </span>
                        <span className="status-label">{p.status}</span>
                      </summary>
                      <p>{p.analysis}</p>
                      <p className="chart-note">{p.caveat}</p>
                      <SourceLinks ids={p.sources} />
                    </details>
                  ))}
                </section>
              )}
              <IndependentEvidence
                category={category.id}
                topic={category.id === "economy" ? topic.id : undefined}
              />
              <details className="panel downloads">
                <summary>Research scope & downloads</summary>
                <p>
                  Selected evidence, not a systematic assessment of all claims.
                  Downloads contain the source-linked records used in these
                  charts.
                </p>
                <div className="tools">
                  <a href={asset(`data/${csvFile}`)} download>
                    Observation inputs CSV ↓
                  </a>
                  <a href={asset(`data/${category.id}-research.json`)} download>
                    Research JSON ↓
                  </a>
                  {category.id === "economy" && (
                    <>
                      <AppLink href={asset("economy-evidence.html")}>
                        All Economy evidence <ExternalArrow />
                      </AppLink>
                      <a
                        href={asset("data/economy_derived_comparisons.json")}
                        download
                      >
                        Calculated comparisons JSON ↓
                      </a>
                      <a
                        href={asset("data/economy_indicator_coverage.csv")}
                        download
                      >
                        Coverage and gaps CSV ↓
                      </a>
                      <a
                        href={asset("data/economic_promises_audit.csv")}
                        download
                      >
                        Promise review CSV ↓
                      </a>
                    </>
                  )}
                </div>
              </details>
            </section>
          )}
          {!topic && <IndependentEvidence category={category.id} />}
        </>
      ) : (
        <>
          <div className="panel">
            <h2>Research preview — detailed audit pending</h2>
            <p>
              Existing historical research is available below. This category is
              not presented as fully researched.
            </p>
            <div className="tools">
              <a href={asset(`research-archive.html?view=${category.id}`)}>
                Original category research <ExternalArrow />
              </a>
              <AppLink href={asset("?view=audit")}>
                Promise register <ExternalArrow />
              </AppLink>
            </div>
          </div>
          <IndependentEvidence category={category.id} />
        </>
      )}
      <p className="scope-note">
        {research.metadata.scope} Numbers are source-specific observations, not
        an overall assessment of any government.
      </p>
    </>
  );
}
