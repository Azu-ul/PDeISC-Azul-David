const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname , 'views' , 'index.html'));
})

//creamos array para guardar registros con personas
const personas = [];

//definimos persona y la agregamos al array
app.post('/guardar' , (req, res) => {
    const persona = req.body;
    personas.push(persona);
    res.json({ok: true, personas});
});

app.listen(3000, () => {
    console.log('Servidor funcionando en localhost:3000');
});