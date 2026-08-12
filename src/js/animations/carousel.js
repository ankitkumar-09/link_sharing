import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

export function initCarousel() {
  const section = document.querySelector('.screenshots');
  if (!section) return;

  // Header entrance
  gsap.from('.screenshots__header', {
    y: 40, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.screenshots__header', start: 'top 85%' }
  });

  // Swiper entrance
  gsap.from('.screenshots__swiper', {
    y: 80, opacity: 0, duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.screenshots__swiper', start: 'top 90%' }
  });

  // Initialize Swiper
  new Swiper('.screenshots__swiper', {
    modules: [EffectCoverflow, Pagination, Autoplay],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: 600,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: false
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
}
