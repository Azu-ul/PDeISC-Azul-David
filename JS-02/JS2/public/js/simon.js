// public/js/simon.js
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startGame");
  const gameBoard = document.getElementById("gameBoard");
  const colorButtons = document.querySelectorAll(".color-btn");
  const resultDiv = document.getElementById("result");

  const colors = ["rojo", "verde", "azul", "amarillo"];
  let correctSequence = [];
  let playerSequence = [];
  let round = 0;
  let acceptingInput = false;

  function randomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  function nextRound() {
    round++;
    playerSequence = []; // reiniciar secuencia del jugador
    correctSequence.push(randomColor()); // uso de push()
    showSequence();
  }

  function showSequence() {
    acceptingInput = false;
    let delay = 0;
    correctSequence.forEach((color, index) => {
      setTimeout(() => {
        const btn = document.querySelector(`.color-btn[data-color="${color}"]`);
        btn.classList.add("active");
        setTimeout(() => {
          btn.classList.remove("active");
          if (index === correctSequence.length - 1) {
            acceptingInput = true;
            // Función de debug usando varios métodos de array
            debugSequence();
          }
        }, 500);
      }, delay);
      delay += 700;
    });
  }

  // Función de debug que utiliza map, filter, reduce, sort y reverse
  function debugSequence() {
    let upperSequence = correctSequence.map((c) => c.toUpperCase());
    let uniqueSequence = upperSequence.filter(
      (color, index) => upperSequence.indexOf(color) === index
    );
    let concatenated = uniqueSequence.reduce((acc, val) => acc + "-" + val);
    let sortedReversed = uniqueSequence.sort().reverse();
    console.log("Secuencia en mayúsculas (map):", upperSequence);
    console.log("Secuencia única (filter + indexOf):", uniqueSequence);
    console.log("Concatenada (reduce):", concatenated);
    console.log("Secuencia ordenada y revertida (sort, reverse):", sortedReversed);
  }

  function endGame() {
    acceptingInput = false;
    // Uso de slice() para copiar la secuencia
    let correctCopy = correctSequence.slice();
    resultDiv.innerHTML = `<p>Error! La secuencia correcta era: ${correctCopy.join(
      ", "
    )}</p><p>Rondas completadas: ${round - 1}</p>`;
    // Demostración de pop() (se remueve el último elemento, solo para mostrar el método)
    correctSequence.pop();
  }

  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    gameBoard.style.display = "block";
    nextRound();
  });

  colorButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!acceptingInput) return;
      const selectedColor = this.getAttribute("data-color");
      playerSequence.push(selectedColor); // uso de push()
      for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== correctSequence[i]) {
          endGame();
          return;
        }
      }
      if (playerSequence.length === correctSequence.length) {
        setTimeout(nextRound, 1000);
      }
    });
  });
});
