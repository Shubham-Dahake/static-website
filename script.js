
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const toast = document.querySelector('.toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

document.querySelectorAll('.filter-chip').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.remove('active');
    });

    button.classList.add('active');
    const filter = button.dataset.filter;

    document.querySelectorAll('.course-card').forEach(card => {
      card.hidden =
        filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll('.course-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showToast(`${link.dataset.course}: course preview coming soon!`);
  });
});

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}
