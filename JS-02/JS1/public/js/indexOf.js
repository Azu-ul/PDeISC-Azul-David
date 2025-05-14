// 1. Buscar "perro"
document.getElementById('form-palabras').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const palabras = inputs.map(input => input.value.trim());

  const palabrasNormalizadas = palabras.map(p => p.toLowerCase());
  const indice = palabrasNormalizadas.indexOf("perro");

  const resultado = document.getElementById('resultado-palabras');
  resultado.innerHTML = `
    <p><strong>Array original:</strong> [${palabras.join(', ')}]</p>
    <p>${indice !== -1 
      ? 'La palabra "perro" está en la posición: ' + indice + '.'
      : 'La palabra "perro" no está en el array.'}</p>
  `;
  this.reset();

});


// 2. Buscar número 50
document.getElementById('form-numeros').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const numeros = inputs.map(input => Number(input.value.trim()));
  const indice = numeros.indexOf(50);

  document.getElementById('resultado-numeros').innerHTML = `
    <p><strong>Array original:</strong> [${numeros.join(', ')}]</p>
    <p>El número 50 ${indice !== -1 ? `está en la posición ${indice}` : 'no está en el array'}.</p>
  `;
  this.reset();

});

// 3. Buscar "Madrid"
document.getElementById('form-ciudades').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const ciudades = inputs.map(input => input.value.trim());

  const resultado = document.getElementById('resultado-ciudades');

  const ciudadesNormalizadas = ciudades.map(c => c.toLowerCase());
  const indice = ciudadesNormalizadas.indexOf("madrid");

  resultado.innerHTML = `
    <p><strong>Array original:</strong> [${ciudades.join(', ')}]</p>
    <p>${indice !== -1 
      ? `La ciudad "Madrid" está en la posición ${indice}.` 
      : 'La ciudad "Madrid" no está en el array.'}</p>
  `;
  this.reset();

});

