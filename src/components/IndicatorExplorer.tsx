import { useState } from "react";
import type { Indicator } from "../types/research";
import { observationsFor, sourceById } from "../lib/research";
import {
  compareEndpoints,
  historicalContext,
  formatValue,
} from "../lib/comparisons";
import { SourceLinks } from "./SourceLinks";
import { TrendChart } from "./TrendChart";
export function IndicatorExplorer({ indicator }: { indicator: Indicator }) {
  const [tab, setTab] = useState("trend");
  const rows = observationsFor(indicator.id),
    endpoints = compareEndpoints(rows),
    context = historicalContext(indicator, rows);
  const signed = (value: number) =>
    `${value > 0 ? "+" : ""}${formatValue(value, 2)}`;
  return (
    <section
      className="panel indicator-explorer"
      aria-label="Indicator explorer"
    >
      <div className="section-label">{indicator.type}</div>
      <h3>{indicator.title}</h3>
      <p className="muted">{indicator.unit}</p>
      {indicator.category === "economy" && (
        <div className="chart-tabs" role="group" aria-label="Chart view">
          {[
            ["trend", "Trend"],
            ["before", "Pre-2014 context"],
            ["peers", "Peers"],
          ].map(([id, name]) => (
            <button
              key={id}
              aria-pressed={tab === id}
              onClick={() => setTab(id)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      <div className="chart-area">
        {tab === "trend" && (
          <>
            <TrendChart
              rows={rows}
              title={indicator.title}
              unit={indicator.unit}
            />
            {endpoints && (
              <p className="chart-note">
                {endpoints.first.period}:{" "}
                <b>{formatValue(endpoints.first.value)}</b> →{" "}
                {endpoints.last.period}:{" "}
                <b>{formatValue(endpoints.last.value)}</b>. Difference:{" "}
                {signed(endpoints.difference)} {indicator.unit}. Earlier and
                later observations do not establish causation.
              </p>
            )}
          </>
        )}
        {tab === "before" &&
          (context ? (
            <>
              {context.kind === "annual" ? (
                <>
                  <div className="comparison">
                    <div>
                      <small>2004–2013 average</small>
                      <strong>{formatValue(context.before, 2)}</strong>
                    </div>
                    <span>→</span>
                    <div>
                      <small>2014–2023 average</small>
                      <strong>{formatValue(context.after, 2)}</strong>
                    </div>
                  </div>
                  <p>
                    Difference: {signed(context.difference)}{" "}
                    {indicator.unit.includes("%")
                      ? "percentage points"
                      : indicator.unit}
                    . Equal ten-year calendar windows; descriptive averages, not
                    a causal evaluation. Includes global shocks and the COVID-19
                    period.
                  </p>
                </>
              ) : (
                <>
                  <div className="comparison">
                    <div>
                      <small>{context.first.period}</small>
                      <strong>{formatValue(context.first.value)}</strong>
                    </div>
                    <span>→</span>
                    <div>
                      <small>{context.last.period}</small>
                      <strong>{formatValue(context.last.value)}</strong>
                    </div>
                  </div>
                  <p>
                    Difference: {signed(context.difference)} {indicator.unit}. A
                    reference-point comparison, not matched period averages.
                    Survey, scope and vintage warnings still apply.
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="empty">
              No defensible matching pre-2014 comparison is available for this
              indicator. No historical values have been fabricated.
            </p>
          ))}
        {tab === "peers" && (
          <p className="empty">
            International peer observations have not yet been harmonised for
            this selected indicator. No comparison is published.
          </p>
        )}
      </div>
      <h4>What the evidence shows</h4>
      <p>{indicator.summary}</p>
      <details className="method-details">
        <summary>Methodology & sources</summary>
        <p>{indicator.method}</p>
        <p>
          <strong>Evidence confidence:</strong> {indicator.confidence}
        </p>
        <SourceLinks ids={indicator.sources} />
      </details>
      <details className="observation-details">
        <summary>View observations & download data ({rows.length})</summary>
        <p className="chart-note">
          Chart and table use these same records. Publication labels are
          preserved; fiscal years and edition dates are not converted to
          calendar years.
        </p>
        <div className="table-scroll">
          <table>
            <caption>
              {indicator.title} · {indicator.unit}
            </caption>
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col">Value</th>
                <th scope="col">Research vintage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.period}>
                  <th scope="row">{row.period}</th>
                  <td>{formatValue(row.value)}</td>
                  <td>{row.vintage || "Not specified in supplied dataset"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="text-button"
          onClick={() => {
            const csv = [
              "period,value,unit,measurement_type,research_vintage,source_ids,source_urls",
              ...rows.map((r) =>
                [
                  r.period,
                  r.value,
                  r.unit,
                  indicator.type,
                  r.vintage || "",
                  r.sourceIds.join(";"),
                  r.sourceIds
                    .map((id) => sourceById.get(id)?.url || "")
                    .join(";"),
                ]
                  .map((v) => `"${String(v).replaceAll('"', '""')}"`)
                  .join(","),
              ),
            ].join("\n");
            const url = URL.createObjectURL(
              new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
            );
            const a = document.createElement("a");
            a.href = url;
            a.download = `${indicator.id}.csv`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          Download these observations CSV ↓
        </button>
      </details>
    </section>
  );
}
