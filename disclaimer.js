window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');

    const overlay = document.getElementById('disclaimer-overlay');
    const box = document.getElementById('disclaimer-box');
    const call = document.querySelector('.disclaimer-call');

    if (!overlay || !box) return;

    /* ===============================
       FUNCIONES
    =============================== */

    function mostrarDisclaimer() {
      overlay.classList.add('active');
      box.style.transform = '';
      box.style.opacity = '';
    }

    function cerrarDisclaimer() {
      box.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
      box.style.transform = 'translateY(-120px)';
      box.style.opacity = '0';

      setTimeout(() => {
        overlay.classList.remove('active');
        box.style.transition = '';
        box.style.transform = '';
        box.style.opacity = '';
      }, 350);
    }

    /* ===============================
       MOSTRAR AUTOMÁTICO
    =============================== */

    setTimeout(mostrarDisclaimer, 200);

    /* ===============================
       CLICK / ESC
    =============================== */

    overlay.addEventListener('click', e => {
      if (!box.contains(e.target)) cerrarDisclaimer();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') cerrarDisclaimer();
    });

    if (call) {
      call.addEventListener('click', () => {
        overlay.classList.contains('active')
          ? cerrarDisclaimer()
          : mostrarDisclaimer();
      });
    }

    /* ===============================
       DRAG REAL (SWIPE)
    =============================== */

    let startX = 0;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    overlay.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isDragging = true;

      box.style.transition = 'none';
    });

    overlay.addEventListener('touchmove', e => {
      if (!isDragging) return;

      const touch = e.touches[0];
      currentY = touch.clientY - startY;
      const currentX = touch.clientX - startX;

      // solo drag vertical dominante
      if (Math.abs(currentY) > Math.abs(currentX)) {
        box.style.transform = `translateY(${currentY * 0.7}px)`;
        box.style.opacity = `${1 - Math.min(Math.abs(currentY) / 300, 0.4)}`;
      }
    });

    overlay.addEventListener('touchend', () => {
      isDragging = false;
      box.style.transition = 'transform 0.35s ease, opacity 0.35s ease';

      // swipe vertical → cerrar (UP o DOWN)
      if (Math.abs(currentY) > 80) {
        cerrarDisclaimer();
      } else {
        // volver a posición original
        box.style.transform = 'translateY(0)';
        box.style.opacity = '1';
      }

      currentY = 0;
    });

  }, 3000);
});
