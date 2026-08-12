import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initFeatures() {
  const mm = gsap.matchMedia();

  // Desktop: pinned phone + scrolling feature cards
  mm.add('(min-width: 769px)', () => {
    const phoneCol = document.querySelector('.features__phone-col');
    const panels = gsap.utils.toArray('.features__panel');
    const phoneScreens = gsap.utils.toArray('.features__phone-screen img');

    if (!phoneCol || !panels.length) return;

    // Pin the phone column
    ScrollTrigger.create({
      trigger: '.features__sticky-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.features__phone-col',
      pinSpacing: false
    });

    // Animate each feature panel
    panels.forEach((panel, i) => {
      const card = panel.querySelector('.features__card');
      if (!card) return;
      const direction = i % 2 === 0 ? -1 : 1;

      ScrollTrigger.create({
        trigger: panel,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          phoneScreens.forEach((s, j) => s.classList.toggle('active', j === i));
          gsap.fromTo(card,
            { x: direction * 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        onEnterBack: () => {
          phoneScreens.forEach((s, j) => s.classList.toggle('active', j === i));
          gsap.fromTo(card,
            { x: direction * -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        onLeave: () => {
          gsap.to(card, { x: direction * -120, opacity: 0, duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to(card, { x: direction * 120, opacity: 0, duration: 0.5 });
        }
      });
    });
  });

  // Mobile: simple staggered reveals + update phone screen
  mm.add('(max-width: 768px)', () => {
    const panels = gsap.utils.toArray('.features__panel');
    const phoneScreens = gsap.utils.toArray('.features__phone-screen img');
    
    panels.forEach((panel, i) => {
      const card = panel.querySelector('.features__card');
      
      // Update phone screen when panel enters view
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => phoneScreens.forEach((s, j) => s.classList.toggle('active', j === i)),
        onEnterBack: () => phoneScreens.forEach((s, j) => s.classList.toggle('active', j === i))
      });

      // Card reveal animation
      if (card) {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7,
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      }
    });
  });

  // Header animation
  const header = document.querySelector('.features__header');
  if (header) {
    gsap.from(header, {
      y: 40, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: header, start: 'top 85%' }
    });
  }
}
