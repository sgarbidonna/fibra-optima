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

const isTablet = window.matchMedia("(min-width: 820px) and (max-width: 1024px)").matches;
const isMobile = window.matchMedia("(max-width: 819px)").matches;
const isWeb = window.matchMedia("(min-width: 1025px)").matches;


const tags = document.getElementById('tags');

const menuXqsomos = document.getElementById('menu-xqsomos');
const xqsomosPanel = document.getElementById('xqsomos-panel');

const menuAportes = document.getElementById('menu-aportes');
const aportesPanel = document.getElementById('aportes-panel');


// console.log('estoy en menu-behaviour');
menuTags.addEventListener('click', () => {
  if (!tags) return;
  tags.classList.toggle('visible');
});

if (isWeb) {

  /*************** XQSOMOS PANEL ***************/
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

  xqsomosPanel.addEventListener('mouseenter', () => {
    xqsomosPanel.style.opacity = '1';
  });

  xqsomosPanel.addEventListener('mouseleave', () => {
    xqsomosPanel.style.opacity = '0';
  });


  /*************** APORTES PANEL ***************/
  menuAportes.addEventListener('mouseenter', () => {
    aportesPanel.style.opacity = '1';
  });

  menuAportes.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!aportesPanel.matches(':hover')) {
        aportesPanel.style.opacity = '0';
      }
    }, 100);
  });

  aportesPanel.addEventListener('mouseenter', () => {
    aportesPanel.style.opacity = '1';
  });

  aportesPanel.addEventListener('mouseleave', () => {
    aportesPanel.style.opacity = '0';
  });

}

/* ================= TABLET / TOUCH ================= */

else if (isTablet) {
  console.log('tablet - header behavior');

  /*************** XQSOMOS PANEL ***************/
  menuXqsomos.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    xqsomosPanel.classList.toggle('active');
  });

  /*************** APORTES PANEL ***************/
  menuAportes.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    aportesPanel.classList.toggle('active');
  });

  // Cerrar paneles si tocás fuera
  document.addEventListener('touchstart', (e) => {
    if (
      !menuXqsomos.contains(e.target) &&
      !xqsomosPanel.contains(e.target)
    ) {
      xqsomosPanel.classList.remove('active');
    }

    if (
      !menuAportes.contains(e.target) &&
      !aportesPanel.contains(e.target)
    ) {
      aportesPanel.classList.remove('active');
    }
  });
}
