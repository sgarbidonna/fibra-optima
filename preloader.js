
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hide');
    }, 4000); // 0.8s (expand) + 0.4s (fadein) + 0.8s (moveout)
  });
