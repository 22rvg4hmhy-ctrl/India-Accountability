const { test, expect } = require("@playwright/test");
const { readFileSync } = require("node:fs");
const { parse } = require("csv-parse/sync");
const data = JSON.parse(readFileSync("src/generated/research.json", "utf8"));
function errorsFor(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().startsWith(new URL(page.url()).origin) &&
      response.status() >= 400
    )
      errors.push(`${response.status()} ${response.url()}`);
  });
  return errors;
}
for (const view of [
  "home",
  "economy",
  "employment",
  "democracy",
  "education",
  "digital",
  "audit",
  "methods",
]) {
  test(`${view} renders with working local links and no overflow`, async ({
    page,
    request,
  }) => {
    const errors = errorsFor(page);
    await page.goto(`./?view=${view}`);
    await expect(page.locator("main h1")).toBeVisible();
    expect(
      await page.locator("body").evaluate((el) => el.scrollWidth <= innerWidth),
    ).toBeTruthy();
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))) {
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      expect(
        (await request.get(new URL(href, page.url()).href)).ok(),
        href,
      ).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
for (const category of ["economy", "employment", "democracy"]) {
  test(`${category}: every subject, indicator and download uses shared records`, async ({
    page,
    request,
  }) => {
    const errors = errorsFor(page);
    await page.goto(`./?view=${category}`);
    for (const topic of data.topics.filter((t) => t.category === category)) {
      await page
        .getByRole("link", {
          name: new RegExp(topic.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        })
        .first()
        .click();
      const indicators = data.indicators.filter(
        (i) => i.category === category && i.topic === topic.id,
      );
      if (!indicators.length) {
        await expect(
          page.getByRole("heading", { name: "Evidence review in progress" }),
        ).toBeVisible();
        continue;
      }
      for (const indicator of indicators) {
        await page.getByLabel("Select indicator").selectOption(indicator.id);
        await expect(page.locator(".indicator-explorer h3")).toHaveText(
          indicator.title,
        );
        await expect(page.locator(".trend-chart")).toBeVisible();
        await page.locator(".observation-details summary").click();
        const rows = data.observations.filter(
          (o) => o.indicatorId === indicator.id,
        );
        await expect(page.locator("tbody tr")).toHaveCount(rows.length);
        if (category === "economy") {
          await page.getByRole("button", { name: "Pre-2014 context" }).click();
          await expect(page.locator(".chart-area")).not.toBeEmpty();
          await page
            .getByRole("button", { name: "Peers", exact: true })
            .click();
          await expect(page.locator(".chart-area")).toContainText(
            "not yet been harmonised",
          );
          await page
            .getByRole("button", { name: "Trend", exact: true })
            .click();
        }
      }
      for (const href of await page
        .locator("a[download]")
        .evaluateAll((links) => links.map((a) => a.getAttribute("href"))))
        expect(
          (await request.get(new URL(href, page.url()).href)).ok(),
          href,
        ).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
test("browser history restores category, subject and indicator selection", async ({
  page,
}) => {
  await page.goto("./");
  await page.locator(".category-card").first().click();
  await page.locator(".topic-card").first().click();
  const options = page.locator("#indicator option");
  const selected = await options.nth(1).getAttribute("value");
  await page.getByLabel("Select indicator").selectOption(selected);
  await page.goBack();
  await expect(page.getByLabel("Select indicator")).not.toHaveValue(selected);
  await page.goForward();
  await expect(page.getByLabel("Select indicator")).toHaveValue(selected);
  await page.goBack();
  await page.goBack();
  await expect(page.locator(".selection-prompt")).toBeVisible();
});
test("promise search and filters show actual register records", async ({
  page,
}) => {
  await page.goto("./?view=audit");
  await expect(page.locator(".promise-record")).toHaveCount(
    data.promises.length,
  );
  await page.getByLabel("Search promises").fill("BJP-2014-001");
  await expect(page.locator(".promise-record")).toHaveCount(1);
  await page.locator(".promise-record summary").click();
  await expect(page.locator(".promise-record")).toContainText(
    "Create a Price Stabilisation Fund",
  );
  await page.getByLabel("Search promises").fill("no-such-record-12345");
  await expect(page.getByRole("status")).toHaveText("0 records match");
  await page.getByLabel("Search promises").clear();
  await page.getByLabel("Policy area").selectOption("economy");
  await expect(page.locator(".promise-record")).toHaveCount(
    data.promises.filter((p) => p.category === "economy").length,
  );
});
test("evidence explorer shares data and supports filtering", async ({
  page,
}) => {
  const errors = errorsFor(page);
  await page.goto("./economy-evidence.html");
  await expect(page.locator(".evidence-record")).toHaveCount(
    data.indicators.filter((i) => i.category === "economy").length,
  );
  await page.getByLabel("Search indicators").fill("GDP in current US dollars");
  await expect(page.locator(".evidence-record")).toHaveCount(1);
  await page.locator(".evidence-record > summary").click();
  await expect(page.locator(".trend-chart")).toBeVisible();
  expect(errors).toEqual([]);
});
test("downloaded indicator CSV equals the observations driving the chart", async ({
  page,
}) => {
  await page.goto("./?view=economy&topic=growth&indicator=nominal-gdp");
  await page.locator(".observation-details summary").click();
  const waiting = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download these observations CSV" })
    .click();
  const download = await waiting;
  const rows = parse(readFileSync(await download.path(), "utf8"), {
    columns: true,
    bom: true,
  });
  expect(rows.map((r) => [r.period, Number(r.value)])).toEqual(
    data.observations
      .filter((o) => o.indicatorId === "nominal-gdp")
      .map((o) => [o.period, o.value]),
  );
});
