import { ResearchIcon } from "../components/ResearchIcon";
import { ExternalArrow } from "../components/ResearchIcon";
import { research, asset } from "../lib/research";
import { AppLink } from "../lib/navigation";
export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="eyebrow">Independent research · India · 2014–2026</div>
        <h1>
          Promises.
          <br />
          Performance. <em>Evidence.</em>
        </h1>
        <p>
          Explore what was promised, what changed, and what the available
          evidence can actually tell us.
        </p>
      </section>
      <section className="research-banner">
        <div>
          <span className="section-label">
            Accountability begins with context
          </span>
          <h2>
            Follow the evidence.
            <br />
            Keep the caveats.
          </h2>
          <p>
            Selected, source-linked research. No government-wide rating is
            inferred from an incomplete sample.
          </p>
        </div>
        <div className="banner-stats">
          <div>
            <strong>{research.promises.length}</strong>
            <span>Catalogued promises</span>
          </div>
          <div>
            <strong>{research.indicators.length}</strong>
            <span>Indicators with observations</span>
          </div>
          <AppLink href={asset("?view=methods")}>
            Read our methodology <ExternalArrow />
          </AppLink>
        </div>
      </section>
      <div className="section-heading">
        <div>
          <span className="eyebrow">The research desk</span>
          <h2>Explore five policy areas</h2>
        </div>
        <span className="muted">Evidence coverage varies by category</span>
      </div>
      <section className="category-grid" aria-label="Policy areas">
        {research.categories.map((category, i) => (
          <AppLink
            key={category.id}
            href={asset(`?view=${category.id}`)}
            className="category-card"
          >
            <span className="card-number">
              0{i + 1} / {category.status}
            </span>
            <span className="category-icon">
              <ResearchIcon category={category.id} />
            </span>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <span className="card-action">
              Explore the evidence <ExternalArrow />
            </span>
          </AppLink>
        ))}
      </section>
      <p className="scope-note">
        Research snapshot: {research.metadata.asOf}. Coverage and verification
        vary by indicator; read source limitations before drawing conclusions.
      </p>
    </div>
  );
}
