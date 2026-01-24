
function fixMobileViewportWidth() {
  // Evita que Chromium Android calcule un ancho mayor
  document.documentElement.style.width = "100%";
  document.documentElement.style.maxWidth = "100%";

  document.body.style.width = "100%";
  document.body.style.maxWidth = "100%";
  document.body.style.overflowX = "hidden";
}

function lockBodyScroll() {
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
}

function initOverlayRecomendaciones() {
  if (!window.matchMedia("(max-width: 1200px)").matches) return;

  const cards = document.querySelectorAll(".card-recomendaciones");
  if (!cards.length) return;

  let currentIndex = 0;
  let overlayOpen = false;

  /* ======================
     OVERLAY (NO 100vw)
  ====================== */

  const overlay = document.createElement("div");
  overlay.id = "overlay-detalle";
  overlay.style.display = "none";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.width = "100%";
  overlay.style.maxWidth = "100%";

  overlay.innerHTML = `
    <div class="detalle-card">
      <button class="close-detalle" aria-label="Cerrar">✕</button>
      <button class="flecha flecha-prev">←</button>
      <button class="flecha flecha-next">→</button>
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
  const prevBtn = overlay.querySelector(".flecha-prev");
  const nextBtn = overlay.querySelector(".flecha-next");
  const closeBtn = overlay.querySelector(".close-detalle");

  /* ======================
     HELPERS
  ====================== */
      // detalleCard.style.width = "100vw";
      detalleCard.style.maxWidth = "100vw";


  function getBackgroundUrl(el) {
    const bg = window.getComputedStyle(el).backgroundImage;
    return bg && bg !== "none" ? bg.slice(5, -2) : "";
  }

  function mostrarDetalle(index) {
    const card = cards[index];
    const imgDiv = card.querySelector(".card-recomendaciones-img");

    img.src = getBackgroundUrl(imgDiv);
    title.textContent = card.querySelector("h3")?.textContent || "";
    text.textContent = card.querySelector("p")?.textContent || "";

    fixMobileViewportWidth();
    lockBodyScroll();

    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("active"));

    overlayOpen = true;
    currentIndex = index;
  }

  function cerrarOverlay() {
    if (!overlayOpen) return;

    overlayOpen = false;
    overlay.classList.remove("active");

    setTimeout(() => {
      overlay.style.display = "none";
      detalleCard.style.transform = "";
      unlockBodyScroll();
      fixMobileViewportWidth();
    }, 300);
  }

  function cambiarCard(direccion) {
    const salida = direccion === "left" ? -120 : 120;

    detalleCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    detalleCard.style.transform = `translateX(${salida}px)`;
    detalleCard.style.opacity = "0";

    setTimeout(() => {
      currentIndex =
        direccion === "left"
          ? (currentIndex + 1) % cards.length
          : (currentIndex - 1 + cards.length) % cards.length;

      const card = cards[currentIndex];
      const imgDiv = card.querySelector(".card-recomendaciones-img");

      img.src = getBackgroundUrl(imgDiv);
      title.textContent = card.querySelector("h3")?.textContent || "";
      text.textContent = card.querySelector("p")?.textContent || "";

      detalleCard.style.transition = "none";
      detalleCard.style.transform =
        direccion === "left"
          ? "translateX(120px)"
          : "translateX(-120px)";
      detalleCard.style.opacity = "0";

      requestAnimationFrame(() => {
        detalleCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        detalleCard.style.transform = "translateX(0)";
        detalleCard.style.opacity = "1";
      });
    }, 300);
  }

  /* ======================
     BOTONES
  ====================== */

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    cambiarCard("right");
  });

  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    cambiarCard("left");
  });

  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    cerrarOverlay();
  });

  /* ======================
     ABRIR CARD (ANTI DOBLE CLICK)
  ====================== */

  cards.forEach((card, i) => {
    card.addEventListener("click", e => {
      if (overlayOpen) return;
      e.preventDefault();
      e.stopPropagation();
      mostrarDetalle(i);
    });
  });

  /* ======================
     CERRAR TOCANDO AFUERA
     (SIN CLICK FANTASMA)
  ====================== */

  overlay.addEventListener("pointerdown", e => {
    if (e.target === overlay) {
      e.preventDefault();
      e.stopPropagation();
      cerrarOverlay();
    }
  });

  /* ======================
     SWIPE HORIZONTAL REAL
     (NO ROMPE SCROLL)
  ====================== */

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isHorizontal = null;
  let dragging = false;

  detalleCard.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    currentX = 0;
    isHorizontal = null;
    dragging = true;
    detalleCard.style.transition = "none";
  }, { passive: true });

  detalleCard.addEventListener("touchmove", e => {
    if (!dragging) return;

    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    if (isHorizontal === null) {
      isHorizontal = Math.abs(dx) > Math.abs(dy);
    }

    if (!isHorizontal) return;

    e.preventDefault();
    currentX = dx;
    detalleCard.style.transform = `translateX(${currentX}px)`;
  }, { passive: false });

  detalleCard.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;

    if (!isHorizontal) {
      detalleCard.style.transform = "";
      return;
    }

    const absX = Math.abs(currentX);
    detalleCard.style.transition = "transform 0.3s ease";

    if (absX > 100) {
      cambiarCard(currentX > 0 ? "right" : "left");
    } else {
      detalleCard.style.transform = "translateX(0)";
    }

    currentX = 0;
  });
}

/* =====================================================
   INIT DESPUÉS DEL PRELOADER (CRÍTICO)
===================================================== */

window.addEventListener("load", () => {
  // Fix inicial ANTES de medir nada
  fixMobileViewportWidth();

  // Esperar un frame para Chromium Android
  requestAnimationFrame(() => {
    initOverlayRecomendaciones();
  });
});
