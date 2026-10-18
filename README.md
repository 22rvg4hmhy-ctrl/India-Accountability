# India Accountability Monitor

A static, source-linked dashboard examining policy promises and outcomes in India. This repository migrates the supplied v2.1 dashboard and research collection into a versioned website project. It retains the existing design, caveats, category drilldowns and historical audit interface.

## Project structure

- `site/`: public website; `index.html` is the current dashboard.
- `site/assets/`: stylesheet and JavaScript source files.
- `site/data/`: downloadable CSVs and JSON research exports.
- `scripts/`: validation, static build and economic comparison calculation.
- `tests/`: desktop and mobile browser checks.
- `docs/research/`: supplied research reports and previous documentation.
- `archive/uploads/`: all 28 original files, unchanged; `archive/manifest.json` records their checksums.
- `.github/workflows/pages.yml`: checks pull requests and deploys successful main-branch updates to GitHub Pages.

## Development

Use Node.js 22+ and Python 3.12+. No database, paid service, application secret or production server is required.

```sh
npm ci
npx playwright install chromium
npm run dev
```

The development server uses port 4173. Run `npm test` for research format validation and desktop/mobile browser checks. Run `npm run build` to generate `dist/`, the deployable website. If Chromium is provided by the environment, set `CHROMIUM_PATH` to its executable path when running tests.

## Deployment

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Enable Actions if the repository's policy requires it. Push to `main` or run **Validate and deploy website** manually. The workflow validates, tests and deploys only `dist/`.

The expected GitHub Pages address is `https://22rvg4hmhy-ctrl.github.io/India-Accountability/`; it is live only after Pages is enabled and the deployment succeeds. The website uses relative asset and download paths so it works under this project subpath. No custom domain is configured.

## Research integrity and updates

See [the update workflow](docs/DEVELOPMENT.md). Original datasets and their uncertainty labels are preserved. Structural validation does not verify the truth, currency or interpretation of the underlying claims. Historical HTML snapshots can contain older conclusions; the current dashboard is `site/index.html`.

No license was supplied. This migration does not grant a new license to the code, research or third-party source material.
