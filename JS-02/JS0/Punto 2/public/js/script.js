const formulario = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');
const listaPersonas = document.getElementById('lista-personas');

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);
  const cuerpo = Object.fromEntries(datos);

    const respuesta = await fetch('/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo)
    });

    const resultado = await respuesta.json();

    mensaje.textContent = resultado.ok
      ? 'Guardado correctamente'
      : 'Error al guardar';

    if (resultado.ok && resultado.personas) {
      listaPersonas.innerHTML = '';

      resultado.personas.forEach((p) => {
        const item = document.createElement('li');
        item.textContent = `${p.nombre} ${p.apellido}`;
        listaPersonas.appendChild(item);
      });
    };
});

