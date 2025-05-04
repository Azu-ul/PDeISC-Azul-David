document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('person-form');
  const lista = document.getElementById('lista-personas');
  const mensaje = document.getElementById('mensaje');
  const hijosSelect = document.getElementById('tieneHijos');
  const cantidadHijosLabel = document.getElementById('cantidadHijosLabel');

  const personas = [];

  hijosSelect.addEventListener('change', () => {
    cantidadHijosLabel.style.display = hijosSelect.value === 'Si' ? 'block' : 'none';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const persona = {
      nombre: data.get('nombre'),
      apellido: data.get('apellido'),
      edad: data.get('edad'),
      fecha: data.get('fecha'),
      sexo: data.get('sexo'),
      documento: data.get('documento'),
      estado: data.get('estado'),
      nacionalidad: data.get('nacionalidad'),
      telefono: data.get('telefono'),
      mail: data.get('mail'),
      tieneHijos: data.get('tieneHijos'),
      cantidadHijos: data.get('tieneHijos') === 'Si' ? data.get('cantidadHijos') : '0'
    };

    // Validación básica JS (además del HTML5)
    if (!persona.nombre || !persona.apellido || !persona.mail) {
      mensaje.textContent = 'Por favor, completá todos los campos obligatorios.';
      mensaje.style.color = 'red';
      return;
    }

    personas.push(persona);
    mensaje.textContent = '¡Guardado correctamente!';
    mensaje.style.color = 'lightgreen';
    form.reset();
    cantidadHijosLabel.style.display = 'none';

    renderLista();
  });

  function renderLista() {
    lista.innerHTML = '';
    personas.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} ${p.apellido}`;
      lista.appendChild(li);
    });
  }
});