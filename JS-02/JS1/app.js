const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
//index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
//push
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/push.html');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
