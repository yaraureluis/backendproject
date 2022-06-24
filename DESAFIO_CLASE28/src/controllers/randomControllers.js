// GENERAR N NUMEROS ALEATORIOS EN UN RANGO DE 1 A 1000 Y ESCRIBIR CUANTAS VECES SE REPITE EL NUMERO
function num_aleatorios_rango_repeticion(n = 100) {
  n = +n;
  console.log("valor de n", n);
  let numeros_generados = [];

  for (let i = 0; i < n; i++) {
    numeros_generados.push(Math.floor(Math.random() * 1000) + 1);
  }
  let contador_de_repeticiones = numeros_generados.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  return contador_de_repeticiones;
}

process.on("exit", () => {
  console.log(`worker #${process.pid} cerrado`);
});

process.on("message", (cant) => {
  console.log("cantidad en process.on", cant);
  console.log(`worker #${process.pid} iniciando su tarea`);
  const obj = num_aleatorios_rango_repeticion(cant);
  process.send(obj);
  console.log(`worker #${process.pid} finalizó su trabajo`);
  process.exit();
});

process.send("listo");
