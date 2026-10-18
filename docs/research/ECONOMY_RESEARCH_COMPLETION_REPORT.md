# Economy & Inflation: research completion report — 18 October 2026

**Status: major dataset expansion completed; comprehensive verification NOT complete.** This release intentionally makes the remaining gaps explicit and keeps the UI architecture unchanged.

## Requested interface change
- Removed duplicate `Before / after` tab. Retained **Trend**, **Pre-2014 context**, **Peers**.
- Pre-2014 context uses equal 10-year windows 2004–2013 versus 2014–2023 for annual real GDP growth, annual CPI inflation, and available real per-capita GDP; other series use specifically labelled historical reference points, or show an honest missing-baseline explanation.
- No aggregate government rating was computed. The existing five-category and six-Economy-subcategory navigation and original home layout were preserved.
- A long time series shows fewer year-axis labels while all point values remain available in SVG tooltips.

## Dataset delivered
- **37** indicator definitions in the original research taxonomy.
- **39** selectable economic measurement series including explanatory/derived snapshots; **226** stored observations across all 6 Economy subcategories.
- **28 of 37** definitions have at least one associated published observation or explicitly derived series; this is NOT the same as full time-series completeness.
- **16** definitions include at least one earlier observation labelled eligible for a pre-2014 reference in the coverage register.
- **12** definitions have post-2014 or snapshot data only; a true pre-2014 comparison must not be invented.
- **9** definitions still have no verified matching dataset.
- Expanded independent-source reconciliation records for all six Economy subcategories. Independent analysis and government-origin data are clearly distinguished by source.

## Reproducible headline historical comparisons
Using World Bank WDI annual series published Oct 8 2026, unweighted arithmetic mean of rates (not causal evaluation):
- Real GDP growth 2004–2013 average **6.8098%**, 2014–2023 **5.9513%** (difference **−0.8585 percentage points**).
- CPI inflation 2004–2013 average **7.9812%**, 2014–2023 **5.1620%** (difference **−2.8192 percentage points**).
- The COVID contraction and rebound have an outsized influence on simple averages; more robust causal analysis is not implied.
- World Bank WDI calendar-year annual growth is deliberately separate from 2026 MoSPI FY 2022–23-base GDP estimates.

## Major research sources and caveats
- World Bank WDI API: annual GDP growth and CPI inflation, 2004–2025; independently reproducible using `economy_recompute.py`.
- UNdata mirror of WDI: constant-2021 PPP GDP per capita 2004–2024 (UNdata February 2026 vintage).
- RBI annual reports: central fiscal deficit/debt, household net financial savings and financial-liability flows. Some newer periods are revised estimates.
- IMF 2025 Article IV: investment, savings, general-government deficit and debt. General-government and Union-only series must never be merged.
- World Bank April 2026 India Development Update: revised 2011–12 to 2023–24 poverty estimates; these are HCES-harmonised model estimates, not undisputed household measurements.
- World Inequality Lab / 2026 World Bank Economic Review: estimates of top 1% income and wealth shares. They cannot be equated with consumption Gini or poverty.
- Ministry of Commerce and DPIIT: merchandise trade and gross FDI, US$ current-dollar not real, net or attributable to a specific policy.
- MoSPI manufacturing: revised sector GVA shares and recent real growth, but not yet the 2014 comparable revised-back series.

## Nine unverified matching indicator definitions
- **EC-GROWTH-04 — Gross fixed capital formation**
- **EC-GROWTH-05 — Private final consumption growth**
- **EC-GROWTH-06 — Sectoral GVA share**
- **EC-PRICES-05 — Essential item prices**
- **EC-PRICES-06 — Real purchasing-power proxy**
- **EC-HOUSEHOLD-03 — Consumption distribution by fractile**
- **EC-POVERTY-06 — Bottom-quintile consumption share**
- **EC-MANUFACTURE-04 — Net FDI flows**
- **EC-MANUFACTURE-07 — Industrial production index**

## Promises — not complete
This release preserves the existing manifesto tracking without claiming a comprehensive clause-by-clause review. The 22 economic-related promises in the selected register remain **provisional**; most require exact original wording and fully independently corroborated outcome documentation. Policy enactment alone is not proof of promised impact. The government-wide numeric promise-delivery rating remains withheld.

## Technical validation
- Embedded JavaScript was extracted and passed `node --check`.
- Source IDs, series IDs and data rows were checked for duplicate/missing IDs.
- Offline standalone HTML and complete ZIP are provided.
- End-to-end rendered-browser automated testing could not finish in this runtime. Manual Mac Safari/Chrome and iPhone browser navigation check is **outstanding**, and therefore no mobile-browser QA pass is claimed.

## How to run
Unzip and double-click `index.html`. Open Economy & Inflation and one of the six tiles; use **Pre-2014 context**. All the source files and computation script stay in the same directory. Run `python3 economy_recompute.py` to reproduce the two decade-average calculations from CSV. Internet is needed only for external publication links, not for the core visualisation.
