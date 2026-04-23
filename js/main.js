/* ============================================================
   main.js — Shared utilities loaded on every page
   ============================================================ */

(function () {
  'use strict';

  /* ── Inject Font Awesome 6 ── */
  (function loadFA() {
    if (document.querySelector('link[data-fa]')) return;
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    link.setAttribute('data-fa', '1');
    document.head.appendChild(link);
  })();

  /* ── Path helpers ── */
  function isRoot() {
    return !window.location.pathname.includes('/html/');
  }
  function base() { return isRoot() ? 'html/' : ''; }
  function home() { return isRoot() ? 'index.html' : '../index.html'; }

  /* ── Navbar injection ── */
  function buildNavbar() {
    const navEl = document.querySelector('.navbar');
    if (!navEl) return;
    const b = base(), h = home();

    navEl.innerHTML = `
      <div class="navbar__inner">
        <a href="${h}" class="navbar__logo">
          <div class="navbar__logo-icon">H</div>
          <div class="navbar__logo-text">
            <span class="navbar__logo-name">Hale</span>
            <span class="navbar__logo-sub">Dementia Research · SLIIT</span>
          </div>
        </a>

        <nav class="navbar__nav" role="navigation">
          <a href="${h}" class="navbar__link">Home</a>
          <a href="${b}domain.html" class="navbar__link">Domain</a>
          <a href="${b}milestones.html" class="navbar__link">Milestones</a>
          <a href="${b}documents.html" class="navbar__link">Documents</a>
          <a href="${b}presentations.html" class="navbar__link">Presentations</a>
          <a href="${b}about.html" class="navbar__link">About Us</a>
          <a href="${b}contact.html" class="navbar__link">Contact</a>
        </nav>

        <div class="navbar__actions">
          <a href="${b}contact.html" class="btn btn--primary btn--sm">Get in Touch</a>
          <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;

    let mobileEl = document.querySelector('.navbar__mobile');
    if (!mobileEl) {
      mobileEl = document.createElement('div');
      mobileEl.className = 'navbar__mobile';
      navEl.after(mobileEl);
    }
    mobileEl.innerHTML = `
      <div class="navbar__mobile-inner">
        <a href="${h}"                  class="navbar__mobile-link"><i class="fa-solid fa-house fa-fw"></i> Home</a>
        <a href="${b}domain.html"       class="navbar__mobile-link"><i class="fa-solid fa-flask fa-fw"></i> Domain</a>
        <a href="${b}milestones.html"   class="navbar__mobile-link"><i class="fa-solid fa-bullseye fa-fw"></i> Milestones</a>
        <div class="navbar__mobile-divider"></div>
        <a href="${b}documents.html"    class="navbar__mobile-link"><i class="fa-regular fa-file-lines fa-fw"></i> Documents</a>
        <a href="${b}presentations.html" class="navbar__mobile-link"><i class="fa-solid fa-chart-bar fa-fw"></i> Presentations</a>
        <div class="navbar__mobile-divider"></div>
        <a href="${b}about.html"        class="navbar__mobile-link"><i class="fa-solid fa-users fa-fw"></i> About Us</a>
        <a href="${b}contact.html"      class="navbar__mobile-link"><i class="fa-solid fa-envelope fa-fw"></i> Contact</a>
      </div>
    `;
  }

  /* ── Footer injection ── */
  function buildFooter() {
    const footerEl = document.querySelector('.footer');
    if (!footerEl) return;
    const b = base(), h = home();

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer__main">
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="footer__logo-icon">H</div>
              <div>
                <div class="footer__logo-name">Hale</div>
                <div class="footer__logo-sub">Dementia Research Project</div>
              </div>
            </div>
            <p class="footer__tagline">
              An AI-driven platform for early dementia risk monitoring and cognitive support for the elderly — by Hale.
            </p>
            <div class="footer__uni">
              <i class="fa-solid fa-graduation-cap"></i>
              &nbsp;Sri Lanka Institute of Information Technology · Faculty of Computing
            </div>
          </div>

          <div>
            <div class="footer__col-title">Navigation</div>
            <ul class="footer__links">
              <li><a class="footer__link" href="${h}"><i class="fa-solid fa-house fa-fw"></i> Home</a></li>
              <li><a class="footer__link" href="${b}domain.html"><i class="fa-solid fa-flask fa-fw"></i> Domain</a></li>
              <li><a class="footer__link" href="${b}milestones.html"><i class="fa-solid fa-bullseye fa-fw"></i> Milestones</a></li>
            </ul>
          </div>

          <div>
            <div class="footer__col-title">Resources</div>
            <ul class="footer__links">
              <li><a class="footer__link" href="${b}documents.html"><i class="fa-regular fa-file-lines fa-fw"></i> Documents</a></li>
              <li><a class="footer__link" href="${b}presentations.html"><i class="fa-solid fa-chart-bar fa-fw"></i> Presentations</a></li>
            </ul>
          </div>

          <div>
            <div class="footer__col-title">Team</div>
            <ul class="footer__links">
              <li><a class="footer__link" href="${b}about.html"><i class="fa-solid fa-users fa-fw"></i> About Us</a></li>
              <li><a class="footer__link" href="${b}contact.html"><i class="fa-solid fa-envelope fa-fw"></i> Contact</a></li>
              <li><a class="footer__link" href="mailto:it22180384@my.sliit.lk"><i class="fa-solid fa-paper-plane fa-fw"></i> Email Us</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copy">© 2024 Hale Research Team · SLIIT · All rights reserved.</p>
          <div class="footer__bottom-links">
            <a class="footer__bottom-link" href="${h}">Home</a>
            <a class="footer__bottom-link" href="${b}contact.html">Contact</a>
          </div>
        </div>
      </div>
    `;
  }

  /* ── Back to top ── */
  function injectBackToTop() {
    const style = document.createElement('style');
    style.textContent = `
      .back-to-top{position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;
        border-radius:50%;background:var(--clr-primary);color:#fff;font-size:1rem;
        display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-lg);
        cursor:pointer;opacity:0;transform:translateY(12px);
        transition:opacity .3s ease,transform .3s ease;z-index:900;border:none;}
      .back-to-top.visible{opacity:1;transform:translateY(0);}
      .back-to-top:hover{background:var(--clr-primary-dark);transform:translateY(-2px);}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildNavbar();
    buildFooter();
    injectBackToTop();
  });

})();
