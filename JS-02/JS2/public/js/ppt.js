// public/js/ppt.js
document.addEventListener("DOMContentLoaded", function () {
  const modeSelectionDiv = document.getElementById("modeSelection");
  const nameFormDiv = document.getElementById("nameForm");
  const playerForm = document.getElementById("playerForm");
  const playerInputsDiv = document.getElementById("playerInputs");
  const gamePlayDiv = document.getElementById("gamePlay");
  const moveButtons = document.querySelectorAll(".move");
  const gameResultDiv = document.getElementById("gameResult");

  let mode = "";
  let players = []; // [{name, move}]
  let currentTurn = 0; // para 1 vs 1
  let tempMove = ""; // almacena jugada del primer jugador

  function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name.trim()) && name.trim() !== "";
  }

  // Selección de modo
  document.getElementById("mode1v1").addEventListener("click", function () {
    mode = "1v1";
    setupNameForm();
  });

  document.getElementById("mode1vMaquina").addEventListener("click", function () {
    mode = "1vMaquina";
    setupNameForm();
  });

  function setupNameForm() {
    modeSelectionDiv.style.display = "none";
    nameFormDiv.style.display = "block";
    playerInputsDiv.innerHTML = "";
    if (mode === "1v1") {
      playerInputsDiv.innerHTML = `
        <label>Nombre del Jugador 1:
          <input type="text" name="player1" required pattern="[A-Za-z\\s]+">
        </label><br>
        <label>Nombre del Jugador 2:
          <input type="text" name="player2" required pattern="[A-Za-z\\s]+">
        </label>
      `;
    } else if (mode === "1vMaquina") {
      playerInputsDiv.innerHTML = `
        <label>Nombre del Jugador:
          <input type="text" name="player1" required pattern="[A-Za-z\\s]+">
        </label>
      `;
    }
  }

  playerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(playerForm);
    let valid = true;
    let tmpPlayers = [];
    for (let entry of formData.entries()) {
      if (!validateName(entry[1])) {
        valid = false;
        alert("Por favor, ingresa un nombre válido (solo letras y espacios).");
        break;
      }
      tmpPlayers.push(entry[1].trim());
    }
    if (!valid) return;

    if (mode === "1v1") {
      players = [
        { name: tmpPlayers[0], move: "" },
        { name: tmpPlayers[1], move: "" },
      ];
    } else if (mode === "1vMaquina") {
      players = [
        { name: tmpPlayers[0], move: "" },
        { name: "Maquina", move: "" },
      ];
    }
    nameFormDiv.style.display = "none";
    gamePlayDiv.style.display = "block";
    currentTurn = 0;
    tempMove = "";
    gameResultDiv.innerText = "";
    moveButtons.forEach((btn) => {
      btn.addEventListener("click", handleMoveClick);
    });
  });

  function getResult(move1, move2) {
    if (move1 === move2) return "Empate";
    if (
      (move1 === "piedra" && move2 === "tijeras") ||
      (move1 === "tijeras" && move2 === "papel") ||
      (move1 === "papel" && move2 === "piedra")
    )
      return "Jugador 1";
    return "Jugador 2";
  }

  function debugMoves() {
    // Ejemplo usando unshift, shift y pop para demostrar la lógica con arrays
    let moveQueue = [];
    moveQueue.unshift("inicio"); // agrega al principio
    moveQueue.push("final"); // agrega al final
    console.log("Debug moves - removiendo elementos:");
    console.log("Shift (remueve el primer elemento):", moveQueue.shift());
    console.log("Pop (remueve el último elemento):", moveQueue.pop());
  }

  function handleMoveClick(e) {
    const selectedMove = e.target.getAttribute("data-move");
    debugMoves(); // demostración de métodos unshift, shift, pop
    if (mode === "1vMaquina") {
      players[0].move = selectedMove;
      const moves = ["piedra", "papel", "tijeras"];
      const machineMove = moves[Math.floor(Math.random() * moves.length)];
      players[1].move = machineMove;

      const result = getResult(players[0].move, players[1].move);
      if (result === "Empate") {
        gameResultDiv.innerText = `Empate. Ambos eligieron ${players[0].move}.`;
      } else if (result === "Jugador 1") {
        gameResultDiv.innerText = `${players[0].name} gana: ${players[0].move} vence a ${players[1].move}.`;
      } else {
        gameResultDiv.innerText = `${players[1].name} gana: ${players[1].move} vence a ${players[0].move}.`;
      }
    } else if (mode === "1v1") {
      if (currentTurn === 0) {
        tempMove = selectedMove;
        currentTurn = 1;
        gameResultDiv.innerText = `${players[0].name} eligió ${selectedMove}. Esperando a ${players[1].name}...`;
      } else {
        const result = getResult(tempMove, selectedMove);
        if (result === "Empate") {
          gameResultDiv.innerText = `Empate. Ambos eligieron ${tempMove}.`;
        } else if (result === "Jugador 1") {
          gameResultDiv.innerText = `${players[0].name} gana: ${tempMove} vence a ${selectedMove}.`;
        } else {
          gameResultDiv.innerText = `${players[1].name} gana: ${selectedMove} vence a ${tempMove}.`;
        }
        currentTurn = 0;
        tempMove = "";
      }
    }
  }
});
s