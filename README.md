# sidekicktruck's blog

个人博客,基于 [Hexo](https://hexo.io) + [Butterfly](https://butterfly.js.org/) 主题,部署在 GitHub Pages。

## 分支说明

| 分支 | 内容 |
|------|------|
| `main` | Hexo 源码(文章、配置、主题、定制文件) |
| `gh-pages` | 构建产物(GitHub Pages 实际服务的分支) |

## 项目结构

| 路径 | 说明 |
|------|------|
| `source/_posts/` | 文章(markdown) |
| `source/gallery/index.md` | 画廊页(内容由数据文件驱动) |
| `source/_data/gallery.yml` | **作品画廊数据 —— 更新画作改这里** |
| `source/images/works/` | 画作图片放这里 |
| `source/images/site/` | 站点头像 / 横幅(banner.svg、avatar.svg) |
| `source/css/custom.css` | 全站视觉定制(唯一的样式入口) |
| `source/js/custom.js` | 站点小交互(画廊筛选等) |
| `scripts/gallery.js` | 画廊渲染脚本(Hexo 标签插件) |
| `themes/butterfly/` | Butterfly 主题,已锁定 v4.13 并纳入版本管理 |

## 环境搭建

```bash
npm install          # 安装 Hexo 及渲染插件
npx hexo server      # 本地预览 http://localhost:4000
```

## 更新画作(三步)

1. 把图片文件丢进 `source/images/works/`;
2. 在 `source/_data/gallery.yml` 里加一条记录:

```yaml
- name: 作品名
  img: /images/works/文件名.jpg
  tag: 水彩            # 可选:水彩 / 素描 / 板绘 / 速写 ...
  date: 2026-07-12     # 可选,画廊按日期倒序排列
  note: 一句感想       # 可选,点开大图时显示在标题下方,卡片上也露出一行
```

3. 跑 `./deploy.sh` 上线。

## 常用命令

| 命令 | 作用 |
|------|------|
| `npx hexo new "标题"` | 新建文章 |
| `npx hexo clean && npx hexo generate` | 清缓存并构建 |
| `npx hexo server` | 本地预览 |
| `./deploy.sh` | 提交源码到 main + 构建部署到 gh-pages |

> 改了 `scripts/`、`_config*.yml` 或主题后构建不生效时,先 `hexo clean` 再 `generate`(db 缓存)。

## 主题维护约定

- Butterfly 主题源码已提交进 git(锁定 v4.13),换机器 / 重装直接可用;升级时整体替换 `themes/butterfly/` 内容即可。
- 所有个性化定制都集中在 `source/css/custom.css` 与 `_config.butterfly.yml`,**不要修改主题内部文件**,保证升级主题零冲突。
- 画廊渲染逻辑在 `scripts/gallery.js`,与主题完全解耦。