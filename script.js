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
      state: done + " 个任务已完成",
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
      state: experiments > 0 ? experiments + " 个实验有记录" : "读到 " + reading.title,
      fraction: experiments / 53,
      at: 0,
    };
  },
};

function whenText(time) {
  if (!time) return "";
  const days = Math.floor((Date.now() - time) / 86400000);
  if (days <= 0) return "今天";
  return days === 1 ? "昨天" : days + " 天前";
}

function showProgress() {
  let latest = null;

  entries.forEach((entry) => {
    const read = courses[entry.dataset.course];
    const progress = read ? read() : null;
    if (!progress) return;
    entry.dataset.record = progress.fraction >= 1 ? "done" : "started";
    entry.style.setProperty("--nb-fraction", String(progress.fraction));
    entry.querySelector("[data-state]").textContent = [progress.state, whenText(progress.at)].filter(Boolean).join(" · ");
    if (!latest || progress.at > latest.progress.at) latest = { entry, progress };
  });

  if (!latest) return;
  const { entry, progress } = latest;
  entry.setAttribute("aria-current", "true");
  const stopped = document.createElement("p");
  stopped.className = "nb-stopped";
  stopped.textContent = "停在这里";
  entry.querySelector("h3").after(stopped);
  resumeLine.closest(".resume").classList.add("has-record");
  const link = document.createElement("a");
  link.href = progress.href;
  link.textContent = progress.course + " · " + progress.place;
  const meta = document.createElement("span");
  meta.className = "resume-meta";
  meta.textContent = [progress.state, whenText(progress.at)].filter(Boolean).join(" · ");
  resumeLine.replaceChildren(link, meta);
}

updateEntries();
showProgress();
