document.addEventListener('DOMContentLoaded', () => {
    const clickBtn = document.getElementById('clickBtn');
    if (clickBtn) {
      clickBtn.addEventListener('click', () => {
        document.getElementById('clickMsg').textContent = '¡Botón clickeado!';
      });
    }
  
    const dblClickBtn = document.getElementById('dblClickBtn');
    if (dblClickBtn) {
      dblClickBtn.addEventListener('dblclick', () => {
        document.getElementById('dblClickMsg').textContent = '¡Hiciste doble click!';
      });
    }
  
    document.addEventListener('keydown', (e) => {
      const keyMsg = document.getElementById('keyMsg');
      if (keyMsg) {
        keyMsg.textContent = `Tecla presionada: ${e.key}`;
      }
    });
  
    const img = document.getElementById('hoverImg');
    if (img) {
      img.addEventListener('mouseover', () => {
        img.src = '/img/image2.jpg';
      });
      img.addEventListener('mouseout', () => {
        img.src = '/img/image1.jpg';
      });
    }
  
    const formulario = document.getElementById('formulario');
    if (formulario) {
      formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('mensajeForm').textContent = '¡Formulario enviado!';
      });
    }

    document.getElementById('countChildrenBtn').addEventListener('click', () => {
      const nav = document.querySelector('nav');
      const childrenCount = nav.children.length;  // Contamos los hijos directos del nav
      document.getElementById('childrenCountMsg').textContent = `El nav tiene ${childrenCount} hijos.`;
  });
  
  
  });
  
  