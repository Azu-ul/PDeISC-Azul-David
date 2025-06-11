import { Alfajor } from "./public/alfajor.js";
let alfajor = new Alfajor("Torta", "Terrabusi", "50g", 3300);
alfajor.precio=-23;
console.log(`${alfajor.nombre} precio ${alfajor._precio}`);