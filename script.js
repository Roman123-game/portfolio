// ...new file...
// Smooth scroll, scrollspy, reveal on scroll, touch flip handling, auto-close offcanvas on nav click

(function () {
  const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 56;

  // Smooth scrolling for internal links with navbar offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8;
      window.scrollTo({ top, behavior: 'smooth' });

      // if offcanvas is open, close it (bootstrap 5)
      const offcanvasEl = document.getElementById('offcanvasNavbar');
      if (offcanvasEl) {
        const bsOff = bootstrap.Offcanvas.getInstance(offcanvasEl) || bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        bsOff.hide();
      }
    });
  });

  // Reveal-on-scroll for elements with .reveal class
  const revealEls = document.querySelectorAll('.svg1, .svg2, .svg3, .how-img svg, .personal_il, .flip-card, .progress, .how-section > .row');
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => revealObserver.observe(el));

  // Scrollspy: highlight nav links based on section in view
  const sections = Array.from(document.querySelectorAll('[id^="item-"], #hero'));
  const navLinks = Array.from(document.querySelectorAll('.offcanvas .nav-link, .navbar-nav .nav-link'));

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const href = a.getAttribute('href') || '';
          if (href === ('#' + id)) a.classList.add('active');
          else a.classList.remove('active');
        });
      }
    });
  }, { rootMargin: `-${NAV_HEIGHT}px 0px -50% 0px`, threshold: 0.2 });

  sections.forEach(s => spyObserver.observe(s));

  // Touch-friendly flip-card: toggle flip on click for small screens
  function enableClickFlip() {
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const flipContainers = document.querySelectorAll('.flip-card');
    flipContainers.forEach(fc => {
      fc.classList.add('click-flip');
      fc.addEventListener('click', (e) => {
        const inner = fc.querySelector('.flip-card-inner');
        if (!inner) return;
        inner.classList.toggle('flip');
      });
    });
  }
  enableClickFlip();

  // Accessibility: reduce motion respect - if user prefers reduced motion, remove animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('in-view');
      el.style.transition = 'none';
    });
  }

  // small fix: if page loaded with hash, scroll to it with offset
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 70);
    }
  }

  const sections_il = document.querySelectorAll('.section_il');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      entry.target.querySelector('p').style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections_il.forEach(section => observer.observe(section));


})();