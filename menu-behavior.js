// document.getElementById('menu-tags').addEventListener('click', () => {
//   const tags = document.getElementById('tags');
//   if (!tags) return;
//   tags.classList.toggle('visible');
// });


// const menuXqsomos = document.getElementById('menu-xqsomos');
// const menuSets = document.getElementById('menu-sets');
// const xqsomosPanel = document.getElementById('xqsomos-panel');
// const setsPanel = document.getElementById('sets-panel');

// menuXqsomos.addEventListener('mouseenter', () => {
//   xqsomosPanel.style.opacity = '1';
// });

// menuXqsomos.addEventListener('mouseleave', () => {
//   // Pequeño delay para permitir pasar el mouse al panel
//   setTimeout(() => {
//     if (!xqsomosPanel.matches(':hover')) {
//       xqsomosPanel.style.opacity = '0';
//     }
//   }, 100);
// });

// xqsomosPanel.addEventListener('mouseleave', () => {
//   xqsomosPanel.style.opacity = '0';
// });

// xqsomosPanel.addEventListener('mouseenter', () => {
//   xqsomosPanel.style.opacity = '1';
// });



// /*** */
// menuSets.addEventListener('mouseenter', () => {
//   setsPanel.style.opacity = '1';
// });

// menuSets.addEventListener('mouseleave', () => {
//   // Pequeño delay para permitir pasar el mouse al panel
//   setTimeout(() => {
//     if (!setsPanel.matches(':hover')) {
//       setsPanel.style.opacity = '0';
//     }
//   }, 100);
// });


// const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
// const isWeb = window.matchMedia("(min-width: 1025px)").matches;

// const menuTags = document.getElementById('menu-tags');



const menuXqsomos = document.getElementById('menu-xqsomos');
const menuSets = document.getElementById('menu-sets');
const tags = document.getElementById('tags');
const xqsomosPanel = document.getElementById('xqsomos-panel');
const setsPanel = document.getElementById('sets-panel');


menuTags.addEventListener('click', () => {
  if (!tags) return;
  tags.classList.toggle('visible');
});

if (isWeb) {
  console.log('web - header behavior');

  /***  XQSOMOS PANEL ***/
  menuXqsomos.addEventListener('mouseenter', () => {
    xqsomosPanel.style.opacity = '1';
  });

  menuXqsomos.addEventListener('mouseleave', () => {
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

  /***  SETS PANEL ***/
  menuSets.addEventListener('mouseenter', () => {
    setsPanel.style.opacity = '1';
  });

  menuSets.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!setsPanel.matches(':hover')) {
        setsPanel.style.opacity = '0';
      }
    }, 100);
  });

}

else if (isTablet) {
  console.log('tablet - header behavior');

  /***  XQSOMOS PANEL ***/
  menuXqsomos.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    xqsomosPanel.classList.toggle('active');
  });

  /***  SETS PANEL ***/
  menuSets.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    setsPanel.classList.toggle('active');
  });

  // Cerrar paneles si tocás fuera
  document.addEventListener('touchstart', (e) => {
    if (!menuXqsomos.contains(e.target) && !xqsomosPanel.contains(e.target)) {
      xqsomosPanel.classList.remove('active');
    }
    if (!menuSets.contains(e.target) && !setsPanel.contains(e.target)) {
      setsPanel.classList.remove('active');
    }
  });
}
