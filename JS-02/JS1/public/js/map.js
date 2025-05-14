// 1. Multiplicar números por 3
    document.getElementById('form-numeros').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const numeros = inputs.slice(0, 3).map(input => Number(input.value.trim()));

      const resultado = document.getElementById('resultado-numeros');
      const multiplicados = numeros.map(numero => numero * 3);

      resultado.innerHTML = `
        <h4>Números multiplicados por 3:</h4>
        <p>Array original: [${numeros.join(', ')}]</p>
        <p>Array con números multiplicados por 3: [${multiplicados.join(', ')}]</p>
      `;

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });

    // 2. Convertir nombres a mayúsculas
    document.getElementById('form-nombres').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const nombres = inputs.slice(0, 3).map(input => input.value.trim());

      const resultado = document.getElementById('resultado-nombres');
      const nombresMayusculas = nombres.map(nombre => nombre.toUpperCase());

      resultado.innerHTML = `
        <h4>Nombres en mayúsculas:</h4>
        <p>Array original: [${nombres.join(', ')}]</p>
        <p>Array con nombres en mayúsculas: [${nombresMayusculas.join(', ')}]</p>
      `;

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });

    // 3. Agregar IVA a precios
    document.getElementById('form-precios').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = Array.from(this.querySelectorAll('input'));
      const precios = inputs.slice(0, 3).map(input => Number(input.value.trim()));

      const resultado = document.getElementById('resultado-precios');
      const preciosConIva = precios.map(precio => precio * 1.21);

      resultado.innerHTML = `
        <h4>Precios con IVA (21%):</h4>
        <p>Array original: [${precios.join(', ')}]</p>
        <p>Array con precios con IVA: [${preciosConIva.join(', ')}]</p>
      `;

      // Limpiar el formulario
      inputs.forEach(input => input.value = '');
    });