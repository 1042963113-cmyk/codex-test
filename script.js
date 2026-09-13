const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");
const progress = document.querySelector("#page-progress");
const themeColor = document.querySelector('meta[name="theme-color"]');
const mobileQuery = window.matchMedia("(max-width: 760px)");

function updateThemeControl() {
  const dark = root.dataset.theme === "dark";
  themeToggle.querySelector("span").textContent = dark ? "☀" : "◐";
  themeToggle.setAttribute("aria-label", dark ? "切换浅色模式" : "切换深色模式");
  themeColor?.setAttribute("content", dark ? "#0d0c13" : "#f8f7fc");
}

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  if (next === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  localStorage.setItem("codex-theme", next);
  updateThemeControl();
});
updateThemeControl();

function closeMenu() {
  siteNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开导航菜单");
}

menuButton.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
});
siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
mobileQuery.addEventListener("change", (event) => { if (!event.matches) closeMenu(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...siteNav.querySelectorAll("a")];
const revealItems = document.querySelectorAll(".reveal");

function updateScrollState() {
  const max = root.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
  const position = scrollY + innerHeight * 0.32;
  let current = sections[0]?.id;
  sections.forEach((section) => { if (section.offsetTop <= position) current = section.id; });
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
}

addEventListener("scroll", updateScrollState, { passive: true });
addEventListener("resize", updateScrollState, { passive: true });
updateScrollState();

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.1, rootMargin: "0px 0px -30px" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
