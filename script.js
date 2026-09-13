const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");
const successButton = document.querySelector("#success-button");
const successMessage = document.querySelector("#success-message");
const year = document.querySelector("#year");
const pageProgress = document.querySelector("#page-progress");
const revealItems = document.querySelectorAll(".reveal");

const savedTheme = localStorage.getItem("codex-theme");
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  root.dataset.theme = "dark";
}

function updateThemeLabel() {
  if (!themeToggle) return;
  const isDark = root.dataset.theme === "dark";
  themeToggle.textContent = isDark ? "☀" : "◐";
  themeToggle.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
}

updateThemeLabel();

themeToggle?.addEventListener("click", () => {
  const isDark = root.dataset.theme === "dark";
  if (isDark) {
    delete root.dataset.theme;
    localStorage.setItem("codex-theme", "light");
  } else {
    root.dataset.theme = "dark";
    localStorage.setItem("codex-theme", "dark");
  }
  updateThemeLabel();
});

menuButton?.addEventListener("click", () => {
  const open = siteNav?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "关闭" : "菜单";
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "菜单";
  });
});

successButton?.addEventListener("click", () => {
  if (successMessage) successMessage.hidden = false;
  successButton.textContent = "第三版测试成功 ✓";
});

if (year) {
  year.textContent = new Date().getFullYear();
}

function updateProgress() {
  if (!pageProgress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  pageProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
