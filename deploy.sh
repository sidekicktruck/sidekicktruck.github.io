#!/bin/bash
# 双分支部署脚本
# main 分支 -> Hexo 源码
# gh-pages 分支 -> 生成的静态网站

set -e

# 1. 提交源码到 main 分支
echo ">>> 提交源码到 main 分支..."
git add -A
git commit -m "source: $(date '+%Y-%m-%d %H:%M:%S')" || echo "无新变更，跳过 commit"
git push origin main

# 2. 构建并部署静态网站到 gh-pages 分支
echo ">>> 构建并部署静态网站到 gh-pages 分支..."
hexo clean
hexo deploy

echo ">>> 部署完成！"
echo "    源码: main 分支"
echo "    网站: gh-pages 分支"
