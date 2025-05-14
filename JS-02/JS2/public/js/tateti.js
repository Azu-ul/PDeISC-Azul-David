// public/js/tateti.js
document.addEventListener("DOMContentLoaded", function () {
  const modeSelectionDiv = document.getElementById("modeSelection");
  const nameFormDiv = document.getElementById("nameForm");
  const playerForm = document.getElementById("playerForm");
  const playerInputsDiv = document.getElementById("playerInputs");
  const gameBoardDiv = document.getElementById("gameBoard");
  const boardButtons = document.querySelectorAll(".cell");
  const gameResultDiv = document.getElementById("gameResult");

  let mode = "";
  let players = []; // [{name, symbol}]
  let currentPlayerIndex = 0;
  let board = Array(9).fill(""); // tablero vacío

  function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name.trim()) && name.trim() !== "";
  }

  function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columnas
      [0, 4, 8],
      [2, 4, 6]  // diagonales
    ];
    let winner = null;
    winConditions.forEach((condition) => {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
      }
    });
    return winner;
  }

  function checkDraw() {
    return board.every((cell) => cell !== "");
  }

  // Función de debug que utiliza slice() y splice()
  function debugBoard() {
    let boardCopy = board.slice(); // copia usando slice()
    if (boardCopy[4] === "") {
      boardCopy.splice(4, 1, "-"); // uso de splice() para insertar un valor en el centro
    }
    console.log("Debug: Tablero (después de splice y slice):", boardCopy);
  }

  function handleCellClick(e) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (board[index] !== "") return;

    const currentPlayer = players[currentPlayerIndex];
    board[index] = currentPlayer.symbol;
    e.target.innerText = currentPlayer.symbol;
    
    debugBoard(); // llamar función de debug

    let winner = checkWinner();
    if (winner) {
      gameResultDiv.innerText = `¡${currentPlayer.name} (${currentPlayer.symbol}) gana!`;
      boardButtons.forEach((btn) =>
        btn.removeEventListener("click", handleCellClick)
      );
      return;
    }
    if (checkDraw()) {
      gameResultDiv.innerText = "¡Empate!";
      boardButtons.forEach((btn) =>
        btn.removeEventListener("click", handleCellClick)
      );
      return;
    }
    switchPlayer();
    if (
      mode === "1vMaquina" &&
      players[currentPlayerIndex].name.toLowerCase() === "maquina"
    ) {
      setTimeout(machineMove, 500);
    }
  }

  function machineMove() {
    let availableIndices = [];
    board.forEach((cell, index) => {
      if (cell === "") availableIndices.push(index);
    });
    if (availableIndices.length === 0) return;
    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    board[randomIndex] = players[currentPlayerIndex].symbol;
    boardButtons.forEach((btn) => {
      if (parseInt(btn.getAttribute("data-index")) === randomIndex) {
        btn.innerText = players[currentPlayerIndex].symbol;
      }
    });
    let winner = checkWinner();
    if (winner) {
      gameResultDiv.innerText = `¡${players[currentPlayerIndex].name} (${players[currentPlayerIndex].symbol}) gana!`;
      boardButtons.forEach((btn) =>
        btn.removeEventListener("click", handleCellClick)
      );
      return;
    }
    if (checkDraw()) {
      gameResultDiv.innerText = "¡Empate!";
      boardButtons.forEach((btn) =>
        btn.removeEventListener("click", handleCellClick)
      );
      return;
    }
    switchPlayer();
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
        <label>Nombre del Jugador 1 (X):
          <input type="text" name="player1" required pattern="[A-Za-z\\s]+">
        </label><br>
        <label>Nombre del Jugador 2 (O):
          <input type="text" name="player2" required pattern="[A-Za-z\\s]+">
        </label>
      `;
    } else if (mode === "1vMaquina") {
      playerInputsDiv.innerHTML = `
        <label>Nombre del Jugador (X):
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
        { name: tmpPlayers[0], symbol: "X" },
        { name: tmpPlayers[1], symbol: "O" },
      ];
    } else if (mode === "1vMaquina") {
      players = [
        { name: tmpPlayers[0], symbol: "X" },
        { name: "Maquina", symbol: "O" },
      ];
    }
    nameFormDiv.style.display = "none";
    gameBoardDiv.style.display = "block";
    boardButtons.forEach((btn) => {
      btn.innerText = "";
      btn.addEventListener("click", handleCellClick);
    });
  });
});
