import fetch from 'node-fetch';

const obtenerHoroscopo = async (signo) => {
  const response = await fetch(`https://aztro.sameerkumar.website?sign=${signo}&day=today`, {
    method: 'POST',
  });
  const data = await response.json();
  return data;
};

obtenerHoroscopo("gemini").then((horoscopo) => {
  console.log(horoscopo);
});
