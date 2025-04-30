// cuando el dom esté listo, ejecutamos
document.addEventListener('DOMContentLoaded', () => {
  // agarramos el form y el div de resultado
  const form = document.getElementById('registroForm');
  const resultado = document.getElementById('resultado');

  // al hacer submit en el form
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evitamos que recargue la página

    // recopilamos los datos del form
    const data = new FormData(form);
    // sacamos todos los intereses marcados
    const intereses = data.getAll('intereses');

    // armamos el html de salida con lo que ingresó el usuario
    resultado.innerHTML = `
      <h2>datos ingresados:</h2>
      <p><strong>nombre:</strong> ${data.get('nombre')}</p>
      <p><strong>edad:</strong> ${data.get('edad')}</p>
      <p><strong>email:</strong> ${data.get('email')}</p>
      <p><strong>género:</strong> ${data.get('genero')}</p>
      <p><strong>país:</strong> ${data.get('pais')}</p>
      <p><strong>intereses:</strong> ${intereses.join(', ') || 'ninguno'}</p>
    `

    // reseteamos el form para que quede en blanco
    form.reset();
  });
});