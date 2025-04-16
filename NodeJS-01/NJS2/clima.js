import fetch from 'node-fetch';

const API_KEY = "g0CzYQs7apM6h9npmeo4EZ1yAiondWeZ";
const ciudad = "Buenos Aires";

export async function obtenerClima() {
  try {
    const locRes = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${ciudad}`); 
    const locData = await locRes.json();
    const locationKey = locData[0].Key;

    const climaRes = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
    const climaData = await climaRes.json();
    const temp = climaData[0].Temperature.Metric.Value;
    const estado = climaData[0].WeatherText;

    return { temp, estado }; // devolvemos los datos
  } catch (err) {
    throw new Error("Hubo un error al obtener el clima");
  }
}
