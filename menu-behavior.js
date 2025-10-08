document.getElementById('menu-tags').addEventListener('click', () => {
  const tags = document.getElementById('tags');
  if (!tags) return;
  tags.classList.toggle('visible');
});


const menuXqsomos = document.getElementById('menu-xqsomos');
const menuSets = document.getElementById('menu-sets');
const xqsomosPanel = document.getElementById('xqsomos-panel');
const setsPanel = document.getElementById('sets-panel');

menuXqsomos.addEventListener('mouseenter', () => {
  xqsomosPanel.style.opacity = '1';
});

menuXqsomos.addEventListener('mouseleave', () => {
  // Pequeño delay para permitir pasar el mouse al panel
  setTimeout(() => {
    if (!xqsomosPanel.matches(':hover')) {
      xqsomosPanel.style.opacity = '0';
    }
  }, 100);
});

xqsomosPanel.addEventListener('mouseleave', () => {
  xqsomosPanel.style.opacity = '0';
});

xqsomosPanel.addEventListener('mouseenter', () => {
  xqsomosPanel.style.opacity = '1';
});



/*** */
menuSets.addEventListener('mouseenter', () => {
  setsPanel.style.opacity = '1';
});

menuSets.addEventListener('mouseleave', () => {
  // Pequeño delay para permitir pasar el mouse al panel
  setTimeout(() => {
    if (!setsPanel.matches(':hover')) {
      setsPanel.style.opacity = '0';
    }
  }, 100);
});


