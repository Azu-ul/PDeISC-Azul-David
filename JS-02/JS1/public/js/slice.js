document.addEventListener("DOMContentLoaded", function() {
    // Arrays para almacenar los datos ingresados por el usuario
    let numeros = [];
    let peliculas = [];
    let elementos = [];

    // ===== ARRAY DE NÚMEROS =====
    // Crear array de números
    document.getElementById("crear-numeros").addEventListener("click", function() {
        numeros = [];
        for (let i = 1; i <= 5; i++) {
            const valor = document.getElementById(`num${i}`).value;
            if (valor.trim() !== "") {
                numeros.push(parseInt(valor));
            }
        }
        document.getElementById("array-numeros").textContent = 
    numeros.length > 0 ? `Array de números creado: [${numeros.join(", ")}]` : "";

        
        // Resetear resultado anterior
        document.getElementById("resultado-numeros").textContent = "";
    });

    // Copiar primeros 3 números
    document.getElementById("form-numeros").addEventListener("submit", function(e) {
        e.preventDefault();
        if (numeros.length === 0) {
            document.getElementById("resultado-numeros").textContent = 
                "Por favor, crea un array de números primero";
            return;
        }
        
        const copia = numeros.slice(0, 3);
        document.getElementById("resultado-numeros").textContent =
            `Primeros 3 números: [${copia.join(", ")}] (Original: [${numeros.join(", ")}])`;
    });

    // ===== ARRAY DE PELÍCULAS =====
    // Crear array de películas
    document.getElementById("crear-peliculas").addEventListener("click", function() {
        peliculas = [];
        for (let i = 1; i <= 5; i++) {
            const valor = document.getElementById(`pelicula${i}`).value;
            if (valor.trim() !== "") {
                peliculas.push(valor);
            }
        }
        document.getElementById("array-peliculas").textContent = 
    peliculas.length > 0 ? `Array de películas creado: [${peliculas.join(", ")}]` : "";

        
        // Resetear resultado anterior
        document.getElementById("resultado-peliculas").textContent = "";
    });

    // Copiar películas de la posición 2 a la 4
    document.getElementById("form-peliculas").addEventListener("submit", function(e) {
        e.preventDefault();
        if (peliculas.length === 0) {
            document.getElementById("resultado-peliculas").textContent = 
                "Por favor, crea un array de películas primero";
            return;
        }
        
        const copia = peliculas.slice(2, 5);
        document.getElementById("resultado-peliculas").textContent =
            `Películas copiadas: [${copia.join(", ")}] (Original: [${peliculas.join(", ")}])`;
    });

    // ===== ARRAY DE ELEMENTOS =====
    // Crear array de elementos
    document.getElementById("crear-elementos").addEventListener("click", function() {
        elementos = [];
        for (let i = 1; i <= 5; i++) {
            const valor = document.getElementById(`elemento${i}`).value;
            if (valor.trim() !== "") {
                elementos.push(valor);
            }
        }
        document.getElementById("array-elementos").textContent = 
    elementos.length > 0 ? `Array de elementos creado: [${elementos.join(", ")}]` : "";

        
        // Resetear resultado anterior
        document.getElementById("resultado-ultimos").textContent = "";
    });

    // Copiar últimos 3 elementos
    document.getElementById("form-ultimos").addEventListener("submit", function(e) {
        e.preventDefault();
        if (elementos.length === 0) {
            document.getElementById("resultado-ultimos").textContent = 
                "Por favor, crea un array de elementos primero";
            return;
        }
        
        const copia = elementos.slice(-3);
        document.getElementById("resultado-ultimos").textContent =
            `Últimos 3 elementos: [${copia.join(", ")}] (Original: [${elementos.join(", ")}])`;
    });
});