// 1. Invertir array de letras
document.getElementById('form-letras-reverse').addEventListener('submit', function(e) {
  e.preventDefault();
  const letras = Array.from(this.querySelectorAll('input')).map(i => i.value.trim());
  const invertidas = [...letras].reverse();
  document.getElementById('resultado-letras-reverse').innerHTML = `
    <p><strong>Array original:</strong> [${letras.join(', ')}]</p>
    <p><strong>Invertido:</strong> [${invertidas.join(', ')}]</p>
  `;
  this.reset();
});

// 2. Invertir array de números
document.getElementById('form-numeros-reverse').addEventListener('submit', function(e) {
  e.preventDefault();
  const numeros = Array.from(this.querySelectorAll('input')).map(i => Number(i.value.trim()));
  const invertidos = [...numeros].reverse();
  document.getElementById('resultado-numeros-reverse').innerHTML = `
    <p><strong>Array original:</strong> [${numeros.join(', ')}]</p>
    <p><strong>Invertido:</strong> [${invertidos.join(', ')}]</p>
  `;
  this.reset();
});

// 3. Invertir un string como array
document.getElementById('form-string-reverse').addEventListener('submit', function(e) {
  e.preventDefault();
  const texto = this.querySelector('input').value.trim();
  const array = texto.split('');
  const invertido = array.reverse().join('');
  document.getElementById('resultado-string-reverse').innerHTML = `
    <p><strong>Texto original:</strong> "${texto}"</p>
    <p><strong>Invertido:</strong> "${invertido}"</p>
  `;
  this.reset();
});
