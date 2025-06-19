// clase que representa un animal del zoológico
class CZooAnimal {
    constructor(idAnimal, nombre, jaulaNumero, idTypeAnimal, peso) {
        this.IdAnimal = idAnimal; // id único del animal
        this.nombre = nombre; // nombre del animal
        this.JaulaNumero = jaulaNumero; // número de jaula donde está
        this.IdTypeAnimal = idTypeAnimal; // tipo de animal (por id)
        this.peso = peso; // peso del animal
    }

    // esto te devuelve el nombre del tipo según el id
    getTipoAnimalNombre() {
        switch(this.IdTypeAnimal) {
            case 1: return "Felinos";
            case 2: return "Aves";
            case 3: return "Reptiles";
            case 4: return "Mamíferos";
            case 5: return "Acuáticos";
            default: return "Desconocido";
        }
    }
}

// acá va la lista general de animales del zoo
let zooAnimals = [];

// cuenta cuántos animales hay en la jaula 5 que pesen menos de 3 kg
function contarAnimalesJaula5PesoMenor3kg() {
    return zooAnimals.filter(animal =>
        animal.JaulaNumero === 5 && animal.peso < 3
    ).length;
}

// cuenta los felinos que están entre la jaula 2 y la 5 inclusive
function contarFelinosJaulas2a5() {
    return zooAnimals.filter(animal =>
        animal.IdTypeAnimal === 1 &&
        animal.JaulaNumero >= 2 &&
        animal.JaulaNumero <= 5
    ).length;
}

// trae los nombres de los animales en jaula 4 que pesen menos de 120 kg
function obtenerNombreAnimalJaula4PesoMenor120() {
    const animales = zooAnimals.filter(animal =>
        animal.JaulaNumero === 4 && animal.peso < 120
    );
    return animales.map(animal => animal.nombre);
}

// arma y muestra una tabla html con todos los animales cargados
function mostrarTablaAnimales() {
    let tabla = `
        <table>
            <thead>
                <tr>
                    <th>ID Animal</th>
                    <th>Nombre</th>
                    <th>Jaula</th>
                    <th>Tipo</th>
                    <th>Peso (kg)</th>
                </tr>
            </thead>
            <tbody>
    `;

    zooAnimals.forEach(animal => {
        tabla += `
            <tr>
                <td>${animal.IdAnimal}</td>
                <td>${animal.nombre}</td>
                <td>${animal.JaulaNumero}</td>
                <td>${animal.getTipoAnimalNombre()}</td>
                <td>${animal.peso}</td>
            </tr>
        `;
    });

    tabla += '</tbody></table>';
    document.getElementById('tablaAnimales').innerHTML = tabla;
}

// abre una ventana nueva y muestra los resultados ahí con document.write
function mostrarConDocumentWrite() {
    const nuevaVentana = window.open('', '_blank', 'width=800,height=600');
    nuevaVentana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resultados - document.write</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .resultado { margin: 15px 0; padding: 10px; background-color: #f0f0f0; }
            </style>
        </head>
        <body>
            <h1>Resultados usando document.write</h1>

            <div class="resultado">
                <strong>b) cantidad de animales en jaula 5 con peso menor a 3 kg:</strong> ${contarAnimalesJaula5PesoMenor3kg()}
            </div>

            <div class="resultado">
                <strong>c) cantidad de felinos en jaulas 2 a 5:</strong> ${contarFelinosJaulas2a5()}
            </div>

            <div class="resultado">
                <strong>d) nombres de animales en jaula 4 con peso menor a 120 kg:</strong>
                ${obtenerNombreAnimalJaula4PesoMenor120().join(', ') || 'ninguno'}
            </div>
        </body>
        </html>
    `);
    nuevaVentana.document.close();
}
