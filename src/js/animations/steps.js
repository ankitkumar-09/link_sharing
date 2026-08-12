import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSteps() {
  const section = document.querySelector('.steps');
  if (!section) return;

  const cards = gsap.utils.toArray('.steps__card');

  // Header animation
  gsap.from('.steps__header', {
    y: 40, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.steps__header', start: 'top 85%' }
  });

  // Animate cards staggered
  if (cards.length > 0) {
    gsap.from(cards, {
      y: 60, 
      opacity: 0, 
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.steps__container',
        start: 'top 80%'
      }
    });
  }
}
