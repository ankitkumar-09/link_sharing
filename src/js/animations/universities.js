import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function initUniversities() {
  const section = document.querySelector('.universities');
  if (!section) return;

  // Header word-split animation
  const heading = section.querySelector('.heading-lg');
  if (heading) {
    const split = new SplitType(heading, { types: 'words' });
    gsap.from(split.words, {
      y: 40, opacity: 0, stagger: 0.04, duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 95%' }
    });
  }

  // Cards staggered entrance
  const cards = gsap.utils.toArray('.universities__card');
  gsap.from(cards, {
    y: 60, opacity: 0, scale: 0.95, stagger: 0.1, duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: { trigger: cards[0], start: 'top 95%' }
  });

  // 3D tilt hover (desktop)
  if (window.matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 4,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // CTA text reveal
  gsap.from('.universities__cta', {
    y: 20, opacity: 0, duration: 0.6,
    scrollTrigger: { trigger: '.universities__cta', start: 'top 95%' }
  });
}
