document.addEventListener("DOMContentLoaded", function () {
    // LETRAS
    let letras = ["A", "B", "C", "D", "E"];
    document.getElementById("resultado-letras").textContent = `Letras actuales: [${letras.join(", ")}]`;
  
    document.getElementById("form-letras").addEventListener("submit", function (e) {
      e.preventDefault();
      letras.splice(1, 2);
      document.getElementById("resultado-letras").textContent =
        `Se eliminaron 2 letras desde la posición 1. Letras actuales: [${letras.join(", ")}]`;
      e.target.reset();
    });
  
    // NOMBRES
    let nombres = ["Luis", "Ana", "Pedro"];
    document.getElementById("resultado-nombres").textContent = `Nombres actuales: [${nombres.join(", ")}]`;
  
    document.getElementById("form-nombre").addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const nuevo = formData.get("nombre");
      nombres.splice(1, 0, nuevo);
      document.getElementById("resultado-nombres").textContent =
        `Se agregó "${nuevo}" en la posición 1. Nombres actuales: [${nombres.join(", ")}]`;
      e.target.reset();
    });
  
    // ELEMENTOS
    let elementos = ["Sol", "Luna", "Mar", "Cielo"];
    document.getElementById("resultado-elementos").textContent = `Elementos actuales: [${elementos.join(", ")}]`;
  
    document.getElementById("form-reemplazar").addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const nuevo1 = formData.get("nuevo1");
      const nuevo2 = formData.get("nuevo2");
      elementos.splice(1, 2, nuevo1, nuevo2);
      document.getElementById("resultado-elementos").textContent =
        `Se reemplazaron desde la posición 1. Elementos actuales: [${elementos.join(", ")}]`;
      e.target.reset();
    });
  });
  