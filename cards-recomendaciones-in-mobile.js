document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(max-width: 1200px)").matches) {

    const cards = document.querySelectorAll(".card-recomendaciones");
    let currentIndex = 0;

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

    const detalleCard = overlay.querySelector(".detalle-card");
    const img = overlay.querySelector("img");
    const title = overlay.querySelector("h3");
    const text = overlay.querySelector("p");
    const prevBtn = overlay.querySelector("#flecha-prev");
    const nextBtn = overlay.querySelector("#flecha-next");

    function getBackgroundUrl(element) {
      const bg = window.getComputedStyle(element).backgroundImage;
      return bg.slice(5, -2);
    }

    function mostrarDetalle(index) {
      const card = cards[index];
      const imgDiv = card.querySelector(".card-recomendaciones-img");
      const bgUrl = getBackgroundUrl(imgDiv);

      img.src = bgUrl || "";
      title.textContent = card.querySelector("h3").textContent;
      text.textContent = card.querySelector("p").textContent;

      detalleCard.classList.remove("closing");
      overlay.classList.add("active");
      overlay.style.display = "flex";
      currentIndex = index;
    }

    function cerrarOverlay() {
      detalleCard.classList.add("closing");

      setTimeout(() => {
        overlay.classList.remove("active");
        overlay.style.display = "none";
        detalleCard.classList.remove("closing");
      }, 350);
    }

    function irPrev() {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      mostrarDetalle(currentIndex);
    }

    function irNext() {
      currentIndex = (currentIndex + 1) % cards.length;
      mostrarDetalle(currentIndex);
    }

    prevBtn.addEventListener("click", e => {
      e.stopPropagation();
      irPrev();
    });

    nextBtn.addEventListener("click", e => {
      e.stopPropagation();
      irNext();
    });

    overlay.addEventListener("click", e => {
      if (e.target === overlay) cerrarOverlay();
    });

    cards.forEach((card, i) => {
      card.addEventListener("click", () => mostrarDetalle(i));
    });

    // --- SWIPE ---
    let startX = 0;
    let startY = 0;

    overlay.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    overlay.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = endX - startX;
      const diffY = endY - startY;

      // Swipe vertical dominante → cerrar
      if (Math.abs(diffY) > Math.abs(diffX) && diffY > 70) {
        cerrarOverlay();
        return;
      }

      // Swipe horizontal → navegación
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) irPrev();
        else irNext();
      }
    });
  }
});
