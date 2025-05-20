// Elementos del DOM
const overlayNombre = document.getElementById('overlay-nombre');
const formNombres = document.getElementById('form-nombre');
const inputX = document.getElementById('jugadorX');
const inputO = document.getElementById('jugadorO');

const overlayResultado = document.getElementById('overlay');
const resultadoTexto = overlayResultado.querySelector('h2');
const btnReiniciar = document.getElementById('reiniciar');
const btnNuevaPartida = document.getElementById('nueva-partida');
const overlayModo = document.getElementById('overlay-modo');
const overlayEleccionFicha = document.getElementById('overlay-eleccion-ficha');
const btnVsPersona = document.getElementById('modo-vs-persona');
const btnVsMaquina = document.getElementById('modo-vs-maquina');
const btnElegirX = document.getElementById('elegir-x');
const btnElegirO = document.getElementById('elegir-o');

const tableroDiv = document.querySelector('.tablero');

// Variables globales simplificadas
let matriz = [];
let turno = 'X';
let jugadorX = '';
let jugadorO = '';
let simboloHumano = ''; // Símbolo elegido por el jugador humano
let contraMaquina = false;
let quienEmpezo = 'X'; // Variable para alternar quién comienza

// Eventos de selección de modo
btnVsPersona.addEventListener('click', () => {
  contraMaquina = false;
  simboloHumano = '';
  overlayModo.classList.add('oculto');
  overlayNombre.classList.remove('oculto');
});

btnVsMaquina.addEventListener('click', () => {
  contraMaquina = true;
  overlayModo.classList.add('oculto');
  overlayEleccionFicha.classList.remove('oculto');
});

// Elección de ficha contra la máquina
btnElegirX.addEventListener('click', () => {
  jugadorX = 'Vos';
  jugadorO = 'Máquina';
  simboloHumano = 'X';
  iniciarJuego();
});

btnElegirO.addEventListener('click', () => {
  jugadorX = 'Máquina';
  jugadorO = 'Vos';
  simboloHumano = 'O';
  iniciarJuego();
});

function iniciarJuego() {
  turno = quienEmpezo; // Usar el valor de quién empieza
  overlayEleccionFicha.classList.add('oculto');
  crearTablero();
  mostrarTurno();

  // Si le toca a la máquina comenzar
  if (contraMaquina && turno !== simboloHumano) {
    setTimeout(jugadaMaquina, 500);
  }
}

// Crear matriz vacía
function crearMatrizVacia() {
  matriz = Array.from({ length: 3 }, () => Array(3).fill(''));
}

// Crear tablero visual
function crearTablero() {
  overlayResultado.classList.add('oculto');
  tableroDiv.innerHTML = '';
  crearMatrizVacia();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const casilla = document.createElement('div');
      casilla.classList.add('casilla');
      casilla.dataset.fila = i;
      casilla.dataset.col = j;
      casilla.textContent = '';
      casilla.addEventListener('click', jugar);
      tableroDiv.appendChild(casilla);
    }
  }
}

// Jugada de la máquina
function jugadaMaquina() {
  let casillasLibres = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matriz[i][j] === '') {
        casillasLibres.push({ fila: i, col: j });
      }
    }
  }

  if (casillasLibres.length === 0) return;

  const jugada = casillasLibres[Math.floor(Math.random() * casillasLibres.length)];
  matriz[jugada.fila][jugada.col] = turno;

  const casillaDOM = document.querySelector(
    `.casilla[data-fila="${jugada.fila}"][data-col="${jugada.col}"]`
  );
  casillaDOM.textContent = turno;

  verificarFinJuego();
}

// Verificar si el juego terminó (ganador o empate)
function verificarFinJuego() {
  if (chequearGanador(turno)) {
    mostrarResultado(turno);
    bloquearTablero();
  } else if (chequearEmpate()) {
    mostrarResultado('Empate');
    bloquearTablero();
  } else {
    cambiarTurno();
  }
}

// Cambiar turno
function cambiarTurno() {
  turno = (turno === 'X') ? 'O' : 'X';
  mostrarTurno();
  if (contraMaquina && turno !== simboloHumano) {
    setTimeout(jugadaMaquina, 500);
  }
}

// Chequear ganador
function chequearGanador(jugador) {
  // Filas
  for (let i = 0; i < 3; i++) {
    if (matriz[i][0] === jugador && matriz[i][1] === jugador && matriz[i][2] === jugador) return true;
  }
  // Columnas
  for (let j = 0; j < 3; j++) {
    if (matriz[0][j] === jugador && matriz[1][j] === jugador && matriz[2][j] === jugador) return true;
  }
  // Diagonales
  if (matriz[0][0] === jugador && matriz[1][1] === jugador && matriz[2][2] === jugador) return true;
  if (matriz[0][2] === jugador && matriz[1][1] === jugador && matriz[2][0] === jugador) return true;
  
  return false;
}

// Chequear empate
function chequearEmpate() {
  return matriz.flat().every(c => c !== '');
}

// Manejar click en casilla
function jugar(e) {
  if (contraMaquina && turno !== simboloHumano) return;

  const fila = parseInt(e.target.dataset.fila);
  const col = parseInt(e.target.dataset.col);

  if (matriz[fila][col] !== '') return;

  matriz[fila][col] = turno;
  e.target.textContent = turno;

  verificarFinJuego();
}

// Bloquear tablero
function bloquearTablero() {
  const casillas = tableroDiv.querySelectorAll('.casilla');
  casillas.forEach(casilla => casilla.removeEventListener('click', jugar));
}

// Mostrar resultado
function mostrarResultado(ganador) {
  overlayResultado.classList.remove('oculto');
  if (ganador === 'Empate') {
    resultadoTexto.textContent = 'Empate!';
  } else {
    const nombreGanador = (ganador === 'X') ? jugadorX : jugadorO;
    resultadoTexto.textContent = `Ganador: ${nombreGanador} (${ganador})!`;
  }
}

// Reiniciar juego (nueva ronda)
function reiniciar() {
  // Alternamos quién empieza para la siguiente partida
  quienEmpezo = (quienEmpezo === 'X') ? 'O' : 'X';
  turno = quienEmpezo;
  
  overlayResultado.classList.add('oculto');
  crearTablero();
  mostrarTurno();

  // Si le toca a la máquina comenzar
  if (contraMaquina && turno !== simboloHumano) {
    setTimeout(jugadaMaquina, 500);
  }
  
}

// Nueva partida (desde cero, eligiendo modo)
function nuevaPartida() {
  overlayResultado.classList.add('oculto');
  overlayModo.classList.remove('oculto');

  // Resetear todo
  matriz = [];
  turno = 'X';
  jugadorX = '';
  jugadorO = '';
  simboloHumano = '';
  contraMaquina = false;
  quienEmpezo = 'X';
  inputX.value = '';
  inputO.value = '';
  document.getElementById('turno-actual').textContent = 'Turno: ';

}

// Eventos formulario
formNombres.addEventListener('submit', e => {
  e.preventDefault();
  jugadorX = inputX.value.trim() || 'Jugador X';
  jugadorO = inputO.value.trim() || 'Jugador O';
  turno = quienEmpezo;
  overlayNombre.classList.add('oculto');
  crearTablero();
  mostrarTurno();
});

function mostrarTurno() {
  let texto = 'Turno: ';
  if (contraMaquina) {
    const esMaquina = turno !== simboloHumano;
    texto += esMaquina ? `Máquina (${turno})` : `Vos (${turno})`;
  } else {
    const nombre = (turno === 'X') ? jugadorX : jugadorO;
    texto += `${nombre} (${turno})`;
  }
  document.getElementById('turno-actual').textContent = texto;
}

// Botones reinicio y nueva partida
btnReiniciar.addEventListener('click', reiniciar);
btnNuevaPartida.addEventListener('click', nuevaPartida);

document.getElementById('btn-volver-inicio').addEventListener('click', () => {
  window.location.href = 'index.html';
});
