import gsap from 'gsap';

export function initCursor() {
  // Don't init on touch devices
  if ('ontouchstart' in window || !window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Hover effect on interactive elements
  const hoverables = document.querySelectorAll('a, button, [data-cursor="hover"], .swiper-slide');

  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
}
