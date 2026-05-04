(function () {
  'use strict';

  // Replace with your Web3Forms access key from https://web3forms.com
  var WEB3FORMS_KEY = '89f797fe-f8c3-41bf-921a-49c8a1c54e2f';

  document.addEventListener('DOMContentLoaded', function () {
    var form      = document.getElementById('contact-form');
    var successEl = document.getElementById('form-success');
    var errorEl   = document.getElementById('form-error');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (successEl) successEl.style.display = 'none';
      if (errorEl)   errorEl.style.display   = 'none';

      var nameField    = form.querySelector('[name="name"]');
      var emailField   = form.querySelector('[name="email"]');
      var messageField = form.querySelector('[name="message"]');
      var valid = true;

      [nameField, emailField, messageField].forEach(function (f) {
        if (f && !f.value.trim()) {
          f.style.borderColor = 'var(--clr-error, #e53e3e)';
          valid = false;
        } else if (f) {
          f.style.borderColor = '';
        }
      });

      if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        emailField.style.borderColor = 'var(--clr-error, #e53e3e)';
        valid = false;
      }

      if (!valid) {
        if (errorEl) {
          errorEl.textContent = 'Please fill in all required fields correctly.';
          errorEl.style.display = 'block';
        }
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin fa-fw"></i> Sending…';
      }

      var payload = {
        access_key:  WEB3FORMS_KEY,
        name:        nameField ? nameField.value.trim() : '',
        email:       emailField ? emailField.value.trim() : '',
        affiliation: (form.querySelector('[name="affiliation"]') || {}).value || '',
        subject:     'Hale Research – ' + ((form.querySelector('[name="subject"]') || {}).value || 'General'),
        message:     messageField ? messageField.value.trim() : ''
      };

      fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            if (successEl) {
              successEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent! We\'ll get back to you within a few days.';
              successEl.style.display = 'block';
              successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
          } else {
            throw new Error(data.message || 'Submission failed');
          }
        })
        .catch(function () {
          if (errorEl) {
            errorEl.textContent = 'Something went wrong. Please email us directly at it22180384@my.sliit.lk';
            errorEl.style.display = 'block';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane fa-fw"></i> Send Message';
          }
        });
    });

    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
      });
    });
  });

})();
