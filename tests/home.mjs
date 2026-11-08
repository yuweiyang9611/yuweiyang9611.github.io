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

// The index loads LearnLLM's question bank from the course's path on the same origin; here a stand-in answers there.
const llmQuizBankPath = "/LearnLLM/javascripts/quiz-bank.js";

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = pathname === llmQuizBankPath ? join(root, "tests", "fixtures", "learnllm-quiz-bank.js") : resolve(join(root, pathname));
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
// The algorithms course's record as its progressRepository.ts writes it: schema 3, one entry per
// touched unit. One unit verified a week ago, one started today with a single piece of evidence.
const today = Date.now();
const algorithms = {
  schemaVersion: 3,
  generation: 0,
  revision: 7,
  units: {
    "core-linear-structures": {
      evidenceIds: ["invariant", "test", "transfer"], evidenceRevision: 1, selfTestPassedAt: today - 7 * 86400000, selfTestRevision: 1,
      verifiedAt: today - 7 * 86400000, verifiedRevision: 1, nextReviewAt: today + 86400000, reviewRound: 0,
      startedAt: today - 8 * 86400000, updatedAt: today - 7 * 86400000,
    },
    "core-array-search": { evidenceIds: ["invariant"], evidenceRevision: 1, reviewRound: 0, startedAt: today - 3600000, updatedAt: today - 3600000 },
  },
  deleted: {},
};

// Times a whole number of days back, at noon in this time zone, so the streak does not depend on the hour the
// checks run. "Now" stays a second in the past so it is never a future time.
function daysAgo(days) {
  if (days === 0) return new Date(Date.now() - 1000);
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
}
// LearnLLM: chapter 00 finished (it has no browser run, so four steps), chapter 01 opened today.
const llm = {
  version: 1,
  updatedAt: daysAgo(0).toISOString(),
  chapters: {
    "00": { readAt: daysAgo(2).toISOString(), codeAt: daysAgo(2).toISOString(), quizPassedAt: daysAgo(1).toISOString(), quizRevision: "r1", note: "先跑通环境再读第一章。", noteAt: daysAgo(1).toISOString() },
    "01": { readAt: daysAgo(0).toISOString() },
  },
};
// Two design-patterns questions due, one not yet, and one never answered (new work, not a review).
const patternsReview = {
  version: 1,
  updatedAt: daysAgo(4).getTime(),
  questions: {
    a: { contentVersion: "a:1", box: 1, streak: 1, attempts: 1, lapses: 0, lastAnsweredAt: daysAgo(4).getTime(), dueAt: Date.now() - 3600000, lastCorrect: true },
    b: { contentVersion: "b:1", box: 0, streak: 0, attempts: 2, lapses: 1, lastAnsweredAt: daysAgo(4).getTime(), dueAt: Date.now() - 60000, lastCorrect: false },
    c: { contentVersion: "c:1", box: 3, streak: 3, attempts: 3, lapses: 0, lastAnsweredAt: daysAgo(4).getTime(), dueAt: Date.now() + 86400000, lastCorrect: true },
    d: { dueAt: Date.now() - 60000 },
  },
};
const frontendReview = {
  app: "issueflow-learning-review",
  schemaVersion: 1,
  records: {
    "w05-q01": { stage: 2, lastCorrect: true, lastAnsweredAt: daysAgo(4).toISOString(), dueAt: new Date(Date.now() + 86400000).toISOString(), attempts: 2 },
    "w04-q02": { stage: 0, lastCorrect: false, lastAnsweredAt: daysAgo(4).toISOString(), dueAt: new Date(Date.now() - 86400000).toISOString(), attempts: 1 },
  },
};
// One unit verified a month ago whose review came due an hour ago.
const reviewing = {
  schemaVersion: 4,
  generation: 0,
  revision: 3,
  units: {
    "core-linear-structures": {
      evidenceIds: ["invariant", "test", "transfer"], evidenceRevision: 1, selfTestPassedAt: daysAgo(30).getTime(), selfTestRevision: 1,
      verifiedAt: daysAgo(30).getTime(), verifiedRevision: 1, nextReviewAt: Date.now() - 3600000, reviewRound: 0,
      startedAt: daysAgo(31).getTime(), updatedAt: daysAgo(30).getTime(),
    },
  },
  deleted: {},
};

// Writes the record the way the course does (database version 1, store "progress", key "current").
function seedAlgorithms(record) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dsa-learning-progress", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("progress");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction("progress", "readwrite");
      transaction.objectStore("progress").put(record, "current");
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onerror = () => reject(transaction.error);
    };
  });
}

// Reads the course's record back, or null when the database or the record is missing.
async function readAlgorithms() {
  if (!(await indexedDB.databases()).some((database) => database.name === "dsa-learning-progress")) return null;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dsa-learning-progress", 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const get = database.transaction("progress", "readonly").objectStore("progress").get("current");
      get.onsuccess = () => { database.close(); resolve(JSON.stringify(get.result) ?? null); };
      get.onerror = () => reject(get.error);
    };
  });
}

async function open(browser, { seed, database, viewport = { width: 1440, height: 900 }, colorScheme = "light", init, prepare, waitUntil = "load" } = {}) {
  const context = await browser.newContext({ viewport, colorScheme });
  if (prepare) await prepare(context);
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
  await page.goto(baseUrl, { waitUntil });
  if (database) {
    // IndexedDB has to be written on the origin, so the record goes in after a first load and the page is opened again.
    await page.evaluate(seedAlgorithms, database);
    await page.reload();
  }
  await settled(page);
  return { context, page, errors };
}

// The records are read asynchronously; the page marks the body once every reader has answered.
function settled(page) {
  return page.locator('body[data-progress="read"]').waitFor({ state: "attached" });
}

// Picking a file is read asynchronously (file.text()), so a check waits for the status line instead of reading it at once.
function statusSays(page, pattern) {
  return page.waitForFunction((source) => new RegExp(source, "u").test(document.querySelector("#backup-status").textContent), pattern.source);
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
    assert.deepEqual(await page.locator("[data-ring] span").allTextContents(), ["0%", "0%", "0%", "0%", "0%"]);
    assert.equal(await page.locator("#stat-due").textContent(), "0");
    assert.equal(await page.locator("#stat-streak").textContent(), "0 天");
    assert.equal(await page.locator("#review-empty").isVisible(), true);
    assert.equal(await page.locator("#review-list").isVisible(), false);
    assert.equal(await page.locator("#restore-preview").isVisible(), false);
    assert.equal(await page.locator('a[href="/LightGBM-NativeCUDA/"]').count(), 1);
    // Looking for the algorithms course's record must not create its database.
    assert.deepEqual(await page.evaluate(async () => (await indexedDB.databases()).map((database) => database.name)), []);

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
    await settled(page);
    const after = await page.evaluate(() => JSON.stringify(Object.entries(localStorage).sort()));
    assert.equal(after, before, "the index must never change another site's records");
    assert.deepEqual(await page.evaluate(async () => (await indexedDB.databases()).map((database) => database.name)), []);
    await assertAccessible(page, "returning state");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // The algorithms course's record lives in IndexedDB. Read through the same guard the course uses, never written.
  {
    const { context, page, errors } = await open(browser, { seed: records, database: algorithms });
    const card = page.locator('.entry[data-course="algorithms"]');
    assert.equal(await card.locator("[data-ring]").getAttribute("aria-label"), "完成 5%");
    assert.equal(await card.locator("[data-ring] span").textContent(), "5%");
    assert.equal(await card.locator("[data-state]").textContent(), "1 / 22 单元");
    assert.match(await card.locator("[data-place]").textContent(), /^链表、栈、队列与双端队列 · 第 2 步：看代码 · 今天$/u, "the earliest touched unit whose band has a step to do, as the course says");
    assert.equal(await card.getAttribute("aria-current"), "true", "the course touched today is the place to continue");
    assert.equal(await page.locator(".entry[data-record]").count(), 4);
    assert.equal(await page.locator("#stat-done").textContent(), "5");
    assert.equal(await page.locator("#stat-active").textContent(), "4");
    assert.equal(await page.locator("#stat-due").textContent(), "0", "a review due tomorrow is not due today");
    const link = page.locator("#resume-line a");
    assert.equal(await link.textContent(), "算法研习室 · 链表、栈、队列与双端队列 · 第 2 步：看代码");
    const href = "/DataStructureAndAlgorithm/学习单元.html#unit-core-linear-structures";
    assert.equal(await link.getAttribute("href"), href);
    assert.equal(await page.locator("#resume-go").getAttribute("href"), href);

    const before = await page.evaluate(readAlgorithms);
    assert.equal(before, JSON.stringify(algorithms));
    await page.reload();
    await settled(page);
    assert.equal(await page.locator('.entry[data-course="algorithms"][data-record]').count(), 1);
    assert.equal(await page.evaluate(readAlgorithms), before, "the index must never change the course's IndexedDB record");
    assert.equal(await page.evaluate(() => indexedDB.databases().then((list) => list.length)), 1, "no second database");
    await assertAccessible(page, "algorithms record");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // The course's own fallbacks: a verified unit whose band still has a step to do is still the place to continue;
  // once both bands are done the next unit is the first whose prerequisites are verified; a record from before
  // IndexedDB is still read from localStorage.
  {
    const verified = Object.fromEntries(["core-linear-structures", "core-array-search"].map((id) => [id, algorithms.units["core-linear-structures"]]));
    const { context, page, errors } = await open(browser, { database: { ...algorithms, units: verified } });
    const card = page.locator('.entry[data-course="algorithms"]');
    assert.equal(await card.locator("[data-state]").textContent(), "2 / 22 单元");
    assert.match(await card.locator("[data-place]").textContent(), /^链表、栈、队列与双端队列 · 第 2 步：看代码 · 7 天前$/u);
    assert.deepEqual(errors, []);
    await context.close();

    const band = { sourceOpenedAt: today - 7 * 86400000, ranAt: today - 7 * 86400000, note: "不变量写在纸上了。" };
    const finished = Object.fromEntries(Object.entries(verified).map(([id, record]) => [id, { ...record, ...band }]));
    const done = await open(browser, { database: { ...algorithms, units: finished } });
    assert.match(await done.page.locator('.entry[data-course="algorithms"] [data-place]').textContent(), /^比较排序与非比较排序 · 下一个单元 · 7 天前$/u);
    assert.deepEqual(done.errors, []);
    await done.context.close();

    const legacy = await open(browser, { seed: { "dsa-learning-progress-v1": JSON.stringify(["core-sorting", "unknown-unit"]) } });
    const legacyCard = legacy.page.locator('.entry[data-course="algorithms"]');
    assert.equal(await legacyCard.locator("[data-state]").textContent(), "0 / 22 单元");
    assert.match(await legacyCard.locator("[data-place]").textContent(), /^比较排序与非比较排序 · 第 2 步：看代码 · 今天$/u);
    assert.deepEqual(await legacy.page.evaluate(async () => (await indexedDB.databases()).map((database) => database.name)), []);
    assert.deepEqual(legacy.errors, []);
    await legacy.context.close();
  }

  // Damaged or future-format records must not break the page.
  {
    const { context, page, errors } = await open(browser, {
      seed: {
        "csharp-design-patterns-progress-v3": "{not json",
        "issueflow:frontend-learning-project:progress:v1": JSON.stringify({ schemaVersion: 2 }),
        "learn-dotnet-csharp-learning-data-v1": "null",
        "learn-llm-progress-v1": "[]",
        "csharp-design-patterns-review-v1": JSON.stringify({ version: 1, questions: "x" }),
        "issueflow:frontend-learning-project:review:v1": "{not json",
      },
    });
    assert.match(await page.locator("#resume-line").textContent(), /还没有学习记录/u);
    assert.equal(await page.locator("#stat-due").textContent(), "0");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // Today's reviews, LearnLLM's record and the streak. Reviews come from three courses, only questions answered
  // before and due by now count, and the streak runs back from today over the days any course recorded work.
  {
    const seed = {
      ...records,
      "learn-llm-progress-v1": JSON.stringify(llm),
      "csharp-design-patterns-review-v1": JSON.stringify(patternsReview),
      "issueflow:frontend-learning-project:review:v1": JSON.stringify(frontendReview),
    };
    const { context, page, errors } = await open(browser, { seed, database: reviewing });
    const rows = page.locator("#review-list .review-item");
    assert.deepEqual(await rows.locator(".review-count").allTextContents(), ["2 题", "1 题", "1 个单元"]);
    assert.deepEqual(await rows.locator(".review-label").allTextContents(), [
      "C# 设计模式 · 辨析训练 · 到期题",
      "IssueFlow · 第 4 周周测",
      "算法研习室 · 链表、栈、队列与双端队列 · 掌握复习",
    ]);
    assert.deepEqual(await rows.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))), [
      "/CSharp_Implementation_of_DesignPatterns/quiz.html",
      "/frontend-learning-project/90-days/review-center.html",
      "/DataStructureAndAlgorithm/学习单元.html#unit-core-linear-structures",
    ]);
    assert.equal(await page.locator("#review-empty").isVisible(), false);
    assert.equal(await page.locator("#stat-due").textContent(), "4");
    assert.equal(await page.locator("#stat-streak").textContent(), "3 天", "today, yesterday and the day before; four days ago is past a gap");

    const card = page.locator('.entry[data-course="llm"]');
    assert.equal(await card.locator("[data-state]").textContent(), "1 / 9 章");
    assert.equal(await card.locator("[data-ring] span").textContent(), "11%");
    assert.match(await card.locator("[data-place]").textContent(), /^01 数学与 PyTorch 基础 · 第 2 步：看代码 · 今天$/u);
    assert.equal(await card.getAttribute("aria-current"), "true", "the chapter opened today is the newest record");
    const link = page.locator("#resume-line a");
    assert.equal(await link.textContent(), "LearnLLM · 01 数学与 PyTorch 基础 · 第 2 步：看代码");
    assert.equal(await link.getAttribute("href"), "/LearnLLM/" + encodeURIComponent("01_数学与PyTorch基础") + "/#llm-source");
    assert.match(await page.locator('.entry[data-course="algorithms"] [data-place]').textContent(), /^链表、栈、队列与双端队列 · 复习到期/u);

    const before = await page.evaluate(() => JSON.stringify(Object.entries(localStorage).sort()));
    await page.reload();
    await settled(page);
    assert.equal(await page.evaluate(() => JSON.stringify(Object.entries(localStorage).sort())), before, "reading reviews writes nothing");
    await assertAccessible(page, "reviews");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // LearnLLM's quiz against the course's question bank. A pass counts only at the chapter's current revision; the
  // bank is loaded once and only for a record with a passed quiz, and a bank that fails or hangs never stops the
  // page: the pass then counts, as it does on the course without its bank.
  {
    // The card's 昨天 counts whole 24-hour spans back from now, so these times are whole days and a minute back,
    // not noon in this time zone, and the label does not depend on the hour the checks run.
    const before = (days) => new Date(Date.now() - days * 86400000 - 60000).toISOString();
    const chapter00 = (revision) => ({
      version: 1,
      updatedAt: before(1),
      chapters: { "00": { readAt: before(2), codeAt: before(2), quizPassedAt: before(1), quizRevision: revision, note: "环境检查通过。", noteAt: before(1) } },
    });
    const bankScripts = (page) => page.locator(`script[src="${llmQuizBankPath}"]`).count();
    const card = (page) => page.locator('.entry[data-course="llm"]');
    const quizPage = "/LearnLLM/" + encodeURIComponent("00_学习路线与环境") + "/#llm-quiz";
    const nextChapter = "/LearnLLM/" + encodeURIComponent("01_数学与PyTorch基础") + "/";

    // Passed before the questions changed: the chapter waits at the quiz again, as the course's band does.
    const stale = await open(browser, { seed: { "learn-llm-progress-v1": JSON.stringify(chapter00("r0")) } });
    assert.equal(await card(stale.page).locator("[data-state]").textContent(), "0 / 9 章");
    assert.equal(await card(stale.page).locator("[data-place]").textContent(), "00 学习路线与环境 · 第 4 步：自测 · 昨天");
    assert.equal(await stale.page.locator("#resume-line a").getAttribute("href"), quizPage);
    assert.equal(await bankScripts(stale.page), 1, "the bank is loaded once");
    assert.equal(await stale.page.evaluate(() => typeof window.LlmQuizBank.revision), "function");
    assert.deepEqual(stale.errors, []);
    await stale.context.close();

    // Passed at the current revision: the chapter is finished and the place moves on.
    const current = await open(browser, { seed: { "learn-llm-progress-v1": JSON.stringify(chapter00("r1")) } });
    assert.equal(await card(current.page).locator("[data-state]").textContent(), "1 / 9 章");
    assert.equal(await card(current.page).locator("[data-place]").textContent(), "01 数学与 PyTorch 基础 · 第 1 步：读 · 昨天");
    assert.equal(await current.page.locator("#resume-line a").getAttribute("href"), nextChapter);
    assert.deepEqual(current.errors, []);
    await current.context.close();

    // No passed quiz in the record: the bank is never asked for.
    const unasked = await open(browser, { seed: { "learn-llm-progress-v1": JSON.stringify({ version: 1, chapters: { "00": { readAt: daysAgo(0).toISOString() } } }) } });
    assert.equal(await card(unasked.page).locator("[data-place]").textContent(), "00 学习路线与环境 · 第 2 步：看代码 · 今天");
    assert.equal(await bankScripts(unasked.page), 0);
    assert.equal(await unasked.page.evaluate(() => "LlmQuizBank" in window), false);
    assert.deepEqual(unasked.errors, []);
    await unasked.context.close();

    // The bank cannot be loaded: the pass counts, even a stale one, and the page carries on.
    const failed = await open(browser, {
      seed: { "learn-llm-progress-v1": JSON.stringify(chapter00("r0")) },
      prepare: (context) => context.route("**" + llmQuizBankPath, (route) => route.abort()),
    });
    assert.equal(await card(failed.page).locator("[data-state]").textContent(), "1 / 9 章");
    assert.equal(await card(failed.page).locator("[data-place]").textContent(), "01 数学与 PyTorch 基础 · 第 1 步：读 · 昨天");
    assert.deepEqual(failed.errors.filter((message) => !/Failed to load resource/u.test(message)), []);
    await failed.context.close();

    // The bank never answers: the page waits a few seconds at most, then counts the pass. (A script still loading
    // holds back the window's load event, so this check waits for the document instead.)
    let pending = null;
    const started = Date.now();
    const hung = await open(browser, {
      seed: { "learn-llm-progress-v1": JSON.stringify(chapter00("r0")) },
      prepare: (context) => context.route("**" + llmQuizBankPath, (route) => { pending = route; }),
      waitUntil: "domcontentloaded",
    });
    const waited = Date.now() - started;
    assert.ok(pending, "the bank was asked for");
    assert.ok(waited < 15000, `the page waited ${waited} ms for a bank that never answers`);
    assert.equal(await card(hung.page).locator("[data-state]").textContent(), "1 / 9 章");
    assert.deepEqual(hung.errors, []);
    await pending.abort().catch(() => {});
    await hung.context.close();
  }

  // Backup all, then restore into an empty browser. Nothing is written until the reader has seen the file's
  // contents and pressed 覆盖并恢复; files that are not a desk backup are refused with a reason.
  {
    const seed = { ...records, "learn-llm-progress-v1": JSON.stringify(llm), "site-theme": "dark" };
    const { context, page, errors } = await open(browser, { seed, database: algorithms });
    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#backup-all").click()]);
    assert.match(download.suggestedFilename(), /^learning-backup-\d{4}-\d{2}-\d{2}\.json$/u);
    const file = await download.path();
    // The download goes away with its context, so keep the bytes.
    const text = await readFile(file, "utf8");
    const backupFile = { name: download.suggestedFilename(), mimeType: "application/json", buffer: Buffer.from(text) };
    const backup = JSON.parse(text);
    assert.equal(backup.format, "yuweiyang9611-learning-backup");
    assert.equal(backup.version, 1);
    assert.deepEqual(Object.keys(backup.localStorage).sort(), Object.keys(seed).filter((key) => key !== "site-theme").sort(), "every course key and no preference");
    assert.equal(backup.localStorage["learn-llm-progress-v1"], seed["learn-llm-progress-v1"]);
    assert.deepEqual(backup.indexedDB["dsa-learning-progress"].progress.current, algorithms);
    assert.match(await page.locator("#backup-status").textContent(), /^已备份 5 条记录，涉及 5 门课/u);
    assert.deepEqual(errors, []);
    await context.close();

    const fresh = await open(browser);
    const status = fresh.page.locator("#backup-status");
    const nothingWritten = async () => {
      assert.equal(await fresh.page.evaluate(() => localStorage.length), 0, "nothing in localStorage yet");
      assert.deepEqual(await fresh.page.evaluate(async () => (await indexedDB.databases()).map((database) => database.name)), [], "no database yet");
    };
    await fresh.page.locator("#restore-file").setInputFiles({ name: "llm.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ format: "learn-llm-progress", version: 1, progress: llm })) });
    await statusSays(fresh.page, /不是学习台的备份文件/u);
    await fresh.page.locator("#restore-file").setInputFiles({ name: "broken.json", mimeType: "application/json", buffer: Buffer.from("{not json") });
    await statusSays(fresh.page, /不是 JSON/u);
    assert.equal(await fresh.page.locator("#restore-preview").isVisible(), false);

    const [chooser] = await Promise.all([fresh.page.waitForEvent("filechooser"), fresh.page.locator("#restore-pick").click()]);
    await chooser.setFiles(backupFile);
    await fresh.page.locator("#restore-preview").waitFor();
    assert.match(await fresh.page.locator("#restore-summary").textContent(), /里面有 5 门课的记录/u);
    assert.deepEqual((await fresh.page.locator("#restore-list li").allTextContents()).sort(), [
      "C# 设计模式 · 1 条", "IssueFlow 学习站 · 1 条", "LearnDotnetCSharp · 1 条", "LearnLLM · 1 条", "算法研习室 · 1 条",
    ].sort());
    assert.equal(await fresh.page.evaluate(() => document.activeElement.id), "restore-confirm");
    await nothingWritten();
    await assertAccessible(fresh.page, "restore preview");

    await fresh.page.locator("#restore-cancel").click();
    assert.match(await status.textContent(), /已取消/u);
    assert.equal(await fresh.page.locator("#restore-preview").isVisible(), false);
    await nothingWritten();

    await fresh.page.locator("#restore-file").setInputFiles(backupFile);
    await Promise.all([fresh.page.waitForEvent("load"), fresh.page.locator("#restore-confirm").click()]);
    await settled(fresh.page);
    await fresh.page.waitForFunction(() => document.activeElement?.id === "backup-status");
    assert.match(await status.textContent(), /^恢复了 5 条记录/u);
    assert.equal(new URL(fresh.page.url()).hash, "#backup");
    const restored = await fresh.page.evaluate(() => Object.fromEntries(Object.entries(localStorage)));
    assert.deepEqual(restored, backup.localStorage);
    assert.equal(await fresh.page.evaluate(readAlgorithms), JSON.stringify(algorithms));
    assert.equal(await fresh.page.locator('.entry[data-course="algorithms"] [data-state]').textContent(), "1 / 22 单元");
    assert.equal(await fresh.page.locator('.entry[data-course="llm"] [data-state]').textContent(), "1 / 9 章");
    assert.equal(await fresh.page.locator(".entry[data-record]").count(), 5);
    assert.deepEqual(fresh.errors, []);
    await fresh.context.close();
  }

  // What the cards read from records that do not fit the simple case: IssueFlow with work but no finished day, its
  // due questions from two weeks, a .NET title saved with its heading anchor and a self-test as its newest work, a
  // design patterns item already finished.
  {
    // Exact multiples of a day, so "N 天前" does not depend on the hour the checks run.
    const ago = (days) => new Date(Date.now() - days * 86400000);
    const seed = {
      "csharp-design-patterns-progress-v3": JSON.stringify({
        version: 3,
        updatedAt: ago(3).toISOString(),
        items: { "pattern:strategy": { completed: { read: ago(3).toISOString(), run: ago(3).toISOString(), change: ago(3).toISOString(), verify: ago(3).toISOString() }, updatedAt: ago(3).toISOString() } },
        resume: { itemId: "pattern:strategy", taskId: "verify", updatedAt: ago(3).toISOString() },
      }),
      "issueflow:frontend-learning-project:progress:v1": JSON.stringify({
        app: "issueflow-learning-progress",
        schemaVersion: 1,
        exportedAt: daysAgo(0).toISOString(),
        days: [{ day: 1, completed: false, completedAt: null, minutes: 90, note: "读完了第一天的 HTTP 部分。", evidence: [] }, { day: 2, completed: false, completedAt: null, minutes: 0, note: "", evidence: [] }],
      }),
      "issueflow:frontend-learning-project:visits:v1": JSON.stringify({ app: "issueflow-learning-visits", schemaVersion: 1, pages: { "90-days/week-01-foundations": { readAt: ago(5).toISOString() } } }),
      "issueflow:frontend-learning-project:review:v1": JSON.stringify({
        app: "issueflow-learning-review",
        schemaVersion: 1,
        records: Object.fromEntries(["w05-q01", "w01-q03", "w05-q02"].map((id) => [id, { stage: 0, lastCorrect: false, lastAnsweredAt: ago(5).toISOString(), dueAt: ago(4).toISOString(), attempts: 1 }])),
      }),
      "learn-dotnet-csharp-learning-data-v1": JSON.stringify({
        version: 1, experiments: [], assessments: {}, copies: [], visited: [], sourceViews: [], runs: {},
        lastReading: { title: "#4.2 值类型与引用类型", url: "guide/chapter-04/#x" },
        quizzes: { "chapter-04": { revision: "r1", passedAt: daysAgo(0).toISOString() } },
      }),
    };
    const { context, page, errors } = await open(browser, { seed });
    const frontendCard = page.locator('.entry[data-course="frontend"]');
    assert.equal(await frontendCard.getAttribute("data-record"), "started", "work and visits are a record before any day is finished");
    assert.equal(await frontendCard.locator("[data-state]").textContent(), "0 / 2 天");
    assert.equal(await frontendCard.locator("[data-place]").textContent(), "第 1 天 · 5 天前", "the newest visit or answer, not the save time");
    assert.deepEqual(await page.locator("#review-list .review-label").allTextContents(), ["IssueFlow · 第 1、5 周周测"]);
    const dotnetCard = page.locator('.entry[data-course="dotnet"]');
    assert.equal(await dotnetCard.locator("[data-place]").textContent(), "4.2 值类型与引用类型 · 今天");
    assert.equal(await dotnetCard.getAttribute("aria-current"), "true", "a self-test passed today is the newest work");
    assert.equal(await page.locator('.entry[data-course="patterns"] [data-place]').textContent(), "Strategy 已完成，下一项见课程首页 · 3 天前");
    assert.equal(await page.locator("#stat-active").textContent(), "3");
    assert.equal(await page.locator("#stat-streak").textContent(), "1 天");
    assert.deepEqual(errors, []);
    await context.close();

    // IssueFlow rewrites exportedAt whenever its progress page is opened, so that time is not a study day.
    const opened = await open(browser, {
      seed: {
        "issueflow:frontend-learning-project:progress:v1": JSON.stringify({
          app: "issueflow-learning-progress", schemaVersion: 1, exportedAt: daysAgo(0).toISOString(),
          days: [{ day: 1, completed: true, completedAt: daysAgo(10).toISOString(), minutes: 120, note: "第一天的环境和地图都做完了。", evidence: ["https://example.test/1"] }],
        }),
        "dsa-learning-progress-v1": JSON.stringify(["core-sorting"]),
      },
    });
    assert.equal(await opened.page.locator("#stat-streak").textContent(), "0 天", "neither a save time nor the old algorithms list is a study day");
    assert.deepEqual(opened.errors, []);
    await opened.context.close();
  }

  // A finished design patterns item sends the reader to the course home, which knows the next item; with all 120
  // tasks done the place is simply finished.
  {
    const finished = { read: "2026-11-01T10:00:00.000Z", run: "2026-11-01T10:00:00.000Z", change: "2026-11-01T10:00:00.000Z", verify: "2026-11-01T10:00:00.000Z" };
    const record = (items) => JSON.stringify({ version: 3, updatedAt: daysAgo(0).toISOString(), items, resume: { itemId: "pattern:strategy", taskId: "verify", updatedAt: daysAgo(0).toISOString() } });
    const one = await open(browser, { seed: { "csharp-design-patterns-progress-v3": record({ "pattern:strategy": { completed: finished } }) } });
    const link = one.page.locator("#resume-line a");
    assert.equal(await link.textContent(), "C# 设计模式 · Strategy 已完成，下一项见课程首页");
    assert.equal(await link.getAttribute("href"), "/CSharp_Implementation_of_DesignPatterns/");
    assert.equal(await one.page.locator("#resume-go").getAttribute("href"), "/CSharp_Implementation_of_DesignPatterns/");
    assert.deepEqual(one.errors, []);
    await one.context.close();

    // 29 other items of four tasks plus Strategy: all 120 tasks.
    const rest = Object.fromEntries(Array.from({ length: 29 }, (_, index) => ["item:" + index, { completed: finished }]));
    const every = await open(browser, { seed: { "csharp-design-patterns-progress-v3": record({ ...rest, "pattern:strategy": { completed: finished } }) } });
    const card = every.page.locator('.entry[data-course="patterns"]');
    assert.equal(await card.locator("[data-state]").textContent(), "120 / 120 任务");
    assert.equal(await card.locator("[data-place]").textContent(), "全部完成 · 今天");
    assert.equal(await card.getAttribute("data-record"), "done");
    assert.deepEqual(every.errors, []);
    await every.context.close();
  }

  // Empty and malformed records never travel: a browser that only opened course pages has nothing to back up, and a
  // file's empty or malformed record is skipped instead of overwriting real progress.
  {
    const emptyStore = { schemaVersion: 4, generation: 0, revision: 0, units: {}, deleted: {} };
    const emptyDotnet = { version: 1, experiments: [], assessments: {}, copies: [], lastReading: null, visited: [], sourceViews: [], runs: {}, quizzes: {} };
    const blank = await open(browser, { seed: { "learn-dotnet-csharp-learning-data-v1": JSON.stringify(emptyDotnet) }, database: emptyStore });
    let downloaded = false;
    blank.page.on("download", () => { downloaded = true; });
    await blank.page.locator("#backup-all").click();
    await blank.page.waitForFunction(() => document.querySelector("#backup-status").textContent !== "");
    assert.match(await blank.page.locator("#backup-status").textContent(), /还没有学习记录/u);
    await blank.page.waitForTimeout(300);
    assert.equal(downloaded, false, "nothing to save");
    await blank.context.close();

    const backupFile = (localStorage, store) => ({
      name: "hand-made.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ format: "yuweiyang9611-learning-backup", version: 1, exportedAt: new Date().toISOString(), localStorage, indexedDB: { "dsa-learning-progress": { progress: { current: store } } } })),
    });
    const { context, page, errors } = await open(browser, { database: algorithms });
    await page.locator("#restore-file").setInputFiles(backupFile({ "learn-llm-progress-v1": JSON.stringify(llm), "learn-dotnet-csharp-learning-data-v1": JSON.stringify(emptyDotnet) }, emptyStore));
    await page.locator("#restore-preview").waitFor();
    assert.deepEqual(await page.locator("#restore-list li").allTextContents(), ["LearnLLM · 1 条"]);
    assert.match(await page.locator("#backup-status").textContent(), /有 2 条是空记录/u);
    await page.locator("#restore-cancel").click();
    const malformed = { ...algorithms, units: { ...algorithms.units, "core-sorting": null } };
    await page.locator("#restore-file").setInputFiles(backupFile({ "learn-llm-progress-v1": JSON.stringify(llm) }, malformed));
    await page.locator("#restore-preview").waitFor();
    assert.deepEqual(await page.locator("#restore-list li").allTextContents(), ["LearnLLM · 1 条"]);
    await Promise.all([page.waitForEvent("load"), page.locator("#restore-confirm").click()]);
    await settled(page);
    assert.equal(await page.evaluate(readAlgorithms), JSON.stringify(algorithms), "the real algorithms record is untouched");
    assert.equal(await page.locator('.entry[data-course="llm"] [data-state]').textContent(), "1 / 9 章");
    assert.deepEqual(errors, []);
    await context.close();
  }

  // A restore writes a course's current key before its older ones, so an open course tab never migrates the old key
  // over the restored record; after the reload the result is focused for a screen reader.
  {
    const { context, page, errors } = await open(browser);
    const file = {
      name: "order.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({
        format: "yuweiyang9611-learning-backup", version: 1, exportedAt: new Date().toISOString(),
        localStorage: { "csharp-design-patterns-progress-v1": JSON.stringify(["strategy"]), "csharp-design-patterns-progress-v2": JSON.stringify({ version: 2, items: { strategy: 2 } }), "csharp-design-patterns-progress-v3": records["csharp-design-patterns-progress-v3"] },
        indexedDB: {},
      })),
    };
    await page.locator("#restore-file").setInputFiles(file);
    await page.evaluate(() => {
      const write = Storage.prototype.setItem;
      localStorage.setItem = (key, value) => {
        write.call(sessionStorage, "write-order", (sessionStorage.getItem("write-order") ?? "") + key + "\n");
        write.call(localStorage, key, value);
      };
    });
    await Promise.all([page.waitForEvent("load"), page.locator("#restore-confirm").click()]);
    await settled(page);
    const order = (await page.evaluate(() => sessionStorage.getItem("write-order"))).trim().split("\n");
    assert.deepEqual(order, ["csharp-design-patterns-progress-v3", "csharp-design-patterns-progress-v2", "csharp-design-patterns-progress-v1"]);
    await page.waitForFunction(() => document.activeElement?.id === "backup-status");
    assert.match(await page.locator("#backup-status").textContent(), /^恢复了 3 条记录/u);
    assert.deepEqual(errors, []);
    await context.close();
  }

  // With site data blocked nothing can be written: the page says so where the reader is and does not reload.
  {
    const { context, page, errors } = await open(browser, {
      init: () => { Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); }; },
    });
    await page.locator("#restore-file").setInputFiles({
      name: "llm.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ format: "yuweiyang9611-learning-backup", version: 1, localStorage: { "learn-llm-progress-v1": JSON.stringify(llm) }, indexedDB: {} })),
    });
    await page.locator("#restore-confirm").click();
    await page.waitForFunction(() => /一条记录也没写进去/u.test(document.querySelector("#backup-status").textContent));
    assert.equal(new URL(page.url()).hash, "", "no reload");
    assert.equal(await page.evaluate(() => document.activeElement.id), "backup-status");
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
        // Code panel: every code colour on the code paper and on a marked line.
        for (const text of ["code-ink", "code-soft", "code-green", "code-cyan", "code-blue", "code-purple"]) for (const back of ["code-paper", "code-mark"]) pairs.push([text, back]);
        return pairs.filter(([text, back]) => ratio(token(text), token(back)) < 7).map((pair) => pair.join(" on "));
      }, scheme);
      assert.deepEqual(weak, [], `${scheme} scheme has text below 7:1`);
    }
    await context.close();
  }

  // Phone width
  {
    const seed = { ...records, "csharp-design-patterns-review-v1": JSON.stringify(patternsReview), "issueflow:frontend-learning-project:review:v1": JSON.stringify(frontendReview) };
    const { context, page, errors } = await open(browser, { seed, viewport: { width: 390, height: 844 } });
    assert.equal(await page.locator("#review-list .review-item").count(), 2);
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
