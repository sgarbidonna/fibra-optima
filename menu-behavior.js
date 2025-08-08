document.getElementById('menu-tags').addEventListener('click', () => {
  const tags = document.getElementById('tags');
  if (!tags) return;
  tags.classList.toggle('visible');
});


const menuXqsomos = document.getElementById('menu-xqsomos');
const hoverPanel = document.getElementById('xqsomos');

menuXqsomos.addEventListener('mouseenter', () => {
  hoverPanel.style.opacity = '1';
});

menuXqsomos.addEventListener('mouseleave', () => {
  // Pequeño delay para permitir pasar el mouse al panel
  setTimeout(() => {
    if (!hoverPanel.matches(':hover')) {
      hoverPanel.style.opacity = '0';
    }
  }, 100);
});

hoverPanel.addEventListener('mouseleave', () => {
  hoverPanel.style.opacity = '0';
});

hoverPanel.addEventListener('mouseenter', () => {
  hoverPanel.style.opacity = '1';
});
