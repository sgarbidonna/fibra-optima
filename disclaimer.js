

window.addEventListener('load', () => {
  // Ocultar preloader después de 3 segundos
  
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');

    const disclaimerOverlay = document.getElementById('disclaimer-overlay');
    const disclaimerBox = document.getElementById('disclaimer-box');
    const disclaimerCall = document.querySelector('.disclaimer-call');

    if (!disclaimerOverlay || !disclaimerBox) return;

    let isOpen = false;
    let startY = 0;
    let currentY = 0;
    let dragging = false;

    // -------- UTILIDADES --------
    function lockBody() {
      document.body.style.overflow = 'hidden';
    }

    function unlockBody() {
      document.body.style.overflow = '';
    }

    function abrirDisclaimer() {
      disclaimerOverlay.classList.add('active');
      lockBody();
      isOpen = true;
      disclaimerBox.setAttribute('tabindex', '-1');
      disclaimerBox.focus();
    }

    function cerrarDisclaimer() {
      disclaimerOverlay.classList.remove('active');
      unlockBody();
      isOpen = false;

      // reset visual por si hubo drag
      disclaimerBox.style.transform = '';
      disclaimerBox.style.opacity = '';
    }

    // -------- MOSTRAR AUTOMÁTICO --------
    setTimeout(() => {
      abrirDisclaimer();
    }, 200);

    // -------- BOTÓN / LLAMADA --------
    if (disclaimerCall) {
      disclaimerCall.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen ? cerrarDisclaimer() : abrirDisclaimer();
      });
    }

    // -------- CLICK AFUERA --------
    disclaimerOverlay.addEventListener('click', () => {
      cerrarDisclaimer();
    });

    // -------- EVITAR CIERRE AL CLICKEAR DENTRO --------
    disclaimerBox.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // -------- ESC --------
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) cerrarDisclaimer();
    });

    // -------- SWIPE REAL (DRAG) --------
    disclaimerOverlay.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      dragging = true;
      disclaimerBox.style.transition = 'none';
    });

    disclaimerOverlay.addEventListener('touchmove', (e) => {
      if (!dragging) return;

      currentY = e.touches[0].clientY - startY;

      // solo permitir arrastre vertical
      disclaimerBox.style.transform = `translateY(${currentY}px)`;
      disclaimerBox.style.opacity = `${1 - Math.abs(currentY) / 300}`;
    });

    disclaimerOverlay.addEventListener('touchend', () => {
      dragging = false;
      disclaimerBox.style.transition = '';

      // umbral de cierre
      if (Math.abs(currentY) > 120) {
        cerrarDisclaimer();
      } else {
        // volver a estado original
        disclaimerBox.style.transform = 'translateY(0)';
        disclaimerBox.style.opacity = '1';
      }

      currentY = 0;
    });

  }, 3000);
});
