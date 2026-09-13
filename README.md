# Codex Studio · Website V5

Codex Studio 是一个使用原生 Web 技术持续迭代的个人开发者 Portfolio / Studio 网站。V5 从“完整作品集”继续升级为“带真实功能的产品”：加入实时 GitHub 数据、独立项目详情页、分享能力和更清晰的多页面结构。

## V5 新功能

- 通过 GitHub 公共 API 实时读取仓库 Stars、Forks、默认分支和最近更新时间
- 新增 `project.html` 独立项目详情页
- 新增原生 Web Share 分享能力，并在不支持时回退到复制链接
- 新增手动刷新实时仓库数据
- 保留并优化 V4 的深色模式、响应式导航、滚动状态和无障碍体验
- 修复页面横向溢出，继续适配手机、iPad 横屏和桌面
- 不依赖 React、Vue 或大型第三方框架

## 项目结构

```text
.
├── index.html       # V5 首页
├── project.html     # 独立项目详情页
├── style-v5.css     # V5 视觉系统、主题与响应式布局
├── script-v5.js     # V5 主题、导航、分享与 GitHub API
├── style.css        # V4 样式历史文件
├── script.js        # V4 脚本历史文件
└── README.md        # 项目说明
```

## 实时数据

首页会请求：

```text
https://api.github.com/repos/1042963113-cmyk/codex-test
```

读取公开仓库数据。请求失败时页面会显示安全的本地回退状态，不影响主要内容浏览。

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
| **V5（Current）** | 加入实时 GitHub 数据、项目详情页与分享能力 |

## 本地预览

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。
