let activeSection = null;

function highlightSection(sectionId) {
  const allSections = ['a', 'b', 'c'];
  const sectionHeaders = {
    'a': document.getElementById('section-a-title'),
    'b': document.getElementById('section-b-title'),
    'c': document.getElementById('section-c-title')
  };

  if (activeSection === sectionId) {
    // Si la sección está activa, resetear todo
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      section.style.backgroundColor = '';
      section.style.color = '';
      section.style.flex = '1'; // Volver a tamaño normal
      header.classList.remove('hidden'); // Mostrar el título nuevamente
      const images = section.querySelectorAll('img, .card-img');
      images.forEach(img => {
        img.style.opacity = '1';
      });
    });

    // Restaurar el diseño de las tarjetas
    const cardsContent = document.querySelector('.cards-content');
    cardsContent.style.display = 'flex';
    cardsContent.style.flexWrap = 'wrap';
    cardsContent.style.overflowX = 'auto'; // Para scroll horizontal
    cardsContent.style.overflowY = 'hidden'; // Sin scroll vertical
    cardsContent.style.gridTemplateColumns = ''; // Restablecer las columnas
    cardsContent.style.justifyContent = 'flex-start'; // Alineación estándar

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.borderBottom = '1px solid #000';
    });

    activeSection = null;
  } else {
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];

      if (sectionId === 'b') {
        if (id === 'b') {
          section.style.flex = '3'; // B grande
          section.style.backgroundColor = '';
          section.style.color = '';
          header.classList.remove('hidden');
        } else {
          section.style.flex = '0'; // A y C desaparecen
          header.classList.add('hidden');
        }
      } else if (sectionId === 'a') {
        if (id === 'a') {
          section.style.flex = '3'; // A grande
          section.style.backgroundColor = '';
          section.style.color = '';
          header.classList.remove('hidden');
        } else {
          section.style.flex = '0'; // B y C desaparecen
          header.classList.add('hidden');
        }
      } else {
        if (id !== sectionId) {
          section.style.color = '#f0f0f0';
          header.classList.add('hidden');

          const images = section.querySelectorAll('img, .card-img');
          images.forEach(img => {
            img.style.opacity = '0';
          });
        } else {
          section.style.backgroundColor = '';
          section.style.color = '';
          section.style.flex = '1';
          header.classList.remove('hidden');

          const images = section.querySelectorAll('img, .card-img');
          images.forEach(img => {
            img.style.opacity = '1';
          });
        }
      }
    });

    // Control de las tarjetas para la sección A
    if (sectionId === 'a') {
      const cardsContent = document.querySelector('.cards-content');
      cardsContent.style.display = 'grid';
      cardsContent.style.gridTemplateColumns = 'repeat(3, 1fr)'; // 3 columnas
      cardsContent.style.overflowX = 'auto'; // Scroll horizontal
      cardsContent.style.overflowY = 'hidden'; // Sin scroll vertical

    //   const cards = document.querySelectorAll('.card');
    //   cards.forEach(card => {
    //     card.style.borderBottom = 'none'; // Sin borde inferior en las tarjetas activas
    //   });

    } else if (sectionId === 'c') {
      const individualSets = document.querySelectorAll('.individual-set');
      individualSets.forEach(set => {
        set.style.opacity = '1';
      });

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.borderBottom = '0px';
      });

    } else {
      const individualSets = document.querySelectorAll('.individual-set');
      individualSets.forEach(set => {
        set.style.opacity = '1';
      });

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.borderBottom = '1px solid #000';
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
  
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      section.style.backgroundColor = '';
      section.style.color = '';
      section.style.flex = '1'; // Volver a tamaño normal
      header.classList.remove('hidden'); // Mostrar los títulos
      const images = section.querySelectorAll('img, .card-img');
      images.forEach(img => {
        img.style.opacity = '1';
      });
    });
  
    // Restaurar el diseño de las tarjetas
    const cardsContent = document.querySelector('.cards-content');
    cardsContent.style.display = 'flex';
    cardsContent.style.flexWrap = 'wrap';
    cardsContent.style.overflowX = 'auto'; // Scroll horizontal
    cardsContent.style.overflowY = 'hidden';
    cardsContent.style.gridTemplateColumns = '';
    cardsContent.style.justifyContent = 'flex-start';
  
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.borderBottom = '1px solid #000';
    });
  
    activeSection = null;
  }
  
  // Listener para el logo
  document.getElementById('logo').addEventListener('click', resetSections);
  