const cards = document.querySelectorAll('.service-card');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-links a');

cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', siteNav.classList.contains('nav-open'));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('nav-open')) {
        siteNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
