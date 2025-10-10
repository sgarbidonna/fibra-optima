// // version mas pro


// // ===============================
// // load-print-articulos.js
// // ===============================
// document.addEventListener('DOMContentLoaded', async () => {

//   const filename = location.pathname.split('/').pop();
//   if (filename !== 'ezpezialez.html') return;

//   try {
//     const resp = await fetch('./index.html');
//     if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

//     const html = await resp.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     const articulos = doc.querySelectorAll('.ezpezialez-articulo');

//     const sectionArticulos = document.querySelector('.section-articulos');
//     if (!sectionArticulos) return;

//     // Limpiar por si acaso
//     sectionArticulos.innerHTML = '';

//     articulos.forEach(articulo => {
//       const card = document.createElement('div');
//       card.classList.add('card-articulo');

//       // Clonar nodo para no sacarlo del index.html
//       const clone = articulo.cloneNode(true);
//       card.appendChild(clone);

//       sectionArticulos.appendChild(card);
//     });

//     // Aviso en consola
//     console.log(`[load-print-articulos.js] Se inyectaron ${articulos.length} artículos en #section-articulos`);

//   } catch (err) {
//     console.error('[load-print-articulos.js] Error al cargar artículos:', err);
//   }
// });



// version andando -->
document.addEventListener('DOMContentLoaded', async () => {
  const filename = location.pathname.split('/').pop();
  if (filename !== 'ezpezialez.html') return;

  try {
    const resp = await fetch('./index.html');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const articulos = doc.querySelectorAll('.ezpezialez-articulo');
    const sectionArticulos = document.querySelector('.section-articulos');
    if (!sectionArticulos) return;

    sectionArticulos.innerHTML = ''; // limpiar por si acaso

    articulos.forEach(articulo => {
      const card = document.createElement('div');
      card.classList.add('card-articulo');
      const clone = articulo.cloneNode(true);
      card.appendChild(clone);
      sectionArticulos.appendChild(card);
    });

    console.log(`[load-print-articulos.js] ${articulos.length} artículos inyectados`);
  } catch (err) {
    console.error('[ERROR] No se pudo obtener index.html:', err);
  }
});


