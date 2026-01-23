// document.addEventListener("DOMContentLoaded", () => {
//   if (!window.matchMedia("(max-width: 1200px)").matches) return;

//   const cards = document.querySelectorAll(".card-recomendaciones");
//   let currentIndex = 0;

//   const overlay = document.createElement("div");
//   overlay.id = "overlay-detalle";
//   overlay.innerHTML = `
//     <div class="detalle-card">
//       <button id="flecha-prev" class="flecha">←</button>
//       <button id="flecha-next" class="flecha">→</button>
//       <img src="" alt="">
//       <h3></h3>
//       <p></p>
//     </div>
//   `;
//   document.body.appendChild(overlay);

//   const detalleCard = overlay.querySelector(".detalle-card");
//   const img = overlay.querySelector("img");
//   const title = overlay.querySelector("h3");
//   const text = overlay.querySelector("p");
//   const prevBtn = overlay.querySelector("#flecha-prev");
//   const nextBtn = overlay.querySelector("#flecha-next");

//   function getBackgroundUrl(el) {
//     const bg = window.getComputedStyle(el).backgroundImage;
//     return bg && bg !== "none" ? bg.slice(5, -2) : "";
//   }

//   function mostrarDetalle(index) {
//     const card = cards[index];
//     const imgDiv = card.querySelector(".card-recomendaciones-img");

//     img.src = getBackgroundUrl(imgDiv);
//     title.textContent = card.querySelector("h3").textContent;
//     text.textContent = card.querySelector("p").textContent;

//     detalleCard.style.transform = "";
//     detalleCard.style.opacity = "";

//     overlay.classList.add("active");
//     overlay.style.display = "flex";
//     currentIndex = index;
//   }

// function cerrarOverlayHaciaArriba() {
//   detalleCard.style.transition = "transform 0.35s ease, opacity 0.35s ease";
//   detalleCard.style.transform = "translateY(-140px)";
//   detalleCard.style.opacity = "0";

//   setTimeout(() => {
//     overlay.classList.remove("active");
//     overlay.style.display = "none";

//     detalleCard.style.transition = "";
//     detalleCard.style.transform = "";
//     detalleCard.style.opacity = "";
//   }, 350);
// }


//   function cambiarCard(direccion) {
//     const salida = direccion === "left" ? -120 : 120;

//     detalleCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";
//     detalleCard.style.transform = `translateX(${salida}px)`;
//     detalleCard.style.opacity = "0";

//     setTimeout(() => {
//       currentIndex =
//         direccion === "left"
//           ? (currentIndex + 1) % cards.length
//           : (currentIndex - 1 + cards.length) % cards.length;

//       const card = cards[currentIndex];
//       const imgDiv = card.querySelector(".card-recomendaciones-img");

//       img.src = getBackgroundUrl(imgDiv);
//       title.textContent = card.querySelector("h3").textContent;
//       text.textContent = card.querySelector("p").textContent;

//       detalleCard.style.transition = "none";
//       detalleCard.style.transform =
//         direccion === "left" ? "translateX(120px)" : "translateX(-120px)";
//       detalleCard.style.opacity = "0";

//       requestAnimationFrame(() => {
//         detalleCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";
//         detalleCard.style.transform = "translateX(0)";
//         detalleCard.style.opacity = "1";
//       });
//     }, 300);
//   }

//   prevBtn.onclick = e => {
//     e.stopPropagation();
//     cambiarCard("right");
//   };

//   nextBtn.onclick = e => {
//     e.stopPropagation();
//     cambiarCard("left");
//   };

//   overlay.addEventListener("click", e => {
//     if (e.target === overlay) cerrarOverlay();
//   });

//   cards.forEach((card, i) => {
//     card.addEventListener("click", () => mostrarDetalle(i));
//   });

//   /* ======================
//      DRAG REAL
//   ====================== */

//   let startX = 0;
//   let startY = 0;
//   let currentX = 0;
//   let currentY = 0;
//   let dragging = false;

//   overlay.addEventListener("touchstart", e => {
//     const t = e.touches[0];
//     startX = t.clientX;
//     startY = t.clientY;
//     dragging = true;

//     detalleCard.style.transition = "none";
//   });

//   overlay.addEventListener("touchmove", e => {
//     if (!dragging) return;

//     const t = e.touches[0];
//     currentX = t.clientX - startX;
//     currentY = t.clientY - startY;

//     // resistencia diagonal
//     detalleCard.style.transform = `translate(${currentX}px, ${currentY}px)`;
//     detalleCard.style.opacity = 1 - Math.min(Math.abs(currentY) / 300, 0.4);
//   });

//   overlay.addEventListener("touchend", () => {
//     dragging = false;

//     const absX = Math.abs(currentX);
//     const absY = Math.abs(currentY);

//     detalleCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";

//     // cierre vertical
//     if (absY > absX && absY > 120) {
//       cerrarOverlayHaciaArriba();
//       resetDrag();
//       return;
//     }


//     // navegación horizontal
//     if (absX > absY && absX > 100) {
//       cambiarCard(currentX > 0 ? "right" : "left");
//       resetDrag();
//       return;
//     }

//     // snap back
//     detalleCard.style.transform = "translate(0, 0)";
//     detalleCard.style.opacity = "1";
//     resetDrag();
//   });

//   function resetDrag() {
//     currentX = 0;
//     currentY = 0;
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(max-width: 1200px)").matches) return;

  const cards = document.querySelectorAll(".card-recomendaciones");
  if (!cards.length) return;

  let currentIndex = 0;
  let lock = false;

  /* ======================
     OVERLAY
  ====================== */

  const overlay = document.createElement("div");
  overlay.id = "overlay-detalle";
  overlay.innerHTML = `
    <div class="detalle-card">
      <button class="cerrar-overlay" aria-label="Cerrar">✕</button>
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
  const closeBtn = overlay.querySelector(".cerrar-overlay");

  /* ======================
     HELPERS
  ====================== */

  function getBackgroundUrl(el) {
    const bg = window.getComputedStyle(el).backgroundImage;
    return bg && bg !== "none" ? bg.slice(5, -2) : "";
  }

  function mostrarDetalle(index) {
    if (lock) return;

    const card = cards[index];
    const imgDiv = card.querySelector(".card-recomendaciones-img");

    img.src = getBackgroundUrl(imgDiv);
    title.textContent = card.querySelector("h3").textContent;
    text.textContent = card.querySelector("p").textContent;

    overlay.style.display = "flex";
    overlay.classList.add("active");
    overlay.style.pointerEvents = "auto";

    currentIndex = index;
  }

  function cerrarOverlay() {
    if (lock) return;
    lock = true;

    overlay.classList.remove("active");

    /* 👇 MUY IMPORTANTE PARA iOS */
    setTimeout(() => {
      overlay.style.pointerEvents = "none";
      overlay.style.display = "none";
    }, 120);

    /* 🔒 lock anti ghost click */
    setTimeout(() => {
      lock = false;
    }, 350);
  }

  function cambiarCard(dir) {
    const salida = dir === "left" ? -120 : 120;

    detalleCard.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    detalleCard.style.transform = `translateX(${salida}px)`;
    detalleCard.style.opacity = "0";

    setTimeout(() => {
      currentIndex =
        dir === "left"
          ? (currentIndex + 1) % cards.length
          : (currentIndex - 1 + cards.length) % cards.length;

      const card = cards[currentIndex];
      const imgDiv = card.querySelector(".card-recomendaciones-img");

      img.src = getBackgroundUrl(imgDiv);
      title.textContent = card.querySelector("h3").textContent;
      text.textContent = card.querySelector("p").textContent;

      detalleCard.style.transition = "none";
      detalleCard.style.transform =
        dir === "left" ? "translateX(120px)" : "translateX(-120px)";
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

  closeBtn.addEventListener("touchstart", e => {
    e.preventDefault();
    e.stopPropagation();
    cerrarOverlay();
  });

  /* ======================
     CIERRE AFUERA — iOS SAFE
  ====================== */

  overlay.addEventListener("touchstart", e => {
    if (!detalleCard.contains(e.target)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      cerrarOverlay();
    }
  });

  /* ======================
     OPEN CARDS
  ====================== */

  cards.forEach((card, i) => {
    card.addEventListener("touchstart", e => {
      if (lock) return;
      e.preventDefault(); // 👈 clave iOS
      mostrarDetalle(i);
    });
  });

  /* ======================
     SWIPE HORIZONTAL ONLY
  ====================== */

  let startX = 0;
  let currentX = 0;
  let dragging = false;

  detalleCard.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    dragging = true;
    detalleCard.style.transition = "none";
  });

  detalleCard.addEventListener("touchmove", e => {
    if (!dragging) return;
    currentX = e.touches[0].clientX - startX;
    detalleCard.style.transform = `translateX(${currentX}px)`;
  });

  detalleCard.addEventListener("touchend", () => {
    dragging = false;

    const absX = Math.abs(currentX);
    detalleCard.style.transition = "transform 0.3s ease";

    if (absX > 100) {
      cambiarCard(currentX > 0 ? "right" : "left");
    } else {
      detalleCard.style.transform = "translateX(0)";
    }

    currentX = 0;
  });
});
