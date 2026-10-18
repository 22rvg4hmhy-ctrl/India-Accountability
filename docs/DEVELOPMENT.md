# Updating the website

Create a branch for each coherent update and open a pull request. Describe the change, source evidence, limitations and test results. Merge after reviewing the desktop and mobile behavior. Successful changes on main deploy through GitHub Actions.

## Research changes

1. Identify the relevant CSV or JSON in `site/data/`. Preserve source URLs, units, dates, statistical vintage and uncertainty. Keep observed outcomes separate from attribution and promise assessments.
2. Update the related rendering data in `site/assets/js/index-1.js` (dashboard, economy, employment and democracy) or `index-2.js` (independent evidence), and the detailed economy explorer when affected. The inherited dashboard uses embedded research snapshots; changing a CSV alone does not change its charts. A future data-pipeline change should make these share one canonical schema with explicit parity tests.
3. Keep `promises.csv` and `promise_database.csv` synchronized; these were identical in the uploads. Preserve comparison vintages as separate datasets rather than silently replacing them.
4. `npm run research:recompute` regenerates `site/data/economy_derived_comparisons.json` from annual observations. This implements only the supplied descriptive GDP/inflation calculation, not the missing legacy `recompute_v13.py` previously linked by the dashboard. Do not treat it as reproducing other comparison tables.
5. Run `npm test` and `npm run build`. Check affected source links and charts manually. Document gaps; unknown evidence must not become a failed promise or an invented value.

## Interface changes

Edit HTML in `site/`, CSS in `site/assets/css/`, and JavaScript in `site/assets/js/`. Keep relative paths for GitHub Pages. Check five policy categories, subcategory drilldowns, chart controls, source links, downloadable data, evidence explorer and audit archive. Keep the original uploaded files untouched.

## Migration notes

The current uploaded index is the v2.1 edition described by the supplied README, although its inherited document title said v2.0. Its CSS and three ordered classic scripts were extracted without introducing a framework or runtime dependencies. The original v1.8 interface supplies the missing `research-archive.html` route. Employment and democracy JSON downloads are exports of the existing embedded data. The missing historical calculation download was removed with an explanatory note; no absent research was fabricated. The browser history callback was corrected to render the URL's selected view.

The initial browser suite checks Chromium desktop and mobile viewports, not physical iPhones or Safari. Original research reports are contextual documentation, not independent verification of their claims.
