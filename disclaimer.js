window.addEventListener('load', () => {
  // Ocultar preloader después de 3 segundos
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');

    const disclaimerOverlay = document.getElementById('disclaimer-overlay');
    const disclaimerBox = document.getElementById('disclaimer-box');
    const disclaimerCall = document.querySelector('.disclaimer-call');

    if (!disclaimerOverlay || !disclaimerBox) return;

    // -------- FUNCION CENTRAL DE CIERRE --------
    function cerrarDisclaimer() {
      disclaimerOverlay.classList.remove('active');
    }

    // // -------- MOSTRAR DISCLAIMER --------
    // setTimeout(() => {
    //   disclaimerOverlay.classList.add('active');
    // }, 200);

    function showDisclaimer() {
  const disclaimerOverlay = document.getElementById('disclaimer-overlay');
  if (!disclaimerOverlay) return;
  disclaimerOverlay.classList.add('active');
  document.removeEventListener('pointerdown', showDisclaimer);
}

document.addEventListener('pointerdown', showDisclaimer, { once: true });


    // -------- MOSTRAR DISCLAIMER (BRAVE-SAFE) --------
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        disclaimerOverlay.classList.add('active');
      });
    });

    // -------- CLICK AFUERA --------
    disclaimerOverlay.addEventListener('click', (e) => {
      if (!disclaimerBox.contains(e.target)) {
        cerrarDisclaimer();
      }
    });

    // -------- TECLA ESC --------
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarDisclaimer();
    });

    // -------- BOTON / LLAMADA MANUAL --------
    if (disclaimerCall) {
      disclaimerCall.addEventListener('click', () => {
        disclaimerOverlay.classList.toggle('active');
      });
    }

    // -------- SWIPE UP / DOWN --------
    let startY = 0;
    let startX = 0;

    disclaimerOverlay.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    });

    disclaimerOverlay.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;

      const diffY = endY - startY;
      const diffX = endX - startX;

      // Swipe vertical dominante → cerrar (UP o DOWN)
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 70) {
        cerrarDisclaimer();
      }
    });

  }, 3000);
});

