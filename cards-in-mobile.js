document.addEventListener("DOMContentLoaded", () => {
  // Solo en mobile
  if (window.matchMedia("(max-width: 1024px)").matches) {

    const cards = document.querySelectorAll(".card-recomendaciones");
    let currentIndex = 0;

    // Crear overlay (una sola vez)
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

    // Obtener la URL de background-image
    function getBackgroundUrl(element) {
      const bg = window.getComputedStyle(element).backgroundImage;
      return bg.slice(5, -2); // remueve url(" ... ")
    }

    // Mostrar detalle
    function mostrarDetalle(index) {
      const card = cards[index];
      const imgDiv = card.querySelector(".card-recomendaciones-img");

      // Obtener imagen de fondo
      const bgUrl = getBackgroundUrl(imgDiv);
      img.src = bgUrl || "";

      // Obtener título y texto
      title.textContent = card.querySelector("h3").textContent;
      text.textContent = card.querySelector("p").textContent;

      overlay.style.display = "flex";
      currentIndex = index;
    }

    // Navegación
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      mostrarDetalle(currentIndex);
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % cards.length;
      mostrarDetalle(currentIndex);
    });

    // Cerrar tocando fuera
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });

    // Click en cards
    cards.forEach((card, i) => {
      card.addEventListener("click", () => mostrarDetalle(i));
    });
  }
});
