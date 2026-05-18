class SiteFaq extends HTMLElement {

  connectedCallback() {

    const title =
      this.getAttribute('title') || 'FAQ';

    const subtitle =
      this.getAttribute('subtitle') || '';

    const topics =
      [...this.querySelectorAll('faq-topic')];

    const topicsHTML =
      topics.map(topic => {

        const topicTitle =
          topic.getAttribute('title') || '';

        const items =
          [...topic.querySelectorAll('faq-item')];

        const itemsHTML =
          items.map(item => {

            const q =
              item.getAttribute('q') || '';

            const a =
              item.getAttribute('a') || '';

            return `
              <div class="faq-item">

                <button class="faq-question">

                  ${q}

                  <span>+</span>

                </button>

                <div class="faq-answer">
                  ${a}
                </div>

              </div>
            `;

          }).join('');

        return `
          <div class="faq-topic">

            <h3 class="faq-topic-title">
              ${topicTitle}
            </h3>

            ${itemsHTML}

          </div>
        `;

      }).join('');

    this.innerHTML = `
      <style>

        .faq-section{
          background:#f7f3ee;
          padding:90px 24px;
          direction:rtl;
          font-family:'DM Sans',sans-serif;
        }

        .faq-header{
          text-align:center;
          margin-bottom:56px;
        }

        .faq-header h2{
          font-family:'DM Serif Display',serif;
          font-size:44px;
          font-weight:400;
          color:#1a1612;
          margin:0 0 14px;
        }

        .faq-header p{
          color:#7b7168;
          font-size:15px;
          margin:0;
        }

        .faq-topic{
          max-width:900px;
          margin:0 auto 52px;
        }

        .faq-topic-title{
          font-family:'DM Serif Display',serif;
          font-size:28px;
          font-weight:400;
          color:#1a1612;
          margin:0 0 24px;
          padding-bottom:12px;
          border-bottom:1px solid #d8cec2;
        }

        .faq-item{
          background:#fff;
          border:1px solid #e6ddd2;
          margin-bottom:16px;
          overflow:hidden;
          transition:box-shadow .25s ease;
        }

        .faq-item:hover{
          box-shadow:0 10px 30px rgba(0,0,0,.06);
        }

        .faq-question{
          width:100%;
          background:none;
          border:none;
          padding:24px 26px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          text-align:right;
          cursor:pointer;

          font-size:20px;
          // font-size:16px;
          font-weight:600;
          color:#1a1612;
        }

        .faq-question span{
          font-size:22px;
          color:#9b8c78;
          transition:transform .25s ease;
        }

        .faq-answer{
          display:none;
          padding:0 26px 24px;
          color:#6d645c;
          font-size:18px;
          //  font-size:15px;
          line-height:1.9;
        }

        .faq-item.active .faq-answer{
          display:block;
        }

        .faq-item.active .faq-question span{
          transform:rotate(45deg);
        }

      </style>

      <section class="faq-section">

        <div class="faq-header">

          <h2>${title}</h2>

          <p>${subtitle}</p>

        </div>

        ${topicsHTML}

      </section>
    `;

    this.querySelectorAll('.faq-question')
      .forEach(btn => {

        btn.addEventListener('click', () => {

          btn.parentElement
            .classList.toggle('active');

        });

      });

  }
}

customElements.define(
  'site-faq',
  SiteFaq
);