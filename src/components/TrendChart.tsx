import type { Observation } from "../types/research";
import { formatValue } from "../lib/comparisons";
export function TrendChart({
  rows,
  title,
  unit,
}: {
  rows: Observation[];
  title: string;
  unit: string;
}) {
  if (!rows.length)
    return <p className="empty">No verified observations are available.</p>;
  const width = 760,
    height = 280,
    left = 66,
    right = 24,
    top = 25,
    bottom = 55;
  const values = rows.map((r) => r.value),
    min = Math.min(...values),
    max = Math.max(...values);
  const spread = Math.max(max - min, Math.abs(max) * 0.1, 1),
    lo = min - spread * 0.15,
    hi = max + spread * 0.15;
  const x = (i: number) =>
    left + ((width - left - right) * i) / Math.max(1, rows.length - 1);
  const y = (v: number) =>
    top + ((height - top - bottom) * (hi - v)) / (hi - lo);
  return (
    <svg
      className="trend-chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${title}, ${unit}. Exact values available in the observation table.`}
    >
      <title>{title}</title>
      <desc>
        Chronological observations. Point spacing follows record order, not
        elapsed time; the vertical scale is fitted to the data.
      </desc>
      {[0, 1, 2, 3].map((i) => {
        const v = lo + ((hi - lo) * i) / 3;
        return (
          <g key={i}>
            <line
              x1={left}
              x2={width - right}
              y1={y(v)}
              y2={y(v)}
              stroke="#e7e0df"
              strokeDasharray="4 5"
            />
            <text
              x={left - 10}
              y={y(v) + 4}
              textAnchor="end"
              className="axis-label"
            >
              {formatValue(v, Math.abs(v) < 10 ? 1 : 0)}
            </text>
          </g>
        );
      })}
      <polyline
        points={rows.map((r, i) => `${x(i)},${y(r.value)}`).join(" ")}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {rows.map((r, i) => (
        <g key={r.period}>
          <circle cx={x(i)} cy={y(r.value)} r="4" fill="var(--accent)">
            <title>
              {r.period}: {formatValue(r.value)} {unit}
            </title>
          </circle>
          {(rows.length <= 6 ||
            i === 0 ||
            i === rows.length - 1 ||
            i % Math.ceil(rows.length / 5) === 0) && (
            <text
              x={x(i)}
              y={height - 20}
              textAnchor="middle"
              className="axis-label"
            >
              {r.period}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
