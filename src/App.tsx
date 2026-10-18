import { ExternalArrow } from "./components/ResearchIcon";
import { useEffect } from "react";
import { research, asset } from "./lib/research";
import { AppLink, useLocation } from "./lib/navigation";
import { Home } from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import { Audit } from "./pages/Audit";
import { Methods } from "./pages/Methods";
import { Evidence } from "./pages/Evidence";
export function App() {
  const location = useLocation(),
    params = new URLSearchParams(
      location.includes("?") ? location.slice(location.indexOf("?")) : "",
    );
  const view = location.split("?")[0].endsWith("economy-evidence.html")
    ? "evidence"
    : params.get("view") || "home";
  const category = research.categories.find((c) => c.id === view);
  useEffect(() => {
    document.title = `${category?.name || (view === "audit" ? "Promise Register" : view === "methods" ? "Methodology" : view === "evidence" ? "Economy Evidence" : "Dashboard")} — India Accountability Monitor`;
    window.scrollTo({ top: 0 });
  }, [view, category?.name]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <AppLink className="brand" href={asset("?view=home")}>
            <span className="brand-mark" aria-hidden="true">
              IA<span>•</span>
            </span>
            <span>
              <strong>India Accountability Monitor</strong>
              <small>PROMISES · PERFORMANCE · EVIDENCE</small>
            </span>
          </AppLink>
          <div className="nav-links">
            {[
              ["home", "Dashboard"],
              ["economy", "Economy"],
              ["audit", "Promises"],
              ["methods", "Methods"],
            ].map(([id, title]) => (
              <AppLink
                key={id}
                href={asset(`?view=${id}`)}
                aria-current={view === id ? "page" : undefined}
              >
                {title}
              </AppLink>
            ))}
          </div>
        </nav>
      </header>
      <main id="main" className="shell">
        {view === "home" ? (
          <Home />
        ) : category ? (
          <CategoryPage key={category.id} category={category} params={params} />
        ) : view === "audit" ? (
          <Audit />
        ) : view === "methods" ? (
          <Methods />
        ) : view === "evidence" ? (
          <Evidence />
        ) : (
          <section className="page-heading">
            <h1>Page not found</h1>
            <AppLink href={asset("?view=home")}>Return to dashboard</AppLink>
          </section>
        )}
      </main>
      <footer className="site-footer">
        <div>
          <strong>India Accountability Monitor</strong>
          <p>Evidence before verdicts. Sources before certainty.</p>
        </div>
        <div>
          <span>Research snapshot · {research.metadata.asOf}</span>
          <a href="https://github.com/22rvg4hmhy-ctrl/India-Accountability">
            Research & source code <ExternalArrow />
          </a>
        </div>
      </footer>
    </>
  );
}
