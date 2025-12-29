const infoCall = document.querySelector('.info-call');


(() => {
  const PRELOADER_DELAY = 2000; // ms

  const preloader = document.getElementById('preloader');
  const infoLayer = document.getElementById('info-layer');
  const infoPanel = document.getElementById('info-panel');

  if (!preloader || !infoLayer || !infoPanel) {
    console.warn('[Info] Elementos no encontrados');
    return;
  }

  /* -------------------------
     Helpers
  -------------------------- */

  function hidePreloader() {
    preloader.classList.add('hide');
  }

  function showInfo() {
    infoLayer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideInfo() {
    infoLayer.classList.remove('active');
    document.body.style.overflow = '';
    removeListeners();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      hideInfo();
    }
  }

  function onOverlayClick(e) {
    if (!infoPanel.contains(e.target)) {
      hideInfo();
    }
  }

  function addListeners() {
    document.addEventListener('keydown', onKeyDown);
    infoLayer.addEventListener('click', onOverlayClick);
  }

  function removeListeners() {
    document.removeEventListener('keydown', onKeyDown);
    infoLayer.removeEventListener('click', onOverlayClick);
  }

  /* -------------------------
     Init
  -------------------------- */

  window.addEventListener('load', () => {
    setTimeout(() => {
      hidePreloader();
      showInfo();
      addListeners();
    }, PRELOADER_DELAY);
  });

  if (infoCall) {
  infoCall.addEventListener('click', () => {
    showInfo();
    addListeners();
  });
}

})();
