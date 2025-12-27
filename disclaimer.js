window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');

    const disclaimerOverlay = document.getElementById('disclaimer-overlay');
    const disclaimerBox = document.getElementById('disclaimer-box');
    const disclaimerCall = document.querySelector('.disclaimer-call');

    if (!disclaimerOverlay || !disclaimerBox) return;

    function abrirDisclaimer() {
      disclaimerOverlay.classList.add('active');
    }

    function cerrarDisclaimer() {
      disclaimerOverlay.classList.remove('active');
    }

    /* ⬇️ SOLO se abre con interacción del usuario */
    if (disclaimerCall) {
      disclaimerCall.addEventListener('click', () => {
        abrirDisclaimer();
      });
    }

    /* click afuera */
    disclaimerOverlay.addEventListener('click', (e) => {
      if (e.target === disclaimerOverlay) {
        cerrarDisclaimer();
      }
    });

    /* ESC */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarDisclaimer();
    });

  }, 3000);
});
