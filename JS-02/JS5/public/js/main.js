document.getElementById('animalForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const idAnimal = parseInt(document.getElementById('idAnimal').value);
    const nombre = document.getElementById('nombre').value.trim();
    const jaulaNumero = parseInt(document.getElementById('jaulaNumero').value);
    const idTypeAnimal = parseInt(document.getElementById('idTypeAnimal').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const mensaje = document.getElementById('mensajeForm');

    // Limpiar mensaje anterior
    mensaje.innerText = '';
    mensaje.style.color = 'red';

    // Validaciones
    if (isNaN(idAnimal) || isNaN(jaulaNumero) || isNaN(idTypeAnimal) || isNaN(peso) || nombre === '') {
        mensaje.innerText = 'Por favor, complete todos los campos correctamente.';
        return;
    }

    if (zooAnimals.some(animal => animal.IdAnimal === idAnimal)) {
        mensaje.innerText = '❌ El ID del animal ya existe. Use uno diferente.';
        return;
    }

    // Crear el nuevo objeto animal y agregarlo al array
    const nuevoAnimal = new CZooAnimal(idAnimal, nombre, jaulaNumero, idTypeAnimal, peso);
    zooAnimals.push(nuevoAnimal);

    // Limpiar el formulario y actualizar la tabla
    document.getElementById('animalForm').reset();
    mensaje.style.color = 'green';
    mensaje.innerText = '✅ Animal agregado exitosamente!';
    mostrarTablaAnimales();
});
