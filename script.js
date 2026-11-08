const searchInput = document.querySelector("#project-search");
const entries = Array.from(document.querySelectorAll(".entry"));
const filters = Array.from(document.querySelectorAll(".filter"));
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const resumeLine = document.querySelector("#resume-line");
let activeFilter = "all";

function updateEntries() {
  const query = searchInput.value.trim().toLocaleLowerCase("zh-CN");
  let visible = 0;

  entries.forEach((entry) => {
    const matchesFilter = activeFilter === "all" || entry.dataset.category === activeFilter;
    const text = (entry.dataset.search + " " + entry.textContent).toLocaleLowerCase("zh-CN");
    entry.hidden = !(matchesFilter && (!query || text.includes(query)));
    if (!entry.hidden) visible += 1;
  });

  resultsCount.textContent = "显示 " + visible + " 个项目";
  emptyState.hidden = visible !== 0;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    updateEntries();
  });
});

searchInput.addEventListener("input", updateEntries);

document.addEventListener("keydown", (event) => {
  const focused = document.activeElement;
  const typing = focused && ["INPUT", "TEXTAREA", "SELECT"].includes(focused.tagName);

  if (event.key === "/" && !typing) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && focused === searchInput) {
    searchInput.value = "";
    updateEntries();
    searchInput.blur();
  }
});

// All the sites share this origin, so the index can read their progress. It only ever reads, with one
// exception the reader asks for and confirms: restoring a backup file (see the end of this file).
// Each course owns its key and format.
function readRecord(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

function timestamp(value) {
  const time = typeof value === "string" ? Date.parse(value) : NaN;
  return Number.isNaN(time) ? 0 : time;
}

function plural(value) {
  return Array.isArray(value) ? value : [];
}

function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function titleFromId(id) {
  return id
    .replace(/^[a-z]+:/u, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const patternTasks = [
  ["read", "说清变化轴"],
  ["run", "运行并核对输出"],
  ["change", "制造一个最小变化"],
  ["verify", "验证并解释取舍"],
];

// The loop band every course draws at the top of a lesson (kit .nb-steps). A step's number counts the
// steps a lesson lacks too, because the band keeps all five pills and dashes the missing ones.
const loopSteps = [["read", "读"], ["code", "看代码"], ["run", "跑"], ["quiz", "自测"], ["note", "记一笔"]];

function stepText(index) {
  return "第 " + (index + 1) + " 步：" + loopSteps[index][1];
}

const courses = {
  patterns() {
    const record = readRecord("csharp-design-patterns-progress-v3");
    if (record?.version !== 3 || !record.items || typeof record.items !== "object") return null;
    const done = Object.values(record.items).reduce((sum, item) => sum + Object.keys(item?.completed ?? {}).length, 0);
    if (done === 0) return null;
    const base = "/CSharp_Implementation_of_DesignPatterns/";
    const itemId = typeof record.resume?.itemId === "string" ? record.resume.itemId : null;
    let place = itemId ? titleFromId(itemId) : "继续学习";
    let href = base;
    if (itemId?.startsWith("pattern:")) {
      const next = patternTasks.find(([id]) => !record.items[itemId]?.completed?.[id]);
      if (next) {
        place += " · " + next[1];
        href = base + "patterns/" + encodeURIComponent(itemId.slice(8)) + ".html#evidence-" + next[0];
      } else {
        // The course moves on from a finished item to the first unfinished one in its catalog, which the index does
        // not copy; the course's home page shows that place. With every task done there is no next item.
        place = done >= 120 ? "全部完成" : place + " 已完成，下一项见课程首页";
      }
    }
    return {
      course: "C# 设计模式",
      place,
      href,
      state: done + " / 120 任务",
      done,
      fraction: done / 120,
      at: timestamp(record.resume?.updatedAt) || timestamp(record.updatedAt),
    };
  },

  // IssueFlow keeps three records: the 91 days, lesson visits and weekly-check answers. Like the course's home page
  // (CourseHome.vue), the card has a record once any day has work, any lesson was visited or any question answered,
  // and its time is the newest of all three.
  frontend() {
    const record = readRecord("issueflow:frontend-learning-project:progress:v1");
    const visits = readRecord("issueflow:frontend-learning-project:visits:v1");
    const review = readRecord("issueflow:frontend-learning-project:review:v1");
    const days = record?.schemaVersion === 1 ? plural(record.days) : [];
    const pages = visits?.app === "issueflow-learning-visits" && visits.schemaVersion === 1 && object(visits.pages) ? Object.values(visits.pages) : [];
    const answers = review?.app === "issueflow-learning-review" && review.schemaVersion === 1 && object(review.records) ? Object.values(review.records) : [];
    const worked = (day) => day?.completed === true || Number(day?.minutes) > 0 || (typeof day?.note === "string" && day.note.trim() !== "") || plural(day?.evidence).length > 0;
    if (!days.some(worked) && pages.length === 0 && answers.length === 0) return null;
    const done = days.filter((day) => day?.completed === true);
    const total = days.length || 91;
    const next = days.find((day) => day?.completed !== true);
    const times = [
      ...done.map((day) => timestamp(day.completedAt)),
      ...pages.flatMap((page) => (object(page) ? ["readAt", "codeAt", "ranAt"].map((field) => timestamp(page[field])) : [])),
      ...answers.map((answer) => timestamp(answer?.lastAnsweredAt)),
    ];
    return {
      course: "IssueFlow",
      place: next ? "第 " + next.day + " 天" : days.length ? "全部完成" : "第 1 天",
      href: "/frontend-learning-project/",
      state: done.length + " / " + total + " 天",
      done: done.length,
      fraction: done.length / total,
      at: Math.max(0, ...times),
    };
  },

  dotnet() {
    const record = readRecord("learn-dotnet-csharp-learning-data-v1");
    if (record?.version !== 1) return null;
    const experiments = plural(record.experiments).length;
    const reading = typeof record.lastReading?.title === "string" ? record.lastReading : null;
    if (experiments === 0 && !reading) return null;
    const quizzes = object(record.quizzes) ? Object.values(record.quizzes) : [];
    return {
      course: "LearnDotnetCSharp",
      // Positions saved before 2026-11-03 kept the heading's # anchor in the title; the course strips it too.
      place: reading ? reading.title.replace(/^#\s*/u, "") : "实验目录",
      href: "/LearnDotnetCSharp/" + (typeof reading?.url === "string" ? reading.url : ""),
      state: experiments + " / 53 实验",
      done: experiments,
      fraction: experiments / 53,
      at: Math.max(0, ...Object.values(object(record.runs) ? record.runs : {}).map((run) => timestamp(run?.ranAt)), ...quizzes.map((quiz) => timestamp(quiz?.passedAt))),
    };
  },

  // The algorithms course keeps its record in IndexedDB (database dsa-learning-progress, store
  // progress, key current). This mirrors the course's own reader, readCourse in record.ts: a unit
  // counts once verified at the current mastery revision, and the place to continue is the earliest
  // touched unit in course order whose loop band still has a step to do (whatever its status), else
  // the first unit still to verify, else the earliest review due, else the first unit whose
  // prerequisites are all verified.
  async algorithms() {
    const store = await algorithmsStore();
    const units = object(store?.units) ? store.units : {};
    const ids = Object.keys(units);
    if (ids.length === 0) return null;
    const now = Date.now();
    const status = (id) => algorithmStatus(units[id], now);
    const mastered = (id) => status(id) === "verified" || status(id) === "review";
    const verified = algorithmUnits.filter(([id]) => mastered(id)).length;
    const stopped = algorithmUnits.find(([id]) => object(units[id]) && algorithmStep(units[id]) >= 0);
    const unverified = algorithmUnits.find(([id]) => status(id) === "learning");
    const due = algorithmDue(units, now)[0];
    const next = algorithmUnits.find(([id, , prerequisites]) => status(id) === "not-started" && prerequisites.every(mastered));
    const stop = stopped ?? unverified ?? due ?? next;
    const base = "/DataStructureAndAlgorithm/学习单元.html";
    let place = "全部完成";
    if (stopped) place = stopped[1] + " · " + (status(stopped[0]) === "review" ? "复习到期 · " : "") + stepText(algorithmStep(units[stopped[0]]));
    else if (unverified) place = unverified[1] + " · 验证掌握";
    else if (due) place = due[1] + " · 复习到期";
    else if (next) place = next[1] + " · 下一个单元";
    return {
      course: "算法研习室",
      place,
      href: stop ? base + "#unit-" + stop[0] : base,
      state: verified + " / 22 单元",
      done: verified,
      fraction: verified / 22,
      at: Math.max(0, ...ids.map((id) => Number(units[id]?.updatedAt) || 0)),
    };
  },

  // LearnLLM keeps one record (learn-llm-progress-v1) with a time per band step and chapter. This mirrors its
  // progress.js: a chapter is finished when every step it has is done, and the place to continue is the earliest
  // chapter with a step still to do. A passed quiz counts only while its revision matches the chapter's current
  // questions, which the course's own question bank tells (see llmQuizBank).
  async llm() {
    const record = readRecord("learn-llm-progress-v1");
    if (record?.version !== 1 || !object(record.chapters)) return null;
    const chapters = record.chapters;
    if (!llmChapters.some(([id]) => object(chapters[id]))) return null;
    const bank = llmChapters.some(([id]) => object(chapters[id]) && chapters[id].quizPassedAt) ? await llmQuizBank() : null;
    const quizCurrent = (id, entry) => Boolean(entry.quizPassedAt) && (!bank || entry.quizRevision === bank.revision(id));
    const nextStep = ([id, , , panel, run]) => {
      const entry = object(chapters[id]) ? chapters[id] : {};
      const done = [entry.readAt, entry.codeAt, entry.ranAt, quizCurrent(id, entry), typeof entry.note === "string" && entry.note.trim()];
      const lacks = [false, !panel, !run, false, false];
      return loopSteps.findIndex((step, index) => !lacks[index] && !done[index]);
    };
    const finished = llmChapters.filter((chapter) => nextStep(chapter) < 0).length;
    const stop = llmChapters.find((chapter) => nextStep(chapter) >= 0);
    const base = "/LearnLLM/";
    const times = Object.values(chapters).flatMap((entry) => (object(entry) ? ["readAt", "codeAt", "ranAt", "quizPassedAt", "noteAt"].map((field) => timestamp(entry[field])) : []));
    return {
      course: "LearnLLM",
      place: stop ? stop[0] + " " + stop[1] + " · " + stepText(nextStep(stop)) : "全部完成",
      href: stop ? base + encodeURIComponent(stop[2]) + "/" + llmStepAnchors[nextStep(stop)] : base,
      state: finished + " / 9 章",
      done: finished,
      fraction: finished / 9,
      at: Math.max(0, ...times),
    };
  },
};

// Where each band step lives on a LearnLLM chapter page, from the course's loop-site.js.
const llmStepAnchors = ["", "#llm-source", "#llm-source", "#llm-quiz", "#llm-notepad"];

// LearnLLM stores a passed quiz with the revision of the chapter's questions, a hash its quiz-bank.js computes, and
// a changed question asks for the quiz again. Rather than copy hashes that go stale with every edit to the bank,
// the index loads the course's own file, once and only when the record holds a passed quiz, and asks it as the
// course does (window.LlmQuizBank.revision). When the file cannot be loaded in time the pass counts, as it does on
// the course without its bank. The index paints only once every reader has answered, so while the file loads the
// whole page waits, not just the LearnLLM card: a failed request answers at once, and one that never answers holds
// the page for three seconds at most.
const llmQuizBankUrl = "/LearnLLM/javascripts/quiz-bank.js";
const llmQuizBankWait = 3000;
let llmQuizBankLoad = null;

function llmQuizBank() {
  llmQuizBankLoad ??= new Promise((resolve) => {
    const ready = () => (typeof window.LlmQuizBank?.revision === "function" ? window.LlmQuizBank : null);
    if (ready()) {
      resolve(ready());
      return;
    }
    const script = document.createElement("script");
    const finish = () => {
      clearTimeout(timer);
      resolve(ready());
    };
    const timer = setTimeout(finish, llmQuizBankWait);
    script.src = llmQuizBankUrl;
    script.addEventListener("load", finish);
    script.addEventListener("error", finish);
    document.head.append(script);
  });
  return llmQuizBankLoad;
}

// LearnLLM's nine chapters: id, title, page, whether the chapter has a code panel and a script that runs in the
// browser. Copied from the course's mkdocs.yml and docs/javascripts/progress.js.
const llmChapters = [
  ["00", "学习路线与环境", "00_学习路线与环境", true, false],
  ["01", "数学与 PyTorch 基础", "01_数学与PyTorch基础", true, false],
  ["02", "Tokenizer 与语言模型", "02_Tokenizer与语言模型", true, true],
  ["03", "注意力与 Transformer", "03_注意力与Transformer", true, false],
  ["04", "模型家族与训练生命周期", "04_模型家族与训练生命周期", false, false],
  ["05", "迷你 GPT 预训练与生成", "05_迷你GPT预训练与生成", true, false],
  ["06", "SFT、LoRA 与对齐", "06_SFT_LoRA与对齐", true, false],
  ["07", "评测、RAG 与 Agent", "07_评测_RAG与Agent", true, true],
  ["08", "结课项目", "08_结课项目", true, false],
];

// The course's 22 units in the order its units page teaches them (stage order, corrected so no unit
// comes before a prerequisite), each with its prerequisites. Copied from learningUnits.ts and record.ts.
const algorithmUnits = [
  ["core-linear-structures", "链表、栈、队列与双端队列", []],
  ["core-array-search", "数组模式、Span 与二分查找", []],
  ["core-sorting", "比较排序与非比较排序", ["core-array-search"]],
  ["advanced-ordered-trees", "BST、AVL、红黑树与跳表", ["core-linear-structures"]],
  ["advanced-heap-ipq", "二叉堆与索引优先队列", ["core-array-search"]],
  ["advanced-hash-tables", "链地址与开放寻址哈希表", ["core-array-search"]],
  ["advanced-disjoint-set", "并查集与动态连通性", ["core-linear-structures"]],
  ["advanced-caching", "LRU 与 LFU 缓存", ["core-linear-structures", "advanced-hash-tables"]],
  ["advanced-range-query", "Fenwick、线段树、Sparse Table 与懒标记", ["core-array-search"]],
  ["core-trie-kmp", "Trie 与 KMP 单模式匹配", ["core-linear-structures"]],
  ["core-weighted-graphs", "加权图、最短路与最小生成森林", ["advanced-heap-ipq", "advanced-disjoint-set"]],
  ["core-dynamic-programming", "动态规划：线性、区间、树形与状态压缩", ["core-array-search", "core-linear-structures"]],
  ["core-backtracking", "回溯与组合搜索", ["core-linear-structures"]],
  ["advanced-connectivity-flow", "全源最短路、低链接、A* 与费用流", ["core-weighted-graphs"]],
  ["p3-number-theory-bit", "数论与位运算", ["core-array-search"]],
  ["p3-string-indexes", "高级字符串与文本索引", ["core-trie-kmp", "core-dynamic-programming"]],
  ["p3-graph-algorithms", "Johnson、匹配、欧拉路径、LCA 与最大流", ["core-weighted-graphs", "advanced-connectivity-flow"]],
  ["practice-leetcode-100", "LeetCode 100 题分型训练", ["core-array-search", "core-linear-structures", "core-trie-kmp", "core-dynamic-programming", "core-backtracking"]],
  ["project-city-delivery", "城市即时配送 V2", ["advanced-hash-tables", "advanced-caching", "advanced-disjoint-set", "advanced-heap-ipq", "advanced-connectivity-flow"]],
  ["project-mini-search", "迷你搜索引擎 V2", ["core-linear-structures", "advanced-hash-tables", "core-trie-kmp", "advanced-heap-ipq", "advanced-caching", "p3-string-indexes"]],
  ["project-scheduling", "项目调度 V2", ["advanced-hash-tables", "advanced-heap-ipq", "advanced-range-query", "core-weighted-graphs", "core-dynamic-programming"]],
  ["project-mini-storage", "迷你存储引擎", ["advanced-ordered-trees", "advanced-caching", "advanced-hash-tables"]],
];
const algorithmEvidence = ["invariant", "test", "transfer"];
const algorithmRevision = 1;
const algorithmDatabase = "dsa-learning-progress";

// statusOf from the course's progress.ts.
function algorithmStatus(record, now) {
  if (!record || typeof record !== "object") return "not-started";
  const evidence = record.evidenceRevision === algorithmRevision ? plural(record.evidenceIds) : [];
  const complete = algorithmEvidence.every((id) => evidence.includes(id));
  if (!record.verifiedAt || record.verifiedRevision !== algorithmRevision || !complete) return "learning";
  return record.nextReviewAt && record.nextReviewAt <= now ? "review" : "verified";
}

// The first step of a unit's loop band still to do (band.ts: read, code, run, a self-check passed at the current
// revision, a note), or -1 when all five are done.
function algorithmStep(record) {
  const done = [record?.startedAt, record?.sourceOpenedAt, record?.ranAt, record?.selfTestPassedAt && record.selfTestRevision === algorithmRevision, typeof record?.note === "string" && record.note.trim()];
  return done.findIndex((value) => !value);
}

// Units whose mastery review is due, earliest first.
function algorithmDue(units, now) {
  return algorithmUnits
    .filter(([id]) => algorithmStatus(units[id], now) === "review")
    .sort(([left], [right]) => (Number(units[left]?.nextReviewAt) || 0) - (Number(units[right]?.nextReviewAt) || 0));
}

// The record is read once per page load and shared by the card, the reviews and the streak.
let algorithmsRead = null;
function algorithmsStore() {
  algorithmsRead ??= (async () => {
    let store = null;
    try {
      store = await readAlgorithmsStore();
    } catch {
      store = null;
    }
    return store?.revision > 0 || store?.generation > 0 ? store : legacyAlgorithmsStore();
  })();
  return algorithmsRead;
}

// Opening a database that does not exist would create an empty one without the course's object
// store and break its units page. So the index asks for the list of databases first, opens the
// course's only when it is already there, at the course's own version, with no upgrade handler,
// and only ever reads from it here.
async function readAlgorithmsStore() {
  const factory = globalThis.indexedDB;
  if (typeof factory?.databases !== "function") return null;
  const listed = (await factory.databases()).some((database) => database.name === algorithmDatabase);
  if (!listed) return null;
  const database = await new Promise((resolve, reject) => {
    const request = factory.open(algorithmDatabase, 1);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("blocked"));
    request.onsuccess = () => resolve(request.result);
  });
  try {
    database.onversionchange = () => database.close();
    if (!database.objectStoreNames.contains("progress")) return null;
    return await new Promise((resolve, reject) => {
      const request = database.transaction("progress", "readonly").objectStore("progress").get("current");
      request.onsuccess = () => resolve(request.result && typeof request.result === "object" ? request.result : null);
      request.onerror = () => reject(request.error);
    });
  } finally {
    database.close();
  }
}

// Before IndexedDB the course kept a backup-shaped record (v2) or a list of finished unit ids (v1)
// in localStorage; its reader still falls back to them, so this does too.
function legacyAlgorithmsStore() {
  const units = {};
  try {
    const v2 = localStorage.getItem("dsa-learning-progress-v2");
    if (v2 !== null) {
      const backup = readRecord("dsa-learning-progress-v2");
      const entries = backup?.schemaVersion === 2 && backup.units && typeof backup.units === "object"
        ? Object.entries(backup.units).map(([id, record]) => ({ id, record }))
        : backup?.schemaVersion === 3 ? plural(backup.records) : [];
      for (const entry of entries) {
        if (typeof entry?.id === "string" && entry.record && typeof entry.record === "object") units[entry.id] = entry.record;
      }
      return { units, synthetic: true };
    }
    const now = Date.now();
    for (const id of plural(readRecord("dsa-learning-progress-v1"))) {
      if (typeof id === "string" && algorithmUnits.some(([known]) => known === id)) {
        units[id] = { evidenceIds: [], reviewRound: 0, legacyCompleted: true, startedAt: now, updatedAt: now };
      }
    }
  } catch {
    // Storage can be disabled.
  }
  // Made up here from the old lists, with today's time on every unit: the streak must not count it.
  return { units, synthetic: true };
}

// Today's reviews: the three courses that schedule them. Only questions already answered once count; a question
// never answered is new work, not a review.
const reviews = {
  patterns() {
    const record = readRecord("csharp-design-patterns-review-v1");
    if (record?.version !== 1 || !object(record.questions)) return null;
    const now = Date.now();
    const count = Object.values(record.questions)
      .filter((question) => object(question) && Number.isFinite(question.lastAnsweredAt) && Number.isFinite(question.dueAt) && question.dueAt <= now)
      .length;
    return count ? { course: "C# 设计模式", hue: "purple", count, unit: "题", label: "辨析训练 · 到期题", href: "/CSharp_Implementation_of_DesignPatterns/quiz.html" } : null;
  },

  frontend() {
    const record = readRecord("issueflow:frontend-learning-project:review:v1");
    if (record?.app !== "issueflow-learning-review" || record.schemaVersion !== 1 || !object(record.records)) return null;
    const now = new Date().toISOString();
    const due = Object.entries(record.records)
      .filter(([, question]) => object(question) && typeof question.dueAt === "string" && question.dueAt <= now)
      .sort(([, left], [, right]) => (left.dueAt < right.dueAt ? -1 : 1));
    if (due.length === 0) return null;
    const weeks = [...new Set(due.map(([id]) => Number(/^w(\d+)-/u.exec(id)?.[1])).filter(Number.isFinite))].sort((left, right) => left - right);
    let label = "错题复习";
    if (weeks.length) label = "第 " + weeks.slice(0, 3).join("、") + (weeks.length > 3 ? " 等" : "") + " 周周测";
    return {
      course: "IssueFlow",
      hue: "green",
      count: due.length,
      unit: "题",
      label,
      href: "/frontend-learning-project/90-days/review-center.html",
    };
  },

  async algorithms() {
    const store = await algorithmsStore();
    const due = algorithmDue(object(store?.units) ? store.units : {}, Date.now());
    if (due.length === 0) return null;
    return {
      course: "算法研习室",
      hue: "cyan",
      count: due.length,
      unit: "个单元",
      label: due[0][1] + " · 掌握复习",
      href: "/DataStructureAndAlgorithm/学习单元.html#unit-" + due[0][0],
    };
  },
};

// Every key a course keeps on this origin starts with its own prefix. Backups cover exactly these keys plus the
// algorithms course's IndexedDB record; the scheme choice (site-theme) is a preference, not a record, and stays out.
const recordPrefixes = [
  ["csharp-design-patterns-", "C# 设计模式"],
  ["dsa-learning-progress", "算法研习室"],
  ["issueflow:", "IssueFlow 学习站"],
  ["issueflow-", "IssueFlow 学习站"],
  ["learn-dotnet-csharp-", "LearnDotnetCSharp"],
  ["learn-llm-", "LearnLLM"],
];

// Courses write records that hold nothing when a page is merely opened (the algorithms units page stores an empty
// store, the .NET course an empty record). Such a record is not progress: a backup leaves it out and a restore skips
// it, so it can never overwrite real progress in another browser. Bookkeeping fields do not count as content.
const bookkeeping = new Set(["version", "schemaVersion", "app", "format", "exportedAt", "updatedAt", "generation", "revision", "day"]);
function holdsProgress(value) {
  if (value === null || value === undefined || value === "" || value === 0 || value === false) return false;
  if (Array.isArray(value)) return value.some(holdsProgress);
  if (typeof value === "object") return Object.entries(value).some(([key, child]) => !bookkeeping.has(key) && holdsProgress(child));
  return true;
}

function rawHoldsProgress(raw) {
  try {
    return holdsProgress(JSON.parse(raw));
  } catch {
    return typeof raw === "string" && raw.trim() !== "";
  }
}

// A course migrates an older key (…-v1, …-v2) into its current one when it finds no current key, and an open course
// tab reacts to the storage event. So the restore writes the newest version of a key first, and the older ones
// after, when the tab can already see the current record.
function writeOrder([left], [right]) {
  const version = (key) => Number(/-v(\d+)(?=:|$)/u.exec(key)?.[1] ?? 0);
  return version(right) - version(left) || (left < right ? -1 : 1);
}

function courseOfKey(key) {
  return recordPrefixes.find(([prefix]) => key.startsWith(prefix))?.[1] ?? null;
}

function storedRecords() {
  const records = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key !== null && courseOfKey(key)) records.push([key, localStorage.getItem(key)]);
    }
  } catch {
    // Storage can be disabled.
  }
  return records.sort(([left], [right]) => (left < right ? -1 : 1));
}

function dayKey(time) {
  const date = new Date(time);
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
}

// The streak counts the days, in this browser's time zone, on which any course recorded something: a time under a
// key ending in At (readAt, ranAt, completedAt, lastAnsweredAt, updatedAt…) or a finished task in the design
// patterns record. Times in the future (dueAt, nextReviewAt) are plans, not work, and are skipped, and so is
// exportedAt, a save time that IssueFlow rewrites just because its progress page was opened.
function activityDays(records) {
  const days = new Set();
  const earliest = Date.UTC(2020, 0, 1);
  const latest = Date.now() + 60000;
  const add = (value) => {
    const time = typeof value === "number" ? value : typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/u.test(value) ? Date.parse(value) : NaN;
    if (Number.isFinite(time) && time > earliest && time <= latest) days.add(dayKey(time));
  };
  const walk = (value, key, parent, depth) => {
    if (value === null || value === undefined || depth > 8) return;
    if (typeof value === "object") {
      for (const [childKey, child] of Object.entries(value)) walk(child, childKey, key, depth + 1);
      return;
    }
    if (/^(due|nextReview)/iu.test(key) || key === "exportedAt") return;
    if (/At$/u.test(key) || parent === "completed") add(value);
  };
  for (const record of records) walk(record, "", "", 0);
  return days;
}

function streakOf(days) {
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  // Today still counts as kept until it ends, so a streak runs from yesterday when today has no record yet.
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// A time's calendar day in this browser's time zone as a whole number, so two days subtract to the number of
// midnights between them. Date.UTC over the local date keeps daylight-saving shifts out of the count.
function dayNumber(time) {
  const date = new Date(time);
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;
}

// How long ago, in calendar days in this browser's time zone, the same days the streak counts: anything since
// midnight is 今天 and anything on the day before is 昨天, however few hours ago it was.
function whenText(time) {
  if (!time) return "";
  const days = dayNumber(Date.now()) - dayNumber(time);
  if (days <= 0) return "今天";
  return days === 1 ? "昨天" : days + " 天前";
}

async function settle(readers) {
  return Promise.all(readers.map(async (reader) => {
    try {
      return reader ? await reader() : null;
    } catch {
      return null;
    }
  }));
}

function showReviews(due) {
  const list = document.querySelector("#review-list");
  const empty = document.querySelector("#review-empty");
  const total = due.reduce((sum, item) => sum + item.count, 0);
  document.querySelector("#stat-due").textContent = String(total);
  list.replaceChildren(...due.map((item) => {
    const row = document.createElement("li");
    row.className = "review-item nb-stat";
    row.dataset.hue = item.hue;
    const count = document.createElement("p");
    count.className = "review-count";
    count.textContent = item.count + " " + item.unit;
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.course;
    const label = document.createElement("p");
    label.className = "review-label";
    label.append(link, " · " + item.label);
    row.append(count, label);
    return row;
  }));
  list.hidden = due.length === 0;
  empty.hidden = due.length !== 0;
}

async function showProgress() {
  let latest = null;
  let doneUnits = 0;
  let active = 0;

  // Every record is read before anything is painted, so the stats, the banner, the reviews and the stopped card
  // agree. Two readers are asynchronous: the algorithms reader (IndexedDB) and LearnLLM's, which waits up to three
  // seconds for the course's question bank when the record holds a passed quiz. The others resolve at once.
  const read = await settle(entries.map((entry) => courses[entry.dataset.course]));
  const due = (await settle(Object.values(reviews))).filter(Boolean).sort((left, right) => right.count - left.count);
  showReviews(due);

  const store = await algorithmsStore();
  const days = activityDays([...storedRecords().map(([, value]) => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }), store?.synthetic ? null : store]);
  document.querySelector("#stat-streak").textContent = streakOf(days) + " 天";

  entries.forEach((entry, index) => {
    const progress = read[index];
    if (!progress) return;
    const fraction = Math.min(1, Math.max(0, progress.fraction));
    entry.dataset.record = fraction >= 1 ? "done" : "started";
    entry.style.setProperty("--nb-fraction", String(fraction));
    const ring = entry.querySelector("[data-ring]");
    if (ring) {
      const percent = Math.round(fraction * 100) + "%";
      ring.style.setProperty("--nb-fraction", String(fraction));
      ring.querySelector("span").textContent = percent;
      ring.setAttribute("aria-label", "完成 " + percent);
    }
    entry.querySelector("[data-state]").textContent = progress.state;
    entry.querySelector("[data-place]").textContent = [progress.place, whenText(progress.at)].filter(Boolean).join(" · ");
    doneUnits += progress.done;
    active += 1;
    if (!latest || progress.at > latest.progress.at) latest = { entry, progress };
  });

  if (!latest) return;
  document.querySelector("#stat-done").textContent = String(doneUnits);
  document.querySelector("#stat-active").textContent = String(active);

  const { entry, progress } = latest;
  entry.setAttribute("aria-current", "true");
  const stopped = document.createElement("p");
  stopped.className = "nb-stopped";
  stopped.textContent = "停在这里";
  entry.querySelector(".nb-card-body").prepend(stopped);

  resumeLine.closest(".resume").classList.add("has-record");
  const link = document.createElement("a");
  link.href = progress.href;
  link.textContent = progress.course + " · " + progress.place;
  const meta = document.createElement("span");
  meta.className = "resume-meta";
  meta.textContent = [progress.state, whenText(progress.at)].filter(Boolean).join(" · ");
  resumeLine.replaceChildren(link, meta);
  const go = document.querySelector("#resume-go");
  go.href = progress.href;
  go.hidden = false;
}

// Backup and restore. One file holds every course's localStorage keys (as the strings the courses wrote) and the
// algorithms course's IndexedDB record. Restoring is the one place the index writes another site's record, and it
// does so only after the reader has seen what the file holds and pressed 覆盖并恢复.
const backupFormat = "yuweiyang9611-learning-backup";
const backupStatus = document.querySelector("#backup-status");
const restoreFile = document.querySelector("#restore-file");
const restorePreview = document.querySelector("#restore-preview");
const restoreNoteKey = "learning-desk-restored";
let pendingRestore = null;

function say(text, state = "") {
  backupStatus.textContent = text;
  backupStatus.dataset.state = state;
}

async function backupAll() {
  const local = storedRecords().filter(([, value]) => rawHoldsProgress(value));
  let store = null;
  try {
    store = await readAlgorithmsStore();
  } catch {
    store = null;
  }
  if (!holdsProgress(store)) store = null;
  if (local.length === 0 && !store) {
    say("这个浏览器里还没有学习记录，没有可备份的内容。");
    return;
  }
  const payload = {
    format: backupFormat,
    version: 1,
    exportedAt: new Date().toISOString(),
    site: "https://yuweiyang9611.github.io/",
    localStorage: Object.fromEntries(local),
    indexedDB: store ? { [algorithmDatabase]: { progress: { current: store } } } : {},
  };
  const name = "learning-backup-" + dayKey(Date.now()) + ".json";
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2) + "\n"], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const courseCount = new Set([...local.map(([key]) => courseOfKey(key)), ...(store ? ["算法研习室"] : [])]).size;
  say("已备份 " + (local.length + (store ? 1 : 0)) + " 条记录，涉及 " + courseCount + " 门课，文件名 " + name + "。", "done");
}

// Reads a backup file into what would be written, or says why it cannot be used. Keys outside the courses'
// prefixes and records of the wrong shape are left out and counted, never written.
function parseBackup(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { error: "这个文件不是 JSON，没法恢复。" };
  }
  if (!object(data) || data.format !== backupFormat) {
    return { error: "这不是学习台的备份文件。某一门课自己导出的备份，请到那门课的页面里恢复。" };
  }
  if (data.version !== 1) return { error: "这份备份的版本是 " + String(data.version) + "，这个页面只认识版本 1。" };
  const local = [];
  let ignored = 0;
  for (const [key, value] of Object.entries(object(data.localStorage) ? data.localStorage : {})) {
    if (courseOfKey(key) && typeof value === "string" && value.length <= 2 * 1024 * 1024 && rawHoldsProgress(value)) local.push([key, value]);
    else ignored += 1;
  }
  let store = data.indexedDB?.[algorithmDatabase]?.progress?.current ?? null;
  // The course reads every unit as an object and stops rendering its units page on anything else.
  const wellFormed = object(store) && Number.isInteger(store.schemaVersion) && store.schemaVersion >= 3 && object(store.units) && Object.values(store.units).every(object);
  if (store !== null && !(wellFormed && holdsProgress(store))) {
    store = null;
    ignored += 1;
  }
  if (local.length === 0 && !store) return { error: "备份文件里没有学习记录。" };
  return { local, store, ignored, exportedAt: timestamp(data.exportedAt) };
}

function showRestore(parsed) {
  const counts = new Map();
  for (const [key] of parsed.local) counts.set(courseOfKey(key), (counts.get(courseOfKey(key)) ?? 0) + 1);
  if (parsed.store) counts.set("算法研习室", (counts.get("算法研习室") ?? 0) + 1);
  const when = parsed.exportedAt ? new Date(parsed.exportedAt).toLocaleString("zh-CN", { dateStyle: "medium", timeStyle: "short" }) : "时间不明";
  document.querySelector("#restore-summary").textContent = "这份备份做于 " + when + "，里面有 " + counts.size + " 门课的记录：";
  document.querySelector("#restore-list").replaceChildren(...[...counts].map(([course, count]) => {
    const item = document.createElement("li");
    item.textContent = course + " · " + count + " 条";
    return item;
  }));
  pendingRestore = parsed;
  restorePreview.hidden = false;
  say(parsed.ignored ? "有 " + parsed.ignored + " 条是空记录、不是课程记录或格式不对，恢复时会跳过。" : "");
  document.querySelector("#restore-confirm").focus();
}

// The course's own upgrade, from progressRepository.ts: version 1 with one object store. It only runs when the
// database does not exist yet, which is the case in a fresh browser.
async function writeAlgorithmsStore(record) {
  const database = await new Promise((resolve, reject) => {
    const request = indexedDB.open(algorithmDatabase, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("progress");
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("blocked"));
    request.onsuccess = () => resolve(request.result);
  });
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction("progress", "readwrite");
      transaction.objectStore("progress").put(record, "current");
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

async function restore() {
  if (!pendingRestore) return;
  const { local, store } = pendingRestore;
  let written = 0;
  const failed = [];
  if (store) {
    try {
      await writeAlgorithmsStore(store);
      written += 1;
    } catch {
      failed.push("算法研习室");
    }
  }
  for (const [key, value] of [...local].sort(writeOrder)) {
    try {
      localStorage.setItem(key, value);
      written += 1;
    } catch {
      failed.push(courseOfKey(key));
    }
  }
  pendingRestore = null;
  restorePreview.hidden = true;
  const state = failed.length ? "wrong" : "done";
  if (written === 0) {
    say("一条记录也没写进去：浏览器不让这个网站保存数据，或者存储已满。", "wrong");
    backupStatus.focus();
    return;
  }
  const note = failed.length
    ? "恢复了 " + written + " 条记录；" + [...new Set(failed)].join("、") + " 的记录没写进去，可能是浏览器存储已满或被禁用。"
    : "恢复了 " + written + " 条记录。已经打开的课程页要刷新才看得到。";
  // Reloading reads every record again from scratch, so the cards, the banner and the reviews show what was restored.
  // The note crosses the reload in sessionStorage; when that is refused, the page says it here and does not reload.
  try {
    sessionStorage.setItem(restoreNoteKey, JSON.stringify({ note, state }));
  } catch {
    say(note + "刷新页面能看到恢复后的进度。", state);
    backupStatus.focus();
    return;
  }
  location.hash = "backup";
  location.reload();
}

document.querySelector("#backup-all").addEventListener("click", () => {
  backupAll().catch(() => say("备份没有完成：浏览器拒绝了读取或下载。", "wrong"));
});
document.querySelector("#restore-pick").addEventListener("click", () => restoreFile.click());
restoreFile.addEventListener("change", async () => {
  const file = restoreFile.files?.[0];
  restoreFile.value = "";
  if (!file) return;
  restorePreview.hidden = true;
  pendingRestore = null;
  if (file.size > 10 * 1024 * 1024) {
    say("文件超过 10 MB，不像是学习台的备份。", "wrong");
    return;
  }
  const parsed = parseBackup(await file.text());
  if (parsed.error) say(parsed.error, "wrong");
  else showRestore(parsed);
});
document.querySelector("#restore-confirm").addEventListener("click", () => {
  restore().catch(() => say("恢复没有完成：浏览器拒绝了写入。", "wrong"));
});
document.querySelector("#restore-cancel").addEventListener("click", () => {
  pendingRestore = null;
  restorePreview.hidden = true;
  say("已取消，没有改动任何记录。");
  document.querySelector("#restore-pick").focus();
});

try {
  const restored = JSON.parse(sessionStorage.getItem(restoreNoteKey));
  sessionStorage.removeItem(restoreNoteKey);
  // Text already present at load is not announced, so the note arrives a moment later and takes focus.
  if (restored?.note) {
    setTimeout(() => {
      say(restored.note, restored.state);
      backupStatus.focus();
    }, 300);
  }
} catch {
  // No note to show.
}

updateEntries();
// The mark says every record has been looked at, so a test can wait for it instead of guessing.
showProgress().finally(() => {
  document.body.dataset.progress = "read";
});
