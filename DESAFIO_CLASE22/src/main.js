import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import exphbs from "express-handlebars";
import { producto_instancia } from "./controllers/productsControllers.js";
import { mensaje_instancia } from "./controllers/messageControllers.js";
import { normalize, denormalize, schema } from "normalizr";
import path from "path";
const __dirname = path.resolve();

//------------------ ESQUEMA ---------------/
const authorSchema = new schema.Entity("authors");
const idSchema = new schema.Entity("id");
const textMessageSchema = new schema.Entity("texts");
const messageSchema = new schema.Entity("posts", {
  // id: idSchema,
  author: authorSchema,
  texts: textMessageSchema,
});
//---------------- FIN ESQUEMA ---------------/

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
await producto_instancia.crearTabla();
const productos = await producto_instancia.listar();
// await mensaje_instancia.crearTabla();

const mensajes_sin_normalizar = await mensaje_instancia.listar();
let mensajes = normalize(mensajes_sin_normalizar, [messageSchema]);

const handlebarsConfig = {
  defaultLayout: "index.html",
};

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs(handlebarsConfig));

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("HISTORIAL", productos);
  let denormalizado = denormalize(mensajes.result, [messageSchema], mensajes.entities);
  console.log("MENSAJES DENORMALIZADOS:", denormalizado);
  socket.emit("MENSAJES", mensajes, [messageSchema], denormalizado);

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/productos-test", (req, res) => {
    res.sendFile(__dirname + "/public/index-testfaker.html");
  });

  app.post("/productos", (req, res) => {
    productos.push(req.body);
    producto_instancia.agregar([req.body]);
    io.sockets.emit("HISTORIAL", productos);
    console.log(productos);
    res.redirect("/");
  });

  app.post("/chat", (req, res) => {
    let req_formateado = {
      id: req.body.id,
      author: {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        alias: req.body.alias,
        avatar: req.body.avatar,
      },
      text: { id: "mensajes", mensaje: req.body.contenido },
    };
    let req_normalizado = normalize(req_formateado, messageSchema);
    console.log("MENSAJES NORMALIZADOS:", mensajes);

    let denormalizado = denormalize(req_normalizado.result, messageSchema, req_normalizado.entities);
    console.log("MENSAJES DENORMALIZADOS:", denormalizado);

    mensajes_sin_normalizar.push(req_formateado);
    mensaje_instancia.agregar(req_formateado, messageSchema);
    io.sockets.emit("MENSAJES", mensajes, [messageSchema], denormalizado);

    res.redirect("/");
  });

  app.get("/productos", (req, res) => {
    res.render("historial", { productos });
  });
});
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, function () {
  console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
