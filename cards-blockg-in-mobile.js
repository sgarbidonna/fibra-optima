document.addEventListener("DOMContentLoaded", () => {
  // Solo en mobile
  if (window.matchMedia("(max-width: 1024px)").matches) {

    const cardsBlockg = document.querySelectorAll(".card-blockg");
    if (!cardsBlockg.length) return; // si no hay cards, salir

    let currentIndex = 0;

    // Crear overlay
    const overlayBlockg = document.createElement("div");
    overlayBlockg.id = "overlay-blockg";
    overlayBlockg.innerHTML = `
      <div class="detalle-blockg">
        <button id="flecha-prev-blockg" class="flecha">←</button>
        <button id="flecha-next-blockg" class="flecha">→</button>
        <div class="contenido"></div>
        <h5 class="fecha-al-pie"></h5>
      </div>
    `;
    document.body.appendChild(overlayBlockg);

    const contenido = overlayBlockg.querySelector(".contenido");
    const fecha = overlayBlockg.querySelector(".fecha-al-pie");
    const prevBtn = overlayBlockg.querySelector("#flecha-prev-blockg");
    const nextBtn = overlayBlockg.querySelector("#flecha-next-blockg");

    // Mostrar detalle
    function mostrarDetalleBlockg(index) {
      const card = cardsBlockg[index];
      contenido.innerHTML = card.querySelector("p").innerHTML;
      fecha.textContent = card.querySelector(".fecha-al-pie").textContent;
      overlayBlockg.style.display = "flex";
      currentIndex = index;
    }

    // Navegación
    function irPrevBlockg() {
      currentIndex = (currentIndex - 1 + cardsBlockg.length) % cardsBlockg.length;
      mostrarDetalleBlockg(currentIndex);
    }

    function irNextBlockg() {
      currentIndex = (currentIndex + 1) % cardsBlockg.length;
      mostrarDetalleBlockg(currentIndex);
    }

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      irPrevBlockg();
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      irNextBlockg();
    });

    // Cerrar tocando afuera
    overlayBlockg.addEventListener("click", (e) => {
      if (e.target === overlayBlockg) overlayBlockg.style.display = "none";
    });

    // Click en cards
    cardsBlockg.forEach((card, i) => {
      card.addEventListener("click", () => mostrarDetalleBlockg(i));
    });

    // --- 👇 Detección de SWIPE ---
    let startX = 0;
    let endX = 0;

    overlayBlockg.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    overlayBlockg.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          irPrevBlockg(); // swipe derecha → anterior
        } else {
          irNextBlockg(); // swipe izquierda → siguiente
        }
      }
    });
  }
});
