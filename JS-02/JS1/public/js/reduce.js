// 1. Suma de elementos
document.getElementById('form-suma').addEventListener('submit', function(e) {
  e.preventDefault();
  const numeros = Array.from(this.querySelectorAll('input')).map(i => Number(i.value.trim()));
  const suma = numeros.reduce((acc, n) => acc + n, 0);
  document.getElementById('resultado-suma').innerHTML = `
    <p><strong>Array:</strong> [${numeros.join(', ')}]</p>
    <p>La suma total es: ${suma}</p>
  `;
  this.reset();
});

// 2. Multiplicación de elementos
document.getElementById('form-multiplicacion').addEventListener('submit', function(e) {
  e.preventDefault();
  const numeros = Array.from(this.querySelectorAll('input')).map(i => Number(i.value.trim()));
  const producto = numeros.reduce((acc, n) => acc * n, 1);
  document.getElementById('resultado-multiplicacion').innerHTML = `
    <p><strong>Array:</strong> [${numeros.join(', ')}]</p>
    <p>El producto total es: ${producto}</p>
  `;
  this.reset();
});

// 3. Total de precios desde objetos
document.getElementById('form-precios').addEventListener('submit', function(e) {
  e.preventDefault();
  const precios = Array.from(this.querySelectorAll('input')).map(i => ({ precio: Number(i.value.trim()) }));
  const total = precios.reduce((acc, obj) => acc + obj.precio, 0);
  document.getElementById('resultado-precios').innerHTML = `
    <p><strong>Array:</strong> [${precios.map(p => p.precio).join(', ')}]</p>
    <p>Total de precios: $${total}</p>
  `;
  this.reset();
});