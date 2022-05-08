const checkbox = document.querySelector('#switch');

const lightTheme = () => {
  document.querySelectorAll('.text-light').forEach((item) => {
    item.classList.remove('text-light');
    item.classList.add('text-dark');
    document.body.classList.remove('bg-dark');
    document.body.classList.add('bg-light');
  });
  localStorage.setItem('theme', 'light');
};

const darkTheme = () => {
  document.querySelectorAll('.text-dark').forEach((item) => {
    item.classList.remove('text-dark');
    item.classList.add('text-light');
    document.body.classList.remove('bg-light');
    document.body.classList.add('bg-dark');
    checkbox.checked = true;
  });
  localStorage.setItem('theme', 'dark');
};

// Switch Modes
checkbox.addEventListener('change', () => {
  localStorage.getItem('theme') === 'dark' ? lightTheme() : darkTheme();
});
