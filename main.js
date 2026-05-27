/* ============================================================
   DOOM 67 — Main JavaScript
   Scroll animations · Particles · Lightbox · Nav toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Intersection Observer for fade-in animations ──
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  // ── Fire particles ──
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 8;
    const size = 2 + Math.random() * 3;
    const hue = 10 + Math.random() * 30; // orange-red range

    p.style.left = `${left}%`;
    p.style.bottom = '0';
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = `hsl(${hue}, 90%, 55%)`;
    p.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 90%, 55%)`;
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(p);
  }

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.screenshot').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ── Nav background on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(13, 9, 7, 0.98)';
    } else {
      nav.style.background = 'linear-gradient(180deg, rgba(13, 9, 7, 0.95) 0%, rgba(13, 9, 7, 0.8) 100%)';
    }
  });

  // ── Parallax on hero background ──
  const heroBg = document.querySelector('.hero__bg');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // ── Console Easter Egg ──
  console.log('%c DOOM 67 ', 'background: #8B0000; color: #F5A623; font-size: 20px; font-weight: bold; padding: 8px 16px; font-family: serif;');
  console.log('%c Hell awaits those who dare inspect... ', 'color: #D4440F; font-size: 12px; font-family: serif;');
});
