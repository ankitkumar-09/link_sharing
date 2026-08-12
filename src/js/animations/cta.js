import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function initCTA() {
  const section = document.querySelector('.cta');
  if (!section) return;

  // Title wave reveal
  const title = section.querySelector('.cta__title');
  if (title) {
    const split = new SplitType(title, { types: 'chars' });
    gsap.from(split.chars, {
      y: 80, opacity: 0, rotateX: -60,
      stagger: 0.02, duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: title, start: 'top 85%' }
    });
  }

  // Subtitle fade
  gsap.from('.cta__subtitle', {
    y: 20, opacity: 0, duration: 0.6,
    scrollTrigger: { trigger: '.cta__subtitle', start: 'top 90%' }
  });

  // Button entrance
  gsap.from('.cta__button-wrapper', {
    scale: 0.8, opacity: 0, duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.cta__button-wrapper', start: 'top 90%' }
  });

  // Floating particles
  createParticles(section);
}

function createParticles(container) {
  const particlesContainer = container.querySelector('.cta__particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('cta__particle');
    const size = gsap.utils.random(3, 7);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${gsap.utils.random(0, 100)}%`;
    particle.style.top = `${gsap.utils.random(60, 120)}%`;
    particlesContainer.appendChild(particle);

    gsap.to(particle, {
      y: gsap.utils.random(-300, -500),
      x: gsap.utils.random(-60, 60),
      opacity: 0,
      duration: gsap.utils.random(5, 10),
      repeat: -1,
      delay: gsap.utils.random(0, 6),
      ease: 'none'
    });
  }
}
