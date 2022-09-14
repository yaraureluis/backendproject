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

  socket.on("MESSAGE", async (message) => {
    console.table(message);

    let html = await html_buil("templates/chat.handlebars", message);
    document.getElementById("chat").innerHTML = html;
  });

  templates_fetch("templates/input-chat.handlebars").then((res) => {
    document.getElementById("input").innerHTML = res;
    const chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submit");

      const message = { email: document.getElementById("email").value, message: document.getElementById("message").value };
      socket.emit("MESSAGE", message);

      chatForm.reset();
    });
  });
});
