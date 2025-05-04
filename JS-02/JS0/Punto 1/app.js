const express = require('express');
const path = require('path');
const app = express();

const Personas=[];

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // importante para leer JSON
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
  const persona = {
    username: req.body.username,
    password: req.body.password
  };

  Personas.push(persona);
  res.json(Personas); // devolvemos la lista actualizada
});

app.get('/Personas', (req, res) => {
  res.json(Personas); // para usar desde JS
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

