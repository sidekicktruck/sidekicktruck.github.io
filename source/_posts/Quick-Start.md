---
layout: post
title: Quick Start
date: 2026-04-04 23:48:38
tags:
---

# 更换电脑后，如何快速恢复 Hexo 博客更新环境

这篇教程记录了我在新电脑上从 Git 仓库恢复博客写作环境的完整流程。目标是：最短时间恢复本地预览、写作、生成和部署能力。

## 一、前置条件

开始前请确认本机已安装：

- Node.js（建议 LTS 版本）
- npm
- Git

可用下面命令检查：

```bash
node -v
npm -v
git -v
```

## 二、克隆仓库

```bash
git clone https://github.com/sidekicktruck/sidekicktruck.github.io.git
cd sidekicktruck.github.io
```
本仓库采用双分支配置
源码 -> main
hexo d -> gh-pages


## 三、安装项目依赖

```bash
npm install
```

如果你仓库里已经包含 package.json 和 package-lock.json，这一步会恢复 Hexo 及插件。

## 四、补齐容易漏掉的关键依赖

在新环境中最常见的问题是：

- 页面提示 No layout
- hexo deploy 无法执行

分别对应下面两个依赖：

```bash
npm install hexo-theme-landscape --save
npm install hexo-deployer-git --save
```

说明：

- hexo-theme-landscape 用于提供布局模板，缺失时会出现 No layout
- hexo-deployer-git 用于执行部署命令

## 五、确认 Hexo 安装状态

```bash
hexo -v
```

如果看到 hexo 与 hexo-cli 版本信息，说明安装正常。

## 六、清理并重新生成

```bash
hexo clean
hexo generate
```

若生成时没有 No layout 警告，说明主题和布局已恢复。

## 七、启动本地预览

```bash
hexo server
```

浏览器访问：

```text
http://localhost:4000
```

如果提示端口占用（EADDRINUSE），用备用端口：

```bash
hexo server -p 4001
```

## 八、继续写博文

创建新文章：

```bash
hexo new "文章标题"
```

文章会生成在：

```text
source/_posts/
```

编辑完成后，重新生成：

```bash
hexo generate
```

## 九、部署到 GitHub Pages

确认配置文件 _config.yml 中 deploy 段落正确：

```yml
deploy:
  type: git
  repo: https://github.com/sidekicktruck/sidekicktruck.github.io.git
  branch: main
```

执行部署：

```bash
hexo deploy
```

## 十、一次性快速恢复命令

如果你已经 clone 完仓库，通常可以直接执行下面这一组：

```bash
npm install
npm install hexo-theme-landscape hexo-deployer-git --save
hexo clean
hexo generate
hexo server
```

至此，新电脑环境就恢复完成，可以继续稳定更新博客。
