/* ============================================================
   contact.js — Contact form handling
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const error   = document.getElementById('form-error');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Hide previous messages */
      if (success) success.style.display = 'none';
      if (error)   error.style.display   = 'none';

      /* Basic validation */
      const name    = form.querySelector('[name="name"]');
      const email   = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.style.borderColor = 'var(--clr-error)';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderColor = 'var(--clr-error)';
        valid = false;
      }

      if (!valid) {
        if (error) {
          error.textContent = 'Please fill in all required fields correctly.';
          error.style.display = 'block';
        }
        return;
      }

      /* Simulate submission (replace with real endpoint) */
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      setTimeout(function () {
        if (success) success.style.display = 'block';
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        /* Scroll to success */
        success && success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1200);
    });

    /* Clear field error highlight on input */
    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
      });
    });
  });

})();
