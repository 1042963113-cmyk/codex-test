const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const menuButton = document.querySelector('#menu-button');
const siteNav = document.querySelector('#site-nav');
const progress = document.querySelector('#page-progress');
const themeColor = document.querySelector('meta[name="theme-color"]');
const mobileQuery = window.matchMedia('(max-width: 760px)');

function updateThemeControl() {
  if (!themeToggle) return;
  const dark = root.dataset.theme === 'dark';
  themeToggle.querySelector('span').textContent = dark ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  themeColor?.setAttribute('content', dark ? '#0d0c13' : '#f7f6fb');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    localStorage.setItem('codex-theme', next);
    updateThemeControl();
  });
  updateThemeControl();
}

function closeMenu() {
  if (!siteNav || !menuButton) return;
  siteNav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开导航菜单');
}

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  mobileQuery.addEventListener('change', (event) => { if (!event.matches) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = siteNav ? [...siteNav.querySelectorAll('a')] : [];
const revealItems = document.querySelectorAll('.reveal');

function updateScrollState() {
  if (progress) {
    const max = root.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
  }
  if (!sections.length) return;
  const position = scrollY + innerHeight * 0.32;
  let current = sections[0]?.id;
  sections.forEach((section) => { if (section.offsetTop <= position) current = section.id; });
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}

addEventListener('scroll', updateScrollState, { passive: true });
addEventListener('resize', updateScrollState, { passive: true });
updateScrollState();

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.1, rootMargin: '0px 0px -30px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const repoEndpoint = 'https://api.github.com/repos/1042963113-cmyk/codex-test';
const elements = {
  stars: document.querySelector('#repo-stars'),
  forks: document.querySelector('#repo-forks'),
  branch: document.querySelector('#repo-branch'),
  updated: document.querySelector('#repo-updated'),
  state: document.querySelector('#repo-state'),
  heroUpdated: document.querySelector('#hero-updated'),
  heroRepo: document.querySelector('#hero-repo'),
  heroVisibility: document.querySelector('#hero-visibility')
};

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(value));
}

async function loadRepoData() {
  if (elements.state) elements.state.textContent = '正在读取 GitHub…';
  try {
    const response = await fetch(repoEndpoint, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);
    const repo = await response.json();
    if (elements.stars) elements.stars.textContent = repo.stargazers_count ?? '0';
    if (elements.forks) elements.forks.textContent = repo.forks_count ?? '0';
    if (elements.branch) elements.branch.textContent = repo.default_branch || 'main';
    if (elements.updated) elements.updated.textContent = formatDate(repo.updated_at);
    if (elements.state) elements.state.textContent = '实时数据已连接';
    if (elements.heroUpdated) elements.heroUpdated.textContent = formatDate(repo.updated_at);
    if (elements.heroRepo) elements.heroRepo.textContent = repo.name || 'codex-test';
    if (elements.heroVisibility) elements.heroVisibility.textContent = repo.visibility || (repo.private ? 'private' : 'public');
  } catch (error) {
    if (elements.stars) elements.stars.textContent = '0';
    if (elements.forks) elements.forks.textContent = '0';
    if (elements.branch) elements.branch.textContent = 'main';
    if (elements.updated) elements.updated.textContent = '暂不可用';
    if (elements.state) elements.state.textContent = 'GitHub 数据暂时无法读取';
    if (elements.heroUpdated) elements.heroUpdated.textContent = 'offline';
  }
}

loadRepoData();
document.querySelector('#refresh-data')?.addEventListener('click', loadRepoData);

async function shareCurrentPage() {
  const feedback = document.querySelector('#share-feedback');
  const data = { title: document.title, text: '看看 Codex Studio V5', url: location.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
      if (feedback) feedback.textContent = '分享面板已打开。';
    } else {
      await navigator.clipboard.writeText(location.href);
      if (feedback) feedback.textContent = '网站链接已复制。';
    }
  } catch (error) {
    if (error.name !== 'AbortError' && feedback) feedback.textContent = '暂时无法分享，请复制浏览器地址。';
  }
}

document.querySelector('#share-site')?.addEventListener('click', shareCurrentPage);
document.querySelector('#copy-link')?.addEventListener('click', async () => {
  const button = document.querySelector('#copy-link');
  try {
    await navigator.clipboard.writeText(location.href);
    if (button) button.textContent = '已复制 ✓';
    setTimeout(() => { if (button) button.textContent = '复制网站链接'; }, 1800);
  } catch {
    if (button) button.textContent = '复制失败';
  }
});
