document.addEventListener('DOMContentLoaded', () => {
    mostrarRanking();

  let secuenciaSimon = [];
  let secuenciaUsuario = [];
  let juegoActivo = false;
  const contenedor = document.querySelector('.contenedor-simon');

  let nombreJugador = '';

const overlayNombre = document.getElementById('overlay-nombre-simon');
const formNombre = document.getElementById('form-nombre-simon');
const inputNombre = document.getElementById('input-nombre-simon');

formNombre.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  if (nombre.length < 2) {
    alert('Por favor, ingresa un nombre válido.');
    return;
  }

  nombreJugador = nombre;
  overlayNombre.classList.add('oculto-simon');  // oculta el formulario

  // Mostrar la cuenta regresiva
  let cuenta = 3;
  const overlayCuenta = document.getElementById('overlay-cuenta-simon');
  const cuentaElemento = document.getElementById('cuenta-regresiva-simon');

  cuentaElemento.textContent = cuenta;
  overlayCuenta.classList.remove('oculto-simon');

  const intervalo = setInterval(() => {
    cuenta--;
    if (cuenta > 0) {
      cuentaElemento.textContent = cuenta;
    } else {
      clearInterval(intervalo);
      overlayCuenta.classList.add('oculto-simon');

      // Arrancamos el juego recién acá
      secuenciaSimon = [];
      secuenciaUsuario = [];
      juegoActivo = true;
      document.querySelector('.contenedor-simon').classList.add('activo-simon-juego');
      agregarColorASimon();
    }
  }, 1000);
});


  const colores = ['rojo-simon', 'verde-simon', 'azul-simon', 'amarillo-simon'];

  function agregarColorASimon() {
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    secuenciaSimon.push(colorAleatorio);
    reproducirSecuencia();
    secuenciaUsuario = [];
    actualizarNivel();
  }

  function reproducirSecuencia() {
    secuenciaSimon.forEach((color, index) => {
      setTimeout(() => {
        iluminarColor(color);
      }, 600 * index);
    });
  }

  function iluminarColor(color) {
    const boton = document.querySelector(`.${color}`);
    if (!boton) return;
    boton.classList.add('activo-simon');
    setTimeout(() => {
      boton.classList.remove('activo-simon');
    }, 300);
  }

  function manejarClickUsuario(colorClickeado) {
  if (!juegoActivo) return;  // si el juego no está activo, no hacer nada

  secuenciaUsuario.push(colorClickeado);
  const indice = secuenciaUsuario.length - 1;

  if (secuenciaUsuario[indice] !== secuenciaSimon[indice]) {
    perder();
    return;
  }

  if (secuenciaUsuario.length === secuenciaSimon.length) {
    setTimeout(() => {
      agregarColorASimon();
    }, 1000);
  }
}


  function actualizarNivel() {
    const nivelTexto = document.getElementById('nivel-simon');
    nivelTexto.textContent = `Nivel: ${secuenciaSimon.length}`;
  }


  // Listeners para los botones de colores
  document.querySelectorAll('.color-simon').forEach(boton => {
    boton.addEventListener('click', () => {
      const color = boton.classList[1]; // rojo-simon, verde-simon, etc.
      manejarClickUsuario(color);
    });
  });

  function perder() {
  juegoActivo = false;
  document.querySelector('.contenedor-simon').classList.remove('activo-simon-juego');

  const overlay = document.getElementById('overlay-simon');
  const mensaje = overlay.querySelector('h2');

  mensaje.textContent = `¡Perdiste, ${nombreJugador}!`;

  overlay.classList.remove('oculto-simon');

  document.querySelectorAll('.color-simon').forEach(boton => boton.disabled = true);
  const btnIniciar = document.getElementById('iniciar-simon');
  if (btnIniciar) btnIniciar.disabled = true;

  guardarPuntaje(nombreJugador, secuenciaSimon.length);
  mostrarRanking();

}
function guardarPuntaje(nombre, nivel) {
  const ranking = JSON.parse(localStorage.getItem('rankingSimon')) || [];

  // Buscar si ya existe un puntaje para ese jugador
  const jugadorExistente = ranking.find(j => j.nombre === nombre);

  if (jugadorExistente) {
    // Si el nuevo nivel es mayor, actualizarlo
    if (nivel > jugadorExistente.nivel) {
      jugadorExistente.nivel = nivel;
    }
  } else {
    // Si no existe, agregar nuevo jugador
    ranking.push({ nombre, nivel });
  }

  localStorage.setItem('rankingSimon', JSON.stringify(ranking));
}


function mostrarRanking() {
  const ranking = JSON.parse(localStorage.getItem('rankingSimon')) || [];
  const tbody = document.querySelector('#tabla-ranking-simon tbody');
  tbody.innerHTML = '';

  ranking
    .sort((a, b) => b.nivel - a.nivel) // orden descendente
    .forEach(({ nombre, nivel }) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>${nombre}</td><td>${nivel}</td>`;
      tbody.appendChild(fila);
    });
}
document.getElementById('limpiar-ranking-simon').addEventListener('click', () => {
  localStorage.removeItem('rankingSimon');
  mostrarRanking();
});


document.getElementById('reiniciar-simon').addEventListener('click', () => {
  // Ocultar overlay de perdiste
  const overlay = document.getElementById('overlay-simon');
  overlay.classList.add('oculto-simon');

  // Mostrar cuenta regresiva
  let cuenta = 3;
  const overlayCuenta = document.getElementById('overlay-cuenta-simon');
  const cuentaElemento = document.getElementById('cuenta-regresiva-simon');

  cuentaElemento.textContent = cuenta;
  overlayCuenta.classList.remove('oculto-simon');

  const intervalo = setInterval(() => {
    cuenta--;
    if (cuenta > 0) {
      cuentaElemento.textContent = cuenta;
    } else {
      clearInterval(intervalo);
      overlayCuenta.classList.add('oculto-simon');

      // Habilitar botones
      document.querySelectorAll('.color-simon').forEach(boton => {
        boton.disabled = false;
      });

      // Reiniciar variables
      secuenciaSimon = [];
      secuenciaUsuario = [];
      juegoActivo = true;
      actualizarNivel();

      // Mostrar animación de juego activo
      contenedor.classList.add('activo-simon-juego');

      // Iniciar nueva secuencia
      agregarColorASimon();
    }
  }, 1000);
});

document.getElementById('nueva-partida-simon').addEventListener('click', () => {
  // Ocultar overlay de perdiste
  const overlay = document.getElementById('overlay-simon');
  overlay.classList.add('oculto-simon');

  // Mostrar formulario de nombre
  const overlayNombre = document.getElementById('overlay-nombre-simon');
  overlayNombre.classList.remove('oculto-simon');

  // Limpiar input y nivel
  inputNombre.value = '';
  nombreJugador = '';
  secuenciaSimon = [];
  secuenciaUsuario = [];
  actualizarNivel();

  // Resetear clases
  contenedor.classList.remove('activo-simon-juego');

  // Habilitar botones
  document.querySelectorAll('.color-simon').forEach(boton => {
    boton.disabled = false;
  });
});


});
