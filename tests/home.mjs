import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".woff2": "font/woff2" };

function browserExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    join(process.env.ProgramFiles ?? "", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env["ProgramFiles(x86)"] ?? "", "Microsoft", "Edge", "Application", "msedge.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const executable = candidates.find(existsSync);
  assert.ok(executable, `No Chrome or Edge found. Checked: ${candidates.join(", ")}`);
  return executable;
}

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = resolve(join(root, pathname));
    if (file !== root && !file.startsWith(root + sep)) throw new Error("outside root");
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end();
  }
});
await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
const baseUrl = `http://127.0.0.1:${server.address().port}/`;

const patterns = {
  version: 3,
  updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  items: { "pattern:factory-method": { completed: { read: "t" }, updatedAt: "t" } },
  resume: { itemId: "pattern:factory-method", taskId: "read", updatedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
};
const frontend = {
  app: "issueflow-learning-progress",
  schemaVersion: 1,
  days: [{ day: 1, completed: true, completedAt: new Date(Date.now() - 9 * 86400000).toISOString() }, { day: 2, completed: false, completedAt: null }],
};
const dotnet = { version: 1, experiments: ["a", "b"], assessments: {}, copies: [], lastReading: { title: "第 4 章", url: "guide/" } };
const records = {
  "csharp-design-patterns-progress-v3": JSON.stringify(patterns),
  "issueflow:frontend-learning-project:progress:v1": JSON.stringify(frontend),
  "learn-dotnet-csharp-learning-data-v1": JSON.stringify(dotnet),
};

async function open(browser, { seed, viewport = { width: 1440, height: 900 }, colorScheme = "light", init } = {}) {
  const context = await browser.newContext({ viewport, colorScheme });
  if (seed) {
    await context.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) localStorage.setItem(key, value);
    }, seed);
  }
  if (init) await context.addInitScript(init);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto(baseUrl);
  return { context, page, errors };
}

async function assertAccessible(page, label) {
  await page.addScriptTag({ content: axe.source });
  const { violations } = await page.evaluate(() => window.axe.run(document, { resultTypes: ["violations"] }));
  const serious = violations.filter((item) => ["serious", "critical"].includes(item.impact));
  assert.deepEqual(serious.map((item) => item.id), [], `${label} has serious accessibility issues`);
}

const browser = await chromium.launch({ executablePath: browserExecutable(), headless: true });
try {
  // First visit: no records, and nothing invented.
  {
    const { context, page, errors } = await open(browser);
    assert.equal(await page.locator(".entry").count(), 6);
    assert.equal(await page.locator(".entry-topic").count(), 6);
    assert.match(await page.locator("#resume-line").textContent(), /还没有学习记录/u);
    assert.equal(await page.locator(".entry[data-record]").count(), 0);
    assert.equal(await page.locator(".entry[aria-current]").count(), 0);
    assert.equal(await page.locator("#resume-go").isVisible(), false);
    assert.deepEqual(await page.locator("[data-ring] span").allTextContents(), ["0%", "0%", "0%"]);
    assert.equal(await page.locator('a[href="/LightGBM-NativeCUDA/"]').count(), 1);

    await page.locator('[data-filter="ai"]').click();
    assert.equal(await page.locator(".entry:visible").count(), 1);
    await page.locator('[data-filter="all"]').click();
    await page.keyboard.press("/");
    assert.equal(await page.evaluate(() => document.activeElement.id), "project-search");
    await page.keyboard.type("算法");
    assert.equal(await page.locator(".entry:visible").count(), 1);
    await page.keyboard.type("不存在的项目");
    assert.equal(await page.locator("#empty-state").isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator(".entry:visible").count(), 6);
    await assertAccessible(page, "empty state");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // Returning visit: courses' records appear, and the newest one is the place to continue.
  {
    const { context, page, errors } = await open(browser, { seed: records });
    const link = page.locator("#resume-line a");
    assert.match(await link.textContent(), /Factory Method/u);
    assert.match(await link.textContent(), /运行并核对输出/u);
    assert.equal(await page.locator('.entry[data-course="patterns"] [data-ring]').getAttribute("aria-label"), "完成 1%");
    assert.equal(await page.locator('.entry[data-course="patterns"] [data-ring] span').textContent(), "1%");
    assert.equal(await page.locator("#stat-done").textContent(), "4");
    assert.equal(await page.locator("#stat-active").textContent(), "3");
    assert.equal(await page.locator("#resume-go").isVisible(), true);
    assert.equal(await page.locator("#resume-go").getAttribute("href"), "/CSharp_Implementation_of_DesignPatterns/patterns/factory-method.html#evidence-run");
    assert.equal(await link.getAttribute("href"), "/CSharp_Implementation_of_DesignPatterns/patterns/factory-method.html#evidence-run");
    assert.equal(await page.locator(".entry .nb-stopped").count(), 1);
    assert.equal(await page.locator(".entry[data-record]").count(), 3);
    assert.equal(await page.locator('.entry[data-course="patterns"]').getAttribute("aria-current"), "true");
    assert.match(await page.locator('.entry[data-course="frontend"] [data-state]').textContent(), /1 \/ 2 天/u);

    const before = await page.evaluate(() => JSON.stringify(Object.entries(localStorage).sort()));
    await page.reload();
    const after = await page.evaluate(() => JSON.stringify(Object.entries(localStorage).sort()));
    assert.equal(after, before, "the index must never change another site's records");
    await assertAccessible(page, "returning state");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // Damaged or future-format records must not break the page.
  {
    const { context, page, errors } = await open(browser, {
      seed: {
        "csharp-design-patterns-progress-v3": "{not json",
        "issueflow:frontend-learning-project:progress:v1": JSON.stringify({ schemaVersion: 2 }),
        "learn-dotnet-csharp-learning-data-v1": "null",
      },
    });
    assert.match(await page.locator("#resume-line").textContent(), /还没有学习记录/u);
    assert.deepEqual(errors, []);
    await context.close();
  }

  // Blocked storage leaves the page working.
  {
    const { context, page, errors } = await open(browser, {
      init: () => Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } }),
    });
    assert.equal(await page.locator(".entry").count(), 6);
    assert.deepEqual(errors, []);
    await context.close();
  }

  // Theme follows the system, and the choice sticks.
  {
    const { context, page } = await open(browser, { colorScheme: "dark" });
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "dark");
    await assertAccessible(page, "dark theme");
    assert.equal(await page.getByRole("button", { name: "晚上" }).getAttribute("aria-pressed"), "true");
    await page.getByRole("button", { name: "白天" }).click();
    assert.equal(await page.getByRole("button", { name: "白天" }).getAttribute("aria-pressed"), "true");
    assert.equal(await page.evaluate(() => localStorage.getItem("site-theme")), "light");
    await page.reload();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "light");
    await context.close();
  }

  // Reading comfort: every text colour holds 7:1 on paper, sheet and every wash, in both schemes.
  {
    const { context, page } = await open(browser);
    for (const scheme of ["light", "dark"]) {
      const weak = await page.evaluate((name) => {
        document.documentElement.dataset.theme = name;
        const style = getComputedStyle(document.documentElement);
        const token = (key) => style.getPropertyValue(`--nb-${key}`).trim();
        const channel = (value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
        const luminance = (hex) => [1, 3, 5]
          .map((start) => channel(parseInt(hex.slice(start, start + 2), 16) / 255))
          .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
        const ratio = (first, second) => {
          const [high, low] = [luminance(first), luminance(second)].sort((a, b) => b - a);
          return (high + 0.05) / (low + 0.05);
        };
        const hues = ["red", "green", "cyan", "blue", "purple"];
        const backgrounds = ["paper", "sheet", "red-wash", "green-wash", "cyan-wash", "blue-wash", "purple-wash"];
        const pairs = ["ink", "ink-soft", ...hues].flatMap((text) => backgrounds.map((back) => [text, back]));
        // Paper-coloured text on every fill: card heads, the banner and pressed chips.
        for (const fill of [...hues.map((hue) => hue + "-fill"), "ink-fill", "fill"]) pairs.push(["on-fill", fill]);
        return pairs.filter(([text, back]) => ratio(token(text), token(back)) < 7).map((pair) => pair.join(" on "));
      }, scheme);
      assert.deepEqual(weak, [], `${scheme} scheme has text below 7:1`);
    }
    await context.close();
  }

  // Phone width
  {
    const { context, page, errors } = await open(browser, { seed: records, viewport: { width: 390, height: 844 } });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    assert.equal(overflow, false, "no horizontal scrolling on a phone");
    const heights = await page.locator(".filter").evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
    assert.ok(heights.every((height) => height >= 44), `filter touch targets too small: ${heights}`);
    await assertAccessible(page, "phone");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // Touching marks: a curly quote beside a comma or full stop sets at half width, in the page and in text added later.
  {
    const { context, page, errors } = await open(browser);
    assert.deepEqual(await page.locator("#empty-state .nb-halt").allTextContents(), ["”"]);
    await page.evaluate(() => {
      const note = document.createElement("p");
      note.id = "later";
      note.innerHTML = "先选“全部”，再看<code>“a”，b</code>";
      document.querySelector("main").append(note);
    });
    await page.locator("#later .nb-halt").waitFor({ state: "attached" });
    assert.deepEqual(await page.locator("#later .nb-halt").allTextContents(), ["”"]);
    assert.equal(await page.locator("#later code .nb-halt").count(), 0, "code keeps its marks as typed");
    assert.equal(await page.locator("#later").textContent(), "先选“全部”，再看“a”，b");
    assert.equal(await page.locator("h2").first().evaluate((heading) => getComputedStyle(heading).wordBreak), "keep-all");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // One family at two weights: every font the kit declares must ship, and the page must use only those.
  {
    const css = await readFile(join(root, "kit", "v1", "fonts.css"), "utf8");
    const files = [...css.matchAll(/url\((fonts\/[^)]+)\)/gu)].map((match) => match[1]);
    assert.ok(files.length > 50, "expected the sliced font");
    for (const file of files) await stat(join(root, "kit", "v1", file));
    assert.deepEqual([...new Set(css.match(/font-family: '[^']+'/gu))], ["font-family: 'Noto Sans SC'"]);
    assert.deepEqual([...new Set(css.match(/font-weight: \d+/gu))].sort(), ["font-weight: 400", "font-weight: 600"]);

    const { context, page, errors } = await open(browser, { seed: records });
    const used = await page.evaluate(() => {
      const styles = [...document.querySelectorAll("body *")]
        .filter((element) => element.offsetParent && element.textContent.trim() && !element.closest("code, kbd, pre, samp"))
        .map((element) => getComputedStyle(element));
      return { families: [...new Set(styles.map((style) => style.fontFamily))], weights: [...new Set(styles.map((style) => style.fontWeight))].sort() };
    });
    assert.equal(used.families.length, 1, `more than one family on the page: ${used.families.join(" | ")}`);
    assert.ok(used.families[0].includes("Noto Sans SC"), used.families[0]);
    assert.deepEqual(used.weights, ["400", "600"]);
    assert.deepEqual(errors, []);
    await context.close();
  }
  console.log("Home checks passed.");
} finally {
  await browser.close();
  server.close();
}
