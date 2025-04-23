import { createServer } from 'node:http';
import { sumar, restar, dividir, multiplicar } from './calculos.js';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Imprimimos los resultados en la consola
  console.log("Operaciones:");
  console.log("5 + 3 = " + sumar(5, 3));
  console.log("8 - 6 = " + restar(8, 6));
  console.log("3 * 11 = " + multiplicar(3, 11));
  console.log("30 / 5 = " + dividir(30, 5));

  // Respuesta vacía
  res.end(""); 
});

server.listen(8082, '127.0.0.1', () => {
  console.log("Escuchando en el puerto 8082...");
});
