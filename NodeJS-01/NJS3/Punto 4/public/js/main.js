const enlacesOriginales = [
  { texto: 'Google', href: 'https://www.google.com' },
  { texto: 'Wikipedia', href: 'https://es.wikipedia.org' },
  { texto: 'YouTube', href: 'https://www.youtube.com' },
  { texto: 'GitHub', href: 'https://github.com' },
  { texto: 'OpenAI', href: 'https://openai.com' }
];

const enlacesNuevos = [
  { texto: 'DuckDuckGo', href: 'https://duckduckgo.com' },
  { texto: 'Britannica', href: 'https://www.britannica.com' },
  { texto: 'Vimeo', href: 'https://vimeo.com' },
  { texto: 'GitLab', href: 'https://gitlab.com' },
  { texto: 'DeepMind', href: 'https://deepmind.com' }
];

const enlacesContainer = document.getElementById('enlacesContainer');
const log = document.getElementById('cambiosLog');

let enlacesCreados = false;

document.getElementById('crearEnlaces').addEventListener('click', () => {
  enlacesContainer.innerHTML = '';
  enlacesOriginales.forEach((enlace, i) => {
    const a = document.createElement('a');
    a.textContent = enlace.texto;
    a.href = enlace.href;
    a.target = "_blank"; // abre en nueva pestaña
    a.id = `link-${i}`;
    enlacesContainer.appendChild(a);
  });
  enlacesCreados = true;
});

document.getElementById('modificarEnlaces').addEventListener('click', () => {
  if (!enlacesCreados) {
    const li = document.createElement('li');
    li.textContent = 'Primero tenés que crear los enlaces antes de modificarlos.';
    log.appendChild(li);
    return;
  }

  enlacesNuevos.forEach((nuevo, i) => {
    const link = document.getElementById(`link-${i}`);
    if (link) {
      const textoAntiguo = link.textContent;
      const hrefAntiguo = link.href;
      link.textContent = nuevo.texto;
      link.href = nuevo.href;

      const li = document.createElement('li');
      li.textContent = `Modificado link ${i + 1}: "${textoAntiguo}" → "${nuevo.texto}", ${hrefAntiguo} → ${nuevo.href}`;
      log.appendChild(li);
    }
  });

  
});

