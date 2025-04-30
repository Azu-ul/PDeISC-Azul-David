// click sobre boton
document.addEventListener('DOMContentLoaded', () => { //espera a que cargue el dom antes de actuar
    const clickBtn = document.getElementById('clickBtn');
    if (clickBtn) {
      clickBtn.addEventListener('click', () => {
        document.getElementById('clickMsg').textContent = '¡Botón clickeado!';
      });
    }
// doble click sobre boton  
    const dblClickBtn = document.getElementById('dblClickBtn');
    if (dblClickBtn) {
      dblClickBtn.addEventListener('dblclick', () => {
        document.getElementById('dblClickMsg').textContent = '¡Hiciste doble click!';
      });
    }
// presionar tecla
    document.addEventListener('keydown', (e) => {
      const keyMsg = document.getElementById('keyMsg');
      if (keyMsg) {
        keyMsg.textContent = `Tecla presionada: ${e.key}`;
      }
    });
// hacer hover sobre imagen
    const img = document.getElementById('hoverImg');
    if (img) {
      img.addEventListener('mouseover', () => {
        img.src = '/img/image2.jpg';
      });
      img.addEventListener('mouseout', () => {
        img.src = '/img/image1.jpg';
      });
    }
// rellenar formulario
    const formulario = document.getElementById('formulario');
    if (formulario) {
      formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('mensajeForm').textContent = '¡Formulario enviado!';
      });
    }
  });
  