# Development and research updates

Use the existing checkout. Cloud tasks are isolated; do not create a Git worktree unless requested. Start a branch for each coherent update, preserve original evidence, and open a pull request describing sources, scope, limitations and test results.

## Where logic lives

- React pages and components render the interface. React escapes text from data; do not add raw HTML rendering for research text.
- `src/lib/comparisons.ts` owns calculations. It never assigns causality or a government-wide score.
- `src/types/research.ts` defines runtime schemas and TypeScript types. Build-time validation rejects duplicate observations, incompatible units, unresolved references, nonfinite values and indicators without data.
- `scripts/research.ts` reads authoritative records and maps them into that schema. `scripts/prepare-data.ts` produces the app bundle and downloadable exports from the same records.
- `content/methodology.json` holds editorial methodology. Indicator summaries remain reviewed editorial interpretations and must be reconsidered when observations change.

## Updating observations

1. Edit `data/observations/economy.csv`, `employment.csv` or `democracy.csv`. Preserve source-specific period labels and vintage. Never replace missing evidence with zero.
2. For Economy, `metric_id` links to `data/indicators.json`. Employment and Democracy retain the original CSV headers; their `indicator` title maps to the category's indicator definition. Titles must be unique within those categories until the input schema is deliberately upgraded.
3. Add definitions and source IDs in `data/indicators.json` and `data/sources.json` when introducing a new series. Keep incompatible series and statistical vintages separate. Add a subject in `data/topics.json` if needed.
4. Review the summary, method, confidence and measurement type. An estimate must not be relabelled an observed outcome. Do not automatically rewrite narrative conclusions from a numerical change.
5. Run `npm run prepare:data` while developing, or restart `npm run dev`. Generated charts, tables and JSON exports now share the updated observations.
6. Run `npm test` and `npm run build`. Review affected charts, source links and limitations on desktop and mobile.

The original-upload parity tests intentionally preserve the migration baseline. If a later evidence update legitimately supersedes a value, revise the relevant baseline assertion with a documented source and vintage; do not weaken general schema or calculation tests. Full historical uploads remain immutable.

## Promise and independent evidence updates

Edit `data/promises.csv` for the full manifesto register. `promise_database.csv` and `promises.csv` downloads are generated aliases. Review stage, quote status, finding, deadline and source remain explicit. Search and filters are derived from these records.

`data/economy-commitments.json` contains the prior dashboard's distinct provisional thematic notes. Those notes use different IDs and may be at a different review stage from the manifesto register. Do not silently combine their verdicts. `data/research/economic_promises_audit.csv` is a supplemental review snapshot with additional columns; update it deliberately if publishing a new audit edition.

Edit `data/independent-evidence.csv` for the expanded independent-evidence panels. Older independent-evidence datasets under `data/research/` are historical snapshots, not competing live chart inputs.

## Calculations and downloads

`annualWindows` requires all years, once each, in both 2004–2013 and 2014–2023 windows. Fiscal-year labels are never silently converted. Approved reference-point comparisons are labelled separately. Relative change is undefined when the initial value is zero. Peer comparisons remain unavailable without harmonised evidence.

`npm run research:recompute` regenerates exports using the same comparison code as the interface. Its GDP/inflation results match the supplied Python reference to four decimals. The old missing `recompute_v13.py` is not recreated or claimed to be reproduced.

## Interface and deployment

Use reusable React components in `src/components/`. Keep all site URLs relative to `import.meta.env.BASE_URL` through the `asset()` helper. Query-string routes preserve GitHub Pages direct links, selected subjects and indicators, and browser history. `economy-evidence.html` remains a supported entry page.

Run a production subpath check before changes to navigation or asset loading:

```sh
VITE_BASE_PATH=/India-Accountability/ npm run build
TEST_PRODUCTION=1 TEST_BASE_URL=http://127.0.0.1:4173/India-Accountability/ CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

The test runner starts its own server. Stop another process using port 4173 first. CI uses Playwright's Chromium; mobile tests emulate a viewport and touch, not a physical iPhone or Safari.

## Interactive UI

`ResearchSpotlight` previews each policy area's first published indicator using the canonical records. Empty categories must show a pending state rather than sample or invented values. The spotlight is labelled as a research snapshot, never a live feed.

`TrendChart` shares its selected observation across the crosshair, exact-value readout and labelled range input. Pointer/touch interaction and keyboard Home/End/arrow keys must produce the same source values. Keep the observation table and download available. Do not use movement or colour to imply causal attribution or a government rating.

Interaction styling lives in `src/styles/interactions.css`, loaded after the base styles. Honour `prefers-reduced-motion` for page transitions, chart drawing and automatic subject scrolling. Test both desktop and mobile behavior when changing these controls. The exhaustive all-indicator browser scenario has a larger time budget because it traverses all chart modes and their transitions.
