document.addEventListener("DOMContentLoaded", () => {
  // Solo en mobile
  if (window.matchMedia("(max-width: 1024px)").matches) {

    const cards = document.querySelectorAll(".card-recomendaciones");
    let currentIndex = 0;

    // Crear overlay
    const overlay = document.createElement("div");
    overlay.id = "overlay-detalle";
    overlay.innerHTML = `
      <div class="detalle-card">
        <button id="flecha-prev" class="flecha">←</button>
        <button id="flecha-next" class="flecha">→</button>
        <img src="" alt="">
        <h3></h3>
        <p></p>
      </div>
    `;
    document.body.appendChild(overlay);

    const img = overlay.querySelector("img");
    const title = overlay.querySelector("h3");
    const text = overlay.querySelector("p");
    const prevBtn = overlay.querySelector("#flecha-prev");
    const nextBtn = overlay.querySelector("#flecha-next");

    // Obtener URL de fondo
    function getBackgroundUrl(element) {
      const bg = window.getComputedStyle(element).backgroundImage;
      return bg.slice(5, -2);
    }

    // Mostrar detalle
    function mostrarDetalle(index) {
      const card = cards[index];
      const imgDiv = card.querySelector(".card-recomendaciones-img");
      const bgUrl = getBackgroundUrl(imgDiv);

      img.src = bgUrl || "";
      title.textContent = card.querySelector("h3").textContent;
      text.textContent = card.querySelector("p").textContent;

      overlay.style.display = "flex";
      currentIndex = index;
    }

    // Navegación
    function irPrev() {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      mostrarDetalle(currentIndex);
    }

    function irNext() {
      currentIndex = (currentIndex + 1) % cards.length;
      mostrarDetalle(currentIndex);
    }

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      irPrev();
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      irNext();
    });

    // Cerrar tocando afuera
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });

    // Click en cards
    cards.forEach((card, i) => {
      card.addEventListener("click", () => mostrarDetalle(i));
    });

    // --- 👇 Detección de SWIPE ---
    let startX = 0;
    let endX = 0;

    overlay.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    overlay.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 50) { // mínimo desplazamiento
        if (diff > 0) {
          irPrev(); // swipe derecha → anterior
        } else {
          irNext(); // swipe izquierda → siguiente
        }
      }
    });
  }
});
