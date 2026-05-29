(function () {
  function init() {
    if (!document.body.classList.contains('item-view')) return;

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
      var url   = a.href;
      var label = a.textContent.trim();

      var card = document.createElement('a');
      card.href      = url;
      card.target    = '_blank';
      card.rel       = 'noopener noreferrer';
      card.className = 'bp-link-card';
      card.innerHTML =
        '<div class="bp-lc-body">' +
          '<strong class="bp-lc-title">' + label + '</strong>' +
          '<p class="bp-lc-url">' + url + '</p>' +
        '</div>' +
        '<div class="bp-lc-arrow">\u2192</div>';

      a.replaceWith(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();