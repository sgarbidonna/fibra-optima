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
      const images = section.querySelectorAll('img');
      images.forEach(img => {
        img.style.opacity = '1';
      });
    });
    activeSection = null;
  } else {
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];

      // Si estamos haciendo clic en B
      if (sectionId === 'b') {
        if (id === 'b') {
          section.style.flex = '3'; // Hacemos B grande
          section.style.backgroundColor = '';
          section.style.color = '';
          header.classList.remove('hidden'); // Aseguramos que se vea el título de B
        } else {
          section.style.flex = '0'; // Hacemos A y C desaparecer (ancho 0)
          header.classList.add('hidden'); // Ocultamos los títulos de A y C
        }
      } else {
        // Comportamiento normal para A y C
        if (id !== sectionId) {
          section.style.backgroundColor = '#f0f0f0';
          section.style.color = '#f0f0f0';
          const images = section.querySelectorAll('img');
          images.forEach(img => {
            img.style.opacity = '0';
          });
          header.classList.add('hidden'); // Ocultamos los títulos de A y C
        } else {
          section.style.backgroundColor = '';
          section.style.color = '';
          const images = section.querySelectorAll('img');
          images.forEach(img => {
            img.style.opacity = '1';
          });
          section.style.flex = '1'; // Aseguramos que tenga tamaño normal
          header.classList.remove('hidden'); // Aseguramos que se vea el título de la sección activa
        }
      }
    });
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
