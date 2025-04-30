document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const resultado = document.getElementById('resultado');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const data = new FormData(form);
      const intereses = data.getAll('intereses');
      
      resultado.innerHTML = `
        <h2>Datos ingresados:</h2>
        <p><strong>Nombre:</strong> ${data.get('nombre')}</p>
        <p><strong>Edad:</strong> ${data.get('edad')}</p>
        <p><strong>Email:</strong> ${data.get('email')}</p>
        <p><strong>Género:</strong> ${data.get('genero')}</p>
        <p><strong>País:</strong> ${data.get('pais')}</p>
        <p><strong>Intereses:</strong> ${intereses.join(', ') || 'Ninguno'}</p>
      `;
  
      form.reset();
    });
  });
  