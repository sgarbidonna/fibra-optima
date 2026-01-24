document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(max-width: 820px)").matches) return;

  const cards = document.querySelectorAll(".card-recomendaciones");
  if (!cards.length) return;

  const overlay = document.getElementById("overlay-detalle");
  const detalle = overlay.querySelector(".detalle-card");

  const img = detalle.querySelector("img");
  const title = detalle.querySelector("h3");
  const text = detalle.querySelector("p");
  const closeBtn = detalle.querySelector(".close-detalle");

  const prevBtn = detalle.querySelector(".flecha-prev") || detalle.querySelector(".flecha:nth-of-type(1)");
  const nextBtn = detalle.querySelector(".flecha-next") || detalle.querySelector(".flecha:nth-of-type(2)");

  let currentIndex = 0;
  let isOpen = false;

  /* ===============================
     HELPERS
  =============================== */

  function getBackgroundUrl(el) {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== "none" ? bg.slice(5, -2) : "";
  }

  function render(index) {
    const card = cards[index];
    const imgDiv = card.querySelector(".card-recomendaciones-img");

    img.src = getBackgroundUrl(imgDiv);
    title.textContent = card.querySelector("h3")?.textContent || "";
    text.textContent = card.querySelector("p")?.textContent || "";
  }

  /* ===============================
     OPEN / CLOSE
  =============================== */

  function openOverlay(index) {
    if (isOpen) return;
    isOpen = true;

    currentIndex = index;
    render(index);

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    if (!isOpen) return;
    isOpen = false;

    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  /* ===============================
     NAV
  =============================== */

  // function go(dir) {
  //   currentIndex =
  //     dir === "next"
  //       ? (currentIndex + 1) % cards.length
  //       : (currentIndex - 1 + cards.length) % cards.length;

  //   render(currentIndex);
  // }
function goAnimated(direction) {
  const salidaClass =
    direction === "next" ? "slide-left" : "slide-right";

  // animación de salida
  detalle.classList.add(salidaClass);

  setTimeout(() => {
    // actualizar índice
    currentIndex =
      direction === "next"
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;

    render(currentIndex);

    // preparar entrada desde el lado opuesto
    detalle.classList.remove("slide-left", "slide-right");
    detalle.style.transition = "none";
    detalle.style.transform =
      direction === "next"
        ? "translateX(120px)"
        : "translateX(-120px)";
    detalle.style.opacity = "0";

    requestAnimationFrame(() => {
      detalle.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      detalle.style.transform = "translateX(0)";
      detalle.style.opacity = "1";
    });
  }, 300);
}

  // prevBtn?.addEventListener("click", e => {
  //   e.stopPropagation();
  //   go("prev");
  // });

  // nextBtn?.addEventListener("click", e => {
  //   e.stopPropagation();
  //   go("next");
  // });


  prevBtn?.addEventListener("click", e => {
  e.stopPropagation();
  goAnimated("prev");
});

nextBtn?.addEventListener("click", e => {
  e.stopPropagation();
  goAnimated("next");
});


  /* ===============================
     OPEN FROM CARD
  =============================== */

  cards.forEach((card, i) => {
    card.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      openOverlay(i);
    });
  });

  /* ===============================
     CLOSE ACTIONS
  =============================== */

  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    closeOverlay();
  });

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeOverlay();
  });

  /* ===============================
     SWIPE (HORIZONTAL ONLY)
     — NO rompe scroll —
  =============================== */

  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dy = 0;
  let dragging = false;

  detalle.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    dragging = true;
  }, { passive: true });

  detalle.addEventListener("touchmove", e => {
    if (!dragging) return;

    const t = e.touches[0];
    dx = t.clientX - startX;
    dy = t.clientY - startY;

    // si es vertical, dejamos scroll natural
    if (Math.abs(dy) > Math.abs(dx)) return;

    e.preventDefault();
  }, { passive: false });

detalle.addEventListener("touchend", () => {
  if (!dragging) return;
  dragging = false;

  if (Math.abs(dx) > 80) {
    dx > 0 ? goAnimated("prev") : goAnimated("next");
  }

  dx = dy = 0;
});

});
