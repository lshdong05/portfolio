# 留白 / Personal Portfolio

酒红与暖白艺术风格个人作品集。原生 HTML、CSS、JavaScript，无第三方运行时依赖。

## 填写内容

编辑 `dist/content.js` 即可替换姓名、简介、专业方向、城市、邮箱和四个作品的标题、年份、描述、图片及外部链接。空内容显示为“待填写”，现有抽象几何封面是设计示意。

将作品图片放在 `dist/images/`，例如将 image 设置为 `./images/project-01.jpg`。

## GitHub 展示

`githubUsername` 已设置为 `lshdong05`。页面提供真实 GitHub 主页链接。点击“加载公开项目”会直接通过 GitHub 公开 API 获取最近更新的原创仓库，最多展示 4 个；不会读取私有仓库，也不需要令牌。网络不通或请求额度耗尽时显示错误和重试入口。

## 本地预览

安装 Node.js 18 或更新版本后运行：

```sh
npm start
```

浏览器打开 http://127.0.0.1:4173。运行 `npm run check` 检查脚本语法。

## 源码和发布

源码仓库：https://github.com/lshdong05/portfolio 。网站静态文件全部位于 `dist/`，可部署至任何静态托管服务。Sites 项目配置位于 `.openai/hosting.json`。修改 GitHub 中的源码不会自动触发 Sites 发布，需要另行同步和部署。

Sites 网站默认仅所有者可访问；源码仓库可保持私有。公开访问或 GitHub Pages 部署可在确认后单独配置。

## 浏览器与可访问性

使用标准 HTML、CSS Grid/Flex 和原生 JavaScript，面向现代 Chrome、Edge、Firefox、Safari。包含手机断点、键盘焦点、跳转导航、原生模态对话框及减少动画设置。GitHub 读取需要网络。具体实测结果请以交付说明为准，不声称已在所有浏览器中测试。

## 文件

- `dist/index.html`：页面结构
- `dist/style.css`：版式、响应式样式与原创抽象图形
- `dist/content.js`：可填写内容
- `dist/app.js`：作品详情、GitHub 加载
- `preview.mjs`：本地静态预览

主色为低饱和酒红 #762638，搭配暖白 #f7f4ef；网站为原创个人作品集，不使用汇丰标志。
