import { ExternalArrow } from "./ResearchIcon";
import { sourceById } from "../lib/research";
export function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <div className="source-links">
      {ids.map((id) => {
        const source = sourceById.get(id);
        return source ? (
          <a
            key={id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.name} <ExternalArrow />
            {source.type && <small>{source.type}</small>}
          </a>
        ) : null;
      })}
    </div>
  );
}
