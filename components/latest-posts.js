// /components/latest-posts.js

class LatestPosts extends HTMLElement {

  connectedCallback() {

    // unique callback name
    this.callbackName =
      'bpCallback_' + Math.random().toString(36).slice(2);

    this.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

.bp-wrap{
    font-family:'DM Sans',sans-serif;
    padding: 2rem 2rem ; 
    // 48px 20px; 패딩조절. 앞 section닫으면 되니 이걸 크게할필요 없음
  // margin-bottom:72px;
  direction: ltr; /* 전체는 고정 */
}
        

.bp-header{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
          margin-bottom:36px;
          padding-bottom:14px;
          border-bottom:1.5px solid #1a1612;
            direction: rtl; /* 여기만 RTL */
        }

.bp-header h2{
  font-family:'DM Serif Display',serif;
  font-size: 1.5rem;
  // 28px;

  font-weight:600; /*400->600*/
  color:#1a1612;

  padding-inline: 20px;
  margin:0;
    direction: rtl;
  text-align: right;
        }

.bp-header a{
          margin-right: auto;   

          padding-right:20px; /*비대칭 padding 사용.모바일때문 */
          padding-left:8px;
          font-size:1.2 rem;
          // 16px;
          font-weight:600;
          letter-spacing:.1em;
          text-transform:uppercase;
          color:#1a1612;
          text-decoration:none;
          border-bottom:1.5px solid #1a1612;
          padding-bottom:1px;
          transition:opacity .2s;


        }

        .bp-header a:hover{
          opacity:.4;
        }

.bp-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:24px;
  direction: rtl;  /* grid는 반드시 ltr 유지-> claude는 rtl로하라고. */
  // justify-items: start;  /* 삭제하라고.. */
  
}
.bp-grid:has(.bp-card:only-child){
  grid-template-columns: 1fr;
  justify-items: end;
}
  
@media (max-width:860px){
          .bp-grid{
            grid-template-columns:repeat(2,1fr);
          }
        }

@media (max-width:540px){
          .bp-grid{
            grid-template-columns:1fr;
          }

          .bp-header{
            align-items:flex-start;
          }

          .bp-header h2{
            padding-inline:12px;
            font-size:22px;
          }

          .bp-header a{
    padding-right:12px;
    padding-left:4px;
            font-size:13px;
            letter-spacing:.04em;
          }
        }

.bp-card{
          background:#fff;
          border:1px solid #e8e2d8;
          border-radius:4px;
          overflow:hidden;
          opacity:0;
          transform:translateY(20px);
          transition:
            opacity .55s ease,
            transform .55s ease,
            box-shadow .25s;
          direction: ltr; /* ← 추가: 카드 내부는 ltr 유지 */  
          width:100%;
        }

        .bp-card.bp-visible{
          opacity:1;
          transform:translateY(0);
        }

        .bp-card:hover{
          box-shadow:0 14px 40px rgba(0,0,0,.1);
        }

.bp-card-link{
  display:flex;
  flex-direction:column;
    direction: rtl; /* 카드 내부만 RTL */
  color:inherit;
  text-decoration:none;
  height:100%;
   -webkit-tap-highlight-color: transparent;
}


        .bp-thumb{
          position:relative;
          overflow:hidden;
          aspect-ratio:16/10;
          background:#f5f0e8;
        }

        .bp-thumb img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:transform .6s ease;
        }

        .bp-card:hover .bp-thumb img{
          transform:scale(1.06);
        }

        .bp-num{
          position:absolute;
          top:13px;
          left:13px;
          font-family:'DM Serif Display',serif;
          font-size:12px;
          color:#fff;
          background:rgba(0,0,0,.42);
          backdrop-filter:blur(5px);
          padding:3px 9px;
          border-radius:2px;
        }

        .bp-body{
          padding:20px 18px 24px;
            flex:1;
              text-align: right;
        }

        .bp-meta{
          display:block;
          font-size:11px;
          font-weight:600;
          letter-spacing:.1em;
          text-transform:uppercase;
          color:#9b8c78;
          margin-bottom:9px;
        }

.bp-title{
  font-family:'DM Serif Display',serif;
  font-size:19px;
  font-weight:400;
  line-height:1.32;
  margin:0 0 11px;
  color:#1a1612;
}
        .bp-summary{
          font-size:13.5px;
          color:#777;
          line-height:1.9;
          margin:0;
          text-align: right;
        }

        .bp-loading{
          color:#777;
          font-size:14px;
        }

.bp-card{
  cursor:pointer;
}

        @media (prefers-reduced-motion:reduce){
          .bp-card,
          .bp-thumb img{
            transition:none !important;
            animation:none !important;
            transform:none !important;
          }
        }
      </style>

      <div class="bp-wrap">

        <div class="bp-header">
<h2> פוסטים אחרונים </h2>

          <a
            href="https://koreabeivrit.blogspot.com"
            target="_blank"
            rel="noopener noreferrer">

לצפייה בעוד←

          </a>
        </div>

        <div class="bp-grid" id="bp-posts">
          <div class="bp-loading">Loading...</div>
        </div>

      </div>
    `;

    this.loadPosts();
  }

  stripHtml(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent || d.innerText || '';
  }

  formatDate(iso) {
    const d = new Date(iso);

    return `${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`;
  }

  loadPosts() {

    const container =
      this.querySelector('#bp-posts');
// to get labels on a post  
  const label = this.getAttribute('label') || '';

    // global callback
    window[this.callbackName] = (data) => {

      const entries =
        (data.feed.entry || []).slice(0,3);

      if (!entries.length) {
        container.innerHTML =
          '<p>No posts available.</p>';
        return;
      }

      container.innerHTML = '';

      const nums = ['01','02','03'];

      entries.forEach((post, i) => {

        const title =
          post.title.$t;

        const link =
          post.link.find(
            l => l.rel === 'alternate'
          ).href;

        const date =
          this.formatDate(post.published.$t);

        const content =
          (post.content?.$t || '') ||
          (post.summary?.$t || '');

        const plain =
          this.stripHtml(content).trim();

        const summary =
          plain.length > 115
            ? plain.slice(0,115).trim() + '…'
            : plain;

        const imgMatch =
          content.match(
            /<img[^>]+src=["']([^"']+)["']/
          );

        const thumb = imgMatch
          ? imgMatch[1].replace(/s\d+(-c)?/, 's1600')
          : 'https://placehold.co/800x500/f5f0e8/9b8c78?text=No+Image';

        const card =
          document.createElement('article');

        card.className = 'bp-card';

     card.innerHTML = `
  <a
    class="bp-card-link"
    href="${link}"
    target="_blank"
    rel="noopener noreferrer">

    <div class="bp-thumb">

      <img
        src="${thumb}"
        alt="${title}"
        loading="${i === 0 ? 'eager' : 'lazy'}"
        decoding="async">

      <span class="bp-num">
        ${nums[i]}
      </span>

    </div>

    <div class="bp-body">

      <span class="bp-meta">
        ${date}
      </span>

      <h2 class="bp-title">
        ${title}
      </h2>

      <p class="bp-summary">
        ${summary}
      </p>

    </div>

  </a>
`;

container.appendChild(card);
      });

      // fade in
      const obs = new IntersectionObserver(
        entries => {

          entries.forEach(e => {

            if (e.isIntersecting) {
              e.target.classList.add('bp-visible');
              obs.unobserve(e.target);
            }

          });

        },
        { threshold:0.1 }
      );

      container
        .querySelectorAll('.bp-card')
        .forEach(c => obs.observe(c));

      // cleanup
      delete window[this.callbackName];
      script.remove();
    };

    const script =
      document.createElement('script');


  script.src = label
    ? `https://koreabeivrit.blogspot.com/feeds/posts/default/-/${label}?alt=json-in-script&max-results=3&callback=${this.callbackName}`
    : `https://koreabeivrit.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=3&callback=${this.callbackName}`;

    script.onerror = () => {

      container.innerHTML = `
        <p class="bp-loading">
          Failed to load posts.
        </p>
      `;

      delete window[this.callbackName];
    };

    document.body.appendChild(script);
  }
}

customElements.define(
  'latest-posts',
  LatestPosts
);