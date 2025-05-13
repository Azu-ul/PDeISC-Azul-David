// agregar tres colores al principio de un array vacío
document.getElementById("form-colores").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const colores = [];
    colores.unshift(formData.get("color1"), formData.get("color2"), formData.get("color3"));

    document.getElementById("resultado-colores").textContent =
        `Colores agregados: [${colores.join(", ")}]`;

    e.target.reset();
});

// agregar una tarea urgente al principio de un array de tareas
const tareas = ["Aprender JavaScript", "Limpiar", "Pintarse las uñas"];
document.getElementById("form-tareas").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tareaUrgente = formData.get("tarea");
    tareas.unshift(tareaUrgente);

    document.getElementById("resultado-tareas").textContent =
        `Tareas actuales: [${tareas.join(", ")}]`;

    e.target.reset();
});

// insertar un usuario al principio de un array de usuarios conectados
const usuarios = ["Azul", "Lionel"];
document.getElementById("form-usuarios").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const usuario = formData.get("usuario");
    usuarios.unshift(usuario);

    document.getElementById("resultado-usuarios").textContent =
        `Usuarios conectados: [${usuarios.join(", ")}]`;
    
    e.target.reset();
});
