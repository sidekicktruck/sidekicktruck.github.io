/**
 * 作品画廊 —— 方案 B(数据驱动)
 * ============================================
 * 用法:在任意 markdown 页面里写一行 {% gallery_data %}
 * 更新一幅画 = 把图片放进 source/images/works/ + 在 source/_data/gallery.yml 加一行
 * 完全不动主题源码,升级 Butterfly 主题零冲突。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');

function normDate(d) {
  // js-yaml 默认会把 2026-07-01 解析成 Date 对象,统一转成 YYYY-MM-DD 字符串
  if (d instanceof Date && !isNaN(d.getTime())) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  return String(d == null ? '' : d).trim();
}

function galleryItems() {
  const file = path.join(hexo.source_dir, '_data', 'gallery.yml');
  if (!fs.existsSync(file)) {
    hexo.log.warn('[gallery_data] 找不到 _data/gallery.yml');
    return [];
  }
  let raw;
  try {
    raw = YAML.load(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    hexo.log.warn('[gallery_data] gallery.yml 解析失败: ' + err.message);
    return [];
  }
  if (!Array.isArray(raw)) {
    hexo.log.warn('[gallery_data] gallery.yml 的顶层必须是一个 list');
    return [];
  }
  return raw
    .filter((it) => it && it.img)
    .map((it) => Object.assign({ name: '', tag: '', date: '' }, it, { date: normDate(it.date) }))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function render(items) {
  const tags = [...new Set(items.map((it) => it.tag).filter(Boolean))];
  const filterBtns = tags
    .map((t) => `<button class="works-filter" type="button" data-filter="${esc(t)}">${esc(t)}</button>`)
    .join('');

  const cards = items
    .map((it, i) => {
      const name = esc(it.name || '');
      // 作品名已含分类时不重复追加
      const tagTxt = it.tag && name.indexOf(it.tag) === -1 ? ' · ' + esc(it.tag) : '';
      // 灯箱标题:名字 · 分类 + 感想(单独一行,小字)
      // 注意:data-caption 属性里不能出现裸双引号,span 标签用 HTML 实体编码
      const lbNote = it.note
        ? `&lt;span class=&quot;works-lb-note&quot;&gt;${esc(it.note)}&lt;/span&gt;`
        : '';
      const caption = name + tagTxt + lbNote;
      const date = it.date ? `<time class="works-date">${esc(it.date.slice(0, 7))}</time>` : '';
      const cardNote = it.note ? `<p class="works-note">${esc(it.note)}</p>` : '';
      return `<figure class="works-item" data-tags="${esc(it.tag)}" style="animation-delay:${Math.min(i, 12) * 50}ms">
  <a class="works-link" href="${esc(it.img)}" data-fancybox="works" data-caption="${caption}">
    <img class="works-img" src="${esc(it.img)}" alt="${esc(it.name)}" loading="lazy">
    <figcaption class="works-cap">
      <div class="works-cap-top"><span class="works-name">${name}</span>${date}</div>
      ${cardNote}
    </figcaption>
  </a>
</figure>`;
    })
    .join('');

  return `<div class="works" id="works">
  <div class="works-filters">
    <button class="works-filter is-active" type="button" data-filter="all">全部 <span class="works-count">${items.length}</span></button>
    ${filterBtns}
  </div>
  <div class="works-grid">${cards}</div>
</div>`;
}

hexo.extend.tag.register('gallery_data', function () {
  return render(galleryItems());
});