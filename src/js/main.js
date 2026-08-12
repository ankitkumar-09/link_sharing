import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../css/style.css';
import '../css/animations.css';

import { initCursor } from './animations/cursor.js';
import { initHero } from './animations/hero.js';
import { initFeatures } from './animations/features.js';
import { initSteps } from './animations/steps.js';
import { initUniversities } from './animations/universities.js';
import { initCarousel } from './animations/carousel.js';
import { initCTA } from './animations/cta.js';
import { initThemeCycle } from './animations/themeCycle.js';
import { initDarkMode } from './animations/darkMode.js';
import { initMagnetic } from './utils/magnetic.js';
import { initBackground } from './animations/background.js';

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

// ---- Scroll Progress Bar ----
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

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

// ---- Smooth Scroll Anchors ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) lenis.scrollTo(target, { offset: -72 });
  });
});

// ---- Page Load ----
window.addEventListener('load', () => {
  // Remove loader
  const loader = document.querySelector('.page-loader');
  if (loader) {
    gsap.to(loader, {
      opacity: 0, duration: 0.4,
      onComplete: () => loader.remove()
    });
  }

  // Init all modules
  initCursor();
  initHero();
  initFeatures();
  initSteps();
  initUniversities();
  initCarousel();
  initCTA();
  initThemeCycle();
  initDarkMode();
  initBackground();

  // Magnetic buttons
  initMagnetic(document.querySelectorAll('[data-magnetic]'));

  // Navbar entrance
  gsap.from('.navbar__logo', { x: -20, opacity: 0, duration: 0.5, delay: 0.2 });
  gsap.from('.navbar__links a', { y: -15, opacity: 0, stagger: 0.08, duration: 0.4, delay: 0.4 });
  gsap.from('.navbar__actions', { y: -15, opacity: 0, duration: 0.4, delay: 0.7 });
});
