// load-print-articulos.js (versión con IDs sanitizados y scroll al hash)

document.addEventListener('DOMContentLoaded', async () => {
  const filename = location.pathname.split('/').pop();
  if (filename !== 'ezpezialez.html') return;

  try {
    const resp = await fetch('./index.html');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const articulos = doc.querySelectorAll('.ezpezialez-articulo');
    const sectionArticulos = document.querySelector('.section-articulos');
    if (!sectionArticulos) return;

    // Limpiar contenido previo
    sectionArticulos.innerHTML = '';

    // Función para sanitizar ids (evitar espacios y caracteres problemáticos)
    const sanitizeId = (raw) => {
      if (!raw) return '';
      // reemplaza espacios por guiones, elimina caracteres que no sean alfanuméricos, guión o guión bajo
      return raw
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')            // espacios → guiones
        .replace(/&/g, 'y')             // opcional: & → y
        .replace(/[^a-z0-9\-_]/g, '')   // eliminar todo lo demás
        .replace(/-+/g, '-');           // multiples guiones → uno
    };

    articulos.forEach(articulo => {
      // Intentamos obtener data-id primero del propio .ezpezialez-articulo,
      // si no existe, buscamos dentro (.card-tags[data-id])
      let rawId = articulo.dataset.id;
      if (!rawId) {
        const inner = articulo.querySelector('.card-tags[data-id]');
        if (inner) rawId = inner.dataset.id;
      }
      if (!rawId) {
        // si no hay id, saltamos (mejor exigir data-id en las cards base)
        console.warn('[load-print-articulos] Artículo sin data-id encontrado, se omite.');
        return;
      }

      const sanitizedId = sanitizeId(rawId);
      if (!sanitizedId) {
        console.warn('[load-print-articulos] data-id inválido tras sanitizar:', rawId);
        return;
      }

      // Evitar duplicados: buscamos por data-id en las cards ya inyectadas
      const yaExiste = sectionArticulos.querySelector(`.card-articulo[data-id="${sanitizedId}"]`);
      if (yaExiste) {
        // console.log(`[load-print-articulos] Saltando duplicado: ${sanitizedId}`);
        return;
      }

      const card = document.createElement('div');
      card.classList.add('card-articulo');

      // guardamos el id en data-id y en id (para que el hash funcione)
      card.dataset.id = sanitizedId;
      card.id = sanitizedId;

      // también pasamos los dataset year/month si existen en el original
      if (articulo.dataset.year) card.dataset.year = articulo.dataset.year;
      if (articulo.dataset.month) card.dataset.month = articulo.dataset.month;

      // Clonar el nodo original y añadirlo
      const clone = articulo.cloneNode(true);

      // Opcional: si dentro del clone hay .card-tags con data-id, actualizarlo también a la versión sanitizada
      const innerTag = clone.querySelector('.card-tags[data-id]');
      if (innerTag) {
        innerTag.dataset.id = sanitizedId;
      }

      card.appendChild(clone);
      sectionArticulos.appendChild(card);
    });

    // console.log('[load-print-articulos] Inyección terminada');

    // ---------- Manejo del hash (si abrimos con #id) ----------
    // Esperamos un tick para asegurarnos de que el DOM se haya renderizado
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        // intentos de encontrar: tal cual hash, decodeURIComponent, y sanitized fallback
        let target = document.querySelector(hash);
        if (!target) {
          // intentar decodificar por si el hash vino encodeado
          try {
            const decoded = decodeURIComponent(hash);
            target = document.querySelector(decoded);
          } catch (e) {
            // noop
          }
        }

        if (!target) {
          // intentar con la versión sanitizada del hash (quita # y sanitiza)
          const raw = hash.replace(/^#/, '');
          const sanitized = raw
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, 'y')
            .replace(/[^a-z0-9\-_]/g, '')
            .replace(/-+/g, '-');
          if (sanitized) {
            target = document.getElementById(sanitized);
          }
        }

        if (target) {
          // Si hay header fijo, restar su altura (detecta .site-header o header[role="banner"])
          const header = document.querySelector('.site-header') || document.querySelector('header[role="banner"]');
          let headerHeight = 0;
          if (header) {
            const rect = header.getBoundingClientRect();
            headerHeight = rect.height || 0;
          }
          // scroll con offset si hay header, o usando scrollIntoView si no
          if (headerHeight > 0) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8; // -8 px de margen
            window.scrollTo({ top, behavior: 'smooth' });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          console.warn('[load-print-articulos] Hash presente pero no se encontró elemento:', hash);
        }
      }
    }, 50); // 50ms da tiempo para render; podés aumentar si tu inyección tarda más

  } catch (err) {
    console.error('[ERROR] No se pudo obtener index.html:', err);
  }

});
