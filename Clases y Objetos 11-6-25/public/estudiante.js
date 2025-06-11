export class Estudiante {
    constructor(nombre, apellido, edad) {
        this.name = nombre;
        this.ape = apellido;
        this.edad = edad;
    };
    saludar() {
        console.log(`Hola soy ${this.name} ${this.ape} y tengo ${this.edad} años`);
    };
};