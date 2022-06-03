const socket = io();

async function templates_fetch(url) {
  let res = await fetch(url);
  return await res.text();
}

async function html_built(url, contexto) {
  const plantilla = await templates_fetch(url);
  const generate = Handlebars.compile(plantilla);
  return generate(contexto);
}

socket.on("HISTORIAL", async (productos) => {
  console.table(productos);

  let html = await html_built("templates/historial.handlebars", productos);
  document.getElementById("historial").innerHTML = html;
});

socket.on("MENSAJES", async (mensajes, esquema, denormalizados) => {
  console.log("MENSAJES NORMALIZADOS:-------");
  console.table(mensajes);
  console.log("MENSAJES DENORMALIZADOS:-------");
  console.table(denormalizados);
  // let mensajes_denormalizados = normalizr.denormalize(mensajes, esquema);
  let html = await html_built("templates/chat.handlebars", mensajes);
  document.getElementById("chat").innerHTML = html;
});

// templates_fetch("templates/formulario.handlebars").then((res) => {
//   document.getElementById("formulario").innerHTML = res;
// });

templates_fetch("templates/inputChat.handlebars").then((res) => {
  document.getElementById("input").innerHTML = res;
});
