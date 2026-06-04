// /components/travel-form.js

class TravelForm extends HTMLElement {

  connectedCallback() {
    const phone = this.getAttribute('phone') || '972547310116';

    this.innerHTML = `
      <style>
        .trf-wrap {
          font-family: 'DM Sans', sans-serif;
          direction: rtl;
          background: #f6f6f4;
          padding: 24px 24px;
          border-radius: 8px;
        }

        .trf-inner {
          max-width: 560px;
          margin: 0 auto;
          background: #fff;
          padding: 40px 36px;
          border: 1px solid #ece7df;
          border-radius: 8px;
          box-shadow: 0 8px 30px rgba(0,0,0,.04);
        }

        .trf-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .trf-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #e8f0f5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .trf-icon svg {
          width: 26px;
          height: 26px;
        }

        .trf-header h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1a1612;
          margin: 0 0 8px;
        }

        .trf-header p {
          font-size: 20px;
          color: #9b8c78;
          margin: 0;
        }

        .trf-divider {
          height: 1.5px;
          background: #1a1612;
          margin: 0 0 32px;
        }

        .trf-field {
          margin-bottom: 22px;
        }

        .trf-field > label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #1a1612;
          margin-bottom: 8px;
        }

        .trf-field input[type="text"],
        .trf-field input[type="number"] {
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

        .trf-field input[type="number"]::-webkit-inner-spin-button,
        .trf-field input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }

        .trf-field input:focus {
          border-color: #1a1612;
        }

        .trf-field input::placeholder {
          color: #c8bfb2;
        }

        /* 인원 선택 버튼 */
        .trf-pax {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .trf-pax-btn {
          height: 40px;
          min-width: 56px;
          padding: 0 14px;
          border: 1.5px solid #e8e2d8;
          border-radius: 4px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1612;
          cursor: pointer;
          transition: border-color .18s, background .18s;
          user-select: none;
        }

        .trf-pax-btn:hover {
          border-color: #c8bfb2;
        }

        .trf-pax-btn.selected {
          border-color: #1a1612;
          background: #f5f0e8;
          font-weight: 600;
        }

        /* 지역 체크박스 */
        .trf-checks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        @media (max-width: 480px) {
          .trf-checks {
            grid-template-columns: repeat(2, 1fr);
          }
          .trf-inner {
            padding: 28px 20px;
          }
        }

        .trf-check {
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

        .trf-check:hover {
          border-color: #c8bfb2;
        }

        .trf-check.checked {
          border-color: #1a1612;
          background: #f5f0e8;
        }

        .trf-check input {
          display: none;
        }

        .trf-checkmark {
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

        .trf-check.checked .trf-checkmark {
          background: #1a1612;
          border-color: #1a1612;
        }

        .trf-checkmark svg {
          display: none;
        }

        .trf-check.checked .trf-checkmark svg {
          display: block;
        }

        /* textarea */
        .trf-field textarea {
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

        .trf-field textarea:focus {
          border-color: #1a1612;
        }

        .trf-field textarea::placeholder {
          color: #c8bfb2;
        }

        /* 전송 버튼 */
        .trf-btn {
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

        .trf-btn:hover { opacity: .88; }
        .trf-btn:active { transform: scale(.98); opacity: .78; }

        .trf-btn svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
      </style>

      <div class="trf-wrap">
        <div class="trf-inner">

          <!-- 헤더 -->
          <div class="trf-header">
            <div class="trf-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a6ea8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="10" r="3"/>
                <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.5 12 9 13 1.5-1 9-7.75 9-13 0-4.97-4.03-9-9-9z"/>
              </svg>
            </div>
            <h2>תכנון טיול לקוריאה</h2>
            <p>מלאו את הפרטים וניצור קשר דרך WhatsApp</p>
          </div>

          <div class="trf-divider"></div>

          <!-- 나이 -->
          <div class="trf-field">
            <label>גיל</label>
            <input type="number" id="trf-age" placeholder="32" min="10" max="99">
          </div>

          <!-- 방문 시기 -->
          <div class="trf-field">
            <label>מתי אתם שוקלים להגיע לקוריאה?</label>
            <input type="text" id="trf-visit" placeholder="2026.12">
          </div>

          <!-- 인원 -->
          <div class="trf-field">
            <label>כמה אנשים יטיילו?</label>
            <div class="trf-pax" id="trf-pax">
              ${['1', '2', '3', '4', '5', '6+'].map(v => `
                <button class="trf-pax-btn" data-val="${v}">${v}</button>
              `).join('')}
            </div>
          </div>

          <!-- 여행지 -->
          <div class="trf-field">
            <label>אילו מקומות אתם רוצים לבקר?</label>
            <div class="trf-checks" id="trf-checks">
              ${[
                ['סיאול', 'Seoul'],
                ['בוסאן', 'Busan'],
                ['ג\'ג\'ו', 'Jeju'],
                ['גאנגנונג', 'Gangneung'],
                ['גיונגג\'ו', 'Gyeongju'],
                ['ג\'ונג\'ו', 'Jeonju'],
                ['אינצ\'ון', 'Incheon'],
                ['סואון', 'Suwon'],
                ['DMZ', 'DMZ']
              ].map(([heb, eng]) => `
                <label class="trf-check">
                  <input type="checkbox" value="${heb} (${eng})">
                  <span class="trf-checkmark">
                    <svg viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>${heb}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- interests -->
          <div class="trf-field">
            <label>תחומי עניין  </label>
            <div class="trf-checks" id="trf-checks2">
              ${[
                ['תרבות', 'Culture'],
                ['היסטוריה', 'History'],
                ['קייפופ', 'K-Pop'],
                ['ודרמות', 'K-Dramas'],
                ['אוכל מסורתי', 'Traditional Food'],
                ['שופינג', 'Shopping']
              ].map(([heb, eng]) => `
                <label class="trf-check">
                  <input type="checkbox" value="${heb} (${eng})">
                  <span class="trf-checkmark">
                    <svg viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>${heb}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- 자유 텍스트 -->
          <div class="trf-field">
            <label>שאלות, בקשות מיוחדות וכו׳</label>
            <textarea
              id="trf-note"
              placeholder="לדוגמה: אנחנו משפחה עם ילדים, מחפשים מסלול נוח עם הרבה אוכל ותרבות..."></textarea>
          </div>

          <!-- 전송 버튼 -->
          <button class="trf-btn" id="trf-send">
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

    // 인원 버튼
    this.querySelectorAll('.trf-pax-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.querySelectorAll('.trf-pax-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // 여행지 체크박스
    this.querySelectorAll('.trf-check').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        el.classList.toggle('checked');
        el.querySelector('input').checked = el.classList.contains('checked');
      });
    });

    // 전송
    this.querySelector('#trf-send').addEventListener('click', () => {
      const age   = this.querySelector('#trf-age').value.trim();
      const visit = this.querySelector('#trf-visit').value.trim();
      const pax   = this.querySelector('.trf-pax-btn.selected');
      const places = [...this.querySelectorAll('#trf-checks .trf-check.checked')]
        .map(el => el.querySelector('input').value);
      const note  = this.querySelector('#trf-note').value.trim();

      let msg = 'שלום! אני מעוניין/ת בתכנון טיול לקוריאה.\n\n';
      if (age)          msg += 'גיל: ' + age + '\n';
      if (visit)        msg += 'מועד הגעה: ' + visit + '\n';
      if (pax)          msg += 'מספר מטיילים: ' + pax.dataset.val + '\n';
      if (places.length) msg += 'יעדים: ' + places.join(', ') + '\n';
      if (note)         msg += 'שאלות / בקשות: ' + note + '\n';

      const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
    });
  }
}

customElements.define('travel-form', TravelForm);