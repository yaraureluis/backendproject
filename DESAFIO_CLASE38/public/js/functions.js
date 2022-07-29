const socket = io();
document.addEventListener("DOMContentLoaded", async () => {
  async function templates_fetch(url) {
    let res = await fetch(url);
    return await res.text();
  }

  async function html_buil(url, contexto) {
    const plantilla = await templates_fetch(url);
    const generate = Handlebars.compile(plantilla);
    return generate(contexto);
  }

  socket.on("HISTORIAL", async (productos) => {
    console.table(productos);

    let html = await html_buil("templates/historial.handlebars", productos);
    document.getElementById("historial").innerHTML = html;
  });

  socket.on("MENSAJES", async (mensajes) => {
    console.table(mensajes);

    let html = await html_buil("templates/chat.handlebars", mensajes);
    document.getElementById("chat").innerHTML = html;
  });

  socket.on("NOMBRE_USUARIO", async (nombre_usuario) => {
    console.log("NOMBRE_USUARIO", nombre_usuario);
    let html = await html_buil("templates/user.handlebars", nombre_usuario);
    document.getElementById("usuario").innerHTML = html;
    // console.log("nombre en js", nombre_usuario);
    // document.getElementById("btn_bienvenido").hidden = false;

    // document.getElementById("bienvenido").innerHTML = "Hola " + nombre_usuario;
  });

  templates_fetch("templates/formulario.handlebars").then((res) => {
    document.getElementById("formulario").innerHTML = res;
  });

  templates_fetch("templates/inputChat.handlebars").then((res) => {
    document.getElementById("input").innerHTML = res;
  });
});
