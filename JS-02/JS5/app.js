const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname , 'views' , 'index.html'));
})

app.listen(3000, () => {
    console.log('Servidor funcionando en localhost:3000');
});