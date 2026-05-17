class SiteFooter extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <style>
        .site-footer{
          margin-top:80px;
          padding:48px 40px;
          // background:#1a1612;
          color:rgba(3, 3, 3, 0.68);
          font-family:'DM Sans',sans-serif;
        }

        .footer-inner{
          max-width:1200px;
          margin:0 auto;

          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:24px;
          flex-wrap:wrap;
        }

        .footer-copy{
          font-size:14px;
          line-height:1.7;
        }

        .footer-links{
          display:flex;
          align-items:center;
          gap:18px;
          flex-wrap:wrap;
        }

        .footer-links a{
          color:rgba(3, 3, 3, 0.68);
          text-decoration:none;
          font-size:13px;
          letter-spacing:.03em;
          transition:opacity .2s;
        }

        .footer-links a:hover{
          opacity:.55;
        }

        .footer-divider{
          width:1px;
          height:12px;
          background:rgba(0, 0, 0, 0.28);
        }

        @media (max-width:640px){

          .footer-inner{
            flex-direction:column;
            align-items:flex-start;
          }

          .footer-links{
            gap:14px;
          }
        }
      </style>

      <footer class="site-footer">

        <div class="footer-inner">

          <div class="footer-copy">
            © 2026 Korea Beivrit
          </div>

          <div class="footer-links">

            <a
              href="https://koreabeivrit.blogspot.com"
              target="_blank"
              rel="noopener noreferrer">

              Blog

            </a>

            <span class="footer-divider"></span>

            <a href="/privacypolicy.html">
              Privacy Policy
            </a>

          </div>

        </div>

      </footer>
    `;
  }
}

customElements.define(
  'site-footer',
  SiteFooter
);