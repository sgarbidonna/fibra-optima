document.querySelectorAll('.card-ezpezial').forEach(h1 => {
  h1.addEventListener('click', () => {
    const card = h1.closest('.card-ezpezial');
    card.classList.toggle('expanded');
  });
});
