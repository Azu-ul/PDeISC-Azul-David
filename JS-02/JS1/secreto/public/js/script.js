function mostrarDecodificado() {
  let texto = document.getElementById("mensaje").value;
  let decodificado = decodificar(texto);
  document.getElementById("resultado").innerText = decodificado;
}

function decodificar(texto) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === "(") {
      let dentro = "";
      i++;
      while (texto[i] !== ")" && i < texto.length) {
        dentro += texto[i];
        i++;
      }
      resultado += dentro.split('').reverse().join('');
    } else {
      resultado += texto[i];
    }
  }
  return resultado;
}
