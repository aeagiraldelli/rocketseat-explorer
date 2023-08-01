export const Theme = {
  light() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add('light');
    localStorage.setItem('theme', 'light');
  },

  dark() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  },

  toggle() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.toggle('light');
    if (html.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  },
};

const btnToggleTheme = document.getElementById('toggle-theme');
btnToggleTheme.addEventListener('click', () => {
  Theme.toggle();
});

const theme = localStorage.getItem('theme');
if (theme === 'light') {
  Theme.light();
} else {
  Theme.dark();
}
