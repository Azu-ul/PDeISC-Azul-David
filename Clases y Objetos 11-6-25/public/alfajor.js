export class Alfajor {
    constructor(nombre, marca, peso, valor) {
        this.nombre = nombre;
        this.marca = marca;
        this.peso = peso;
        this._precio = valor;
    }

    get precio() {
        return this._precio;
    }
    set precio(nuevoPrecio) {
        if (nuevoPrecio == null || isNaN(nuevoPrecio) || nuevoPrecio < 0) {
            throw new Error("El precio debe ser un número mayor o igual a 0.");
        }
        this._precio = nuevoPrecio;
    }
}