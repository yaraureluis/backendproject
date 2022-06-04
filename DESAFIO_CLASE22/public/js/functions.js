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
  // console.table(productos);

  let html = await html_built("templates/historial.handlebars", productos);
  document.getElementById("historial").innerHTML = html;
});

socket.on("MENSAJES", async (mensajes, esquema, denormalizados) => {
  console.log("MENSAJES NORMALIZADOS:-------");
  console.log(mensajes);
  console.log("MENSAJES DENORMALIZADOS:-------");
  console.log(denormalizados);
  // let mensajes_denormalizados = normalizr.denormalize(mensajes, esquema);
  let html = await html_built("templates/chat.handlebars", denormalizados);
  document.getElementById("chat").innerHTML = html;
  let caracteres_mensajes = JSON.stringify(mensajes).length;
  let caracteres_denormalizados = JSON.stringify(denormalizados).length;
  console.log("CARACTERES NORMALIZADOS Y DENORMALIZADOS", caracteres_mensajes, caracteres_denormalizados);
  // porcentaje de compresion
  let compresion = ((caracteres_denormalizados - caracteres_mensajes) / caracteres_denormalizados) * 100;
  document.getElementById("compresion").innerHTML = `Porcentaje de compresión: ${Math.round(compresion)}%`;
  console.log("COMPRESION ACTUAL", Math.round(compresion));
});

// templates_fetch("templates/formulario.handlebars").then((res) => {
//   document.getElementById("formulario").innerHTML = res;
// });

templates_fetch("templates/inputChat.handlebars").then((res) => {
  document.getElementById("input").innerHTML = res;
});
