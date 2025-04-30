document.getElementById('clickBtn').addEventListener('click', () => {
    document.getElementById('clickMsg').textContent = '¡Botón clickeado!';
  });

document.getElementById('dblClickBtn').addEventListener('dblclick', () => {
    document.getElementById('dblClickMsg').textContent = '¡Hiciste doble click!';
  });

document.addEventListener('keydown', (e) => {
    document.getElementById('keyMsg').textContent = `Tecla presionada: ${e.key}`;
  });

const img = document.getElementById('hoverImg');
  img.addEventListener('mouseover', () => {
    img.src = '/img/image2.jpg';
  });
  img.addEventListener('mouseout', () => {
    img.src = '/img/image1.jpg';
  });

document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('mensajeForm').textContent = '¡Formulario enviado!';
  });
  
  
  
  