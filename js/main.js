// ============================================================
// main.js — Research Web
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active nav link ── */
  const navLinks = document.querySelectorAll('.nav__links a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });

  /* ── Sticky header shadow on scroll ── */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });

  /* ── Scroll-reveal animation ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .section-header').forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });

  /* ── Mobile nav toggle ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

});
