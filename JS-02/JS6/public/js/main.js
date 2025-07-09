const urlAPI = "https://jsonplaceholder.typicode.com/users";
let todosLosUsuarios = [];

// Cargar con fetch
document.getElementById("btnFetch").addEventListener("click", () => {
  fetch(urlAPI)
    .then((res) => res.json())
    .then((data) => {
      todosLosUsuarios = data;
      mostrarUsuarios(data, "listaUsuarios");
    });
});

// Cargar con axios
document.getElementById("btnAxios").addEventListener("click", () => {
  axios.get(urlAPI).then((res) => {
    todosLosUsuarios = res.data;
    mostrarUsuarios(res.data, "listaUsuarios");
  });
});

// Función para mostrar usuarios
function mostrarUsuarios(array, idElemento) {
  const lista = document.getElementById(idElemento);
  lista.innerHTML = "";
  array.forEach((usuario) => {
    const li = document.createElement("li");
    li.textContent = `${usuario.name} - ${usuario.email}`;
    lista.appendChild(li);
  });
}

// Buscar usuarios por nombre
document.getElementById("buscador").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = todosLosUsuarios.filter((u) =>
    u.name.toLowerCase().includes(texto)
  );
  mostrarUsuarios(filtrados, "resultadosBusqueda");
});

document.getElementById('btnAlumnos').addEventListener('click', () => {
  axios.get('/api/alumnos')
    .then(response => {
      const alumnos = response.data;
      const lista = document.getElementById('listaAlumnos');
      lista.innerHTML = ''; // limpio la lista antes de mostrar
      alumnos.forEach(alumno => {
        const li = document.createElement('li');
        li.textContent = `${alumno.nombre} (${alumno.email})`;
        lista.appendChild(li);
      });
    });
});

// Función para mostrar lista de alumnos
function mostrarAlumnos(alumnos) {
  const lista = document.getElementById('listaAlumnos');
  lista.innerHTML = '';
  alumnos.forEach(alumno => {
    const li = document.createElement('li');
    li.textContent = `${alumno.nombre} (${alumno.email})`;
    lista.appendChild(li);
  });
}

// Al hacer click en "Cargar alumnos" se piden los alumnos a la API y se muestran
document.getElementById('btnAlumnos').addEventListener('click', () => {
  axios.get('/api/alumnos')
    .then(res => {
      mostrarAlumnos(res.data);
    });
});

// Al enviar el formulario se crea un nuevo usuario, y después se recarga la lista de alumnos
document.getElementById('formulario').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const datos = {
    nombre: formData.get('nombre'),
    email: formData.get('email')
  };

  axios.post('/api/usuarios', datos)
    .then(res => {
      document.getElementById('respuestaForm').textContent = 'Usuario creado con ID: ' + res.data.id;
      e.target.reset();
      // recargamos la lista de alumnos después de crear usuario
      return axios.get('/api/alumnos');
    })
    .then(res => {
      mostrarAlumnos(res.data);
    });
});
