
window.addEventListener('load', () => {
  // Ocultar preloader después de 3 segundos
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');

    // Mostrar disclaimer después de ocultar el preloader
    const overlay = document.getElementById('disclaimer-overlay');
    const box = document.getElementById('disclaimer-box');

    setTimeout(() => {
      overlay.classList.add('active');
    }, 200); // pequeño delay para transiciones suaves

    // Cerrar al hacer clic afuera del cuadro
    overlay.addEventListener('click', (e) => {
      if (!box.contains(e.target)) {
        overlay.classList.remove('active');
      }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') overlay.classList.remove('active');
    });

  }, 3000);
});




const disclaimerCall = document.querySelector('.disclaimer-call');
const disclaimerOverlay = document.getElementById('disclaimer-overlay');

disclaimerCall.addEventListener('click', () => {
  disclaimerOverlay.classList.toggle('active');
});

// Cerrar al hacer click fuera del box
disclaimerOverlay.addEventListener('click', (e) => {
  if (e.target === disclaimerOverlay) {
    disclaimerOverlay.classList.remove('active');
  }
});

