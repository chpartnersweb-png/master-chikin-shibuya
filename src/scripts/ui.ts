export function initUI() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const opener = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu-dialog]');
  const closer = document.querySelector<HTMLButtonElement>('[data-menu-close]');

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (opener && dialog && closer && typeof dialog.showModal === 'function') {
    opener.hidden = false;
    const closeMenu = () => { if (dialog.open) dialog.close(); };
    opener.addEventListener('click', () => {
      dialog.showModal();
      opener.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-open');
      window.dispatchEvent(new CustomEvent('site:menu', { detail: { open: true } }));
      closer.focus({ preventScroll: true });
    });
    closer.addEventListener('click', closeMenu);
    dialog.addEventListener('close', () => {
      opener.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
      window.dispatchEvent(new CustomEvent('site:menu', { detail: { open: false } }));
      opener.focus({ preventScroll: true });
    });
    dialog.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => link.addEventListener('click', closeMenu));
    const desktop = window.matchMedia('(min-width: 1024px)');
    desktop.addEventListener('change', (event) => { if (event.matches) closeMenu(); });
    window.addEventListener('pagehide', closeMenu);
  }

  // Keep the reader near the same section when changing languages.
  document.querySelectorAll<HTMLAnchorElement>('[data-language-base]').forEach((link) => {
    link.addEventListener('click', () => {
      const headerHeight = header?.offsetHeight ?? 88;
      const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
      const active = sections.filter((section) => section.getBoundingClientRect().top <= headerHeight + window.innerHeight * 0.35).at(-1);
      link.href = `${link.dataset.languageBase ?? '/'}${active ? `#${active.id}` : ''}`;
    });
  });
}
