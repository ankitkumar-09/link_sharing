import gsap from 'gsap';

export const initThemeCycle = () => {
  // We define a sequence of vibrant color pairs to cycle through
  const themes = [
    { primary: '#FF2A85', secondary: '#FF9500' }, // 1. Pink & Orange (Default)
    { primary: '#FFCC00', secondary: '#32ADE6' }, // 2. Yellow & Light Blue
    { primary: '#32ADE6', secondary: '#FF3B30' }, // 3. Light Blue & Red
    { primary: '#FF3B30', secondary: '#FF2A85' }  // 4. Red & Pink (loops back)
  ];

  // We apply it to the :root element (which is the documentElement/html)
  const root = document.documentElement;
  
  // Create an infinite timeline
  const tl = gsap.timeline({ repeat: -1 });

  // For each theme, smoothly tween the CSS variables over 2 seconds, 
  // then hold that color for 4 seconds before moving to the next.
  themes.forEach((theme, i) => {
    // Skip the first theme on the very first frame because it's already set in CSS,
    // but we still need it in the loop to transition back to it at the end.
    if (i === 0) {
      tl.to(root, {
        '--color-primary': theme.primary,
        '--color-secondary': theme.secondary,
        duration: 2,
        ease: 'sine.inOut'
      }, "+=4");
    } else {
      tl.to(root, {
        '--color-primary': theme.primary,
        '--color-secondary': theme.secondary,
        duration: 2,
        ease: 'sine.inOut'
      }, "+=4");
    }
  });
};
