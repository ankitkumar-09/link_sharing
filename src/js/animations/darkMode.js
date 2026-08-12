export const initDarkMode = () => {
  const toggleBtns = Array.from(document.querySelectorAll('.theme-toggle'));
  if (toggleBtns.length === 0) return;

  const wowSound = new Audio('/sounds/wow.mp3');

  // Sun and Moon SVGs
  const sunSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
  const moonSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';

  const syncIcons = () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    toggleBtns.forEach((btn) => { btn.innerHTML = isDark ? sunSvg : moonSvg; });
  };

  // Sync all toggle icons with the current theme on load
  syncIcons();

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      wowSound.currentTime = 0;
      wowSound.play().catch((e) => console.log('Audio play failed', e));

      document.documentElement.classList.toggle('dark-mode');
      const isDark = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      syncIcons();
    });
  });
};
