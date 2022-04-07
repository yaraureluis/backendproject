const express = require("express");
const app = express();

let contador = 1;

app.get("/productos", (req, res) => {
  res.send(`
  <h1>HOLA MUNDO!</h1>
  <p>Parrafo de prueba</p>
  <a href="/visitas">Ir a visitas</a>
  <a href="/pagina">Ir a página</a>
  <a href="/fyh">Ir a fyh</a>

  `);
});

app.get("/pagina", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.get("/visitas", (req, res) => {
  const palabra = contador === 1 ? "visita" : "visitas";
  res.send(`Cantidad de visitas: ${contador} ${palabra}`);
});

app.get("/fyh", (req, res) => {
  const fecha = new Date().toLocaleString();
  res.send({ "Fecha y Hora": fecha });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
