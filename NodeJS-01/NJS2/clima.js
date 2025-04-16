import { createServer } from 'node:http';
import fetch from 'node-fetch';

const API_KEY = "g0CzYQs7apM6h9npmeo4EZ1yAiondWeZ";
const ciudad = "Buenos Aires";

const server = createServer(async (req, res) => { // creamos servidor asíncrono
  if (req.url === "/") {
    try {
      const locRes = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${ciudad}`); //buscamos la location key de la ciudad
      const locData = await locRes.json();
      const locationKey = locData[0].Key;

      
      const climaRes = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`); //buscamos el clima actual
      const climaData = await climaRes.json();
      const temp = climaData[0].Temperature.Metric.Value; // la pasamos a celsius
      const estado = climaData[0].WeatherText; // "soleado", "nublado"

      // HTML
      const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Clima</title>
          <style>
            body { font-family: sans-serif; text-align: center; margin-top: 2rem; background: #e0f7fa; }
            h1 { color: #00796b; }
          </style>
        </head>
        <body>
          <h1>Clima en ${ciudad}</h1>
          <p>${temp}°C, ${estado}</p>
        </body>
        </html>
      `;

      // enviamos respuesta
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end("Hubo un error al obtener el clima");
      console.error(err);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Página no encontrada");
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Escuchando en http://127.0.0.1:3000');
});
