 // 1. Formulario de Nombres con saludo
    document.getElementById('form-nombres').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const nombres = inputs.slice(0, 3).map(input => input.value.trim());

      const resultado = document.getElementById('resultado-nombres');
      let saludo = '<h4>Saludos:</h4>';
      nombres.forEach(nombre => {
        saludo += `<p>¡Hola, ${nombre}!</p>`;
      });

      resultado.innerHTML = saludo;

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });

    // 2. Formulario de Números
    document.getElementById('form-numeros').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const numeros = inputs.slice(0, 3).map(input => Number(input.value.trim()));

      const resultado = document.getElementById('resultado-numeros');
      let doble = '<h4>Dobles de los números:</h4>';
      numeros.forEach(numero => {
        doble += `<p>El doble de ${numero} es ${numero * 2}</p>`;
      });

      resultado.innerHTML = doble;

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });

    // 3. Formulario de Objetos (Nombre y Edad)
    document.getElementById('form-objetos').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const objetos = [
        { nombre: inputs[0].value.trim(), edad: Number(inputs[1].value.trim()) },
        { nombre: inputs[2].value.trim(), edad: Number(inputs[3].value.trim()) },
        { nombre: inputs[4].value.trim(), edad: Number(inputs[5].value.trim()) }
      ];

      const resultado = document.getElementById('resultado-objetos');
      let texto = '<h4>Lista de Nombres y Edades:</h4>';
      objetos.forEach(objeto => {
        texto += `<p>${objeto.nombre} tiene ${objeto.edad} años.</p>`;
      });

      resultado.innerHTML = texto;

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });
