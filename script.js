// Initial theme handshake to avoid flash (runs before DOMContent inlined in original page if you like)
(function initTheme() {
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;
    if (saved) root.setAttribute('data-theme', saved);
    else if (prefersDark) root.setAttribute('data-theme', 'dark');
    // Set checkbox state if present later
  } catch (e) {
    /* ignore */
  }
})();

// DOM logic
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');

  // Initialize toggle checkbox to match current theme
  const current = root.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  themeToggle.checked = current === 'dark';

  function setTheme(name) {
    root.setAttribute('data-theme', name);
    try { localStorage.setItem('theme', name); } catch(e){}
  }

  themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked ? 'dark' : 'light');
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('main-nav');
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  // Close nav when focus moves away (mobile)
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Click Me button demo
  const clickMe = document.getElementById('clickMeBtn');
  clickMe.addEventListener('click', () => {
    alert('Nice to meet you — thanks for clicking! 🎉');
  });

  // Accent background toggle (adds a soft decorative accent)
  const changeBg = document.getElementById('changeBgBtn');
  changeBg.addEventListener('click', () => {
    document.body.classList.toggle('accent-bg');
    changeBg.textContent = document.body.classList.contains('accent-bg') ? 'Remove Accent' : 'Toggle Accent Background';
  });

  // Projects: keyboard accessibility (Enter to open links)
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        const link = card.querySelector('.card-actions a');
        if (link) link.click();
      }
    });
  });

  // Modal contact
  const contactOpen = document.getElementById('contactOpen');
  const contactModal = document.getElementById('contactModal');
  const contactClose = document.getElementById('contactClose');
  const contactCancel = document.getElementById('contactCancel');
  const contactForm = document.getElementById('contactForm');

  function openModal() {
    if (!contactModal) return;
    contactModal.hidden = false;
    // trap focus simply by focusing first input
    const first = contactModal.querySelector('input, textarea, button');
    if (first) first.focus();
  }
  function closeModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    try {
      if (contactOpen && typeof contactOpen.focus === 'function') contactOpen.focus();
    } catch (e) {
      // fail silently
    }
  }

  // Wire up modal controls only if modal exists
  if (contactModal) {
    if (contactOpen) contactOpen.addEventListener('click', openModal);
    if (contactClose) contactClose.addEventListener('click', closeModal);
    if (contactCancel) contactCancel.addEventListener('click', closeModal);

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeModal();
    });

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // demo: show message and close — replace with real submit handler as needed
        alert('Thanks! Your message was sent (demo). Replace with real handler to integrate with email/API.');
        contactForm.reset();
        closeModal();
      });
    }
  }

  // Close modal with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !contactModal.hidden) closeModal();
  });

  // Respect prefers-reduced-motion for small animation toggles (already in CSS)
});
