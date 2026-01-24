
document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(max-width: 1200px)").matches) return;

  const cards = document.querySelectorAll(".card-blockg");
  if (!cards.length) return;

  const overlay = document.getElementById("overlay-blockg");
  const detalle = overlay.querySelector(".detalle-blockg");
  const contenido = detalle.querySelector(".contenido");
  const fecha = detalle.querySelector(".fecha-al-pie");
  const prevBtn = document.getElementById("flecha-prev-blockg");
  const nextBtn = document.getElementById("flecha-next-blockg");

  let currentIndex = 0;

  /* ===============================
     FUNCIONES BASE
  =============================== */

  function mostrarDetalle(index) {
    const card = cards[index];
    contenido.innerHTML = card.querySelector("p").innerHTML;
    fecha.textContent = card.querySelector(".fecha-al-pie").textContent;

    overlay.classList.add("active");
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

  const irPrev = () => animarCambio("right");
  const irNext = () => animarCambio("left");

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
     SWIPE / DRAG (SOLO EN DETALLE)
  =============================== */

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let dragging = false;

  detalle.addEventListener("touchstart", e => {
    if (e.touches.length !== 1) return;

    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    currentX = 0;
    currentY = 0;
    dragging = true;

    detalle.style.transition = "none";
  }, { passive: true });


  detalle.addEventListener("touchmove", e => {
    if (!dragging) return;

    const t = e.touches[0];
    currentX = t.clientX - startX;
    currentY = t.clientY - startY;

    const absX = Math.abs(currentX);
    const absY = Math.abs(currentY);

    /* ---- GESTO VERTICAL (cerrar) ---- */
    if (absY > absX) {
      const limitY = 120;
      const y = Math.max(-limitY, Math.min(limitY, currentY));

      detalle.style.transform = `translateY(${y}px)`;
      detalle.style.opacity = 1 - Math.min(absY / 300, 0.4);
      return;
    }

    /* ---- GESTO HORIZONTAL (swipe cards) ---- */
    e.preventDefault(); // <- CLAVE: bloquea scroll horizontal del viewport

    const limitX = 80;
    const x = Math.max(-limitX, Math.min(limitX, currentX));

    detalle.style.transform = `translateX(${x}px)`;
    detalle.style.opacity = 1 - Math.min(absX / 300, 0.4);
  }, { passive: false });


  detalle.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;

    detalle.style.transition = "transform 0.35s ease, opacity 0.15s ease";

    /* ---- CIERRE POR SWIPE VERTICAL ---- */
    if (Math.abs(currentY) > Math.abs(currentX) && Math.abs(currentY) > 80) {
      cerrarOverlay();
      return;
    }

    /* ---- CAMBIO DE CARD ---- */
    if (Math.abs(currentX) > 60) {
      currentX > 0 ? irPrev() : irNext();
    } else {
      detalle.style.transform = "translate(0, 0)";
      detalle.style.opacity = "1";
    }

    currentX = 0;
    currentY = 0;
  });

});
