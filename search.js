document.addEventListener('DOMContentLoaded', async () => {
  const sectionArticulos = document.querySelector('.section-articulos');
  const searchInput = document.getElementById('search-input');

  try {
    const resp = await fetch('./index.html');
    if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
    
    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const articulos = doc.querySelectorAll('.ezpezialez-articulo');
    // console.log('Artículos extraídos:', articulos.length);
    
    // Insertar cada artículo en section-articulos con clase .card-articulo
    articulos.forEach((art) => {
      const card = document.createElement('div');
      card.classList.add('card-articulo');
      card.innerHTML = art.innerHTML;
      sectionArticulos.appendChild(card);
    });

    // Ahora que los artículos están en el DOM, agregamos el listener del buscador
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      const cards = sectionArticulos.querySelectorAll('.card-articulo');

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });

  } catch (error) {
    console.error('Error cargando artículos:', error);
  }
});
