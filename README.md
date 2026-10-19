# Personal Portfolio

以红白为主、结合钴蓝与暖色辅助色的多页面个人作品集。采用展厅透视、错层画面和独立页面形成视觉与导航上的纵深。

## 页面结构

- `dist/index.html`：首页 / 展厅入口
- `dist/works.html`：作品目录，可按分类筛选
- `dist/project.html?id=01`：第三级项目详情，支持返回目录和下一项目
- `dist/about.html`：个人简介
- `dist/contact.html`：联系方式与实时 GitHub 公开项目

各页面有独立 URL，可以直接打开或分享。无效项目编号有清晰的返回入口。

## 填写你的内容

编辑 `dist/content.js`：
- `name`：项目或个人品牌名。留空时只显示通用的 PORTFOLIO，不预设名字。
- `personName`、`tagline`、`intro`、`about`、`practice`、`location`、`email`：个人资料。
- `projects`：作品数组。保留稳定且唯一的字符串 `id`，用于详情页地址。可填写标题、分类、年份、角色、简介、过程、图片与链接。
- 图片可放在 `dist/assets/`，例如 `image: "./assets/my-work.jpg"`。

空内容会显示为“待补充”。当前视觉图像与几何封面为网站设计示意，不代表实际个人项目或经历。

## 本地运行

需要 Node.js 18 或更新版本，无需安装第三方运行时依赖：

```sh
npm start
npm run check
```

在浏览器打开 http://127.0.0.1:4173/ 。

## 发布与源码

线上网站：https://red-white-atelier-portfolio.navyroot256.chatgpt.site
源码仓库：https://github.com/lshdong05/portfolio

静态网站文件全部位于 `dist/`，可部署到支持静态文件的托管服务。Sites 身份与目录配置位于 `.openai/hosting.json`。GitHub 提交与 Sites 发布是两个独立步骤，当前没有自动发布流水线。

## GitHub 展示

联系页面的“加载公开项目”会调用 GitHub 公开 API，展示 `githubUsername` 对应账号最近更新的最多四个原创公开仓库。不会读取私有仓库，不需要令牌；网络或请求限额错误会提供明确提示和重试按钮。

## 视觉与可访问性

主色 #952c3e / #f9f7f2，辅助色 #3855b2 / #e68a72 / #e8bcb9。首页图像由 imagegen 生成，压缩后的 WebP 为本地静态资产，不依赖外链。几何封面由 CSS 绘制。

支持响应式布局、键盘焦点、跳转导航、位置导航、标准浏览器前进后退以及减少动画设置。面向现代 Chrome、Edge、Firefox 和 Safari；实际测试范围以交付说明为准。

