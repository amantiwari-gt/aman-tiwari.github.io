/* Small, optional enhancements. No content depends on this file. */
(() => {
  'use strict';
  const root = document.documentElement;
  const theme = document.querySelector('.theme-toggle');
  if (theme) {
    const updateThemeLabel = () => {
      const isDark = root.dataset.theme === 'dark';
      theme.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
      theme.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    };
    theme.hidden = false;
    updateThemeLabel();
    theme.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch (_) { /* Optional storage. */ }
      updateThemeLabel();
    });
  }

  const menu = document.getElementById('main-menu');
  const button = document.querySelector('.menu-toggle');
  if (menu && button) {
    root.classList.add('js');
    button.hidden = false;
    const close = () => {
      menu.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = 'Menu <span aria-hidden="true">+</span>';
    };
    button.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.innerHTML = `${open ? 'Close' : 'Menu'} <span aria-hidden="true">${open ? '−' : '+'}</span>`;
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        close();
        button.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header') && menu.classList.contains('open')) close();
    });
    const mobile = window.matchMedia('(max-width: 760px)');
    mobile.addEventListener('change', close);
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
