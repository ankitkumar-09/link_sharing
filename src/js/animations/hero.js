import gsap from 'gsap';
import SplitType from 'split-type';

export function initHero() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Badge entrance
  tl.from('.hero__badge', {
    y: 20, opacity: 0, duration: 0.6
  }, 0.3);

  // Title character reveal with SplitType
  const title = document.querySelector('.hero__title');
  if (title) {
    const splitTitle = new SplitType(title, { types: 'chars, words' });
    tl.from(splitTitle.chars, {
      y: 60, opacity: 0, rotateX: -40,
      stagger: 0.02, duration: 0.8
    }, 0.5);
  }

  // Subtitle line reveal
  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) {
    const splitSub = new SplitType(subtitle, { types: 'lines' });
    // Wrap each line in an overflow hidden container
    splitSub.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    tl.from(splitSub.lines, {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6
    }, 1.0);
  }

  // Actions slide up
  tl.from('.hero__actions', {
    y: 30, opacity: 0, duration: 0.6
  }, 1.3);

  // Phone entrance
  tl.from('.hero__phone', {
    scale: 0.8, y: 80, opacity: 0, duration: 1,
    ease: 'back.out(1.7)'
  }, 0.8);

  // 3D Interactive & Continuous Rotation
  const phone = document.querySelector('.hero__phone');
  const phoneWrapper = document.querySelector('.hero__phone-wrapper');
  
  if (phone && phoneWrapper) {
    // Continuous idle animation
    let idleAnim = gsap.timeline({ repeat: -1, paused: true });
    idleAnim.to(phone, { y: -24, rotateY: 12, rotateX: 4, duration: 3, ease: "sine.inOut" })
            .to(phone, { y: 0, rotateY: -12, rotateX: -4, duration: 3, ease: "sine.inOut" });

    // Start idle animation shortly after entrance
    setTimeout(() => {
      if (!isDragging) idleAnim.play();
    }, 1800);

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      idleAnim.pause();
      
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      
      currentRotateY = gsap.getProperty(phone, "rotateY") || 0;
      currentRotateX = gsap.getProperty(phone, "rotateX") || 0;
      
      phoneWrapper.style.cursor = 'grabbing';
      if (e.type !== 'touchstart') e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      
      const targetRotateY = currentRotateY + (deltaX * 0.6);
      const targetRotateX = currentRotateX - (deltaY * 0.6);
      
      // Limit rotation for realistic feel
      const clampedRotateX = Math.max(-45, Math.min(45, targetRotateX));
      const clampedRotateY = Math.max(-60, Math.min(60, targetRotateY));
      
      gsap.to(phone, {
        rotateX: clampedRotateX,
        rotateY: clampedRotateY,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        phoneWrapper.style.cursor = 'grab';
        
        // Smoothly return to center and restart idle animation
        gsap.to(phone, {
          rotateX: 0,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
            idleAnim.restart();
          }
        });
      }
    };

    phoneWrapper.style.cursor = 'grab';
    
    // Desktop events
    phoneWrapper.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    
    // Touch events
    phoneWrapper.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  }
}
