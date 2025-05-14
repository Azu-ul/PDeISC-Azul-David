// public/js/script.js
// Funciones comunes de validación para formularios
function validateName(name) {
  const regex = /^[A-Za-z\s]+$/; // solo letras y espacios
  return regex.test(name.trim());
}

function validateNotEmpty(value) {
  return value.trim() !== "";
}
