class WhatsAppWidget extends HTMLElement {
  connectedCallback() {

    const phone = "972547310116";
    const text = encodeURIComponent("שלום, יש לי שאלה לגבי הטיול.");

    this.innerHTML = `
      <style>
        .wa-wrap {
          background: #1a1612;
          padding: 64px 40px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          direction: rtl;
        }

        .wa-wrap h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 36px;
          font-weight: 400;
          color: #fff;
          letter-spacing: -.3px;
          margin: 0 0 12px;
        }

        .wa-wrap p {
          font-size: 15px;
          color: rgba(255,255,255,.55);
          margin: 0 0 32px;
          line-height: 1.7;
        }

        .wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #25D366;
          color: #fff;
          padding: 15px 34px;
          border-radius: 3px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: transform .2s, box-shadow .2s;
        }

        .wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,211,102,.32);
        }

        .wa-btn svg { flex-shrink: 0; }

        /* FLOAT BUTTON */
        .wa-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 10px;

          background: #25D366;
          color: #fff;
          padding: 13px 20px;
          border-radius: 50px;

          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;

          box-shadow: 0 4px 20px rgba(0,0,0,.22);
          transition: transform .2s, box-shadow .2s;

          overflow: visible;
        }

        .wa-float:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(37,211,102,.4);
        }

        /* pulse effect */
        .wa-float::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50px;
          background: #25D366;
          opacity: .35;
          animation: wa-pulse 2s ease-out infinite;
          z-index: -1;
        }

        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: .35; }
          70%  { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(1.18); opacity: 0; }
        }
      </style>

      <!-- SECTION -->
      <div class="wa-wrap">
        <h2>צור קשר</h2>

        <p>
          להזמנות טיולים וייעוץ מסלול,<br>
          נשמח לענות במהירות דרך WhatsApp
        </p>

        <a class="wa-btn"
           href="https://wa.me/${phone}?text=${text}"
           target="_blank"
           rel="noopener noreferrer">
           WhatsApp<i class="fab fa-whatsapp"></i>
        </a>
      </div>

      <!-- FLOAT BUTTON -->
      <a class="wa-float"
         href="https://wa.me/${phone}?text=${text}"
         target="_blank"
         rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>WhatsApp
      </a>
    `;
  }
}

customElements.define('site-whatsapp', WhatsAppWidget);