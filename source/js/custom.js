/* ============================================
   站点小交互(与主题无关,升级主题不冲突)
   1. 画廊分类筛选
   2. fancybox 兜底初始化(仅当主题未处理时)
   ============================================ */
(function () {
  'use strict';

  /* --- 1. 画廊筛选 --- */
  var works = document.getElementById('works');
  if (works) {
    var grid = works.querySelector('.works-grid');
    var filters = works.querySelectorAll('.works-filter');
    if (grid && filters.length) {
      filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filters.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var f = btn.getAttribute('data-filter');
          grid.querySelectorAll('.works-item').forEach(function (item) {
            var show = f === 'all' || (item.getAttribute('data-tags') || '').indexOf(f) !== -1;
            item.classList.toggle('is-hidden', !show);
          });
        });
      });
    }
  }

  /* --- 2. fancybox 兜底(画廊大图) --- */
  if (window.jQuery && window.jQuery.fancybox) {
    try {
      var $g = window.jQuery('[data-fancybox="works"]');
      if ($g.length && !$g.first().data('fancybox')) {
        $g.fancybox({
          loop: true,
          buttons: ['zoom', 'slideShow', 'close'],
          youtube: { autoplay: 0 },
          vimeo: { autoplay: 0 }
        });
      }
    } catch (e) { /* 忽略:主题已接管 fancybox */ }
  }
})();