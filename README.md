# Codex Studio · Website V6

Codex Studio 是一个使用原生 Web 技术持续迭代的个人开发者 Portfolio / Studio 网站。V6 从“带实时数据的 Portfolio”进一步升级为“可操作的本地 Web App”：加入项目 CRUD、搜索筛选、本地持久化与 JSON 导入导出。

## V6 新功能

- 新增 `app.html` 本地项目工作台
- 支持项目创建、读取、编辑和删除（CRUD）
- 支持按名称、描述和标签搜索
- 支持按“想法 / 开发中 / 已上线”筛选
- 使用 `localStorage` 保存项目，刷新页面后仍会保留
- 支持导出项目为 JSON 文件
- 支持从 JSON 文件重新导入项目
- 保留 V5 的 GitHub API、深色模式、响应式布局与多页面结构
- 不依赖 React、Vue 或大型第三方框架

> 注意：V6 的项目数据保存在当前浏览器本地，并不是云端数据库。清除网站数据会删除本地内容，因此重要数据请使用“导出 JSON”备份。

## 项目结构

```text
.
├── index.html       # V6 首页
├── app.html         # V6 本地项目工作台
├── app-v6.css       # 工作台样式
├── app-v6.js        # CRUD、搜索、筛选、localStorage、JSON 导入导出
├── project.html     # V5 项目详情页
├── style-v5.css     # V5/V6 共用视觉系统
├── script-v5.js     # 主题、导航、滚动与 GitHub API
└── README.md        # 项目说明
```

## 数据说明

V6 工作台使用浏览器 `localStorage`：

```text
codex-v6-projects
```

保存项目数组。数据只存在于当前浏览器与当前设备，不会自动上传或跨设备同步。

## GitHub Pages 部署

1. 在独立分支完成修改。
2. 创建 Pull Request 合并到 `main`。
3. GitHub Pages 保持 `Deploy from a branch`。
4. Source 使用 `main` 与 `/ (root)`。
5. 合并后 GitHub Pages 自动重新部署。

## 版本历程

| 版本 | 迭代重点 |
| --- | --- |
| V1 | 验证 Codex → GitHub → Pages 发布链路 |
| V2 | 建立完整响应式网站 |
| V3 | 升级为 Codex Studio，加入主题、导航与动效 |
| V4 | 升级为成熟的 Portfolio / Studio |
| V5 | 加入实时 GitHub 数据、项目详情页与分享能力 |
| **V6（Current）** | 加入 CRUD、搜索筛选、本地存储与 JSON 备份，升级为可操作 Web App |

## 本地预览

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。
