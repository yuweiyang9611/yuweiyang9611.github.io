const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeState = document.querySelector(".theme-state");
const themeColor = document.querySelector('meta[name="theme-color"]');

function syncThemeControl() {
  const isDark = root.dataset.theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "切换至浅色模式" : "切换至深色模式");
  themeState.textContent = isDark ? "浅色" : "暗色";
  themeColor.setAttribute("content", isDark ? "#111311" : "#f4f1e8");
}

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("site-theme", root.dataset.theme);
  } catch (error) {
    // The theme still applies for this visit if storage is unavailable.
  }
  syncThemeControl();
});

syncThemeControl();

const searchInput = document.querySelector("#project-search");
const cards = Array.from(document.querySelectorAll(".project-card"));
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const projectsGrid = document.querySelector(".projects-grid");
let activeFilter = "all";

function updateProjects() {
  const query = searchInput.value.trim().toLocaleLowerCase("zh-CN");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const searchableText = (card.dataset.search + " " + card.textContent).toLocaleLowerCase("zh-CN");
    const isVisible = matchesFilter && (!query || searchableText.includes(query));
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultsCount.textContent = "显示 " + visibleCount + " 个项目";
  emptyState.hidden = visibleCount !== 0;
  projectsGrid.classList.toggle("is-filtered", activeFilter !== "all" || Boolean(query));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    updateProjects();
  });
});

searchInput.addEventListener("input", updateProjects);
updateProjects();

document.addEventListener("keydown", (event) => {
  const focusedElement = document.activeElement;
  const isTyping = focusedElement && ["INPUT", "TEXTAREA"].includes(focusedElement.tagName);

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && focusedElement === searchInput) {
    searchInput.value = "";
    updateProjects();
    searchInput.blur();
  }
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = Array.from(document.querySelectorAll(".reveal"));

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  root.classList.add("reveal-ready");
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--mx", event.clientX + "px");
    root.style.setProperty("--my", event.clientY + "px");
  }, { passive: true });
}

document.querySelector("#year").textContent = new Date().getFullYear();
