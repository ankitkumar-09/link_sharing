// Lightweight YouTube "facade": shows the video thumbnail + play button,
// and only loads the real YouTube player (with sound) once the user clicks.
// Keeps the home page fast — no YouTube scripts load until requested.
export function initPromoVideo() {
  const player = document.querySelector('.promo__player');
  if (!player) return;

  const videoId = player.getAttribute('data-video-id');
  if (!videoId || videoId === 'REPLACE_WITH_VIDEO_ID') {
    // No real ID set yet — hide the section so nothing broken shows.
    const section = player.closest('.promo');
    if (section) section.style.display = 'none';
    return;
  }

  // Set the thumbnail from the video ID, falling back to a lower-res
  // frame if the high-res one doesn't exist for this video.
  const thumb = player.querySelector('.promo__thumb');
  if (thumb) {
    thumb.src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    thumb.addEventListener('error', () => {
      thumb.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }, { once: true });
  }

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = 'Campus Era promo video';
    player.innerHTML = '';
    player.appendChild(iframe);
    player.removeAttribute('role');
    player.removeAttribute('tabindex');
  };

  player.addEventListener('click', load);
  player.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      load();
    }
  });
}
