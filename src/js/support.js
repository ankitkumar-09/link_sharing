import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../css/style.css';
import '../css/animations.css';

import { initCursor } from './animations/cursor.js';
import { initBackground } from './animations/background.js';
import { initDarkMode } from './animations/darkMode.js';
import { initMagnetic } from './utils/magnetic.js';

gsap.registerPlugin(ScrollTrigger);

// ---- Lenis Smooth Scroll ----
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ---- Navbar ----
const navbar = document.querySelector('.navbar');
if (navbar) {
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }
  });

  // Mobile hamburger
  const hamburger = navbar.querySelector('.navbar__hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('navbar--open');
      document.body.style.overflow = navbar.classList.contains('navbar--open') ? 'hidden' : '';
    });

    navbar.querySelectorAll('.navbar__mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('navbar--open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ---- Page Load ----
window.addEventListener('load', () => {
  initCursor();
  initBackground();
  initDarkMode();

  // Magnetic buttons
  initMagnetic(document.querySelectorAll('[data-magnetic]'));

  // View More FAQs
  const viewMoreBtn = document.getElementById('view-more-faqs-btn');
  const moreFaqs = document.getElementById('more-faqs');
  if (viewMoreBtn && moreFaqs) {
    viewMoreBtn.addEventListener('click', () => {
      if (moreFaqs.style.display === 'none') {
        moreFaqs.style.display = 'block';
        viewMoreBtn.textContent = 'View Less FAQs';
      } else {
        moreFaqs.style.display = 'none';
        viewMoreBtn.textContent = 'View More FAQs';
      }
    });
  }
});
