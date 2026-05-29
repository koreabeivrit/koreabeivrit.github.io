(function () {
  function init() {
    if (!document.body.classList.contains('item-view')) return;

    var links = Array.from(
      document.querySelectorAll('.post-body a[href*="koreabeivrit.blogspot.com"]')
    ).filter(function (a) {
      if (a.closest('.bp-link-card')) return false;
      if (a.querySelector('img')) return false;
      if (a.closest('h1,h2,h3,h4')) return false;
        if (a.href.includes('/search/label/')) return false; 
      return true;
    });

    console.log('link-card: 링크 감지', links.length, '개');

    links.forEach(function (a) {
      var url   = a.href;
      var label = a.textContent.trim();

      // 일단 텍스트 카드로 먼저 교체
      var card = document.createElement('a');
      card.href      = url;
      card.target    = '_blank';
      card.rel       = 'noopener noreferrer';
      card.className = 'bp-link-card';
      card.innerHTML =
        '<div class="bp-lc-body">' +
          '<strong class="bp-lc-title">' + label + '</strong>' +
          '<p class="bp-lc-excerpt bp-lc-loading">불러오는 중...</p>' +
        '</div>' +
        '<div class="bp-lc-arrow">\u2192</div>';

      a.replaceWith(card);

      // fetch로 OG 태그 파싱
      fetch(url)
        .then(function (res) { return res.text(); })
        .then(function (html) {
          var parser = new DOMParser();
          var doc    = parser.parseFromString(html, 'text/html');

          var ogImage = doc.querySelector('meta[property="og:image"]');
          var ogDesc  = doc.querySelector('meta[property="og:description"]');
          var ogTitle = doc.querySelector('meta[property="og:title"]');

          var thumb   = ogImage ? ogImage.getAttribute('content') : '';
          var excerpt = ogDesc  ? ogDesc.getAttribute('content')  : '';
          var title   = ogTitle ? ogTitle.getAttribute('content') : label;

          // 카드 내용 업데이트
          var thumbHtml = thumb
            ? '<div class="bp-lc-thumb"><img src="' + thumb + '" alt="' + title + '" loading="lazy"></div>'
            : '';

          card.innerHTML =
            thumbHtml +
            '<div class="bp-lc-body">' +
              '<strong class="bp-lc-title">' + title + '</strong>' +
              '<p class="bp-lc-excerpt">' + excerpt.slice(0, 120) + '\u2026' + '</p>' +
            '</div>' +
            '<div class="bp-lc-arrow">\u2192</div>';
        })
        .catch(function (err) {
          // fetch 실패해도 텍스트 카드는 유지
          console.warn('link-card: fetch 실패', url, err);
          card.querySelector('.bp-lc-excerpt').textContent = '';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();