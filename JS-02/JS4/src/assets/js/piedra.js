document.addEventListener('DOMContentLoaded', () => {
  const opciones = ['piedra', 'papel', 'tijera']; // opciones válidas
  const emojis = {
    piedra: '⛰️',
    papel: '📄',
    tijera: '✂️'
  };

  let modo = ''; // 'jugadores' o 'maquina'
  let jugador1 = '';
  let jugador2 = '';
  let jugada1 = null;
  let jugada2 = null;
  let esperando = true; // bloqueo selección hasta empezar

  // ELEMENTOS DOM
  const overlayModo = document.getElementById('overlay-modo');
  const overlayNombres = document.getElementById('overlay-nombres');
  const formNombres = document.getElementById('form-nombres');
  const nombresPersona = document.getElementById('nombres-persona');
  const nombresMaquina = document.getElementById('nombres-maquina');

  const inicioPartida = document.getElementById('inicio-partida');
  const cuentaRegresiva = document.getElementById('cuenta-regresiva');
  const btnIniciar = document.getElementById('btn-iniciar');

  const zonaJuego = document.getElementById('zona-juego');
  const botones1 = document.getElementById('jugador1-botones');
  const botones2 = document.getElementById('jugador2-botones');
  const botonesMaquina = document.getElementById('botones-vs-maquina');

  const overlayFinal = document.getElementById('overlay-final');
  const mensajeGanador = document.getElementById('mensaje-ganador');

  // Mostrar selector de modo al cargar
  overlayModo.classList.remove('oculto');

  // Función para habilitar o deshabilitar botones de juego según modo
  function setBotonesEstado(habilitar) {
    const allButtons = [];
    if (modo === 'jugadores') {
      allButtons.push(...botones1.querySelectorAll('button'));
      allButtons.push(...botones2.querySelectorAll('button'));
    } else {
      allButtons.push(...botonesMaquina.querySelectorAll('button'));
    }
    allButtons.forEach(btn => btn.disabled = !habilitar);
  }

  // Función para resetear los estilos de los botones
  function resetearBotones() {
    document.querySelectorAll('.botones-jugador button').forEach(btn => {
      btn.classList.remove('seleccionado');
    });
  }

  // Selección modo VS PERSONA
  document.getElementById('modo-vs-persona').addEventListener('click', () => {
    modo = 'jugadores';
    overlayModo.classList.add('oculto');
    nombresPersona.classList.remove('oculto');
    nombresMaquina.classList.add('oculto');
    overlayNombres.classList.remove('oculto');

    // Inputs jugadores habilitados y requeridos
    document.getElementById('nombre1').required = true;
    document.getElementById('nombre2').required = true;
    document.getElementById('nombre1').disabled = false;
    document.getElementById('nombre2').disabled = false;

    // Input máquina deshabilitado
    document.getElementById('nombre1solo').required = false;
    document.getElementById('nombre1solo').disabled = true;
  });

  // Selección modo VS MÁQUINA
  document.getElementById('modo-vs-maquina').addEventListener('click', () => {
    modo = 'maquina';
    overlayModo.classList.add('oculto');
    nombresPersona.classList.add('oculto');
    nombresMaquina.classList.remove('oculto');
    overlayNombres.classList.remove('oculto');

    // Input máquina habilitado y requerido
    document.getElementById('nombre1solo').required = true;
    document.getElementById('nombre1solo').disabled = false;

    // Inputs jugadores deshabilitados
    document.getElementById('nombre1').required = false;
    document.getElementById('nombre2').required = false;
    document.getElementById('nombre1').disabled = true;
    document.getElementById('nombre2').disabled = true;
  });

  // Botón salir desde selector modo
  document.getElementById('salir-modo').addEventListener('click', () => {
    window.location.href = '/';
  });

  // FORMULARIO NOMBRES
  formNombres.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!formNombres.checkValidity()) return;

    if (modo === 'jugadores') {
      jugador1 = document.getElementById('nombre1').value.trim();
      jugador2 = document.getElementById('nombre2').value.trim();
    } else {
      jugador1 = document.getElementById('nombre1solo').value.trim();
      jugador2 = 'La Máquina';
    }

    // Actualizar nombres visibles
    document.getElementById('jugador1-nombre').textContent = jugador1;
    document.getElementById('jugador2-nombre').textContent = jugador2;

    overlayNombres.classList.add('oculto');
    inicioPartida.classList.remove('oculto');
    mostrarZonaJuego();
    setBotonesEstado(false);

    cuentaRegresiva.textContent = '';
    btnIniciar.focus();
  });

  // Mostrar botones y zona de juego según modo
  function mostrarZonaJuego() {
    zonaJuego.classList.remove('oculto');
    if (modo === 'jugadores') {
      botones1.parentElement.classList.remove('oculto');
      botones2.parentElement.classList.remove('oculto');
      botonesMaquina.classList.add('oculto');
    } else {
      botones1.parentElement.classList.add('oculto');
      botones2.parentElement.classList.add('oculto');
      botonesMaquina.classList.remove('oculto');
    }
  }

  // INICIAR PARTIDA con cuenta regresiva 3..2..1
  btnIniciar.addEventListener('click', () => {
    btnIniciar.disabled = true;
    let tiempo = 3;
    cuentaRegresiva.textContent = tiempo;

    const intervalo = setInterval(() => {
      tiempo--;
      if (tiempo > 0) {
        cuentaRegresiva.textContent = tiempo;
      } else {
        clearInterval(intervalo);
        cuentaRegresiva.textContent = '¡Ya!';
        
        // Activar juego
        esperando = false;
        setBotonesEstado(true);
        jugada1 = null;
        jugada2 = null;
        resetearBotones();
        
        // Quitar el texto "¡Ya!" después de un segundo
        setTimeout(() => {
          cuentaRegresiva.textContent = '';
        }, 1000);
      }
    }, 1000);
  });

  // Determina ganador, devuelve 'jugador1', 'jugador2' o 'empate'
  function determinarGanador(j1, j2) {
    if (j1 === j2) return 'empate';

    if (
      (j1 === 'piedra' && j2 === 'tijera') ||
      (j1 === 'papel' && j2 === 'piedra') ||
      (j1 === 'tijera' && j2 === 'papel')
    ) {
      return 'jugador1';
    }
    return 'jugador2';
  }

  // Mostrar overlay resultado final
  function mostrarResultado(ganador) {
    let texto = '';

    if (jugada1 === null || jugada2 === null) {
      console.error("Error: Se intentó mostrar un resultado con jugadas incompletas");
      return;
    }

    if (ganador === 'empate') {
      texto = `¡Empate! Ambos eligieron ${emojis[jugada1]}`;
    } else {
      const nombreGanador = ganador === 'jugador1' ? jugador1 : jugador2;
      const nombrePerdedor = ganador === 'jugador1' ? jugador2 : jugador1;
      const jugadaGanadora = ganador === 'jugador1' ? jugada1 : jugada2;
      const jugadaPerdedora = ganador === 'jugador1' ? jugada2 : jugada1;
      const emojiGanador = emojis[jugadaGanadora];
      const emojiPerdedor = emojis[jugadaPerdedora];

      texto = `Ganó ${nombreGanador} porque ${emojiGanador} (${jugadaGanadora}) vence a ${emojiPerdedor} (${jugadaPerdedora})`;
    }

    mensajeGanador.textContent = texto;
    overlayFinal.classList.remove('oculto');
  }

  // Reiniciar partida (mismo modo y jugadores)
  document.getElementById('reiniciar').addEventListener('click', () => {
    overlayFinal.classList.add('oculto');
    inicioPartida.classList.remove('oculto');
    btnIniciar.disabled = false;
    setBotonesEstado(false);
    jugada1 = null;
    jugada2 = null;
    esperando = true;
    resetearBotones();
    btnIniciar.focus();
  });

  // Nueva partida: vuelve a elegir modo y nombres
  document.getElementById('nueva-partida').addEventListener('click', () => {
    overlayFinal.classList.add('oculto');
    zonaJuego.classList.add('oculto');
    inicioPartida.classList.add('oculto');
    overlayModo.classList.remove('oculto');
    formNombres.reset();
    
    // Reinicio completo del estado
    jugada1 = null;
    jugada2 = null;
    esperando = true;
    modo = '';
    resetearBotones();
    
    btnIniciar.disabled = false;
  });

  // Salir vuelve a index
  document.getElementById('salir').addEventListener('click', () => {
    window.location.href = '/';
  });

  // Manejar jugada de jugador 1 o 2
  function manejarJugada(jugador, jugada) {
    if (esperando) return;

    if (jugador === 1) {
      if (jugada1 !== null) return;
      jugada1 = jugada;
      
      // Resaltar botón seleccionado
      const botones = modo === 'maquina' ? botonesMaquina : botones1;
      botones.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('seleccionado');
        if (btn.dataset.jugada === jugada) {
          btn.classList.add('seleccionado');
        }
      });

      if (modo === 'maquina') {
        // turno máquina automático
        jugada2 = opciones[Math.floor(Math.random() * opciones.length)];
        
        // Resaltar jugada de la máquina
        botones2.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('seleccionado');
          if (btn.dataset.jugada === jugada2) {
            btn.classList.add('seleccionado');
          }
        });
        
        esperarYMostrarResultado();
      } else if (modo === 'jugadores' && jugada2 !== null) {
        esperarYMostrarResultado();
      }
    } else if (jugador === 2) {
      if (jugada2 !== null) return;
      jugada2 = jugada;
      
      // Resaltar botón seleccionado
      botones2.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('seleccionado');
        if (btn.dataset.jugada === jugada) {
          btn.classList.add('seleccionado');
        }
      });

      if (modo === 'jugadores' && jugada1 !== null) {
        esperarYMostrarResultado();
      }
    }
  }

  // Esperar un poco y mostrar resultado
  function esperarYMostrarResultado() {
    if (jugada1 === null || jugada2 === null) return;
    
    esperando = true;
    setBotonesEstado(false);
    const ganador = determinarGanador(jugada1, jugada2);
    
    // Pequeña pausa antes de mostrar el resultado
    setTimeout(() => {
      mostrarResultado(ganador);
    }, 500);
  }

  // Eventos click botones jugador 1
  botones1.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!esperando && jugada1 === null) {
        manejarJugada(1, btn.dataset.jugada);
      }
    });
  });

  // Eventos click botones jugador 2
  botones2.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!esperando && jugada2 === null) {
        manejarJugada(2, btn.dataset.jugada);
      }
    });
  });

  // Eventos click botones vs máquina
  botonesMaquina.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!esperando && jugada1 === null) {
        manejarJugada(1, btn.dataset.jugada);
      }
    });
  });
});