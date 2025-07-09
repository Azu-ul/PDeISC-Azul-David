const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Array en memoria para almacenar usuarios creados
const alumnos = [
  { id: 1, nombre: 'Azul', email: 'azul@mail.com' },
  { id: 2, nombre: 'Luz', email: 'luz@mail.com' },
  { id: 3, nombre: 'Sofi', email: 'sofi@mail.com' }
];

app.get('/api/alumnos', (req, res) => {
  res.json(alumnos);
});

app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  const nuevoUsuario = { id: Date.now(), nombre, email };
  alumnos.push(nuevoUsuario); // guardo en el mismo array alumnos
  res.json(nuevoUsuario);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
