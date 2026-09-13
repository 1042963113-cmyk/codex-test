const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#site-nav');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('#site-nav a')];

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
});
navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('#progress').style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  const current = [...sections].reverse().find((section) => section.offsetTop <= scrollY + 180)?.id;
  navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${current}`));
}
addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const stationContent = {
  feed: ['STATION 01', '双仓柔性供料', '织带卷自动定长切断；三角片由阶梯料仓逐片分离，真空吸盘检测双张，减少软料粘连造成的停机。'],
  vision: ['STATION 02', 'AI 视觉定位', '上方相机识别轮廓、角点、正反与颜色，自动修正抓取角度；超差物料在进入缝制前即被剔除。'],
  fold: ['STATION 03', '三边热压预折', '伺服折刀依次完成三边折边，温度、压力与保压时间随配方调用，并为后续缝制保持稳定外形。'],
  sew: ['STATION 04', '数控模板缝制', '电子压框夹持组合件，自动完成轮廓线、三角线或 Box-X 加固；配置断线与底线余量检测。'],
  out: ['STATION 05', '视觉复检收料', '相机复检线迹范围与跳针风险，合格品计数堆叠，不合格品独立落料，并保存批次生产数据。']
};
document.querySelectorAll('.station').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.station').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const [code, title, text] = stationContent[button.dataset.station];
  document.querySelector('#station-code').textContent = code;
  document.querySelector('#station-title').textContent = title;
  document.querySelector('#station-text').textContent = text;
}));

const inputs = [...document.querySelectorAll('#calculator input')];
function calculateCapacity() {
  const [shifts, hours, machines, cycle] = inputs.map((input) => Math.max(0, Number(input.value)));
  const capacity = Math.floor((shifts * hours * 3600 * machines * 0.85) / Math.max(cycle, 1));
  document.querySelector('#capacity').textContent = new Intl.NumberFormat('zh-CN').format(capacity);
}
inputs.forEach((input) => input.addEventListener('input', calculateCapacity));
calculateCapacity();
