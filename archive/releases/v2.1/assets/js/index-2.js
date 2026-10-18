const independentEvidence = [
  {
    id: "IND-ECO-01",
    category: "economy",
    topic: "poverty",
    title: "Income and wealth concentration, 2022–23",
    source: "World Inequality Lab",
    kind: "Independent academic estimation",
    url: "https://wid.world/wp-content/uploads/2024/03/WorldInequalityLab_WP2024_09_Income-and-Wealth-Inequality-in-India-1922-2023_Final.pdf",
    finding:
      "Estimates the top 1% received 22.6% of national income and held 40.1% of wealth in 2022–23.",
    official:
      "Consumption-based poverty estimates and distributional measures are not the same quantities as pre-tax income or wealth shares.",
    reconciliation:
      "Both a fall in measured consumption poverty and high income/wealth concentration can coexist. Compare definitions, reference years and modelling assumptions; do not subtract one measure from another.",
    status: "Supplementary evidence; no causal finding",
  },
  {
    id: "IND-EMP-01",
    category: "employment",
    topic: "unemployment",
    title: "Improving headline labour indicators versus quality of employment",
    source: "ILO and Institute for Human Development",
    kind: "Independent interpretation of official survey microdata",
    url: "https://researchrepository.ilo.org/esploro/outputs/report/India-employment-report-2024-youth-employment/995360092402676",
    finding:
      "2024 employment report characterises recent improvements in labour indicators as paradoxical, emphasising the quality and structure of available jobs.",
    official:
      "PLFS unemployment and labour participation rates describe specific survey definitions, not adequate pay or job security.",
    reconciliation:
      "PLFS headline improvement is not disproved by the ILO/IHD report: the report uses official labour surveys but raises distinct quality and youth-employment concerns. Not statistically independent primary collection.",
    status: "Corroboration plus qualification",
  },
  {
    id: "IND-EMP-02",
    category: "employment",
    topic: "youth",
    title: "Youth employment and skills mismatch",
    source: "ILO and Institute for Human Development",
    kind: "Independent expert research using official microdata",
    url: "https://www.ihdindia.org/research/growth-and-employment/india-employment-report-2024-jobs-education-and-skills-for-the-youth/",
    finding:
      "Investigates educated youth labour-market outcomes and skills mismatch over two decades.",
    official:
      "Aggregate unemployment rates can mask age and educational differences.",
    reconciliation:
      "Compare youth-specific and education-specific denominators rather than projecting all-age unemployment results onto young graduates.",
    status: "Methodological qualification",
  },
  {
    id: "IND-DEM-01",
    category: "democracy",
    topic: "internet",
    title: "Internet shutdowns: 2023 versus 2024",
    source: "Access Now / #KeepItOn",
    kind: "Independent civil society event monitoring",
    url: "https://www.accessnow.org/internet-shutdowns-2024/",
    finding:
      "Documented at least 116 shutdowns in India in 2023 and 84 in 2024.",
    official:
      "An event-monitoring count is not identical to the number of formal government orders. Attribution to Union versus state authorities must be recorded separately.",
    reconciliation:
      "The independently recorded count decreased between the two years, but remained substantial. It alone cannot measure all civil liberties or the motives of each order.",
    status: "Documented trend within source methodology",
  },
  {
    id: "IND-DEM-02",
    category: "democracy",
    topic: "political",
    title: "Electoral bonds: judicial finding",
    source: "Supreme Court of India",
    kind: "Judicial primary record (not independent statistical study)",
    url: "https://www.webapi.sci.gov.in/supremecourt/2024/10382/10382_2024_1_301_51365_Judgement_11-Mar-2024.pdf",
    finding:
      "Supreme Court order records the February 2024 holding that electoral-bond nondisclosure violated citizens’ right to information and the unlimited corporate donation amendment was arbitrary.",
    official:
      "The scheme was enacted as a policy mechanism; implementation itself did not establish constitutional compliance.",
    reconciliation:
      "A court holding establishes a specific legal conclusion, not a quantitative measure of the overall health of democracy or proof of individual corrupt conduct.",
    status: "Documented judicial decision",
  },
  {
    id: "IND-DEM-03",
    category: "democracy",
    topic: "finance",
    title: "Political finance and electoral-bond transparency",
    source: "Supreme Court of India",
    kind: "Judicial primary record",
    url: "https://www.webapi.sci.gov.in/supremecourt/2024/10382/10382_2024_1_301_51365_Judgement_11-Mar-2024.pdf",
    finding:
      "The Court ordered disclosure of electoral-bond purchasing and redemption data after the February 2024 judgment.",
    official:
      "Claims that electoral bonds improved transparency must distinguish anonymous issuance from eventual court-ordered disclosures.",
    reconciliation:
      "Records establish a constitutional transparency failure under the judgment; they do not alone determine motives of donors or recipients.",
    status: "Documented judicial decision",
  },
  {
    id: "IND-ECO-GROWTH",
    category: "economy",
    topic: "growth",
    title: "Growth and GDP revision: independent World Bank review",
    source: "World Bank",
    kind: "Independent multilateral analysis",
    url: "https://www.worldbank.org/en/news/press-release/2026/04/09/india-remains-among-the-fastest-growing-economies",
    finding:
      "The 2026 update highlights macro resilience and warns that revised GDP measures alter estimated nominal levels and informal-economy coverage.",
    official:
      "Official MoSPI revised GDP series begins 2022–23; official and WDI vintages should not be spliced in one chart.",
    reconciliation:
      "A strong observed growth rate and uncertainty about estimates can coexist. Separate the GDP concept, vintage, time base and publication revisions.",
    status: "Independent contextual evidence; not automatic promise verdict",
  },
  {
    id: "IND-ECO-PRICES",
    category: "economy",
    topic: "prices",
    title: "Inflation interpretation: IMF assessment",
    source: "IMF",
    kind: "Independent multilateral assessment",
    url: "https://www.imf.org/en/news/articles/2025/11/24/pr-25392-india-imf-executive-board-concludes-2025-article-iv-consultation",
    finding:
      "The IMF reported substantial disinflation, linked partly to food price conditions, while noting vulnerabilities to climatic and energy-price shocks.",
    official:
      "Official CPI year-on-year observations describe price change rates, not cumulative affordability across income groups.",
    reconciliation:
      "Show the cumulative index alongside annual inflation and preserve the 2026 CPI base-year break.",
    status: "Independent contextual evidence; not automatic promise verdict",
  },
  {
    id: "IND-ECO-HOUSE",
    category: "economy",
    topic: "households",
    title: "Living standards: survey and savings measures diverge",
    source: "World Bank",
    kind: "Independent survey-based analysis",
    url: "https://thedocs.worldbank.org/en/doc/4262e1e15b463ecb360cec4ad78cf062-0310012026/india-development-update-april-2026",
    finding:
      "The World Bank reports reductions in estimated consumption poverty, while household financial saving has its own volatility and distribution.",
    official:
      "HCES consumption, RBI household savings and GDP are different statistical objects.",
    reconciliation:
      "An increase in average consumption does not establish higher median wages or uniform prosperity.",
    status: "Independent contextual evidence; not automatic promise verdict",
  },
  {
    id: "IND-ECO-FISCAL",
    category: "economy",
    topic: "fiscal",
    title: "Fiscal consolidation and public debt",
    source: "IMF",
    kind: "Independent surveillance",
    url: "https://www.imf.org/en/news/articles/2025/11/24/pr-25392-india-imf-executive-board-concludes-2025-article-iv-consultation",
    finding:
      "The IMF reports fiscal consolidation but flags elevated general government public debt.",
    official:
      "The official Union fiscal deficit is not equal to central-plus-state borrowing or general-government debt.",
    reconciliation:
      "Never combine central fiscal deficits with IMF general-government ratios without an explicit scope label.",
    status: "Independent contextual evidence; not automatic promise verdict",
  },
  {
    id: "IND-ECO-POVERTY",
    category: "economy",
    topic: "poverty",
    title: "Independent poverty estimates and inequality modelling",
    source: "World Bank / World Inequality Lab",
    kind: "Independent statistical research",
    url: "https://www.worldbank.org/en/news/factsheet/2025/06/05/june-2025-update-to-global-poverty-lines",
    finding:
      "The World Bank revises poverty trends using newer consumption instruments; wealth and income shares estimated by independent researchers measure other distributions.",
    official:
      "Official household-survey poverty measures and top-end wealth models describe different outcomes.",
    reconciliation:
      "Measured poverty can fall while estimated wealth concentration is high; show both and their uncertainties.",
    status: "Independent contextual evidence; not automatic promise verdict",
  },
  {
    id: "IND-ECO-MANU",
    category: "economy",
    topic: "manufacturing",
    title: "Growth depends on private investment and export competitiveness",
    source: "World Bank",
    kind: "Independent development analysis",
    url: "https://www.worldbank.org/en/news/press-release/2026/04/09/india-remains-among-the-fastest-growing-economies",
    finding:
      "The World Bank identifies private investment, trade diversification and predictable regulation as major conditions for sustained productivity and employment gains.",
    official:
      "Gross FDI inflows are not net investment, manufacturing output, or an identified causal policy effect.",
    reconciliation:
      "A rise in FDI does not establish its employment impact, technology transfer or real industrial transformation.",
    status: "Independent contextual evidence; not automatic promise verdict",
  },
];
function independentEvidencePanel(view, selectedTopic) {
  const r = independentEvidence.filter(
    (x) => x.category === view && (!selectedTopic || x.topic === selectedTopic),
  );
  if (!r.length) return "";
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  return `<details class="indev"><summary><span>Independent evidence & reconciliation <small>· ${r.length} reviewed source records</small></span><span>Open ↓</span></summary><div class="indev-body">${r.map((x) => `<article class="indev-card"><div class="meta">${esc(x.kind)} · ${esc(x.status)}</div><h4>${esc(x.title)}</h4><p><b>Finding:</b> ${esc(x.finding)}</p><p><b>Compared with official data:</b> ${esc(x.official)}</p><p><b>Assessment:</b> ${esc(x.reconciliation)}</p><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Original source ↗</a></article>`).join("")}</div><div class="indev-flag">Research notes are source-specific. An independent interpretation of official microdata is not an independent survey. No evidence here implies a whole-government score.</div></details>`;
}
const originalEcoDraw = ecoDraw;
ecoDraw = function () {
  originalEcoDraw();
  const root = document.getElementById("ecoWorkspace");
  if (root && ecoTopic) {
    root.insertAdjacentHTML(
      "beforeend",
      independentEvidencePanel("economy", ecoTopic),
    );
  }
};
const originalDrawResearch = drawResearch;
drawResearch = function () {
  originalDrawResearch();
  const root = document.getElementById("researchWorkspace");
  const view = new URLSearchParams(location.search).get("view");
  if (root && researchSelections[view])
    root.insertAdjacentHTML("beforeend", independentEvidencePanel(view));
};
if (new URLSearchParams(location.search).get("view") === "economy" && ecoTopic)
  ecoDraw();
if (
  ["employment", "democracy"].includes(
    new URLSearchParams(location.search).get("view"),
  ) &&
  researchSelections[new URLSearchParams(location.search).get("view")]
)
  drawResearch();
