//array vacio y agregamos numeros
let numeros = [];
document.getElementById("form-numeros").addEventListener("submit", function (e) {
    e.preventDefault();
    const numero = document.getElementById("numero").value;
    numeros.push(parseInt(numero));
    document.getElementById("resultado-numeros").textContent = `Números actuales: [${numeros.join(", ")}]`;
    document.getElementById("form-numeros").reset();
});

// quitar el primer número
document.getElementById("quitar-numero").addEventListener("click", function () {
    const eliminado = numeros.shift();
    document.getElementById("resultado-numeros").textContent =
        `Se eliminó el primer número: ${eliminado}. Números actuales: [${numeros.join(", ")}]`;
        document.getElementById("form-numeros").reset();
});

//array vacio y agregamos los mensajes
let chat = [];
document.getElementById("form-chat").addEventListener("submit", function (e) {
    e.preventDefault();
    const mensaje = document.getElementById("mensaje").value;
    chat.push(mensaje);
    document.getElementById("resultado-chat").textContent = `Mensajes actuales: [${chat.join(", ")}]`;
    document.getElementById("form-chat").reset();
});

// quitar el primer mensaje
document.getElementById("quitar-mensaje").addEventListener("click", function () {
    const eliminado = chat.shift();
    document.getElementById("resultado-chat").textContent =
        `Se eliminó el primer mensaje: "${eliminado}". Mensajes actuales: [${chat.join(", ")}]`;
        document.getElementById("form-chat").reset();
});

//creamos array de clientes
let colaClientes = [];
document.getElementById("form-cola").addEventListener("submit", function (e) {
    e.preventDefault();
    const cliente = document.getElementById("cliente").value;
    colaClientes.push(cliente);
    document.getElementById("resultado-cola").textContent = `Clientes en espera: [${colaClientes.join(", ")}]`;
    document.getElementById("form-cola").reset();
});

// atender al primer cliente
document.getElementById("atender-cliente").addEventListener("click", function () {
    const atendido = colaClientes.shift();
    document.getElementById("resultado-cola").textContent =
        `Se atendió al cliente: ${atendido}. Clientes en espera: [${colaClientes.join(", ")}]`;
        document.getElementById("form-cola").reset();

});
