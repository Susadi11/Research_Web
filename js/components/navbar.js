/* ============================================================
   navbar.js — Navigation bar interactions
   Runs after DOMContentLoaded so that main.js buildNavbar()
   has already injected the HTML elements.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    const navbar     = document.querySelector('.navbar');
    const hamburger  = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile');
    const dropdowns  = document.querySelectorAll('.navbar__dropdown');

    if (!navbar) return;

    /* ── Scroll shadow ── */
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Hamburger / mobile menu ── */
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      /* Close on outside click */
      document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });

      /* Close when a mobile link is clicked */
      mobileMenu.addEventListener('click', function (e) {
        if (e.target.closest('.navbar__mobile-link')) {
          mobileMenu.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    /* ── Dropdown menus ── */
    dropdowns.forEach(function (dd) {
      const trigger = dd.querySelector('.navbar__dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        dd.classList.toggle('open');
        /* Close sibling dropdowns */
        dropdowns.forEach(function (other) {
          if (other !== dd) other.classList.remove('open');
        });
      });
    });

    /* Close dropdowns on outside click */
    document.addEventListener('click', function () {
      dropdowns.forEach(function (dd) { dd.classList.remove('open'); });
    });

    /* ── Active link highlighting ── */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(function (link) {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

  }); // end DOMContentLoaded

})();
