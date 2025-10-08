// ===============================
// archive-list.js
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('section-articulos');
  const archiveList = document.getElementById('archive-list');

  if (!section || !archiveList) {
    console.warn('[archive-list.js] No se encontró #section-articulos o #archive-list');
    return;
  }

  // Usamos MutationObserver para esperar a que los artículos sean inyectados
  const observer = new MutationObserver((mutations, obs) => {
    const articles = document.querySelectorAll('.card-tags');

    if (articles.length > 0) {
      obs.disconnect(); // ✂️ Dejamos de observar
      console.log(`[archive-list.js] Detectados ${articles.length} artículos — construyendo lista de archivo...`);
      buildArchiveList(articles, archiveList);
    }
  });

  observer.observe(section, { childList: true, subtree: true });

  function buildArchiveList(articles, container) {
    const archiveData = {};

    articles.forEach(article => {
      const year = article.dataset.year;
      const month = article.dataset.month;
      const rawId = article.dataset.id;
      const title = rawId.replace(/-/g, ' ');

      if (!archiveData[year]) archiveData[year] = {};
      if (!archiveData[year][month]) archiveData[year][month] = [];
      archiveData[year][month].push(title);
    });

    const years = Object.keys(archiveData).sort((a, b) => b - a);
    const monthOrder = [
      'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
      'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'
    ];

    years.forEach(year => {
      const yearItem = document.createElement('li');
      const yearBtn = document.createElement('button');
      yearBtn.textContent = year;
      yearBtn.classList.add('archive-year');
      yearBtn.addEventListener('click', () => {
        monthList.classList.toggle('visible');
      });

      const monthList = document.createElement('ul');
      monthList.classList.add('archive-month-list');

      const months = Object.keys(archiveData[year]).sort(
        (a, b) => monthOrder.indexOf(a.toLowerCase()) - monthOrder.indexOf(b.toLowerCase())
      );

      months.forEach(month => {
        const monthItem = document.createElement('li');
        const monthBtn = document.createElement('button');
        monthBtn.textContent = month.charAt(0).toUpperCase() + month.slice(1);
        monthBtn.classList.add('archive-month');
        monthBtn.addEventListener('click', () => {
          titleList.classList.toggle('visible');
        });

        const titleList = document.createElement('ul');
        titleList.classList.add('archive-title-list');

        const titles = archiveData[year][month].sort((a, b) => a.localeCompare(b));
        titles.forEach(title => {
          const titleItem = document.createElement('li');
          const link = document.createElement('a');
          link.textContent = title;
          link.href = `#${title.replace(/\s+/g, '-')}`;
          titleItem.appendChild(link);
          titleList.appendChild(titleItem);
        });

        monthItem.appendChild(monthBtn);
        monthItem.appendChild(titleList);
        monthList.appendChild(monthItem);
      });

      yearItem.appendChild(yearBtn);
      yearItem.appendChild(monthList);
      container.appendChild(yearItem);
    });
  }
});
