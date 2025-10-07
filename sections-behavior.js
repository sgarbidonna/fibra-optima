const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (!isMobile) {

  console.log('web', ' -  sections-behavior.js');

  let activeSection = null;

  function highlightSection(sectionId) {
    const allSections = ['a', 'b'];
    const sectionHeaders = {
      'a': document.getElementById('section-a-title'),
      'b': document.getElementById('section-b-title'),
    };

    const body = document.body;
    const cardsContent = document.querySelector('.cards-recomendaciones-content');
    const ezpezialez = document.getElementById('section-ezpezialez');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (activeSection === sectionId) {
      // Restaurar estado inicial (mostrar ambas secciones)
      allSections.forEach(id => {
        const section = document.getElementById(`section-${id}`);
        const header = sectionHeaders[id];
        section.style.display = 'flex';
        section.style.flex = '1';
        section.style.opacity = '1';
        section.style.pointerEvents = 'auto';
        section.style.width = '';
        section.style.minWidth = '';
        section.style.margin = '';
        header.classList.remove('hidden');
        section.querySelectorAll('img, .card-recomendaciones-img').forEach(img => img.style.opacity = '1');
      });

      if (ezpezialez) {
        ezpezialez.style.display = 'flex';
        ezpezialez.style.opacity = '1';
      }

      if (cardsContent) {
        cardsContent.style.display = 'flex';
        cardsContent.style.flexWrap = 'wrap';
        cardsContent.style.overflowX = 'auto';
        cardsContent.style.overflowY = 'hidden';
        cardsContent.style.gridTemplateColumns = '';
        cardsContent.style.justifyContent = 'flex-start';
      }

      activeSection = null;
      return;
    }

    // Expandir solo la sección activa y ocultar las otras
    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      if (id === sectionId) {
        section.style.display = 'flex';
        section.style.flex = '1 1 auto';
        section.style.opacity = '1';
        section.style.pointerEvents = 'auto';
        section.style.width = '';
        section.style.minWidth = '';
        section.style.margin = '';
        header.classList.remove('hidden');
        section.querySelectorAll('img, .card-recomendaciones-img').forEach(img => img.style.opacity = '1');
      } else {
        // Ocultar sección sin dejar espacio
        section.style.flex = '0 0 0';
        section.style.opacity = '0';
        section.style.pointerEvents = 'none';
        section.style.width = '0';
        section.style.minWidth = '0';
        section.style.margin = '0';
        header.classList.add('hidden');
        section.querySelectorAll('img, .card-recomendaciones-img').forEach(img => img.style.opacity = '0');
      }
    });

    if (ezpezialez) {
      ezpezialez.style.opacity = '0';
      setTimeout(() => {
        ezpezialez.style.display = 'none';
      }, 300);
    }

    body.style.backgroundColor = '#f0f0f0';

    if (cardsContent) {
      if (sectionId === 'a' && !isMobile) {
        cardsContent.style.display = 'grid';
        cardsContent.style.gridTemplateColumns = 'repeat(3, 1fr)';
      } else {
        cardsContent.style.display = 'flex';
        cardsContent.style.flexWrap = 'wrap';
        cardsContent.style.gridTemplateColumns = '';
      }
      cardsContent.style.overflowX = 'auto';
      cardsContent.style.overflowY = 'hidden';
      cardsContent.style.justifyContent = 'flex-start';
    }

    activeSection = sectionId;
  }

  document.getElementById('menu-recomendaciones').addEventListener('click', () => highlightSection('a'));
  document.getElementById('menu-blockg').addEventListener('click', () => highlightSection('b'));
  document.getElementById('section-a-title').addEventListener('click', () => highlightSection('a'));
  document.getElementById('section-b-title').addEventListener('click', () => highlightSection('b'));
  document.getElementById('logo').addEventListener('click', resetSections);

  function resetSections() {
    const allSections = ['a', 'b'];
    const sectionHeaders = {
      'a': document.getElementById('section-a-title'),
      'b': document.getElementById('section-b-title'),
    };
    const body = document.body;
    const cardsContent = document.querySelector('.cards-recomendaciones-content');
    const ezpezialez = document.getElementById('section-ezpezialez');

    allSections.forEach(id => {
      const section = document.getElementById(`section-${id}`);
      const header = sectionHeaders[id];
      section.style.display = 'flex';
      section.style.flex = '1';
      section.style.opacity = '1';
      section.style.pointerEvents = 'auto';
      section.style.width = '';
      section.style.minWidth = '';
      section.style.margin = '';
      header.classList.remove('hidden');
      section.querySelectorAll('img, .card-recomendaciones-img').forEach(img => img.style.opacity = '1');
    });

    if (ezpezialez) {
      ezpezialez.style.display = 'flex';
      ezpezialez.style.opacity = '1';
    }

    body.style.backgroundColor = '#f0f0f0';

    if (cardsContent) {
      cardsContent.style.display = 'flex';
      cardsContent.style.flexWrap = 'wrap';
      cardsContent.style.overflowX = 'auto';
      cardsContent.style.overflowY = 'hidden';
      cardsContent.style.gridTemplateColumns = '';
      cardsContent.style.justifyContent = 'flex-start';
    }

    activeSection = null;
  }

}
 else {
/* AL SER UN IF NEGATIVO SI ENTRO ACA ESTOY EN MOBIL  */ 

  console.log('mobile', ' -  sections-behavior.js');

  // const sections = document.querySelectorAll(".section");
  const headers = document.querySelectorAll(".section-header");

  // Set the initial active section
  let activeSection = document.querySelector("#section-a");
  activeSection.classList.add("active");

  // Handle section header clicks
  headers.forEach(header => {
    header.addEventListener("scroll", () => {
      const section = header.parentElement;

      // If the clicked section is EZPEZIALEZ, redirect
      if (section.id === "section-ezpezialez") {
        window.location.href = "/ezpezialez.html"; // 👈 poné acá tu URL real
        return;
      }

      // If the same section is already active, do nothing
      if (section === activeSection) return;

      // Collapse the current active section
      activeSection.classList.remove("active");

      // Expand the clicked section
      section.classList.add("active");
      activeSection = section;

      // Optional: scroll smoothly to the top of the new section
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}