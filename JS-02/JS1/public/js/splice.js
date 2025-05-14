document.addEventListener("DOMContentLoaded", function () {
  // Variables para almacenar los arrays
  let arrayLetras = [];
  let arrayNombres = [];
  let arrayElementos = [];

  // EJERCICIO 1: ELIMINAR DOS ELEMENTOS DESDE LA POSICIÓN 1
  document.getElementById("form-crear-letras").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Crear array con las letras ingresadas
    arrayLetras = [
      formData.get("letra1").trim(),
      formData.get("letra2").trim(),
      formData.get("letra3").trim()
    ];
    
    // Mostrar el array original
    document.getElementById("array-letras").innerHTML = 
      `<p><strong>Array original:</strong> [${arrayLetras.join(", ")}]</p>`;
    
    // Mostrar el botón para aplicar splice()
    document.getElementById("btn-eliminar-letras").style.display = "block";
    
    // Limpiar el resultado anterior si existe
    document.getElementById("resultado-letras").innerHTML = "";
    
    // Deshabilitar el formulario
    const inputs = this.querySelectorAll("input");
    inputs.forEach(input => input.disabled = true);
    this.querySelector("button").disabled = true;
  });
  
  document.getElementById("btn-eliminar-letras").addEventListener("click", function () {
    // Guardar una copia del array original para mostrarla
    const arrayOriginal = [...arrayLetras];
    
    // Aplicar splice() para eliminar dos elementos desde la posición 1
    arrayLetras.splice(1, 2);
    
    // Mostrar el resultado
    document.getElementById("resultado-letras").innerHTML = 
      `<p><strong>Operación:</strong> Eliminar 2 elementos desde la posición 1</p>
       <p><strong>Array original:</strong> [${arrayOriginal.join(", ")}]</p>
       <p><strong>Array resultante:</strong> [${arrayLetras.join(", ")}]</p>`;
    
    // Deshabilitar el botón después de usarlo
    this.disabled = true;
  });

  // EJERCICIO 2: INSERTAR UN NUEVO NOMBRE EN LA SEGUNDA POSICIÓN
  document.getElementById("form-crear-nombres").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Crear array con los nombres ingresados
    arrayNombres = [
      formData.get("nombre1").trim(),
      formData.get("nombre2").trim(),
      formData.get("nombre3").trim()
    ];
    
    // Mostrar el array original
    document.getElementById("array-nombres").innerHTML = 
      `<p><strong>Array original:</strong> [${arrayNombres.join(", ")}]</p>`;
    
    // Mostrar el formulario para insertar un nuevo nombre
    document.getElementById("form-insertar-nombre").style.display = "block";
    
    // Limpiar el resultado anterior si existe
    document.getElementById("resultado-nombres").innerHTML = "";
    
    // Deshabilitar el formulario
    const inputs = this.querySelectorAll("input");
    inputs.forEach(input => input.disabled = true);
    this.querySelector("button").disabled = true;
  });
  
  document.getElementById("btn-insertar-nombre").addEventListener("click", function () {
    const nuevoNombre = document.getElementById("nuevo-nombre").value.trim();
    
    if (nuevoNombre) {
      // Guardar una copia del array original para mostrarla
      const arrayOriginal = [...arrayNombres];
      
      // Aplicar splice() para insertar un nuevo nombre en la posición 1 sin eliminar nada
      arrayNombres.splice(1, 0, nuevoNombre);
      
      // Mostrar el resultado
      document.getElementById("resultado-nombres").innerHTML = 
        `<p><strong>Operación:</strong> Insertar "${nuevoNombre}" en la posición 1</p>
         <p><strong>Array original:</strong> [${arrayOriginal.join(", ")}]</p>
         <p><strong>Array resultante:</strong> [${arrayNombres.join(", ")}]</p>`;
      
      // Deshabilitar el botón después de usarlo
      this.disabled = true;
      document.getElementById("nuevo-nombre").disabled = true;
    } else {
      alert("Por favor, ingresa un nombre");
    }
  });

  // EJERCICIO 3: REEMPLAZAR DOS ELEMENTOS POR OTROS NUEVOS
  document.getElementById("form-crear-elementos").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Crear array con los elementos ingresados
    arrayElementos = [
      formData.get("elemento1").trim(),
      formData.get("elemento2").trim(),
      formData.get("elemento3").trim(),
    ];
    
    // Mostrar el array original
    document.getElementById("array-elementos").innerHTML = 
      `<p><strong>Array original:</strong> [${arrayElementos.join(", ")}]</p>`;
    
    // Mostrar el formulario para reemplazar elementos
    document.getElementById("form-reemplazar").style.display = "block";
    
    // Limpiar el resultado anterior si existe
    document.getElementById("resultado-elementos").innerHTML = "";
    
    // Deshabilitar el formulario
    const inputs = this.querySelectorAll("input");
    inputs.forEach(input => input.disabled = true);
    this.querySelector("button").disabled = true;
  });
  
  document.getElementById("btn-reemplazar").addEventListener("click", function () {
    const nuevoElemento1 = document.getElementById("nuevo-elemento1").value.trim();
    const nuevoElemento2 = document.getElementById("nuevo-elemento2").value.trim();
    
    if (nuevoElemento1 && nuevoElemento2) {
      // Guardar una copia del array original para mostrarla
      const arrayOriginal = [...arrayElementos];
      
      // Aplicar splice() para reemplazar dos elementos desde la posición 1
      arrayElementos.splice(1, 2, nuevoElemento1, nuevoElemento2);
      
      // Mostrar el resultado
      document.getElementById("resultado-elementos").innerHTML = 
        `<p><strong>Operación:</strong> Reemplazar 2 elementos desde posición 1 con "${nuevoElemento1}" y "${nuevoElemento2}"</p>
         <p><strong>Array original:</strong> [${arrayOriginal.join(", ")}]</p>
         <p><strong>Array resultante:</strong> [${arrayElementos.join(", ")}]</p>`;
      
      // Deshabilitar el botón después de usarlo
      this.disabled = true;
      document.getElementById("nuevo-elemento1").disabled = true;
      document.getElementById("nuevo-elemento2").disabled = true;
    } else {
      alert("Por favor, completa ambos campos");
    }
  });
});