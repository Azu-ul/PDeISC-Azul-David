document.getElementById('btnClick').addEventListener('click', () => {
    document.body.style.backgroundColor = '#d0f0c0'; 
});

document.getElementById('btnDblClick').addEventListener('dblclick', () => {
    document.getElementById('textoDobleClick').textContent = '¡Doble click detectado!!';
});

// Mostrar la tecla presionada en un párrafo
document.addEventListener('keydown', function(event) {
    const teclaPresionada = document.getElementById('teclaPresionada');
    teclaPresionada.textContent = 'Tecla presionada: ' + event.key; // Actualiza el texto con la tecla presionada
  });
  
  // Mostrar la tecla soltada en un párrafo
  document.addEventListener('keyup', function(event) {
    const teclaPresionada = document.getElementById('teclaPresionada');
    teclaPresionada.textContent = 'Tecla soltada: ' + event.key; // Actualiza el texto con la tecla soltada
  });

const hoverImg = document.getElementById('hoverImg');

// Cambiar a la imagen 2 cuando el mouse entre
hoverImg.addEventListener('mouseenter', () => {
  hoverImg.src = '/img/imagen2.jpg'; // Cambia la imagen
});

// Volver a la imagen 1 cuando el mouse salga
hoverImg.addEventListener('mouseleave', () => {
  hoverImg.src = '/img/image1.jpg'; // Vuelve a la imagen original
});

document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('mensajeForm').textContent = 'Formulario enviado correctamente ✅';
});