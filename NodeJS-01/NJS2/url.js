// importamos el módulo URL para trabajar con URLs
import { URL } from 'node:url';

// creamos una url de ejemplo
const url = new URL('https://www.example.com:3000/camino/al/recurso?name=azul&age=17#section');

// mostramos el host completo (dominio + puerto)
console.log('host:', url.host); // ejemplo.com:3000

// mostramos solo el hostname, sin el puerto
console.log('hostname:', url.hostname); // ejemplo.com

// mostramos el path de la url
console.log('pathname:', url.pathname); // /camino/al/recurso

// mostramos los parámetros de búsqueda
console.log('search:', url.search); // ?name=azul&age=17

// mostramos el fragmento después del #
console.log('hash:', url.hash); // #section
