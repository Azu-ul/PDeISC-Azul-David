const horoscopos = { //clave, valor: (aries, "hoy es un buen..."
    Aries: "Hoy es un buen día para tomar decisiones importantes.",
    Tauro: "La paciencia será clave hoy, mantén la calma.",
    Géminis: "Las conversaciones profundas te traerán claridad.",
    Cáncer: "Tu intuición estará más fuerte que nunca.",
    Leo: "Es momento de brillar, no temas destacar.",
    Virgo: "Hoy es un día perfecto para organizarte.",
    Libra: "Equilibrio es la palabra del día, busca armonía.",
    Escorpio: "Confía en tu instinto, te llevará por el buen camino.",
    Sagitario: "Mantén una actitud positiva ante cualquier reto.",
    Capricornio: "La disciplina te traerá grandes frutos hoy.",
    Acuario: "Abre tu mente a nuevas ideas, es el momento perfecto.",
    Piscis: "Escucha tu corazón y deja que te guíe."
  };
  
  export function obtenerHoroscopo(signo) {
    return horoscopos[signo] || "Signo no encontrado.";
  }
  