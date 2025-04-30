//creamos div
document.getElementById('addDiv').addEventListener('click', () => {
    const nuevoDiv = '<div class="nuevoElemento">Este es un nuevo Div</div>';
    document.getElementById('contenido').innerHTML += nuevoDiv;
  });
//creamos parrafo
  document.getElementById('addParagraph').addEventListener('click', () => {
    const nuevoP = '<p class="nuevoElemento">Este es un nuevo P (párrafo)</p>';
    document.getElementById('contenido').innerHTML += nuevoP;
  });
//creamos enlace
  document.getElementById('addLink').addEventListener('click', () => {
    const nuevoEnlace = '<a href="https://www.google.com" target="_blank" class="nuevoElemento">Ir a Google</a>';
    document.getElementById('contenido').innerHTML += nuevoEnlace;
  });
  