document.addEventListener('DOMContentLoaded', async () => {

  const filename = location.pathname.split('/').pop();
  if (filename !== 'ezpezialez.html') return;

  // console.log('[DEBUG] Estamos en ezpezialez.html — iniciando fetch de index.html');

  try {
    const resp = await fetch('./index.html');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const articulos = doc.querySelectorAll('.ezpezialez-articulo');
    // console.log('[DEBUG] Artículos encontrados en index.html:', articulos.length);

    const sectionArticulos = document.querySelector('.section-articulos');
    if (!sectionArticulos) {
      // console.error('[ERROR] No se encontró el contenedor .section-articulos en ezpezialez.html');
      return;
    }

    // Limpiar contenido previo por si acaso
    sectionArticulos.innerHTML = '';

    articulos.forEach(articulo => {
      const card = document.createElement('div');
      card.classList.add('card-articulo');

      // Clonar el nodo para no moverlo del DOM original de index.html
      const clone = articulo.cloneNode(true);
      card.appendChild(clone);

      sectionArticulos.appendChild(card);
    });

    // console.log('[DEBUG] Artículos inyectados en .section-articulos dentro de .card-articulo');

  } catch (err) {
    console.error('[ERROR] No se pudo obtener index.html:', err);
  }
});
