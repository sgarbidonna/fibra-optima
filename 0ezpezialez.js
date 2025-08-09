// Simulación de datos extraídos de index.html

//MODULARIZAR LO SIGUIENTE, CON HTML ASI SE LEVANTA EL DISEÑO DE YOUTUBES LINKS BLA

const ezpezialezCardsData = [
  {
    id: "martin bisi",
    title: "martin bisi",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae asperiores expedita quae, deleniti, natus mollitia fugit sequi alias totam aspernatur dolore consectetur voluptates? Ullam dolores voluptates recusandae atque, sed aspernatur?",
    tags: ["internacionales"],
  },
  // Podés agregar más entradas aquí simuladas
];



// Función para mostrar entradas completas en #section-info
function loadEntries() {
  const sectionInfo = document.getElementById("section-info");
  const searchListByTitle = document.getElementById("search-list-by-title");
  const searchListByYear = document.getElementById("search-list-by-year");

  ezpezialezCardsData.forEach((entry, i) => {
    // Crear artículo completo
    const article = document.createElement("article");
    article.id = entry.id;

    const h2 = document.createElement("h2");
    h2.textContent = entry.title;
    article.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = entry.content;
    article.appendChild(p);

    if (entry.tags && entry.tags.length > 0) {
      const tagsDiv = document.createElement("div");
      tagsDiv.textContent = "Tags: " + entry.tags.join(", ");
      tagsDiv.style.fontStyle = "italic";
      tagsDiv.style.fontSize = "0.9em";
      tagsDiv.style.marginTop = "0.5em";
      article.appendChild(tagsDiv);
    }

    sectionInfo.appendChild(article);

    // Crear link para el panel búsqueda
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${entry.id}`;
    a.textContent = entry.title;
    li.appendChild(a);
    searchListByTitle.appendChild(li);
  });
}

// Ejecutar al cargar página
window.addEventListener("DOMContentLoaded", loadEntries);
