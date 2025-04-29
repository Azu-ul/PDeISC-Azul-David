function agregarH1() {
  const contenedor = document.getElementById('contenedor');
  if (!document.getElementById('h1nuevo')) {
    const h1 = document.createElement('h1');
    h1.id = 'h1nuevo';
    h1.textContent = 'Hola DOM';
    contenedor.appendChild(h1);
  }
}

function cambiarTexto() {
  const h1 = document.getElementById('h1nuevo');
  if (h1) h1.textContent = 'Chau DOM';
}

function cambiarColor() {
  const h1 = document.getElementById('h1nuevo');
  if (h1) h1.style.color = 'red';
}

function agregarImagen() {
  const contenedor = document.getElementById('contenedor');
  if (!document.getElementById('imagen1') && !document.getElementById('imagen2')) {
    const img = document.createElement('img');
    img.id = 'imagen1';
    img.src = '/img/image1.jpeg';
    contenedor.appendChild(img);
  }
}

function cambiarImagen() {
  const img = document.getElementById('imagen1') || document.getElementById('imagen2');
  if (img.id==='imagen1') {
    img.id = 'imagen2';
    img.src = '/img/image2.jpg';
  } else {
    img.id = 'imagen1';
    img.src = '/img/image1.jpeg';
  }
}

function cambiarTamanio() {
  const img = document.getElementById('imagen1') || document.getElementById('imagen2');
  if (img) img.style.width = '500px';
}
