
    document.getElementById('form-numeros').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const numeros = inputs.slice(0, 3).map(input => Number(input.value.trim()));

      const resultado = document.getElementById('resultado-numeros');
      const mayoresA10 = numeros.filter(numero => numero > 10);

      if (mayoresA10.length === 0) {
        resultado.innerHTML = `
          <h4>No hay números mayores a 10.</h4>
        `;
      } else {
        resultado.innerHTML = `
          <h4>Números mayores a 10:</h4>
          <p>Array original: [${numeros.join(', ')}]</p>
          <p>Array con números mayores a 10: [${mayoresA10.join(', ')}]</p>
        `;
      }

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });

    // 2. Filtrar palabras con más de 5 letras
    document.getElementById('form-palabras').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const palabras = inputs.slice(0, 3).map(input => input.value.trim());

      const resultado = document.getElementById('resultado-palabras');
      const palabrasLargas = palabras.filter(palabra => palabra.length > 5);

      if (palabrasLargas.length === 0) {
        resultado.innerHTML = `
          <h4>No hay palabras con más de 5 letras.</h4>
        `;
      } else {
        resultado.innerHTML = `
          <h4>Palabras con más de 5 letras:</h4>
          <p>Array original: [${palabras.join(', ')}]</p>
          <p>Array con palabras mayores a 5 letras: [${palabrasLargas.join(', ')}]</p>
        `;
      }

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });

// 3. Filtrar usuarios activos (case insensitive y sin tildes)
document.getElementById('form-usuarios').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const usuarios = [
    { nombre: inputs[0].value.trim(), activo: esRespuestaPositiva(inputs[1].value.trim()) },
    { nombre: inputs[2].value.trim(), activo: esRespuestaPositiva(inputs[3].value.trim()) },
    { nombre: inputs[4].value.trim(), activo: esRespuestaPositiva(inputs[5].value.trim()) }
  ];
  const resultado = document.getElementById('resultado-usuarios');
  const usuariosActivos = usuarios.filter(usuario => usuario.activo);
  
  if (usuariosActivos.length === 0) {
    resultado.innerHTML = `
      <h4>No hay usuarios activos.</h4>
    `;
  } else {
    resultado.innerHTML = `
      <h4>Usuarios activos:</h4>
      <p>[${usuariosActivos.map(u => u.nombre).join(', ')}]</p>
    `;
  }
  // Limpiar el formulario
  inputs.forEach(input => input.value = '');
});

// Función para normalizar texto (eliminar tildes y convertir a minúsculas)
function normalizar(texto) {
  return texto
    .normalize('NFD') // Descompone caracteres con acento
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .toLowerCase(); // Convierte a minúsculas
}

// Función para verificar si la respuesta es positiva (sí, si, yes, y, s, etc.)
function esRespuestaPositiva(respuesta) {
  const respuestaNormalizada = normalizar(respuesta);
  return ['si', 'sí', 's', 'yes', 'y', 'true'].includes(respuestaNormalizada);
}