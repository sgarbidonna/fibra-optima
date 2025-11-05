const tagsPanel = document.getElementById('tags');
const menuTags = document.getElementById('menu-tags');
const allTags = Array.from(tagsPanel.querySelectorAll('.tag'));

let activeTags = new Set();

// Función para filtrar cards según tags activados
function filterByTags() {
  const cards = document.querySelectorAll('.card-recomendaciones, .card-blockg, .card-tags');
  const especiales = document.querySelectorAll('.card-ezpezial');

  if (activeTags.size === 0) {
    [...cards, ...especiales].forEach(card => {
      card.classList.remove('card-hidden');
      setTimeout(() => (card.style.display = ''), 400);
    });
    return;
  }

  // Filtrar tarjetas normales (recomendaciones y blockg)
  cards.forEach(card => {
    const cardTags = card.dataset.tags ? card.dataset.tags.split(',').map(t => t.trim()) : [];
    const isVisible = cardTags.some(tag => activeTags.has(tag));

    if (isVisible) {
      card.style.display = '';
      setTimeout(() => card.classList.remove('card-hidden'), 10);
    } else {
      card.classList.add('card-hidden');
      setTimeout(() => (card.style.display = 'none'), 400);
    }
  });

  // Filtrar tarjetas ezpezialez correctamente
  especiales.forEach(ezpezial => {
    const innerCard = ezpezial.querySelector('.card-tags');
    if (!innerCard) return;

    const cardTags = innerCard.dataset.tags ? innerCard.dataset.tags.split(',').map(t => t.trim()) : [];
    const isVisible = cardTags.some(tag => activeTags.has(tag));

    if (isVisible) {
      ezpezial.style.display = '';
      setTimeout(() => ezpezial.classList.remove('card-hidden'), 10);
    } else {
      ezpezial.classList.add('card-hidden');
      setTimeout(() => (ezpezial.style.display = 'none'), 400);
    }
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
