//array frutas
document.getElementById("form-frutas").addEventListener("submit", function (evento) {
    evento.preventDefault();
    let fruta1 = document.querySelector('[name="fruta1"]').value;
    let fruta2 = document.querySelector('[name="fruta2"]').value;
    let fruta3 = document.querySelector('[name="fruta3"]').value;
    let frutas = [];
    frutas.push(fruta1, fruta2, fruta3);
    document.getElementById("resultado-frutas").textContent = "Frutas: " + frutas.join(", ");
  });

// array amigos
document.getElementById("form-amigos").addEventListener("submit", function (evento) {
    evento.preventDefault();
    let amigo1 = document.querySelector('[name="amigo1"]').value;
    let amigo2 = document.querySelector('[name="amigo2"]').value;
    let amigo3 = document.querySelector('[name="amigo3"]').value;
    let amigos = ["Lucas"];
    amigos.push(amigo1, amigo2, amigo3);
    document.getElementById("resultado-amigos").textContent = "Amigos: " + amigos.join(", ");
  });


// array numeros
let numeros = [3, 7, 12];

function mostrarNumeros() {
  document.getElementById("resultado-numeros").textContent = "Números: " + numeros.join(", ");
}

mostrarNumeros();

document.getElementById("form-numeros").addEventListener("submit", function (evento) {
  evento.preventDefault();

  let nuevoNumero = parseInt(document.getElementById("nuevo-numero").value);
  let ultimo = numeros[numeros.length - 1];

  let errorNumeros = document.getElementById("error-numeros");

  if (nuevoNumero > ultimo) {
    numeros.push(nuevoNumero);
    errorNumeros.textContent = ""; 
  } else {
    errorNumeros.textContent = `El número ${nuevoNumero} no se agregó porque no es mayor que ${ultimo}.`;
  }

  mostrarNumeros(); 

  document.getElementById("nuevo-numero").value = "";
});

  