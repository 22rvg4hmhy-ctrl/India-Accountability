import { ExternalArrow } from "../components/ResearchIcon";
import { useState } from "react";
import { research, asset } from "../lib/research";
export function Audit() {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("all"),
    [stage, setStage] = useState("all");
  const rows = research.promises.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (stage === "all" || p.research_stage === stage) &&
      `${p.id} ${p.title} ${p.finding}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <header className="page-heading">
        <span className="eyebrow">Evidence and accountability</span>
        <h1>The promise register</h1>
        <p>
          {research.promises.length} catalogued manifesto commitments. Review
          stages reflect the underlying research; some source and outcome checks
          remain incomplete.
        </p>
      </header>
      <div className="notice">
        No government-wide delivery percentage is computed. Announcing a scheme
        does not establish its outcomes, and incomplete evidence is not a failed
        promise.
      </div>
      <section className="panel">
        <div className="filter-bar">
          <label>
            Search promises
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, finding or ID"
            />
          </label>
          <label>
            Policy area
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All policy areas</option>
              {[...new Set(research.promises.map((p) => p.category))].map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </select>
          </label>
          <label>
            Research stage
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="all">All stages</option>
              {[...new Set(research.promises.map((p) => p.research_stage))].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </label>
        </div>
        <p role="status">{rows.length} records match</p>
        {rows.length === 0 && (
          <p className="empty">No promises match these filters.</p>
        )}
        {rows.map((p) => (
          <details className="promise-record" key={p.id}>
            <summary>
              <span>
                <small>
                  {p.id} · {p.manifesto_year} · {p.category}
                </small>
                <strong>{p.title}</strong>
              </span>
              <span className="status-label">
                {p.research_stage.replaceAll("_", " ")}
              </span>
            </summary>
            <p>{p.finding || "Finding not yet recorded."}</p>
            <dl>
              <dt>Assessment in supplied register</dt>
              <dd>{p.assessment.replaceAll("_", " ")}</dd>
              <dt>Assessment rule</dt>
              <dd>{p.assessment_rule}</dd>
              <dt>Deadline</dt>
              <dd>{p.original_deadline || "Not specified"}</dd>
              <dt>Quote status</dt>
              <dd>{p.quote_status.replaceAll("_", " ")}</dd>
              <dt>Confidence / last reviewed</dt>
              <dd>
                {p.confidence} / {p.last_reviewed || "Not specified"}
              </dd>
            </dl>
            {p.scope_note && <p>{p.scope_note}</p>}
            <p className="chart-note">
              Evidence reference IDs: {p.evidence_ids || "Not yet linked"}.
              Exact wording and independent outcome verification may remain
              outstanding.
            </p>
            <a href={p.source_url} target="_blank" rel="noopener noreferrer">
              Original commitment source <ExternalArrow />
            </a>
          </details>
        ))}
      </section>
      <div className="tools">
        <a href={asset("data/promise_database.csv")} download>
          Download promise register CSV ↓
        </a>
        <a href={asset("research-archive.html?view=audit")}>
          Historical audit interface <ExternalArrow />
        </a>
      </div>
    </>
  );
}
