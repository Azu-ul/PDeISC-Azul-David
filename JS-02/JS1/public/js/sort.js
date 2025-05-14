// 1. Ordenar números de menor a mayor
document.getElementById('form-numeros-sort').addEventListener('submit', function(e) {
  e.preventDefault();
  const numeros = Array.from(this.querySelectorAll('input')).map(i => Number(i.value.trim()));
  const ordenados = [...numeros].sort((a, b) => a - b);
  document.getElementById('resultado-numeros-sort').innerHTML = `
    <p><strong>Array original:</strong> [${numeros.join(', ')}]</p>
    <p><strong>Ordenado:</strong> [${ordenados.join(', ')}]</p>
  `;
  this.reset();
});

// 2. Ordenar palabras alfabéticamente
document.getElementById('form-palabras-sort').addEventListener('submit', function(e) {
  e.preventDefault();
  const palabras = Array.from(this.querySelectorAll('input')).map(i => i.value.trim());
  const ordenadas = [...palabras].sort((a, b) => a.localeCompare(b));
  document.getElementById('resultado-palabras-sort').innerHTML = `
    <p><strong>Array original:</strong> [${palabras.join(', ')}]</p>
    <p><strong>Ordenado:</strong> [${ordenadas.join(', ')}]</p>
  `;
  this.reset();
});

// 3. Ordenar usuarios por edad
document.getElementById('form-usuarios-sort').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = Array.from(this.querySelectorAll('input'));
  const usuarios = [
    { nombre: inputs[0].value.trim(), edad: Number(inputs[1].value.trim()) },
    { nombre: inputs[2].value.trim(), edad: Number(inputs[3].value.trim()) },
    { nombre: inputs[4].value.trim(), edad: Number(inputs[5].value.trim()) },
  ];

  const ordenados = [...usuarios].sort((a, b) => a.edad - b.edad);

  const original = usuarios.map(u => `${u.nombre} (${u.edad})`).join(', ');
  const resultado = ordenados.map(u => `${u.nombre} (${u.edad})`).join(', ');

  document.getElementById('resultado-usuarios-sort').innerHTML = `
    <p><strong>Array original:</strong> [${original}]</p>
    <p><strong>Ordenado por edad:</strong> [${resultado}]</p>
  `;
  this.reset();
});
