import fetch from 'node-fetch';

const obtenerHoroscopo = async (signo) => {
  try {
    // Llamada a la API de Zodiacal
    const response = await fetch(`https://zodiacal.herokuapp.com/?sign=${signo}`);
    const data = await response.json();

    // Verificar si la respuesta contiene datos del horóscopo
    if (data.horoscope) {
      console.log(`Horóscopo de ${signo}:`);
      console.log(data.horoscope);
    } else {
      console.log('No se pudo obtener el horóscopo.');
    }
  } catch (error) {
    console.error('Error al obtener el horóscopo:', error);
  }
};

// Ejemplo de uso
obtenerHoroscopo("aries");
