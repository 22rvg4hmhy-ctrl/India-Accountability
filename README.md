# India Accountability Monitor

A research dashboard for India's policy promises and outcomes, built with **React, TypeScript and Vite**, published on [GitHub Pages](https://22rvg4hmhy-ctrl.github.io/India-Accountability/).

Research lives outside the interface. Shared, validated inputs generate chart values, observation tables, research JSON and calculated comparison downloads. No database or paid service is needed.

## Project structure

```text
src/
  components/        Shared charts, source panels and observation tables
  pages/             Dashboard, policy categories, promise register, evidence, methods
  lib/               Calculation functions, research access and URL navigation
  types/             TypeScript types and runtime research schemas
  generated/         Generated research bundle (ignored; do not edit)
data/
  observations/      Authoritative Economy, Employment and Democracy CSV inputs
  indicators.json    Indicator definitions, units, sources and limitations
  sources.json       Stable source registry
  topics.json        Research subjects, including explicit research gaps
  categories.json    Five policy areas
  promises.csv       Full manifesto register
  economy-commitments.json  Separate, provisional thematic research notes
  independent-evidence.csv Independent findings and reconciliations
  research/          Supplemental audits and historical comparison datasets
content/             Editorial methodology content
scripts/             Data validation and export generation
tests/               Calculation, migration parity and browser tests
public/              Favicon, historical audit; generated data downloads (ignored)
archive/             Unchanged original uploads and previous site release
```

## Development

Use Node.js 22.12+ and Python 3.12+. Node 24 is also supported. No application credentials are required.

```sh
npm ci
npx playwright install chromium
npm run dev
```

The server uses port 4173. `npm run dev` validates and prepares research data before starting Vite. After editing canonical data, restart the dev server or run `npm run prepare:data` to regenerate the bundle and downloads. React component edits use Vite's hot reload.

```sh
npm run validate      # Original upload checksums, CSV structure, schema and TypeScript
npm run test:unit     # Migration parity, comparison accuracy and invalid-data checks
npm test              # Validation, unit tests and desktop/mobile browser tests
npm run build         # Validated production website in dist/
npm run preview       # Serve the production build on port 4173
```

If the environment provides Chromium, run tests with `CHROMIUM_PATH=/usr/bin/chromium npm test` instead of downloading another browser.

## Deployment

One workflow, `.github/workflows/pages.yml`, validates and tests pull requests, then builds and deploys successful `main` updates to Pages. Pages must use **GitHub Actions** as its source. The production build uses `VITE_BASE_PATH=/India-Accountability/`; assets and navigation support that project subpath. No custom domain is configured.

The earlier, competing Jekyll workflow has been retired to `docs/retired-jekyll-workflow.yml`. Historical research reports and old HTML are preserved but are not the application source. Archive files are excluded from GitHub's source-language statistics.

## Updating research

See [the development guide](docs/DEVELOPMENT.md) and [migration notes](docs/MIGRATION_V3.md). Update canonical records, run checks, review a pull request, then merge. Never edit `src/generated/`, `public/data/` or `dist/` directly.

The software validates structure and reproducibility. It does not independently establish the truth, currency or causal interpretation of supplied research. No overall government rating is calculated from this selected sample.

No license was supplied. This migration does not grant a new license to code, research or third-party material.
