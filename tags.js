const tagsPanel = document.getElementById('tags');
const menuTags = document.getElementById('menu-tags');
const allTags = Array.from(tagsPanel.querySelectorAll('.tag'));

let activeTags = new Set();

// Función para filtrar cards según tags activados
function filterByTags() {
  // Obtener todas las cards de las 3 secciones
  const cards = document.querySelectorAll('.card-recomendaciones, .card-blockg, .card-ezpezial');

  if (activeTags.size === 0) {
    // Si no hay tags activos, mostrar todas las cards
    cards.forEach(card => {
      card.style.display = '';
    });
    return;
  }

  cards.forEach(card => {
    const cardTags = card.dataset.tags ? card.dataset.tags.split(',').map(t => t.trim()) : [];
    // Mostrar card si alguno de sus tags está activo
    const isVisible = cardTags.some(tag => activeTags.has(tag));
    card.style.display = isVisible ? '' : 'none';
  });
}

// Manejar click en tags para activar/desactivar filtro
allTags.forEach(tagEl => {
  tagEl.addEventListener('click', () => {
    const tag = tagEl.dataset.tag;
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
      tagEl.classList.remove('active');
    } else {
      activeTags.add(tag);
      tagEl.classList.add('active');
    }
    filterByTags();
  });
});
