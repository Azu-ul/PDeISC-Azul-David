//definimos los elementos que recuperamos del html
const formulario = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');
const listaPersonas = document.getElementById('lista-personas');

//escuchamos submit
formulario.addEventListener('submit', async (e) => {
  e.preventDefault(); //evitamos que se recargue la pagina al enviar formulario

  //creamos objeto con la informacion enviada por el usuario
  const datos = new FormData(formulario);
  const cuerpo = Object.fromEntries(datos);

  //la enviamos al servidor con fetch()
    const respuesta = await fetch('/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo) // pasamos el objeto a texto
    });

  //leemos la respuesta en formato json
    const resultado = await respuesta.json();

  // si el resultado "está ok", mostramos que se registro la persona, de lo contrario, error
    mensaje.textContent = resultado.ok
      ? 'Guardado correctamente'
      : 'Error al guardar';

  //si el resultado da ok y hay personas en el array, 
    if (resultado.ok && resultado.personas) {
      listaPersonas.innerHTML = ''; //eliminamos lista anterior para evitar que se sobreescriba
//recorremos el array con un foreach
      resultado.personas.forEach((p) => {
        //creamos elemento HTML para mostrar en lista dinamica
        const item = document.createElement('li');
        item.textContent = `${p.nombre} ${p.apellido}`;
        listaPersonas.appendChild(item); // lo hacemos "hijo" de la lista
      });
    };
});

