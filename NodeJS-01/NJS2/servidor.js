import { createServer } from 'node:http';
import fs from 'node:fs';
import { obtenerClima } from './clima.js';
import { obtenerHoroscopo } from './horoscopo.js';
import { generarContraseña } from './contraseñas.js';

// creamos el contenido HTML con los módulos
const clima = obtenerClima();
const horoscopo = obtenerHoroscopo('Géminis');
const contrasena = generarContraseña();

const contenidoHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi App Node</title>
</head>
<body>
  <h1>🌤 Clima</h1>
  <p>${clima}</p>

  <h1>🔮 Horóscopo</h1>
  <p>${horoscopo}</p>

  <h1>🔐 Contraseña Generada</h1>
  <p>${contrasena}</p>
</body>
</html>
`;

fs.writeFileSync('index.html', contenidoHtml); // guardamos el archivo index.html con fs

// creamos el servidor
const server = createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Servidor escuchando en http://127.0.0.1:3000');
});
