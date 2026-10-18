import { ExternalArrow } from "./ResearchIcon";
import { research } from "../lib/research";
export function IndependentEvidence({
  category,
  topic,
}: {
  category: string;
  topic?: string;
}) {
  const rows = research.independent.filter(
    (row) => row.category === category && (!topic || row.topic === topic),
  );
  if (!rows.length) return null;
  return (
    <details className="panel independent">
      <summary>
        Independent evidence & alternative interpretations{" "}
        <span className="badge">{rows.length}</span>
      </summary>
      <div className="evidence-grid">
        {rows.map((row) => (
          <article key={row.id}>
            <span className="section-label">{row.kind}</span>
            <h4>{row.title}</h4>
            <p>{row.finding}</p>
            <p>
              <strong>Relationship to official evidence:</strong> {row.official}
            </p>
            <p>{row.reconciliation}</p>
            <small>{row.status}</small>
            <p>
              <a href={row.url} target="_blank" rel="noopener noreferrer">
                {row.source} <ExternalArrow />
              </a>
            </p>
          </article>
        ))}
      </div>
    </details>
  );
}
