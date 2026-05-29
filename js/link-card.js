// blogspot link to card

(function () {
  function init() {
    var links = Array.from(
      document.querySelectorAll(
        '.post-body a[href*="koreabeivrit.blogspot.com"]'
      )
    ).filter(function (a) {
      if (a.closest('.bp-link-card')) return false;
      if (a.querySelector('img')) return false;
      if (a.closest('h1,h2,h3,h4')) return false;
      return true;
    });

    console.log('link-card: 링크 감지', links.length, '개');

    links.forEach(function (a) {
      var url      = a.href;
      var slug     = url.split('/').pop().split('?')[0].replace('.html', '');
      var cbName   = 'lc_' + Math.random().toString(36).slice(2);

      console.log('link-card: 처리 중', slug);

      window[cbName] = function (data) {
        console.log('link-card: feed 응답', data);

        var entry = data.feed && data.feed.entry && data.feed.entry[0];
        if (!entry) {
          console.warn('link-card: entry 없음', slug);
          return;
        }

        var title   = entry.title.$t;
        var postUrl = entry.link.filter(function (l) { return l.rel === 'alternate'; })[0].href;
        var content = (entry.content && entry.content.$t) || (entry.summary && entry.summary.$t) || '';

        function stripHtml(html) {
          var d = document.createElement('div');
          d.innerHTML = html;
          return d.textContent || d.innerText || '';
        }

        var excerpt = stripHtml((entry.summary && entry.summary.$t) || content).trim().slice(0, 100) + '\u2026';

        var date = new Date(entry.published.$t).toLocaleDateString('he-IL', {
          year: 'numeric', month: 'long', day: 'numeric'
        });

        var thumb = '';
        if (entry.media$thumbnail && entry.media$thumbnail.url) {
          thumb = entry.media$thumbnail.url.replace(/s\d+(-c)?/, 's800');
        } else {
          var d2 = document.createElement('div');
          d2.innerHTML = content;
          var img = d2.querySelector('img');
          if (img) thumb = img.src.replace(/s\d+(-c)?/, 's800');
        }

        var card = document.createElement('a');
        card.href      = postUrl;
        card.target    = '_blank';
        card.rel       = 'noopener noreferrer';
        card.className = 'bp-link-card';

        var thumbHtml = thumb
          ? '<div class="bp-lc-thumb"><img src="' + thumb + '" alt="' + title + '" loading="lazy"></div>'
          : '';

        card.innerHTML =
          thumbHtml +
          '<div class="bp-lc-body">' +
            '<span class="bp-lc-date">' + date + '</span>' +
            '<strong class="bp-lc-title">' + title + '</strong>' +
            '<p class="bp-lc-excerpt">' + excerpt + '</p>' +
          '</div>' +
          '<div class="bp-lc-arrow">\u2192</div>';

        a.replaceWith(card);
        delete window[cbName];
        script.remove();
      };

      var script    = document.createElement('script');
      script.src    = 'https://koreabeivrit.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=1&q=' + encodeURIComponent(slug) + '&callback=' + cbName;
      script.onerror = function () {
        console.error('link-card: 로드 실패', script.src);
        delete window[cbName];
      };
      document.body.appendChild(script);
    });
  }

  // DOM 준비 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();