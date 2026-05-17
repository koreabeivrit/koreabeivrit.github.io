// /components/header.js

class SiteHeader extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
    <style>

#mainNav{
  background:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.80) 0%,
      rgba(0, 0, 0, 0.50) 70%,
      rgba(0,0,0,0) 100%
    );

  backdrop-filter: blur(0px);

  transition:
    background .3s ease,
    padding .3s ease;

  // padding-top:1.2rem; // airy 
  // padding-bottom:2.4rem;
}

/* 중앙 정렬 */
#mainNav .navbar-collapse{
  justify-content: center;
}

#mainNav .navbar-nav{
  display:flex;
  align-items:center;
  gap:1.2rem;

  margin:0 auto;
}

/* 링크 스타일 */
#mainNav .nav-link{
  color:rgba(255,255,255,.88);
  font-weight:600;
  letter-spacing:.04em;

  transition:
    color .2s ease,
    opacity .2s ease;
}

#mainNav .nav-link:hover{
  color:#fff;
  opacity:.72;
}

/* 모바일 */
@media (max-width:991px){

  #mainNav{
    background:rgba(0,0,0,.92);
  }

  #mainNav .navbar-nav{
    gap:.35rem;
    padding-top:1rem;
  }

}
</style>

      <!-- Navigation -->
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
        dir="rtl">

        <div class="container">

          <!-- Mobile Toggle -->
          <button
            class="navbar-toggler"
            type="button"

            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"

            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation">

            תפריט

            <i class="fas fa-bars me-1"></i>

          </button>

          <!-- Nav Links -->
          <div
            class="collapse navbar-collapse"
            id="navbarResponsive">

            <ul
              class="navbar-nav text-uppercase py-4 py-lg-0">

              <li class="nav-item">
                <a
                  class="nav-link"
                  href="index.html">

                  אודות

                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  href="travel.html">

                  טיולים

                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  href="beauty.html">

                  טיפולי יופי וניתוחים פלסטיים

                </a>
              </li>

            <!-- korean
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="korean.html">
                  שפה קוריאנית
                </a>
              </li>
-->
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://koreabeivrit.blogspot.com">

                  Blog

                </a>
              </li>

            </ul>

          </div>

        </div>

      </nav>
    `;
  }
}

customElements.define(
  'site-header',
  SiteHeader
);