// eliminar el último animal
document.getElementById("form-animales").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const animales = [
      formData.get("animal1"),
      formData.get("animal2"),
      formData.get("animal3"),
    ];
  
    const eliminado = animales.pop();
  
    document.getElementById("resultado-animales").textContent =
      `El animal eliminado fue: ${eliminado}. Lista actual: [${animales.join(", ")}]`;
  });
  
  // eliminar el último producto de compras
  document.getElementById("form-compras").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const compras = [
      formData.get("producto1"),
      formData.get("producto2"),
      formData.get("producto3"),
    ];
  
    const eliminado = compras.pop();
  
    document.getElementById("resultado-compras").textContent =
      `Se eliminó: ${eliminado}. Lista actual: [${compras.join(", ")}]`;
  });
  
  // vaciar array con pop() y bucle while
  const listaParaVaciar = [];
  
  document.getElementById("form-vaciar").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("elemento-vaciar");
    const valor = input.value.trim();
  
    if (valor !== "") {
      listaParaVaciar.push(valor);
      input.value = "";
      mostrarListaActual();
    }
  });
  
  document.getElementById("vaciar-lista").addEventListener("click", function () {
    let eliminados = [];
  
    while (listaParaVaciar.length > 0) {
      eliminados.push(listaParaVaciar.pop());
    }
  
    document.getElementById("resultado-vaciar").textContent =
      `Elementos eliminados con pop(): ${eliminados.join(", ")}`;
    mostrarListaActual();
  });
  
  function mostrarListaActual() {
    const contenedor = document.getElementById("lista-vaciar");
    if (listaParaVaciar.length === 0) {
      contenedor.textContent = "Lista vacía.";
    } else {
      contenedor.textContent = `Lista actual: [${listaParaVaciar.join(", ")}]`;
    }
  }
  