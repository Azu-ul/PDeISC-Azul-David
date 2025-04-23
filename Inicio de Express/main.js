const express = require('express');
const app = express();
const path = require('path');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal ("/") — corregido el path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina1.html'));
});

// Escuchar en el puerto 3001 — corregido el mensaje del console.log
app.listen(3001, () => {
    console.log('Servidor corriendo en http://127.0.0.1:3001');
});
