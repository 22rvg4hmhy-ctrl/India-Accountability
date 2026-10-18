import { ExternalArrow } from "../components/ResearchIcon";
import principles from "../../content/methodology.json";
import { asset, research } from "../lib/research";
export function Methods() {
  return (
    <>
      <header className="page-heading">
        <span className="eyebrow">Research transparency</span>
        <h1>How we evaluate evidence.</h1>
        <p>
          Traceable sources, explicit uncertainty and comparisons that respect
          statistical definitions.
        </p>
      </header>
      <div className="notice">
        This is a selected research collection, reviewed as of{" "}
        {research.metadata.asOf}. Source-specific limitations and incomplete
        review stages remain explicit. Descriptive findings do not establish
        causal responsibility.
      </div>
      <div className="principles">
        {principles.map((p, i) => (
          <article className="panel" key={p.title}>
            <span className="card-number">0{i + 1}</span>
            <h2>{p.title}</h2>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
      <section className="panel">
        <h2>What the comparisons mean</h2>
        <p>
          Annual-window comparisons require all ten calendar observations for
          2004–2013 and all ten for 2014–2023. A missing or duplicate year
          prevents a comparison. Other eligible indicators use explicitly
          labelled reference points. Budget projections remain estimates; index
          scores remain assessments.
        </p>
        <p>
          Peer comparisons remain unavailable until the selected indicator has
          harmonised international observations. We do not invent missing
          values.
        </p>
        <div className="tools">
          <a href={asset("data/research.json")} download>
            Complete research JSON ↓
          </a>
          <a href={asset("data/comparison_protocols.csv")} download>
            Comparison protocols CSV ↓
          </a>
          <a href={asset("data/verified_comparisons_v13.csv")} download>
            Historical comparison inputs CSV ↓
          </a>
          <a href="https://github.com/22rvg4hmhy-ctrl/India-Accountability/tree/main/src/lib">
            Calculation code <ExternalArrow />
          </a>
        </div>
      </section>
    </>
  );
}
