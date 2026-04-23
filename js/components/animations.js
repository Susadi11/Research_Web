/* ============================================================
   animations.js — Scroll-reveal and entrance animations
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal (Intersection Observer) ── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';

  function initScrollReveal() {
    const elements = document.querySelectorAll(revealSelectors);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target    = parseFloat(el.dataset.target || el.textContent);
    const suffix    = el.dataset.suffix || '';
    const prefix    = el.dataset.prefix || '';
    const decimals  = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration  = 1800;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      const value    = eased * target;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ── Stagger children animations ── */
  function initStagger() {
    const groups = document.querySelectorAll('[data-stagger]');
    groups.forEach(function (group) {
      const children = group.children;
      Array.from(children).forEach(function (child, i) {
        child.style.transitionDelay = (i * 0.1) + 's';
        child.classList.add('reveal');
      });
    });
  }

  /* ── Smooth tab switching ── */
  function initTabSwitching() {
    const tabBtns = document.querySelectorAll('[data-tab-btn]');
    const tabPanels = document.querySelectorAll('[data-tab-panel]');

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.dataset.tabBtn;

        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) {
          p.style.display = 'none';
          p.style.opacity = '0';
        });

        btn.classList.add('active');
        const panel = document.querySelector('[data-tab-panel="' + target + '"]');
        if (panel) {
          panel.style.display = '';
          requestAnimationFrame(function () {
            panel.style.transition = 'opacity 0.3s ease';
            panel.style.opacity = '1';
          });
        }
      });
    });
  }

  /* ── Milestone dropdowns ── */
  function initMilestoneDropdowns() {
    const selectors = document.querySelectorAll('.milestone-selector');
    selectors.forEach(function (sel) {
      const header = sel.querySelector('.milestone-selector__header');
      if (!header) return;

      header.addEventListener('click', function () {
        /* Toggle current */
        const isOpen = sel.classList.toggle('open');
        /* Optionally close siblings */
        selectors.forEach(function (other) {
          if (other !== sel) other.classList.remove('open');
        });
      });
    });
  }

  /* ── Domain page anchor tabs ── */
  function initDomainTabs() {
    const tabs = document.querySelectorAll('.domain-tab[href^="#"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
      });
    });

    /* Highlight tab on scroll */
    const sections = document.querySelectorAll('.domain-section[id]');
    if (!sections.length) return;

    const scrollSpy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tabs.forEach(function (t) {
              t.classList.toggle('active', t.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { scrollSpy.observe(s); });
  }

  /* ── Back to top button ── */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Init all ── */
  document.addEventListener('DOMContentLoaded', function () {
    initStagger();
    initScrollReveal();
    initCounters();
    initTabSwitching();
    initMilestoneDropdowns();
    initDomainTabs();
    initBackToTop();
  });

})();
