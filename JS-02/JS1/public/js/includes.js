// 1. Comprobar si un array contiene "admin" (case-insensitive)
document.getElementById('form-admin').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const usuariosOriginales = inputs.map(input => input.value.trim());  // Usamos los valores tal como se ingresaron

  const usuariosNormalizados = usuariosOriginales.map(usuario => usuario.toLowerCase());  // Para la búsqueda, convertimos a minúsculas

  const resultado = document.getElementById('resultado-admin');

  const contieneAdmin = usuariosNormalizados.includes("admin");  // Comprobamos si "admin" está en el array (sin importar mayúsculas/minúsculas)

  resultado.innerHTML = `
    <p><strong>Array original:</strong> [${usuariosOriginales.join(', ')}]</p>
    <p>¿Contiene "admin"? ${contieneAdmin ? 'Sí' : 'No'}</p>
  `;
  this.reset();

});

// 2. Verificar si "verde" está en el array de colores (case-insensitive)
document.getElementById('form-colores').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const coloresOriginales = inputs.map(input => input.value.trim());  // Usamos los valores tal como se ingresaron

  const coloresNormalizados = coloresOriginales.map(color => color.toLowerCase());  // Para la búsqueda, convertimos a minúsculas

  const resultado = document.getElementById('resultado-colores');

  const contieneVerde = coloresNormalizados.includes("verde");  // Comprobamos si "verde" está en el array (sin importar mayúsculas/minúsculas)

  resultado.innerHTML = `
    <p><strong>Array original:</strong> [${coloresOriginales.join(', ')}]</p>
    <p>¿Contiene "verde"? ${contieneVerde ? 'Sí' : 'No'}</p>
  `;
  this.reset();

});

// Inicializar un array vacío para mantener los números entre envíos
let numerosGuardados = [];

document.getElementById('form-numeros').addEventListener('submit', function(e) {
  e.preventDefault(); 
  
  // Obtener los inputs del formulario
  const inputs = Array.from(this.querySelectorAll('input'));
  
  // Si el array está vacío, obtener los primeros 3 números iniciales
  if (numerosGuardados.length === 0) {
    numerosGuardados = inputs.slice(0, 3).map(input => Number(input.value.trim()));
  }
  
  // Obtener el número a agregar
  const numeroAAgregar = Number(inputs[3].value.trim());
  const resultado = document.getElementById('resultado-numeros');
  
  // Verificar si el número ya existe en el array
  if (numerosGuardados.includes(numeroAAgregar)) {
    resultado.innerHTML = `
      <p><strong>Array actual:</strong> [${numerosGuardados.join(', ')}]</p>
      <p>El número ${numeroAAgregar} ya está en el array, no se puede agregar.</p>
    `;
  } else {
    // Agregar el número al array si no existe
    numerosGuardados.push(numeroAAgregar);
    resultado.innerHTML = `
      <p><strong>Array actual:</strong> [${numerosGuardados.join(', ')}]</p>
      <p>El número ${numeroAAgregar} ha sido agregado al array.</p>
    `;
  }
  
  // Limpiar solo el campo del número a agregar
  inputs[3].value = '';
});
