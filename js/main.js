// Site behaviour: mobile menu, current-page highlight, copy buttons on code blocks.
// Everything here is progressive: the pages work fine with JavaScript turned off.

(function () {
  'use strict';

  function setupNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    const here = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach((link) => {
      if (link.getAttribute('href') === here) link.setAttribute('aria-current', 'page');
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll('pre > code').forEach((code) => {
      const pre = code.parentElement;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-btn';
      button.textContent = 'Copy';
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          button.textContent = 'Copied';
        } catch (err) {
          // Clipboard can be blocked (http, permissions). Tell the reader instead of failing silently.
          button.textContent = 'Select & copy';
          console.warn('[site] clipboard unavailable:', err);
        }
        setTimeout(() => { button.textContent = 'Copy'; }, 1600);
      });
      pre.appendChild(button);
    });
  }

  function setupYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  setupNav();
  setupCopyButtons();
  setupYear();
})();
