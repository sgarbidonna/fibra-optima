document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(max-width: 1200px)").matches) return;

  const cards = document.querySelectorAll(".card-blockg");
  if (!cards.length) return;

  let currentIndex = 0;

  /* ===============================
     OVERLAY
  =============================== */

  const overlay = document.createElement("div");
  overlay.id = "overlay-blockg";
  overlay.innerHTML = `
    <div class="detalle-blockg">
      <button id="flecha-prev-blockg" class="flecha">←</button>
      <button id="flecha-next-blockg" class="flecha">→</button>
      <div class="contenido"></div>
      <h5 class="fecha-al-pie"></h5>
    </div>
  `;
  document.body.appendChild(overlay);

  const detalle = overlay.querySelector(".detalle-blockg");
  const contenido = detalle.querySelector(".contenido");
  const fecha = detalle.querySelector(".fecha-al-pie");
  const prevBtn = detalle.querySelector("#flecha-prev-blockg");
  const nextBtn = detalle.querySelector("#flecha-next-blockg");

  /* ===============================
     FUNCIONES BASE
  =============================== */

  function mostrarDetalle(index) {
    const card = cards[index];
    contenido.innerHTML = card.querySelector("p").innerHTML;
    fecha.textContent = card.querySelector(".fecha-al-pie").textContent;

    overlay.classList.add("active");
    overlay.style.display = "flex";
    detalle.style.transform = "";
    detalle.style.opacity = "";

    currentIndex = index;
  }

  function cerrarOverlay() {
    detalle.style.transition = "transform 0.35s ease, opacity 0.10s ease";
    detalle.style.transform = "translateY(-120px)";
    detalle.style.opacity = "0";

    setTimeout(() => {
      overlay.classList.remove("active");
      overlay.style.display = "none";
      detalle.style.transition = "";
      detalle.style.transform = "";
      detalle.style.opacity = "";
    }, 350);
  }

  function animarCambio(direccion) {
    const salida = direccion === "left" ? -120 : 120;

    detalle.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    detalle.style.transform = `translateX(${salida}px)`;
    detalle.style.opacity = "0";

    setTimeout(() => {
      currentIndex =
        direccion === "left"
          ? (currentIndex + 1) % cards.length
          : (currentIndex - 1 + cards.length) % cards.length;

      const card = cards[currentIndex];
      contenido.innerHTML = card.querySelector("p").innerHTML;
      fecha.textContent = card.querySelector(".fecha-al-pie").textContent;

      detalle.style.transition = "none";
      detalle.style.transform = `translateX(${-salida}px)`;

      requestAnimationFrame(() => {
        detalle.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        detalle.style.transform = "translateX(0)";
        detalle.style.opacity = "1";
      });
    }, 300);
  }

  function irPrev() {
    animarCambio("right");
  }

  function irNext() {
    animarCambio("left");
  }

  /* ===============================
     EVENTOS CLICK
  =============================== */

  cards.forEach((card, i) => {
    card.addEventListener("click", () => mostrarDetalle(i));
  });

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

  /* ===============================
     DRAG REAL / SWIPE
  =============================== */

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let dragging = false;

  overlay.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    dragging = true;

    detalle.style.transition = "none";
  });

  overlay.addEventListener("touchmove", e => {
    if (!dragging) return;

    const t = e.touches[0];
    currentX = t.clientX - startX;
    currentY = t.clientY - startY;

    if (Math.abs(currentY) > Math.abs(currentX)) {
      // drag vertical
      detalle.style.transform = `translateY(${currentY * 0.7}px)`;
      detalle.style.opacity = `${1 - Math.min(Math.abs(currentY) / 300, 0.4)}`;
    } else {
      // drag horizontal
      detalle.style.transform = `translateX(${currentX * 0.7}px)`;
      detalle.style.opacity = `${1 - Math.min(Math.abs(currentX) / 300, 0.4)}`;
    }
  });

  overlay.addEventListener("touchend", () => {
    dragging = false;
    detalle.style.transition = "transform 0.35s ease, opacity 0.10s ease";

    // vertical dominante → cerrar
    if (Math.abs(currentY) > Math.abs(currentX) && Math.abs(currentY) > 80) {
      cerrarOverlay();
    }
    // horizontal dominante → navegación
    else if (Math.abs(currentX) > 60) {
      currentX > 0 ? irPrev() : irNext();
    }
    // volver a centro
    else {
      detalle.style.transform = "translate(0,0)";
      detalle.style.opacity = "1";
    }

    currentX = currentY = 0;
  });
});
