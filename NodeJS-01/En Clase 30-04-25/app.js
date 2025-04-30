const express = require('express');
const path = require('path');
const app = express();

const Personas=[];

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public' , 'css')));

app.post('/login', (req, res) => {
  const persona = {
    username: req.body.username ,
    password: req.body.password
  }
  
Personas.push(persona);
console.log(Personas);
res.send('Persona agregada correctamente <a href="/">Volver</a><br><a href="/Personas">Ver Listado de Personas</a>');
}); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/Personas', (req, res) => {
  let Lista = '<h1>Listado de personas: </h1><ul>';
  Personas.forEach(p => {
    Lista += `<li>${p.username} - ${p.password}</li>`;
  });
  Lista += '</ul><a href="/">Volver... </a>';
  res.send(Lista);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

