 // Evita que el scroll en una sección afecte otras
 document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('wheel', function(e) {
      const delta = e.deltaY;
      const up = delta < 0;

      const scrollTop = this.scrollTop;
      const scrollHeight = this.scrollHeight;
      const height = this.clientHeight;

      const atTop = scrollTop === 0;
      const atBottom = scrollTop + height === scrollHeight;

      if ((up && atTop) || (!up && atBottom)) {
        e.preventDefault();
      }
    }, { passive: false });
  });