// /components/wa-form.js

class WaForm extends HTMLElement {

  connectedCallback() {
const phone = this.getAttribute('phone') || '972547310116';

    this.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .waf-wrap {
          font-family: 'DM Sans', sans-serif;
          direction: rtl;
            background: #f6f6f4;   /* 전체 은은한 회색 */
  padding: 24px 24px;    /* 기존 48px 0 보다 줄임. #wa-form.page-section 확인할것 */
  border-radius: 8px;
        }

        .waf-inner {
          max-width: 560px;
          margin: 0 auto;

          background: #fff;
          padding: 40px 36px;

          border: 1px solid #ece7df;
          border-radius: 8px;

          box-shadow: 0 8px 30px rgba(0,0,0,.04);
        }
  
        .waf-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .waf-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #e8f5ee;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .waf-icon svg {
          width: 26px;
          height: 26px;
        }

        .waf-header h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          font-weight: 400;
          color: #1a1612;
          margin: 0 0 8px;
        }

        .waf-header p {
          font-size: 20px;
          // 14
          color: #9b8c78;
          margin: 0;
        }

        .waf-divider {
          height: 1.5px;
          background: #1a1612;
          margin: 0 0 32px;
        }

        .waf-field {
          margin-bottom: 22px;
        }

        .waf-field > label {
          display: block;
          font-size: 16px;
          // 13
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #1a1612;
          margin-bottom: 8px;
        }

        .waf-field input[type="text"],
        .waf-field input[type="number"] {
          width: 100%;
          box-sizing: border-box;
          height: 44px;
          border: 1.5px solid #e8e2d8;
          border-radius: 4px;
          padding: 0 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #1a1612;
          background: #fff;
          text-align: right;
          outline: none;
          transition: border-color .2s;
          -moz-appearance: textfield;
        }

        .waf-field input[type="number"]::-webkit-inner-spin-button,
        .waf-field input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }

        .waf-field input:focus {
          border-color: #1a1612;
        }

        .waf-field input::placeholder {
          color: #c8bfb2;
        }

        .waf-note {
          font-size: 14px;
          color: #9b8c78;
          margin: 0 0 12px;
          line-height: 1.6;
        }

        .waf-checks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        @media (max-width: 480px) {
          .waf-checks {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .waf-check {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border: 1.5px solid #e8e2d8;
          border-radius: 4px;
          cursor: pointer;
          background: #fff;
          transition: border-color .18s, background .18s;
          font-size: 13.5px;
          color: #1a1612;
          user-select: none;
        }

        .waf-check:hover {
          border-color: #c8bfb2;
        }

        .waf-check.checked {
          border-color: #1a1612;
          background: #f5f0e8;
        }

        .waf-check input {
          display: none;
        }

        .waf-checkmark {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          border: 1.5px solid #c8bfb2;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .18s, border-color .18s;
        }

        .waf-check.checked .waf-checkmark {
          background: #1a1612;
          border-color: #1a1612;
        }

        .waf-checkmark svg {
          display: none;
        }

        .waf-check.checked .waf-checkmark svg {
          display: block;
              }
      .waf-field textarea {
        width: 100%;
        box-sizing: border-box;

        min-height: 120px;
        resize: vertical;

        border: 1.5px solid #e8e2d8;
        border-radius: 4px;

        padding: 14px;

        font-family: 'DM Sans', sans-serif;
        font-size: 15px;

        color: #1a1612;
        background: #fff;

        text-align: right;
        direction: rtl;

        outline: none;
        transition: border-color .2s;

        line-height: 1.7;
      }

      .waf-field textarea:focus {
        border-color: #1a1612;
      }

      .waf-field textarea::placeholder {
        color: #c8bfb2;
      }
        .waf-btn {
          width: 100%;
          margin-top: 28px;
          height: 50px;
          background: #25D366;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: .04em;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: opacity .2s, transform .15s;
        }

        .waf-btn:hover {
          opacity: .88;
        }

        .waf-btn:active {
          transform: scale(.98);
          opacity: .78;
        }

        .waf-btn svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
      </style>

      <div class="waf-wrap">
      <div class="waf-inner">
        <div class="waf-header">
          <div class="waf-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0F6E56" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M8 12s1 2 4 2 4-2 4-2"/>
              <path d="M9 9h.01M15 9h.01"/>
            </svg>
          </div>
          <h2>שאלון ייעוץ יופי</h2>
          <p>מלאו את הפרטים וניצור קשר דרך WhatsApp</p>
        </div>

        <div class="waf-divider"></div>

        <div class="waf-field">
          <label>גיל</label>
          <input type="number" id="waf-age" placeholder="32" min="18" max="99">
        </div>

        <div class="waf-field">
          <label>מתי אתם שוקלים להגיע לקוריאה?</label>
          <input type="text" id="waf-visit" placeholder="2026.12">
        </div>

        <div class="waf-field">
          <label>תחומי עניין</label>
          <!-- <p class="waf-note">(אם אינכם בטוחים, שליחת תמונה יכולה לעזור לנו לייעץ)</p> -->
          <div class="waf-checks" id="waf-checks">
            ${[
              'עיניים', 'אף', 'קמטים',
              'מרקם עור', 'חזה', 'בטן',
              'שאיבת שומן', 'לייזר לעור', 'תאי גזע'
            ].map(val => `
              <label class="waf-check">
                <input type="checkbox" value="${val}">
                <span class="waf-checkmark">
                  <svg viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>${val}</span>
              </label>
            `).join('')}
          </div>
        </div>
<div class="waf-field">
  <label>הערות נוספות</label>

  <textarea
    id="waf-note"
    placeholder="ספרו לנו מה חשוב לכם, שאלות, חששות, טיפולים קודמים וכו׳">
  </textarea>
</div>

<div>
<label>אפשר גם לשלוח תמונה ב-WhatsApp לקבלת ייעוץ כללי&#128248;</label>
</div>
        <button class="waf-btn" id="waf-send">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          שליחה ב-WhatsApp
        </button>

      </div>
       </div>
    `;

    this._bindEvents(phone);
  }

  _bindEvents(phone) {

    this.querySelectorAll('.waf-check').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();                  
        el.classList.toggle('checked');
        el.querySelector('input').checked =
          el.classList.contains('checked');
      });
    });

    this.querySelector('#waf-send').addEventListener('click', () => {
      const age   = this.querySelector('#waf-age').value.trim();
      const visit = this.querySelector('#waf-visit').value.trim();
      const checks = [
        ...this.querySelectorAll('#waf-checks .waf-check.checked')
      ].map(el => el.querySelector('input').value);

      let msg = 'שלום! אני מעוניין/ת בייעוץ טיפולי יופי בקוריאה.\n\n';
      if (age)          msg += `גיל: ${age}\n`;
      if (visit)        msg += `מועד הגעה: ${visit}\n`;
      if (checks.length) msg += `תחומי עניין: ${checks.join(', ')}\n`;
      const note = this.querySelector('#waf-note').value.trim();
      if (note)         msg += `הערות נוספות: ${note}\n`;

      const encoded = encodeURIComponent(msg);
      const url = phone
        ? `https://wa.me/${phone}?text=${encoded}`
        : `https://wa.me/?text=${encoded}`;

      window.open(url, '_blank');
    });
  }
}

customElements.define('wa-form', WaForm);