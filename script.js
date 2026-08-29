document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealItems = document.querySelectorAll('[data-reveal]');

  if (reduceMotionQuery.matches || revealItems.length === 0) {
    revealItems.forEach((item) => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(18px)';
    revealObserver.observe(item);
  });
});
