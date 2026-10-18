# React / TypeScript migration

## Scope

The v2.1 website has been replaced with React pages and reusable components, compiled by Vite. The five policy areas, six Economy subjects, six Employment subjects and six Democracy subjects are retained. Education and Digital retain their explicit review-pending state and historical research links. The current promise register is searchable and filterable across all 82 records.

The data pipeline preserves 44 indicators and 251 observations, including all 39 Economy indicators and 226 Economy observations. The coverage file's 37-indicator taxonomy remains a separate research-planning artifact; it is not treated as a count of verified time series. The supplied research snapshot date remains 2026-10-18.

All 28 original uploads retain their checksums. `archive/releases/v2.1/` preserves the previous production source. Its scripts are historical artifacts, not current setup commands. The live historical audit is `public/research-archive.html`; it remains standalone legacy HTML. GitHub language statistics exclude historical archives, without affecting their contents.

## Single authoritative inputs

Economy chart observations exactly matched the supplied extended observation CSV and now come from it. Employment and Democracy charts come from their supplied CSVs, with metadata extracted from the old embedded definitions. Source URLs and uncertainty text are preserved. Metadata and observations are joined through stable indicator IDs in the application bundle.

Generated bundles and downloads are ignored by Git and reconstructed before startup/build. Observation CSV downloads are copied from authoritative inputs. Research JSON and calculated comparison exports are generated. The per-indicator CSV is generated directly from the same observation records as its chart/table. The current evidence explorer uses the same reusable indicator component rather than a second embedded numeric dataset.

Some supplemental research CSVs represent historical audits or different vintages and remain separate downloads. Existing prose summaries and thematic promise notes are not automatically reinterpreted when a numeric input changes. They require editorial review. The migration does not claim to reconcile inconsistent prior review stages or independently verify factual claims.

## Verification

Unit checks compare every migrated chart value and period to the prior site, preserve caveats and source definitions, compare the full promise register and expanded independent evidence, and reproduce the original descriptive GDP/inflation calculations. Invalid-data tests reject broken source links, duplicate periods, incompatible units and missing observation series.

Browser checks cover all policy pages, every subject, every published indicator, chart controls, observation tables, actual CSV downloads, search/filter behavior, URL history, responsive overflow and local resource links on desktop and mobile. A production build is also exercised at the real GitHub Pages project subpath.

## Deployment

The Pages workflow validates, tests, builds and publishes only Vite's `dist/`. The competing Jekyll workflow is retired so it cannot replace the React deployment. GitHub Pages hosting remains unchanged.
