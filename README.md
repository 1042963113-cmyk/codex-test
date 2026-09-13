# Codex Studio · Website V4

Codex Studio 是一个使用原生 Web 技术构建并持续迭代的个人开发者 Portfolio / Studio 网站。V4 在第三版已有品牌、主题与交互基础上，升级了视觉系统、作品表达和多设备体验。

## V4 新功能

- 全新首屏、独立技术徽章与四张项目统计卡片
- Featured Project 和 Website V1–V3 作品卡片
- HTML、CSS、JavaScript、GitHub、GitHub Pages、Codex、Responsive Design、UI Design 技能矩阵
- V1 → V4 可视化时间轴，并突出当前 V4
- 适配手机、iPad 横屏与桌面的响应式导航和布局
- 可持久化的深色模式，同时支持系统 `prefers-color-scheme`
- 滚动进入、导航状态、卡片与按钮微交互，并尊重 `prefers-reduced-motion`
- 语义化 HTML、键盘焦点、跳转链接和 ARIA 状态等无障碍细节

## 项目结构

```text
.
├── index.html   # 页面语义结构与内容
├── style.css    # 视觉系统、主题、响应式布局与动效
├── script.js    # 主题、移动导航、滚动状态与进入动画
└── README.md    # 项目说明
```

项目不依赖 React、Vue 或第三方动画库，可以由 GitHub Pages 直接作为静态网站托管。

## GitHub Pages 部署

1. 将分支通过 Pull Request 合并到 `main`。
2. 在仓库 **Settings → Pages** 中选择 **Deploy from a branch**。
3. Source 选择 `main` 分支与 `/ (root)` 目录并保存。
4. 等待 GitHub Pages 完成构建，即可从仓库的 Pages 地址访问。

## 版本历程

| 版本 | 迭代重点 |
| --- | --- |
| V1 | 验证 Codex → GitHub → Pages 发布链路 |
| V2 | 建立完整的响应式网站 |
| V3 | 升级为 Codex Studio，加入主题、导航与动效 |
| **V4（Current）** | 升级为完整、成熟的 Portfolio / Studio |

## 本地预览

可以直接打开 `index.html`，或在项目目录启动任意静态文件服务器：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。
