const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#site-nav-list');
const yearEl = document.querySelector('#year');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const currentlyOpen = navList.dataset.open === 'true';
    navList.dataset.open = (!currentlyOpen).toString();
    navToggle.setAttribute('aria-expanded', (!currentlyOpen).toString());
  });

  navList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && navList.dataset.open === 'true') {
      navList.dataset.open = 'false';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const THEME_KEY = 'portfolio-theme';

const setTheme = (theme) => {
  root.dataset.theme = theme;
  if (themeIcon) {
    themeIcon.src = theme === 'light' ? 'assets/icons/theme-light.svg' : 'assets/icons/theme-dark.svg';
  }
  localStorage.setItem(THEME_KEY, theme);
};

if (themeToggle) {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const fallbackTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
  let initialTheme = fallbackTheme;

  if (storedTheme === 'light' || storedTheme === 'dark') {
    initialTheme = storedTheme;
  } else if (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: light)').matches) {
    initialTheme = 'light';
  }

  setTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}
