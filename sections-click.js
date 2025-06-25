let activeSection = null;

function highlightSection(sectionId) {
  const allSections = ['a', 'b'];
  const sectionHeaders = {
    'a': document.getElementById('section-a-title'),
    'b': document.getElementById('section-b-title'),
    'c': document.getElementById('section-c-title')
  };

  const sectionC = document.getElementById('section-c');
  const body = document.body;
  const cardsContent = document.querySelector('.cards-content');
  const cards = document.querySelectorAll('.card');

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (activeSection === sectionId) {
    // 🔄 Restaurar todo
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      section.style.flex = '1';
      section.style.backgroundColor = '';
      section.style.color = '';
      section.style.opacity = '1';
      header.classList.remove('hidden');
      section.querySelectorAll('img, .card-img').forEach(img => img.style.opacity = '1');
    });

    sectionC.style.opacity = '1';
    body.style.backgroundColor = '#f0f0f0';

    // ✅ Restaurar cardsContent a su diseño original
    cardsContent.style.display = 'flex';
    cardsContent.style.flexWrap = 'wrap';
    cardsContent.style.overflowX = 'auto';
    cardsContent.style.overflowY = 'hidden';
    cardsContent.style.gridTemplateColumns = '';
    cardsContent.style.justifyContent = 'flex-start';

    cards.forEach(card => {
      card.style.borderRight = '0px solid #000';
    });

    activeSection = null;
  } else if (sectionId === 'c') {
    // 🔸 SETS seleccionado
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      section.style.flex = '1';
      section.style.opacity = '0';
      header.classList.remove('hidden');
      section.querySelectorAll('img, .card-img').forEach(img => img.style.opacity = '1');
    });

    sectionC.style.opacity = '1';
    body.style.backgroundColor = '#9AC17F';

    // ✅ Restaurar diseño original de cardsContent
    cardsContent.style.display = 'flex';
    cardsContent.style.flexWrap = 'wrap';
    cardsContent.style.overflowX = 'auto';
    cardsContent.style.overflowY = 'hidden';
    cardsContent.style.gridTemplateColumns = '';
    cardsContent.style.justifyContent = 'flex-start';

    cards.forEach(card => {
      card.style.borderRight = '0px solid #000';
    });

    activeSection = 'c';
  } else {
    // 🔹 Expandir section-a o section-b
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      if (id === sectionId) {
        section.style.flex = '3';
        section.style.backgroundColor = '';
        section.style.color = '';
        section.style.opacity = '1';
        header.classList.remove('hidden');
        section.querySelectorAll('img, .card-img').forEach(img => img.style.opacity = '1');
      } else {
        section.style.flex = '0';
        section.style.opacity = '1';
        header.classList.add('hidden');
        section.querySelectorAll('img, .card-img').forEach(img => img.style.opacity = '0');
      }
    });

    sectionC.style.opacity = '1';
    body.style.backgroundColor = '#f0f0f0';

    // ✅ Si es sección A y estamos en escritorio, aplicar estilo grid horizontal
    if (sectionId === 'a' && !isMobile) {
      cardsContent.style.display = 'grid';
      cardsContent.style.gridTemplateColumns = 'repeat(2, 1fr)';
      cardsContent.style.overflowX = 'auto';
      cardsContent.style.overflowY = 'hidden';
      cardsContent.style.justifyContent = 'flex-start';

      cards.forEach(card => {
        card.style.borderRight = '1px solid #000';
      });
    } else {
      // ✅ Restaurar diseño original
      cardsContent.style.display = 'flex';
      cardsContent.style.flexWrap = 'wrap';
      cardsContent.style.overflowX = 'auto';
      cardsContent.style.overflowY = 'hidden';
      cardsContent.style.gridTemplateColumns = '';
      cardsContent.style.justifyContent = 'flex-start';

      cards.forEach(card => {
        card.style.borderRight = '0px solid #000';
      });
    }

    activeSection = sectionId;
  }
}



// Agregar listeners para los botones del menú
document.getElementById('menu-recomendaciones').addEventListener('click', () => highlightSection('a'));
document.getElementById('menu-ezpezialez').addEventListener('click', () => highlightSection('b'));
document.getElementById('menu-sets').addEventListener('click', () => highlightSection('c'));

// Agregar listeners para los títulos de las secciones
document.getElementById('section-a-title').addEventListener('click', () => highlightSection('a'));
document.getElementById('section-b-title').addEventListener('click', () => highlightSection('b'));
document.getElementById('section-c-title').addEventListener('click', () => highlightSection('c'));


// Función para resetear todo (como cuando se desactiva una sección)
function resetSections() {
  const allSections = ['a', 'b', 'c'];
  const sectionHeaders = {
    'a': document.getElementById('section-a-title'),
    'b': document.getElementById('section-b-title'),
    'c': document.getElementById('section-c-title')
  };

  const body = document.body;
  const sectionC = document.getElementById('section-c');
  const cardsContent = document.querySelector('.cards-content');
  const cards = document.querySelectorAll('.card');

  allSections.forEach(id => {
    const section = document.getElementById(`section-${id}`);
    const header = sectionHeaders[id];
    section.style.backgroundColor = '';
    section.style.color = '';
    section.style.flex = '1'; // Volver a tamaño normal
    section.style.opacity = '1'; // Restaurar opacidad
    header.classList.remove('hidden'); // Mostrar los títulos
    const images = section.querySelectorAll('img, .card-img');
    images.forEach(img => img.style.opacity = '1');
  });

  // ✅ Restaurar el fondo
  body.style.backgroundColor = '#f0f0f0';

  // ✅ Restaurar el diseño de las tarjetas
  cardsContent.style.display = 'flex';
  cardsContent.style.flexWrap = 'wrap';
  cardsContent.style.overflowX = 'auto';
  cardsContent.style.overflowY = 'hidden';
  cardsContent.style.gridTemplateColumns = '';
  cardsContent.style.justifyContent = 'flex-start';

  cards.forEach(card => {
    card.style.borderRight = '0px solid #000';
    card.style.borderBottom = '1px solid #000';
  });

  activeSection = null;
}

  // Listener para el logo
  document.getElementById('logo').addEventListener('click', resetSections);
  