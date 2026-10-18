import { useId, useState, type PointerEvent } from "react";
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
  const id = useId();
  const [selected, setSelected] = useState(rows.length - 1);
  if (!rows.length)
    return <p className="empty">No verified observations are available.</p>;
  const index = Math.max(0, Math.min(selected, rows.length - 1));
  const current = rows[index];
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
  const points = rows.map((r, i) => `${x(i)},${y(r.value)}`).join(" ");
  const pickPoint = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width) * width;
    setSelected(
      Math.max(
        0,
        Math.min(
          rows.length - 1,
          Math.round(
            ((position - left) / (width - left - right)) * (rows.length - 1),
          ),
        ),
      ),
    );
  };
  return (
    <div className="interactive-chart">
      <div className="chart-readout">
        <div>
          <span className="section-label">{current.period}</span>
          <strong>
            {formatValue(current.value)} <small>{unit}</small>
          </strong>
        </div>
        <span className="chart-hint">
          Hover, tap or use the slider to explore
        </span>
      </div>
      <svg
        className="trend-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${title}, ${unit}. Exact values available in the observation table.`}
        onPointerMove={pickPoint}
        onPointerDown={pickPoint}
      >
        <title>{title}</title>
        <desc>
          Chronological observations. Point spacing follows record order, not
          elapsed time; the vertical scale is fitted to the data. Use the
          labelled slider below to explore exact values with a keyboard.
        </desc>
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".18" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => {
          const value = lo + ((hi - lo) * i) / 3;
          return (
            <g key={i}>
              <line
                x1={left}
                x2={width - right}
                y1={y(value)}
                y2={y(value)}
                stroke="#e7e0df"
                strokeDasharray="4 5"
              />
              <text
                x={left - 10}
                y={y(value) + 4}
                textAnchor="end"
                className="axis-label"
              >
                {formatValue(value, Math.abs(value) < 10 ? 1 : 0)}
              </text>
            </g>
          );
        })}
        {rows.length > 1 && (
          <polygon
            points={`${left},${height - bottom} ${points} ${x(rows.length - 1)},${height - bottom}`}
            fill={`url(#${id}-fill)`}
          />
        )}
        <polyline
          className="chart-line"
          pathLength="1"
          points={points}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line
          className="chart-crosshair"
          x1={x(index)}
          x2={x(index)}
          y1={top}
          y2={height - bottom}
          stroke="var(--accent)"
          strokeDasharray="3 5"
          opacity=".4"
        />
        {rows.map((r, i) => (
          <g key={r.period}>
            <circle
              cx={x(i)}
              cy={y(r.value)}
              r={i === index ? 6 : 3}
              fill="var(--accent)"
            >
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
        <circle
          cx={x(index)}
          cy={y(current.value)}
          r="11"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity=".25"
        />
      </svg>
      <div className="chart-scrubber">
        <label htmlFor={`${id}-slider`}>Explore observations</label>
        <input
          id={`${id}-slider`}
          type="range"
          min="0"
          max={rows.length - 1}
          step="1"
          value={index}
          onChange={(e) => setSelected(Number(e.target.value))}
          aria-valuetext={`${current.period}: ${formatValue(current.value)} ${unit}`}
          disabled={rows.length === 1}
        />
        <span>
          {index + 1} / {rows.length}
        </span>
      </div>
    </div>
  );
}
