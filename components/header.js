// /components/header.js

class SiteHeader extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <!-- Navigation -->
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav">

        <div class="container">

          <!-- Logo -->
      <!--     <a
            class="navbar-brand"
            href="index.html">

            <img
              src="assets/img/navbar-logo.svg"
              alt="Korea Beivrit Logo" />

          </a>-->

          <!-- Mobile Toggle -->
          <button
            class="navbar-toggler"
            type="button"

            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"

            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation">

            Menu

            <i class="fas fa-bars ms-1"></i>

          </button>

          <!-- Nav Links -->
          <div
            class="collapse navbar-collapse"
            id="navbarResponsive">

            <ul
              class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
<li class="nav-item">

                <a
                  class="nav-link"
                  href="https://koreabeivrit.blogspot.com">

                  Blog

                </a>

              </li>
                           <li class="nav-item">

                <a
                  class="nav-link"
                  href="korean.html">

                  שפה קוריאנית

                </a>

              </li>

              <li class="nav-item">

                <a
                  class="nav-link"
                  href="beauty.html">

                  טיפולי יופי וניתוחים פלסטיים

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
                  href="index.html">

                  אודות 
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