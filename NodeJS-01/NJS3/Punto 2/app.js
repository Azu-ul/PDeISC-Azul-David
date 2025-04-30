const express = require ('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

app.get('/click' , (req,res) => {
    res.sendFile(path.join(__dirname, 'views' , 'click.html'));
  });

app.get('/dblclick' , (req,res) => {
  res.sendFile(path.join(__dirname , 'views' , 'dblclick.html'));
}); 

app.get('/keydown' , (req,res) => {
  res.sendFile(path.join(__dirname , 'views' , 'keydown.html'));
});

app.get('/hover' , (req,res) => {
  res.sendFile(path.join(__dirname , 'views' , 'hover.html'))
})

app.get('/submit' , (req,res) => {
  res.sendFile(path.join(__dirname , 'views' , 'submit.html'));
}); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
})
