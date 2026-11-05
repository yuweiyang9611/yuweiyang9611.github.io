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

// All the sites share this origin, so the index can read their progress. It must only ever read:
// each course owns its key and format.
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
      href = base + "patterns/" + encodeURIComponent(itemId.slice(8)) + ".html";
      const next = patternTasks.find(([id]) => !record.items[itemId]?.completed?.[id]);
      if (next) {
        place += " · " + next[1];
        href += "#evidence-" + next[0];
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

  frontend() {
    const record = readRecord("issueflow:frontend-learning-project:progress:v1");
    if (record?.schemaVersion !== 1) return null;
    const days = plural(record.days);
    const done = days.filter((day) => day?.completed === true);
    if (done.length === 0) return null;
    const next = days.find((day) => day?.completed !== true);
    return {
      course: "IssueFlow",
      place: next ? "第 " + next.day + " 天" : "全部完成",
      href: "/frontend-learning-project/",
      state: done.length + " / " + days.length + " 天",
      done: done.length,
      fraction: done.length / days.length,
      at: Math.max(...done.map((day) => timestamp(day.completedAt))),
    };
  },

  dotnet() {
    const record = readRecord("learn-dotnet-csharp-learning-data-v1");
    if (record?.version !== 1) return null;
    const experiments = plural(record.experiments).length;
    const reading = typeof record.lastReading?.title === "string" ? record.lastReading : null;
    if (experiments === 0 && !reading) return null;
    return {
      course: "LearnDotnetCSharp",
      place: reading ? reading.title : "实验目录",
      href: "/LearnDotnetCSharp/" + (typeof reading?.url === "string" ? reading.url : ""),
      state: experiments + " / 53 实验",
      done: experiments,
      fraction: experiments / 53,
      at: 0,
    };
  },

  // The algorithms course keeps its record in IndexedDB (database dsa-learning-progress, store
  // progress, key current). This mirrors the course's own read-only reader, readRecord.ts: a unit
  // counts once verified at the current mastery revision, and the place to continue is the unit
  // touched last and not finished, else the earliest review due, else the first unit whose
  // prerequisites are all verified.
  async algorithms() {
    let store = null;
    try {
      store = await readAlgorithmsStore();
    } catch {
      store = null;
    }
    if (!(store?.revision > 0 || store?.generation > 0)) store = legacyAlgorithmsStore();
    const units = store?.units && typeof store.units === "object" ? store.units : {};
    const ids = Object.keys(units);
    if (ids.length === 0) return null;
    const now = Date.now();
    const status = (id) => algorithmStatus(units[id], now);
    const mastered = (id) => status(id) === "verified" || status(id) === "review";
    const verified = algorithmUnits.filter(([id]) => mastered(id)).length;
    const learning = algorithmUnits
      .filter(([id]) => status(id) === "learning")
      .sort(([left], [right]) => (Number(units[right]?.updatedAt) || 0) - (Number(units[left]?.updatedAt) || 0))[0];
    const due = algorithmUnits
      .filter(([id]) => status(id) === "review")
      .sort(([left], [right]) => (Number(units[left]?.nextReviewAt) || 0) - (Number(units[right]?.nextReviewAt) || 0))[0];
    const next = algorithmUnits.find(([id, , prerequisites]) => status(id) === "not-started" && prerequisites.every(mastered));
    const stop = learning ?? due ?? next;
    const base = "/DataStructureAndAlgorithm/学习单元.html";
    let place = "全部完成";
    if (learning) place = learning[1];
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
};

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

// Opening a database that does not exist would create an empty one without the course's object
// store and break its units page. So the index asks for the list of databases first, opens the
// course's only when it is already there, at the course's own version, with no upgrade handler,
// and only ever reads from it.
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
      return { units };
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
  return { units };
}

function whenText(time) {
  if (!time) return "";
  const days = Math.floor((Date.now() - time) / 86400000);
  if (days <= 0) return "今天";
  return days === 1 ? "昨天" : days + " 天前";
}

async function showProgress() {
  let latest = null;
  let doneUnits = 0;
  let active = 0;

  // Every record is read before any card is painted, so the stats, the banner and the stopped
  // card agree. The algorithms reader is asynchronous; the others resolve at once.
  const read = await Promise.all(entries.map(async (entry) => {
    const reader = courses[entry.dataset.course];
    try {
      return reader ? await reader() : null;
    } catch {
      return null;
    }
  }));

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
  document.querySelector("#stat-when").textContent = whenText(latest.progress.at) || "有记录";

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

updateEntries();
// The mark says every record has been looked at, so a test can wait for it instead of guessing.
showProgress().finally(() => {
  document.body.dataset.progress = "read";
});
